var chirps = require('../lib/chirps.js');
var sql = require('../lib/sql.js');

// ##list
//Renders discover page

exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
		//var discoveryChirps = chirps.discoveryChirps();
		
		sql.homeChirps(function(err,chirpDB){

			if(err){
		  		 console.log('SQLite error!');
			}
	
	   	else {
	   		var discoveryChirps = chirps.discoveryChirps(chirpDB);	
		
  	  			res.render('discover', { title: 'Discover'
    							, discoveryChirps: discoveryChirps
    							, user: req.session.user.name  });
    		}
		});

	}
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	req.flash('auth', 'You need to be logged in to do that!');
    	res.redirect('/');
    }
};