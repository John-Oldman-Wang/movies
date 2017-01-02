var express=require('express')
var mongoose=require('mongoose')
var path=require('path')
mongoose.Promise=Promise
var dburl='mongodb://localhost/jack'

var bodyParser=require('body-parser')
var upload=require('multer')()
var cookieParser=require('cookie-parser')
var session=require('express-session')
var mongoStore=require('connect-mongo')(session)
var favicon = require('serve-favicon')

var app=express()
var port=process.env.PORT || 3000

mongoose.connect(dburl)

app.disable('x-powered-by')
app.set('views','./APP/views/pages')
app.set('view engine','jade')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(upload.array())
app.use(cookieParser())
app.use(favicon(path.join(__dirname,'favicon.ico')))
app.use(session({
	secret:'movies',
	store: new mongoStore({
		url:dburl,
		collection: 'sessions'
	})
}))

app.use(function(req,res,next){
	console.log('time:'+moment(new Date()).format('YYYY/MM/DD hh:mm:ss')+',method: '+req.method+',url: '+req.url)
	next()
})

//if('development' === app.get('env')){
//	app.set('showStackError',true)
//	app.locals.pretty =true
//	mongoose.set('debug',true)
//}

var moment=require('moment')
app.locals.moment=moment

require('./config/routes')(app)
app.listen(port)
console.log('start at '+port)