
/**
 * Module dependencies.
 */

var express = require('express') 
  , routes = require('./routes')
  , user = require('./routes/user')
  , home = require('./routes/home')
  , connect = require('./routes/connect')
  , discover = require('./routes/discover')
  , login = require('./routes/login')
  , me = require('./routes/me')
  , registration = require('./routes/registration')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.set('views', /King-Pine/ + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/home', home.list);
app.get('/connect', connect.list);
app.get('/discover', discover.list);
app.get('/login', login.list);
app.get('/registration', registration.list);
app.get('/me', me.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
