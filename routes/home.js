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
		var userdata = user.info(subject.username);
		sql.homeChirps(function(err,chirpDB){

		if(err){
		   console.log('SQLite error!');
		}
	
	   else {
         var homeChirps = [];
         var recent = 0; //This counter must remain at 0.
         var max = 5; //This counter can be modified if the site begins to have more frequent chirps made.
         var len = chirpDB.length-1;
         for(var i = len; i >= 0; i--){
         	if(recent == max){ //Easiest way to check without using a lot of logic to not have an infinite while loop.
         	   break;
         	}
            var cur = user.unlookup(chirpDB[i].uid);
            if(follow.isFollowing(username,cur) || username === cur){ //If the current chirp we're looking at was made by a user the logged in user is following, or the logged in user himself 
               var curChirp = { //Create a chirp with the data we'll need on the home page.
					   data: chirpDB[i].data,
					   username: user.unlookup(chirpDB[i].uid),
				   	name: user.nameFromUsername(user.unlookup(chirpDB[i].uid)),
					   timestamp: chirpDB[i].timestamp
				   }
			      homeChirps.push(curChirp); //Add the chirp to the return database.
			      recent++; //Increase the counter.
			   }
		   }
		
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
		
		
		
		});
	
    }
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	
    	res.redirect('/');
    }
};