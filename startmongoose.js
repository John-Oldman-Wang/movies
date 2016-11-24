var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/imooc')
var db=mongoose.connection;
db.on('error',function(){
	console.log('lianjiecuowu')
})
db.once('open',function(){
	console.log('ok')
	db.once('close',function(){
		console.log('close')
	})
})
