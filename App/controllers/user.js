var User=require('../models/users.js')

//new user
exports.new=function(req,res){
	var _user=req.body.user
	var password=_user.password
	if(!password){
		return res.redirect('/')
	}
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		if(user.length){
			console.log(user)
			//用户名被占用
			res.redirect('/')
		}
		else{
			//注册成功
			var user=new User(_user)
			user.save(function(err,user){
				if(err){
					console.log(err)
				}
				delete user.password
				req.session.user=user
				//用户信息保存到数据库里面
				res.redirect('/admin/movielist')
			})
		}
	})
}
// whetheruser
exports.whetheruser=function(req,res){
	var name=req.query.name
	//console.log(name)
	User.findOne({name:name},function(err,user){
		if(err) return console.log(err)
		if(user)
			res.json({whetheruser:1})
		else
			res.json({whetheruser:0})
	})
}
//verification password
exports.verification=function(req,res){
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
}

//logout
exports.logout=function(req,res){
	delete req.session.user
	res.redirect('/')
}

exports.list=function(req,res){
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
}