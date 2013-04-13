var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');

// ##list
//Renders home page

exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
		var subject = req.session.user;
		var userdata = user.info(subject.username);
		var chirpdata = chirps.info(subject.username);
    	res.render('home', { title: 'Chirper',
    						 name: userdata.name,
    						 email: userdata.email,
    						 chirps: chirpdata,
    						 user: req.session.user.name,
    						 message: req.flash('auth')
    	});
    }
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	
    	res.redirect('/');
    }
};