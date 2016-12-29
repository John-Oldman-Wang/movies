var express=require('express')
var bodyParser=require('body-parser')
var upload=require('multer')()
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
app.use(express.static('public'))
app.locals.moment=require('moment')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser())
app.use(session({
	secret:'movies',
	store: new mongoStore({
		url:dburl,
		collection: 'sessions'
	})
}))
require('./config/routes')(app)
app.listen(port)
console.log('start at'+port)