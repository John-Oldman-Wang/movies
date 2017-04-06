var express=require("express")
var mongoose=require("mongoose")
var path=require("path")
var fs=require("fs")
mongoose.Promise=Promise
var dburl="mongodb://localhost/jack"
var session=require("express-session")
var mongoStore=require("connect-mongo")(session)

//var bodyParser=require("body-parser")
//var upload=require("multer")({dest:"uploads/"})
//var cookieParser=require("cookie-parser")
//var favicon = require("serve-favicon")

var app=express()
var port=process.env.PORT || 3000

mongoose.connect(dburl)

app.disable("x-powered-by")
app.set("views","./App/views/pages")
app.set("view engine","jade")
app.use("/static",express.static("public",{
	"maxAge":"0",
	setHeaders:function(res,path){
		if(express.static.mime.lookup(path)==="text/html"){
			res.setHeader("Cache-Control","public,max-age=0")
		}
		if(express.static.mime.lookup(path)==="video/mp4"){
			res.setHeader("Cache-Control","public,max-age=1000")
			res.setHeader("Content-Type","video/webm")
		}
	}
}))
require("./config/Middleware")(app)
var cookieParser=require("cookie-parser")
app.use(cookieParser("movies"))
app.use(session({
	secret:"movies",
	resave:true,
	saveUninitialized:true,
	store: new mongoStore({
		url:dburl,
		collection: "sessions"
	})
}))
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:true}))
//app.use(upload.fields([{ name: "avatar", maxCount: 1 }, { name: "gallery", maxCount: 1 }]))
//app.use(cookieParser())

app.post("/admin/upload",function(req,res){
	console.log(req.body)
	res.end("上传成功")
})

var moment=require("moment")
app.locals.moment=moment

app.use("/admin",function(req,res,next){
	if(!req.session || !req.session.user || req.session.user.name!=="admin"){
		res.redirect("/")
	}else{
		next()
	}
})
require("./config/routes")(app)
app.use("*",function(req,res){
	res.end("404 Not Found")
})
app.listen(port)
console.log("start at "+port)