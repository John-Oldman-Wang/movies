var bodyParser=require("body-parser")
var upload=require("multer")({dest:"uploads/"})
var cookieParser=require("cookie-parser")
var favicon = require("serve-favicon")
module.exports=function(app){
	app.use(favicon(__dirname+"/../favicon.ico"))
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
			req.body.avatar=oldname[0]+"."+type[0]
			req.body.gallery=oldname[1]+"."+type[1]
		}
		next()
	})
}