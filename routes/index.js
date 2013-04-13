var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');

/*
 * GET home page.  Index of not logged in, Home if logged in.
 */

exports.index = function(req, res){
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
    	res.render('index', { title: 'Chirper', message: req.flash('auth'), messagesucc: req.flash('authsucc') });
    }
  
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.render('index', { title: 'Chirper' });
}