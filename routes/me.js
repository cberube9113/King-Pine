var follow = require('../lib/follow.js');
var chirps = require('../lib/chirps.js');

// ##list
//Renders me page

exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
		var subject = req.session.user;
		var following = follow.numfollowing(subject);
		var followers = follow.numfollowers(subject);
		var nchirps = chirps.numchirps(subject.username);
		var chirpdata = chirps.info(subject.username);
   		res.render('me', { title: 'Me',
    				   following: following,
    				   followers: followers,
    				   nchirps: nchirps,
    				   chirpdata: chirpdata,
    				   user: req.session.user.name});
    }
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	req.flash('auth', 'You need to be logged in to do that!');
    	res.redirect('/');
    }
};
