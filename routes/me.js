var follow = require('../lib/follow.js');
var chirps = require('../lib/chirps.js');
var sql = require('../lib/sql.js');

// ##list
//Renders me page

exports.list = function(req,res) {
    var session = req.session.user;
	if(session != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
		var locals = {};
        locals.title = 'Me';
        locals.user = session.name;
        locals.username = session.username;

        




        var subject = req.session.user;
		var following = follow.numfollowing(subject.username);
		var followers = follow.numfollowers(subject.username);
		var nchirps = chirps.numchirps(subject.username);
		var chirpdata = chirps.info(subject.username);
   		res.render('me', { title: 'Me',
    				   following: following,
    				   followers: followers,
    				   nchirps: nchirps,
    				   chirpdata: chirpdata,
    				   user: req.session.user.name,
                       username: req.session.user.username
                    });
    }
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	req.flash('auth', 'You need to be logged in to do that!');
    	res.redirect('/');
    }
};