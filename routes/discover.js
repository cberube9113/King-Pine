var sql = require('../lib/sql.js');


// ##list
//Renders discover page

exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
		var locals = {}; // To be fed into the view  
		locals.title = 'Discover';
		locals.user = req.session.user.name;

		sql.discoveryChirps(function(err, chirps){ // 'chirps' is an array of appropriate chirp objects  
			locals.discoveryChirps = chirps;
			res.render('discover', locals);
		});
	}
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	req.flash('auth', 'You need to be logged in to do that!');
    	res.redirect('/');
    }
};