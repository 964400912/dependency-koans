var mongoose = require("mongoose");
var assert = require('assert');
// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'z' });
kitty.save(function (err) {
	if (err) {
	    console.log(err);
	} else {
	    console.log('meow');
	}
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

// Test the use of native promises
assert.equal(query.exec().constructor, global.Promise);


// var schema = new mongoose.Schema({ name: 'string', weight: 'number', type: 'string' });
// var Animal = mongoose.model('Animal', schema);