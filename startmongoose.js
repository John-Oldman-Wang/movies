var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
var Schema = mongoose.Schema;
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});
var Person = mongoose.model('javksss', personSchema);
var bad = new Person({
    name: { first: 'ling', last: 'Wang' }
});
bad.save(function(err,data){
	if(err){
		console.log(err)
	}
})