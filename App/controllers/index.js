var Movie=require('../models/movies.js')

module.exports=function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title: 'MOVIE',
			movies: movies,
			user:req.session.user
		})
	})
}