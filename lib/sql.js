sqlite3 = require('sqlite3');
var user = require('../lib/user.js');
var follow = require('../lib/follow.js');

//Connect to the database which has already been created.
var db = new sqlite3.Database('./data/326.sqlite.db');

// # User Database Functions
//Add user to the **users** table
// <div class="highlight">
// **Parameters**
// &nbsp;&nbsp; **uid** User's uid.  By setting this to NULL, the uid will be set to the next available uid.
// &nbsp;&nbsp; **name** User's full name
// &nbsp;&nbsp; **email** User's email address
// &nbsp;&nbsp; **username** User's username
// &nbsp;&nbsp; **password** User's password
// **Returns**
// &nbsp;&nbsp; No return, but the table in the database is updated.
exports.addUser = function(name, email, username, password)
{
	db.run('INSERT INTO users VALUES (NULL,?,?,?,?)',[name, email, username, password]);
}

//Delete user from **users** table
// This is not currently implemented, but may be in the future.
// <div class="highlight">
// **Parameters**
// &nbsp;&nbsp; **uid** User's uid.
// **Returns**
// &nbsp;&nbsp; No return, the user is deleted from the database.

exports.delUser = function(uid)
{
	db.run('DELETE FROM users WHERE uid=?', [uid]);
}

//Info function
//Useless, should be deleted, keep until we understand callbacks.
exports.info = function(cb){
	db.all('SELECT * FROM users', cb);
}

// Autocomplete function
// To be used with our AJAX functionality for user search
// **Parameters**
// &nbsp;&nbsp; **req and res** Standard reqest/response parameters.
// &nbsp;&nbsp; **cb** Callback function.
// **Returns**
// &nbsp;&nbsp; **res.send(names)**  Sends the array made in the function.

exports.autocomplete = function (req, res, cb) {
// Set the global variables.
  var query = req.params.query.toLowerCase();
  var names = [];
  var tableLength;
  var curname;
  var curusername;

  //Set tableLength to be the number of users registered.
	db.all('SELECT COUNT(uid) AS count FROM users', function(err, tl){
  		if(err){
  			cb(err);
  		}
  		else{
  			tableLength = tl[0].count;
  			
  		}
  		// Pull all usernames and names from the table, then do the comparison on each row.
  			db.all('SELECT name,username FROM users', function(err, user){
  				if(err){
  					cb(err);
  				}
  				else{
  					for(var i = 0; i < tableLength; i++){ //For each element in the table, set the two variables
  						curname = user[i].name;
  						curusername = user[i].username;

  						if(curname.toLowerCase().indexOf(query) != -1) { //If we have a match, push that match to the global array names.
  							names.push(curname);
  							names.push(curusername);
  						}
  					}
  				res.send(names);
  				
  			} 
  		});
  });
}	


// #Chirp database functions

// Add chirp function
// Takes in the data of a chirp and adds it to the chirp table.
// **Parameters**
// &nbsp;&nbsp; **data** The content of the chirp.
// &nbsp;&nbsp; **uid** the User ID of the user who made the chirp.
// &nbsp;&nbsp; **date** The timestamp of the chirp.
// &nbsp;&nbsp; **cb** Callback function.
// **Returns**
// &nbsp;&nbsp; No return, inserts chirp into database.
exports.addChirp = function(data, uid, date, cb){
	db.run('INSERT INTO chirps VALUES(NULL,?,?,?)',[data, uid, date],function(err){
		if(err) {
			console.log("SQLite error!");		
		}
	});
}

// Chirp table function
// Returns the chirp table to the calling function to be searched.
// **Parameters**
// &nbsp;&nbsp; **fids** An array of uids of users that the person is following.
// &nbsp;&nbsp; **uid** The uid of the user himself.
// &nbsp;&nbsp; **cb** Callback function.
// **Returns**

exports.homeChirps = function(fids, uid, cb){
	var homeChirps = [];
	var recent = 0;
	var max = 5;
	
	db.all('SELECT * FROM chirps WHERE uid=ANY(?) OR uid=?', [fids, uid], function(err, specchirps){
		if(err){
			console.log("SQLite error!");
		}
		else{
			db.all('SELECT COUNT(uid) AS count FROM ?', [specchirps], function(err, tl){
				if(err){
					console.log("SQLite error!");
				}
				else{
					for(var i = tl[0].count; i >= 0; i--){
						if(recent == max){ //If recent is equal to max, we have the number of chirps we need.
							break; //Break out of the for loop early.
						}
						
						homeChirps.push(specchirps[i]);
					}
				}
			});
		}
	});
}


// #Follow database functions

// isFollowing function
// Given a specific user, gives a list of all users that user is following.

exports.isFollowing = function(req, res, username, cb){
var fids = [];
var flag = false;
	db.all('SELECT uid FROM users WHERE username=?', [username], function(err, uid){ //Find the UID of the selected username.
		if(err){
			console.log("SQLite error!")
		}
		else{
			db.all('SELECT COUNT(uid) AS count FROM follow WHERE uid=?', [uid], function(err, tl){ //Get the number of people the user is following.
				db.all('SELECT * FROM follow WHERE uid=?', [uid], function(err, follow){ //Get the table of all uid-fid matches on uid.
					for(var i = 0; i < tl.count; i++){
						fids.push(follow.fid);
					}
					flag = true;
				});
			});
		}
	});
	while(!flag){
	}
	return fids;
}
						
												
			
