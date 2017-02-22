var mongoose =require('mongoose')
var VisitorSchema=new mongoose.Schema({
	url:String,
	ip:String,
	method:String,
	time:{
		type:Date,
		default:Date.now()
	}
})
VisitorSchema.statics={
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
var Visitor=mongoose.model('visitor',VisitorSchema)
module.exports=Visitor