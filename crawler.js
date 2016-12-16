var request=require('http').request
var options={
	hostname:'v.youku.com',
	path:'/v_show/id_XMTgzMTk1OTA5Mg==.html'
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
			console.log(Buffer.isBuffer(chunk))
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
	console.log(a)
},5000)
