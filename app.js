var express=require('express')
var bodyParser=require('body-parser')
var multer=require('multer')
var upload=multer()
var path=require('path')
var mongoose=require('mongoose')
mongoose.Promise=Promise
var _=require('underscore')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var mongoStore=require('connect-mongo')(session)


var Movie=require('./models/movies.js')
var User=require('./models/users.js')

var dburl='mongodb://localhost/jack'
var app=express()
var port=process.env.PORT || 3000

mongoose.connect(dburl)


app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
	secret:'movies',
	store: new mongoStore({
		url:dburl,
		collection: 'sessions'
	})
}))
app.locals.moment=require('moment')
app.listen(port)

console.log('start at'+port)


//Home page
app.get('/',function(req,res){
	//console.log('user in session')
	//console.log(req.session.user)
	var _user=req.session.user
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title: 'wanglin shouye',
			movies: movies,
			user:_user
		})
	})
})

//see movie
app.get('/movie/:id',function(req,res){
	var id=req.params.id
	var _user=req.session.user
	Movie.findById(id,function(err,movie){
		res.render('detail',{
			title: 'wanglin xiangqingye',
			movie:movie,
			user:_user
		})
	})
	
})

//sign up
app.post('/user/signup',function(req,res){
	var _user=req.body.user
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		if(user.length){
			console.log(user)
			//用户名被占用
			return res.redirect('/')
		}
		else{
			//注册成功
			var user=new User(_user)
			user.save(function(err,user){
				if(err){
					console.log(err)
				}
				//用户信息保存到数据库里面
				res.redirect('/admin/userlist')
			})
		}
	})
})

//sign in
app.post('/user/signin',function(req,res){
	var _user=req.body.user
	var name=_user.name
	var password=_user.password
	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			//没有该用户名
			console.log('no user')
			return res.redirect('/')
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				//密码正确登录成功
				delete user.password
				req.session.user = user //写入会话
				console.log('password is match')
				res.redirect('/admin/userlist')
			}
			else{
				//密码错误
				console.log('password is not match')
				res.redirect('/')
			}
		})
	})
})

//logout
app.get('/logout',function(req,res){
	delete req.session.user
	res.redirect('/')
})



//input new movie
app.get('/admin/movie',function(req,res){
	var _user=req.session.user
	res.render('admin',{
		title: 'wanglin admin',
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
		user:_user
	})
})

//update movie
app.get('/admin/movie/update/:id',function(req,res){
	var id=req.params.id
	var _user=req.session.user
	Movie.findById(id,function(err,movie){
		res.render('admin',{
			title:"wanglin update",
			movie:movie,
			user:_user
		})
	})
})

//post new movie
app.post('/admin/movie/new',upload.array(),function(req,res){
	//console.log(req.body)
	var id=req.body.movie._id
	var movieObj=req.body.movie
	var _movie
	if(id !== 'undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			_movie=_.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
			})
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
			res.redirect('/movie/'+movie._id)
		})
	}
})

//update movie
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id
	var _user=req.session.user
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'update',
				movie:movie,
				user:_user
			})
		})
	}

})

//movies list
app.get('/admin/list',function(req,res){
	var _user=req.session.user
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title: 'wanglin list',
			movies: movies,
			user:_user
		})
	})
})

//delete movie
app.delete('/admin/list',function(req,res){
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
})

//movies list
app.get('/admin/userlist',function(req,res){
	var _user=req.session.user
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title: 'wanglin userlist',
			users: users,
			user:_user
		})
	})
})