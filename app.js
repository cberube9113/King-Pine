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
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , user = require('./lib/user')
  , chirps = require('./lib/chirps')
  , follow = require('./lib/follow');

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
app.get('/login', login.list);
app.get('/signup', signup.list);
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
	  user.addUser(name,email,password,username);
	} else {
	//Otherwise fails the creation and informs the user to fill in all the fields.
	  req.flash('auth', 'Please make sure you have filled out all fields of the Join form'); 
	}
	res.redirect('/');
});

//#### Runs when a new chirp is made by a user (via the home page).
app.post('/new-chirp',function(req,res){

//Parameters set based on currently logged in user.
	var username = req.session.user.username;
	var uid = user.idlookup(username);
//Parameter set based on field in form.
	var data=req.body.chirp;
//Parameter to be set based on current date in future.
	var date="Just now."
//Runs the addChirp function from the *chirps* library file.
	chirps.addChirp(data,date,uid);
//Redirects a user back to home after the chirp has been made.
	res.redirect('/home');
});


//#### Runs when a user enters a search in the search box and presses *Enter*.
app.post('/search',function(req,res){
// Parameter set based on field in form.
	var user = req.body.search;
//Redirects user to user page of the value that was just set.
	res.redirect('/'+user)
});	

//#### Redirects user to functional spec.
app.get('/spec', function(req,res){
	res.redirect('docs/funcspec.pdf');
});

//### Individual User Pages

//#### Individual page, like Me page, for each user.
// *This request must be below all other one-directory routes.*
app.get('/:user', function (req,res) {

	if(user.exists(req.params.user) == 1){ //If the user exists in the database, load their page.
		//Sets parameters based on the username in the page URL.
			var u = req.params.user;
			var following = follow.numfollowing(u);
			var followers = follow.numfollowers(u);
			var nchirps = chirps.numchirps(u);
			var chirpdata = chirps.info(u);
			if(req.session.user != undefined){ //If there is a user logged in
			var name = req.session.user.name;
			var isfollowing = follow.isFollowing(req.session.user.username, u);
			}
			else{ //If there is not a user logged in
			var name = undefined;
			var isfollowing = undefined;
			}
		//Renders searchresults page, which is a copy of the Me page but with a modified subject.
		res.render('searchresults', { title: 'Search Results',
									   following: following,
									   followers: followers,
									   nchirps: nchirps,
									   chirpdata: chirpdata,
									   user: name,
									   isfollowing: isfollowing,
									   u: u});
		}

	else{ //If the user does not exist, inform the searcher and give them an opportunity to create it.
		req.flash('error','That user doesn\'t exist.  Would you like to create that user?');
		res.redirect('/signup');
		}
});

app.get('/follow/:user',function(req,res){
	var u = req.params.user;
	var uid = req.session.user.id;
	var fid = user.idlookup(u);
	follow.followdbUpdate(uid,fid);
	res.redirect('/'+u);
});

// ### Logic to render the 404 page if anything unexpected is visited.
 //*THIS MUST BE THE VERY LAST CODE BEFORE THE SERVER IS STARTED*
 
app.use(function(req, res, next){
  res.render('404', { title: '404'
  					});
});




//### Starts server listening on specified port (set in configuration).
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
