// var superagent = require("superagent");
var request = require("superagent");
var assert = require('assert');

// http://visionmedia.github.io/superagent/#request-basics
request
  .get('http://wal.sh/')
  .end(function(err, res){
    console.log(res.text);
  });

// http://visionmedia.github.io/superagent/#cors
request
  .get('http://example.com/')
  .withCredentials()
  .end(function(err, res){
    assert(200 == res.status);
    assert(res.text.indexOf('Example Domain') !== -1);
  })
