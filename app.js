var express=require("express")
var mongoose=require("mongoose")
var path=require("path")
var fs=require("fs")
mongoose.Promise=Promise
var dburl="mongodb://localhost/jack"

var bodyParser=require("body-parser")
var upload=require("multer")({dest:"uploads/"})
var cookieParser=require("cookie-parser")
var session=require("express-session")
var mongoStore=require("connect-mongo")(session)
var favicon = require("serve-favicon")

var app=express()
var port=process.env.PORT || 3000

mongoose.connect(dburl)

app.disable("x-powered-by")
app.set("views","./App/views/pages")
app.set("view engine","jade")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(upload.fields([{ name: "avatar", maxCount: 1 }, { name: "gallery", maxCount: 1 }]))
app.use(function(req,res,next){
	if(req.files&&req.files.length){
		var files=req.files
		var oldname=[]
		var type=[]
		oldname.push(files["avatar"][0].filename)
		oldname.push(files["gallery"][0].filename)
		type.push(files["avatar"][0].originalname.split(".")[files["avatar"][0].originalname.split(".").length-1])
		type.push(files["gallery"][0].originalname.split(".")[files["gallery"][0].originalname.split(".").length-1])
		for(var i=0;i<oldname.length;i++){
			fs.renameSync(__dirname+"/uploads/"+oldname[i],__dirname+"/uploads/"+oldname[i]+"."+type[i])
		}
		req.files=null
		/*req.files={
			avatar:oldname[0]+"."+type[0],
			gallery:oldname[1]+"."+type[1]
		}*/
		req.body.avatar=oldname[0]+"."+type[0]
		req.body.gallery=oldname[1]+"."+type[1]
	}
	next()
})
app.use(cookieParser())
app.use(favicon(path.join(__dirname,"favicon.ico")))
app.use(session({
	secret:"movies",
	store: new mongoStore({
		url:dburl,
		collection: "sessions"
	})
}))

app.use(function(req,res,next){
	console.log("time:"+moment(new Date()).format("YYYY/MM/DD HH:mm:ss")+",method: "+req.method+",url: "+req.url)
	next()
})

//if('development' === app.get('env')){
//	app.set('showStackError',true)
//	app.locals.pretty =true
//	mongoose.set('debug',true)
//}
app.post("/admin/upload",function(req,res){
	console.log(req.body)
	res.end("上传成功")
})

var moment=require("moment")
app.locals.moment=moment

require("./config/routes")(app)
app.listen(port)
console.log("start at "+port)