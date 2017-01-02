window.addEventListener('load',function(){
	$('#signupName').change(function(){
		var name=this.value
		$.ajax({
			type:'get',
			url:'/user/whether?name='+name
		})
		.done(function(results){
			//console.log(results.whetheruser)
			if(results.whetheruser===1){
				$('#whetheruser').html('  用户名已经被使用').css('color','red');
				var btn=document.getElementById('submit')
				$('#submit').attr('disabled',true)
				//btn.disabled=true
				console.log(btn.disabled)
			}
			else{
				$('#whetheruser').html('  用户名可用').css('color','blue')
				$('#submit').attr('disabled',false)
			}
		})
	})
})