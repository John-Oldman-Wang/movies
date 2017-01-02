$(function(){
	$('.del').click(function(e){
		var target=$(e.target)
		var id=target.data('id')
		var tr=$('.item-id-'+id)
		$.ajax({
			type:'DELETE',
			url:'/admin/movie/del?id='+id
		})
		.done(function(results){
			console.log(results.success)
			if(results.success===1){
				console.log('=1')
				if(tr.length>0){
					console.log('tr')
					tr.remove()
				}
			}
		})
	})
})