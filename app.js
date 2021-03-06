//# app.js

//## Main server file

//### Module and route dependencies.

var express = require('express') 
  , index = require('./routes/index')
  , home = require('./routes/home')
  , connect = require('./routes/connect')
  , discover = require('./routes/discover')
  , login = require('./routes/login')
  , me = require('./routes/me')
  , signup = require('./routes/signup')
  , auth = require('./routes/user-sessions')
  , search = require('./routes/search')
  , follow = require('./routes/follow')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , sql = require('./lib/sql.js')

var app = express();


//### Configuration for app.js
  app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//### GET Commands

//#### Basic GET commands to run the specified route when it is entered in the URL.
app.get('/', index.index);
app.get('/home', home.list);
app.get('/connect', connect.list);
app.get('/discover', discover.list);
app.get('/login', index.index);
app.get('/signup', index.index);
app.get('/me', me.list);

//#### GET commands for the documentation and functional spec, redirects to the files themselves.
app.get('/docs', function(req, res){
  res.redirect('docs/index.js.html');
});

app.get('/spec', function(req,res){
	res.redirect('docs/funcspec.pdf');
});

//### POST Commands

//#### Runs when a user tries to authenticate, redirects to user-sessions and checks for login permission.
app.post('/auth', auth.auth);

//#### Runs when a user tries to logout, redirects to user-sessions and runs logout command.
app.get('/logout', auth.logout);

//#### Runs when a new user is created (on the index page).
app.post('/new-user',function(req,res){
//Parameters set based on the fields in the form.
	var name= req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	
	//Checks if all the fields were filled in when the user tries to submit.
	if (name.length > 0 && username.length > 0 && email.length > 0 && password.length > 0) {
	//If they were, adds the user to the database and informs them that they were created.
	  req.flash('authsucc','User ' + name + ' was successfully created. You can now log in as ' + username); 
	  sql.addUser(name,email,username,password);
	} else {
	//Otherwise fails the creation and informs the user to fill in all the fields.
	  req.flash('auth', 'Please make sure you have filled out all fields of the Join form'); 
	}
	res.redirect('/');
});


//#### Runs when a user enters a search in the search box
app.get('/search/:query', sql.autocomplete);

//#### Redirects user to functional spec.
app.get('/spec', function(req,res){
	res.redirect('docs/funcspec.pdf');
});

//### Individual User Pages

//#### Individual page, like Me page, for each user.
// *This request must be below all other one-directory routes.*
app.get('/:user', search.list);

app.get('/follow/:user', follow.list);

// ### Logic to render the 404 page if anything unexpected is visited.  
// THIS MUST BE THE VERY LAST CODE BEFORE THE SERVER IS STARTED  
 
app.use(function(req, res, next){
  res.render('404', { title: '404'
  					});
});


//Create server.
var server = http.createServer(app);

//WebSockets/Socket.IO
var io = require('socket.io', {'log level': 0}).listen(server);
var chirpApp = require('./routes/chirp-socket');

io.sockets.on('connection', function(socket){
	chirpApp.init(socket, io);
});
	

//### Starts server listening on specified port (set in configuration).
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});