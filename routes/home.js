var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');
var sql = require('../lib/sql.js');
var follow = require('../lib/follow.js');

// ##list
//Renders home page

exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
	  var subject = req.session.user;
	  var username = subject.username;
		var userdata = user.info(username);
		var fids = sql.isFollowing(username);
		var homeChirps = sql.homeChirps(fids, username);
		
	   	res.render('home', { title: 'Chirper',
    						 name: userdata.name,
    						 email: userdata.email,
    						 chirps: homeChirps,
    						 user: req.session.user.name,
                             userid: req.session.user.id,
                             username: userdata.username,
    						 message: req.flash('auth')
    	   });
    }
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	res.redirect('/');
    }
};