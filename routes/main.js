var express = require('express');
var app = express();

app.get('/', function(req,res) {
	res.send('Welcome to Twitter\n');
});

app.listen(1111);