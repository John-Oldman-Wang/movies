var Movie=require('../models/movies.js')
var _=require('underscore')
exports.watch=function(req,res){
	var id=req.query.id
	Movie.findById(id,function(err,movie){
		if(err){
			res.redirect("/")
			return
		}
		res.render('detail',{
			title: movie.title || "",
			movie: movie,
			user:req.session.user
		})
	})	
}

//edit new movie
exports.editnew=function(req,res){
	res.render('editmovie',{
		title: '新增电影',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		},
		user:req.session.user
	})
}

//edit old movie
exports.editold=function(req,res){
	var id=req.params.id
	Movie.findById(id,function(err,movie){
		res.render('editmovie',{
			title:"修改电影-"+movie.title,
			movie:movie,
			user:req.session.user
		})
	})
}

//new movie or update old movie
exports.NewUpdate=function(req,res){
	//console.log(req.body)
	var id=req.body.movie._id
	var movieObj=req.body.movie
	var _movie
	if(id!== undefined && id !== "undefined" && id !== ''){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
				res.end("数据库出错")
			}
			if(movie == null){
				_movie=new Movie({
					doctor: movieObj.doctor,
					title: movieObj.title,
					country: movieObj.country,
					language: movieObj.language,
					year: movieObj.year,
					poster: movieObj.poster,
					summary: movieObj.summary,
					flash: movieObj.flash
				})
				_movie.save(function(err,movie){
					if(err){
						console.log(err)
					}
					res.redirect('/watch?id='+movie._id)
				})
			}else{
				_movie=_.extend(movie,movieObj)
				_movie.save(function(err,movie){
					if(err){
						console.log(err)
					}
					res.redirect('/watch?id='+movie._id)
				})
			}	
		})
	}
	else{
		_movie=new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			res.redirect('/watch?id='+movie._id)
		})
	}
}

//movies liste
exports.list=function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('movielist',{
			title: '电影列表',
			movies: movies,
			user:req.session.user
		})
	})
}

//delete movie
exports.del=function(req,res){
	var id=req.query.id
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}