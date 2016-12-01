var mongoose = require('mongoose');
var show=require('./test.js')
mongoose.Promise=Promise
var Schema = mongoose.Schema;
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});
var Person = mongoose.model('javksss', personSchema);
mongoose.connect('mongodb://localhost/test')
var bad = new Person({
    name: { first: 'lisnssssg', last: 'Wang' }
});
console.log(bad.save)
bad.save(function(err,data){
	if(err){
		console.log(err)
	}
	console.log(data)
})
show('show')