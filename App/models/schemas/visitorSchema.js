var mongoose=require('mongoose')
var VisitorMovieSchema=new mongoose.Schema({
	url:String,
	ip:String,
	method:String,
	time:{
		type:Date,
		default:Date.now()
	}
})
VisitorMovieSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort('time')
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}
module.exports=VisitorMovieSchema