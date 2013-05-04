var sql = require('../lib/sql.js');
var async = require('async');

exports.test = function(req,res){


/*
	console.log('.5');

	async.series([
		function(callback){
			console.log('1');
			callback();
		}


		, function(callback){
			console.log('2');
			callback();
		}


		], function(callback){
			console.log('3');
			res.send('4');
		}


		);


*/

var username = 'stenaglia';
var userid;
var count;
var following;
var dbInput;
console.log('got here 1');


async.series([
	function(callback){
            sql.getUser(username, function(err, user){ // Callback; 'user' is an object returned from the database.
            	console.log('got here 1.5');

            	userid = user.uid;
            	console.log(userid);
            	console.log('got here 2');
            	callback();

            })}

            , function(callback){
            	console.log('Calling getNumFollowing...')
            	sql.getNumFollowing(0, function(err, countObject){
            		console.log(countObject);
            		count = countObject.count;
            		console.log(count);
            		callback();
            	});}



            	, function(callback){
            		sql.getFollowing(userid, function(err, fArray){

            			console.log(fArray);

            			dbInput = 'SELECT * FROM chirps WHERE uid IN (' + userid + ',';
            			console.log(dbInput);

            			fArray.forEach(function(value){
            				dbInput = dbInput + value.fid + ',';
            			});

            			console.log(dbInput);

            			dbInput = dbInput.slice(0,-1); // Remove the last character, i.e. the comma
            			console.log(dbInput);

            			dbInput = dbInput + ') order by timestamp desc';

            			console.log(dbInput);

            			sql.homeChirps(dbInput, function(err, Chirps){
            				console.log(Chirps);
            				res.send(Chirps);
            			});


            			callback();

            	})}





            ], function(err){ // Callback function after all parallel calls have completed.
            	if(err){
            		console.log('ERROr!');
            	}           
            });



}