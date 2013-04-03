
/**
 * Module dependencies.
 */

var express = require('express') 
  , routes = require('./routes')
  , home = require('./routes/home')
  , connect = require('./routes/connect')
  , discover = require('./routes/discover')
  , login = require('./routes/login')
  , me = require('./routes/me')
  , signup = require('./routes/signup')
  , auth = require('./routes/user-sessions')
  , results = require('./routes/searchresults')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , user = require('./lib/user')
  , chirps = require('./lib/chirps')
  , follow = require('./lib/follow');

var app = express();

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

app.get('/', routes.index);
app.get('/home', home.list);
app.get('/connect', connect.list);
app.get('/discover', discover.list);
app.get('/login', login.list);
app.get('/signup', signup.list);
app.get('/me', me.list);
app.get('/searchresults', results.list);

app.post('/auth', auth.auth);

app.post('/new-user',function(req,res){
	var name= req.body.name;
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	user.addUser(name,email,password,username);
	res.redirect('/');
});

app.post('/new-chirp',function(req,res){
	var username = req.session.user.username;
	var uid = user.idlookup(username);
	var data=req.body.chirp;
	var date="Just now."
	chirps.addChirp(data,date,uid);
	res.redirect('/home');
});



app.post('/search',function(req,res){
	var user = req.body.search;
	res.redirect('/'+user)
});	

app.get('/docs', function(req, res){
  res.redirect('docs/index.js.html');
});

// Specific Me page for each username. Result of username searches.
// !! Place this request at the end of the GET/POST requests list !!
app.get('/:user', function (req,res) {
	var u = req.params.user;
	var following = follow.numfollowing(u);
	var followers = follow.numfollowers(u);
	var nchirps = chirps.numchirps(u);
	var chirpdata = chirps.info(u);
	var isfollowing = follow.isFollowing(req.session.user.username,u);
   res.render('searchresults', { title: 'Search Results',
    				   following: following,
    				   followers: followers,
    				   nchirps: nchirps,
    				   chirpdata: chirpdata,
    				   user: user.info(u).name,
    				   isfollowing: isfollowing});
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
