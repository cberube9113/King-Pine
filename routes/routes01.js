//First attempt at routing
//May need to split up into separate files

var express = require('express');
var app = express();

var users = [
    {name: 'Katy Boggs',
    username: 'katy',
    password: 'kboggs'},
    {name: 'Rob Sims',
    username: 'rob',
    password: 'rsims'}
];

function get_username(user){
    var c = undefined;
    for(var i = 0; i < users.length; i++){
        if(users[i].username == user){
            c = users[i];
            break;
        }
    }
    return c;
}

app.get('/', function(req,res) {
	res.send('Welcome to Twitter\n');
});

app.get('/reg', function(req,res) {
    res.send('This is the registration page.\n');
});

app.get('/login', function(req,res) {
    res.send('This is the login page.\n');
});

app.get('/home', function(req,res) {
    res.send('This is the home page.\n');
});

app.get('/home/:username', function(req, res){
    //If a user is located in the database with the listed username
    //This will show their info.
    var u = req.params.username;
    var c = get_username(u);
    if( c ) { 
        res.send('Name: ' + c.name);
        res.send('Username: ' + c.username);
        res.send('Password: ' + c.password);}

});

app.get('/connect', function(req,res) {
    res.send('This is the connect page.\n');
});

app.get('/me', function(req,res) {
    res.send('This is the me page.\n');
});

app.get('/discover', function(req,res) {
    res.send('This is the discover page.\n');
});

app.listen(1111);