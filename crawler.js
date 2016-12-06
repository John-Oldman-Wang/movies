var request=require('http').request
var options={
	hostname:'127.0.0.1',
	path:'/admin/list'
}


function Request(options,cb,timeout){
	var time=timeout||3000
	console.log(time)
	var timer=setTimeout(function(){
		req.destroy()
	},timeout)
	var req=request(options,function(res){
		var html=new Buffer('')
		res.on('data',function(chunk){
			html=Buffer.concat([html,chunk])
		})
		res.on('end',function(){
			clearTimeout(timer)
			console.log(options.hostname+options.path)
			console.log(html.toString())
		})
	})
	req.on('error',function(e){
		if(timer._called)
			console.log('chaoshi')
		else{
			clearTimeout(timer)
			console.log('cuowu')
		}
	})
	req.end()
}
Request(options,function(a,b){
	if(a)
		console.log(a.toString())
	console.log(b)
},5000)
