var mongoose = require("mongoose");
var assert = require('assert');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test');

// ------------------------------------------

var schema = new Schema({
	name: {
	    type: String,
	    required: true
	}
    });
var Cat = mongoose.model('Cat', schema);

// This cat has no name :(
var cat = new Cat();
cat.save(function(error) {
	assert.equal(error.errors['name'].message,
		     'Path `name` is required.');

	error = cat.validateSync();
	assert.equal(error.errors['name'].message,
		     'Path `name` is required.');
    });

['a', 'b', 'c', 'd', 'e']
    .forEach(function(e, i, c) { 
	    var cat = new Cat({name: e});
	    cat.save(function() { 
		    console.log(e)
			});
	});

var query = Cat.findOne({name: 'a'}, '', function(err, e) { 
	console.log(e);
    });

// ------------------------------------------

// Test the use of native promises
assert.equal(query.exec().constructor, global.Promise);

// ------------------------------------------

var userSchema = new Schema({
	phone: {
	    type: String,
	    validate: {
		validator: function(v) {
		    return /\d{3}-\d{3}-\d{4}/.test(v);
		},
		message: '{VALUE} is not a valid phone number!'
	    },
	    required: [true, 'User phone number required']
	}
    });

var User = mongoose.model('user', userSchema);
var user = new User();

var error;

user.phone = '555.0123';
error = user.validateSync();
assert.equal(error.errors['phone'].message,
	     '555.0123 is not a valid phone number!');

user.phone = '';
error = user.validateSync();
assert.equal(error.errors['phone'].message,
	     'User phone number required');

user.phone = '201-555-0123';
// Validation succeeds! Phone number is defined
// and fits `DDD-DDD-DDDD`
error = user.validateSync();
console.log(user);
assert.equal(error, null);

// ------------------------------------------

var blogSchema = new Schema({
	title:  String,
	author: String,
	body:   String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
	    votes: Number,
	    favs:  Number
	}
    });

var Blog = mongoose.model('blog', blogSchema);
var blog = new Blog();