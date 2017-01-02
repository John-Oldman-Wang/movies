var upload=require('multer')()
var index=require('../APP/controllers/index')
var Movie=require('../APP/controllers/movie')
var User=require('../APP/controllers/user')
module.exports=function(app){
	//Home page
	app.get('/',index)
	//see movie
	app.get('/movie/:id',Movie.watch)

	//sign up
	app.post('/user/new',User.new)
    //whetheruser
    app.get('/user/whether',User.whetheruser)
	//sign in
	app.post('/user/verification',User.verification)

	//logout
	app.get('/logout',User.logout)

	//movies list
	app.get('/admin/userlist',User.list)
	app.get('/admin/movie/new',Movie.editnew)
	app.get('/admin/movie/update/:id',Movie.editold)
	app.post('/admin/movie/new',Movie.NewUpdate)
	app.get('/admin/movielist',Movie.list)
	app.delete('/admin/movie/del',Movie.del)
}