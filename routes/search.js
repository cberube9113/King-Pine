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
		// 
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

/*
	// See if the user exists
	sql.doesUserExist(req.params.user, function(err, resultBoolean){
		console.log(resultBoolean['EXISTS (SELECT 1 FROM users WHERE username=?)']);
	});

	if(userlib.exists(req.params.user) == 1){ //If the user exists in the database, load their page.
		//Sets parameters based on the username in the page URL.
			var u = req.params.user;
			var nameOfSearchedUser = userlib.nameFromUsername(req.params.user);
			var following = follow.numfollowing(u);
			var followers = follow.numfollowers(u);
			var nchirps = chirps.numchirps(u);
			var chirpdata = chirps.info(u);
			if(req.session.user != undefined){ //If there is a user logged in
			var name = req.session.user.name;
			var isfollowing = follow.isFollowing(req.session.user.username, u);
			}
			else{ //If there is not a user logged in
			var name = undefined;
			var isfollowing = undefined;
			}
		//Renders searchresults page, which is a copy of the Me page but with a modified subject.
		res.render('searchresults', { title: 'Search Results',
									   following: following,
									   followers: followers,
									   nchirps: nchirps,
									   chirpdata: chirpdata,
									   user: name,
									   isfollowing: isfollowing,
									   u: u,
									   nameOfSearchedUser: nameOfSearchedUser
									});
		}

	else{ //If the user does not exist, inform the searcher and give them an opportunity to create it.
		req.flash('auth','That user doesn\'t exist.  Would you like to create that user?');
		res.redirect('/');
		}
}
*/