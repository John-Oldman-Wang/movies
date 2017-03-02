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
app.use("/static",express.static("public"))
require("./config/Middleware")(app)
app.use(session({
	secret:"movies",
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

require("./config/routes")(app)
app.use("/admin",function(req,res){
	if(!req.session || !req.session.user || req.session.user.name!=="admin"){
		res.redirect("/")
	}else{
		next()
	}
})



app.use("*",function(req,res){
	res.end("404 Not Found")
})
app.listen(port)
console.log("start at "+port)