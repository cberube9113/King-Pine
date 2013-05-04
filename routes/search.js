var sql = require('../lib/sql.js');
var async = require('async');


// ##list
//Renders search page

exports.list = function (req,res) {

	var searchedUsername = req.params.user;
	var locals = {};
	locals.title = 'Search Results';
	var session = req.session.user;
	locals.user = undefined; // Overwrite if we discover there is a session.
	
	var searchedUser; // User object of the searched for user


	async.series([
		// Does the searched for user exist?
		function(callback){
			sql.doesUserExist(searchedUsername, function(err, resultBoolean){
				if(resultBoolean['EXISTS (SELECT 1 FROM users WHERE username=?)'] == 0){
					req.flash('auth','That user doesn\'t exist.  Would you like to create that user?');
					res.redirect('/');
				}
				callback();
			});
		},

		// If we're here, the user is logged in.
		function(callback){
			sql.getUser(searchedUsername, function(err, user){
				locals.u = user.username;
				locals.nameOfSearchedUser = user.name;
				searchedUser = user;
				callback();
			});
		},

		// Check if the currently logged-in user is following the searched user
		function(callback){
			if(session != undefined){
				locals.user = session.name;

				sql.isFollowing(session.uid, searchedUser.uid, function(err, resultBoolean){
					locals.isfollowing = resultBoolean['EXISTS (SELECT 1 FROM follow WHERE uid=? AND fid=?)'];					
				});
			}
			callback();
		},

		// Get number of people the searched for user is following
		function(callback){
			sql.getNumFollowing(searchedUser.uid, function(err, countObject){
				locals.following = countObject.count;
				callback();
			})
		},

		// Get number of people following the searched user
		function(callback){
			sql.getNumFollowers(searchedUser.uid, function(err, countObject){
				locals.followers = countObject.count;
				callback();
			});
		},

		// Get number of chirps
		function(callback){
			sql.getNumChirps(searchedUser.uid, function(err, countObject){
				locals.nchirps = countObject.count;
				callback();
			})
		},

		// Get array of chirps
		function(callback){
			sql.meChirps(searchedUser.uid, function(err, arrayOfChirps){
				locals.chirpdata = arrayOfChirps;
				callback();
			})
		}
		],


		function(err){ // Callback function after all serial calls have completed.
                if(err){
                    console.log('ERROR!');
                }
                else{
                	res.render('searchresults', locals);
                }
		}
	);
}
