var mongoose =require('mongoose')
var VisitorSchema =require('./schemas/visitorSchema')
var Visitor=mongoose.model('visitor',VisitorSchema)
module.exports=Visitor