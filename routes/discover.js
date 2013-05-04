var chirps = require('../lib/chirps.js');
var sql = require('../lib/sql.js');
var user = require('../lib/user.js');


// ##list
//Renders discover page

exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
		//var discoveryChirps = chirps.discoveryChirps();
		var locals = {};
		locals.title = 'Discover';
		locals.user = req.session.user.name;

		sql.discoveryChirps(function(err, chirps){
			locals.discoveryChirps = chirps;
			res.render('discover', locals);
		});
	}
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	req.flash('auth', 'You need to be logged in to do that!');
    	res.redirect('/');
    }
};