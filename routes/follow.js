var sql = require('../lib/sql.js');
var async = require('async');

exports.list = function(req,res){
	var u = req.params.user;
	var session = req.session.user;
	var uid = session.uid;
	var fid;
	var isfollowing;

	async.series([
		// Set fid
		function(callback){
			sql.getUser(u, function(err, user){
				console.log(user);
				fid = user.uid;
				callback();
			})
		},

		// See if uid is following fid
		function(callback){
			console.log('Got 1');
			sql.isFollowing(uid, fid, function(err, resultBoolean){
				console.log('got 2');
				isfollowing = resultBoolean['EXISTS (SELECT 1 FROM follow WHERE uid=? AND fid=?)'];
				console.log(isfollowing);
				callback();
			})
		},

		// Update the database
		function(callback){
			if(isfollowing == 0){
				sql.addFollow(uid, fid, function(err){
					console.log('Ran addFollow!');
					if(err){
						console.log('SQLite error in addFollow!');
					}
					callback();
				})
			}
			else{
				sql.delFollow(uid, fid, function(err){
					console.log('Ran delFollow!');
					if(err){
						console.log('SQLite error in addFollow!');
					}
					callback();
				})
			}
		}

		],

		function(err){ // Callback function after all serial calls have completed.
			if(err){
				console.log('ERROR!');
			}
			else{
				res.redirect('/'+u);
			}
		}
		);
}