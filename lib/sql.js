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

//getUser function
exports.getUser = function(username, cb){
	db.get('SELECT * FROM users where username=?', [username], cb);
}

exports.doesUserExist = function(username, cb){
	db.get('SELECT EXISTS (SELECT 1 FROM users WHERE username=?)', [username], cb);
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
exports.addChirp = function(data, uid, date, username, name, cb){
	db.run('INSERT INTO chirps VALUES(NULL,?,?,?,?,?)',[data, uid, date, username, name],function(err){
		if(err) {
			console.log("SQLite error!");		
		}
	});
}

exports.getNumChirps = function(userid, cb){
	db.get('SELECT COUNT(uid) AS count FROM chirps WHERE uid=?', [userid], cb);
}

// Chirp table function
// Returns the chirp table to the calling function to be searched.
// **Parameters**
// &nbsp;&nbsp; **fids** An array of uids of users that the person is following.
// &nbsp;&nbsp; **uid** The uid of the user himself.
// &nbsp;&nbsp; **cb** Callback function.
// **Returns**


exports.homeChirps = function(dbInput, cb){
	db.all(dbInput, cb);
}

/*
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
*/

exports.discoveryChirps = function(cb){
	db.all('SELECT * FROM chirps ORDER BY timestamp DESC LIMIT 5', cb);
}

exports.meChirps = function(userid, cb){
	db.all('SELECT * FROM chirps WHERE uid=? ORDER BY timestamp DESC', [userid], cb);
}


// #Follow database functions

exports.getFollowing = function(userid, cb){
	db.all('SELECT fid FROM follow WHERE uid=?', [userid], cb);
}



// isFollowing function
// Given two userids, see if the first is following the second.

exports.isFollowing = function(uid, fid, cb){
	db.get('SELECT EXISTS (SELECT 1 FROM follow WHERE uid=? AND fid=?)', [uid, fid], cb);
}

/*
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
*/
						
		
// ## followdbUpdate
//Updates the follower database, deleting or adding a relationship.

// This function is called when a user chooses the "follow" option.
// If the user is already following the person, they will stop following them.
// If the user is not following the person, they will start following them.

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**uid** *var* ID of Interacting User  
// &nbsp;&nbsp;**fid** *var* ID of User being interacted with  
// **Returns**  
// &nbsp;&nbsp;*void* Adds follower to the *followdb* virtual database
//    </div>

exports.followdbUpdate = function(uid,fid){
	if(db.all('SELECT EXISTS (SELECT 1 FROM follow WHERE uid=? AND fid=?', [uid,fid])){
		console.log('FollowDB entry exists, removing...');
		db.run('DELETE FROM follow WHERE uid=? AND fid=?', [uid,fid]);
	}
	else{
		console.log('FollowDB entry does not exist, adding...');
		db.run('INSERT INTO follow VALUES (?,?)', [uid,fid]);
	}
}			

exports.addFollow = function(uid, fid, cb){
	db.run('INSERT INTO follow VALUES (?,?)', [uid,fid], cb);
}

exports.delFollow = function(uid, fid, cb){
	db.run('DELETE FROM follow WHERE uid=? AND fid=?', [uid,fid], cb);
}

// ##numfollowing
//Number of users subject is following

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// **Returns**  
// &nbsp;&nbsp;*integer* Number of users **username** is following
//    </div>

exports.getNumFollowing = function(userid, cb){
	db.get('SELECT COUNT(uid) AS count FROM follow WHERE uid=?', [userid], cb);
}

exports.getNumFollowers = function(userid, cb){
	db.get('SELECT COUNT(uid) AS count FROM follow WHERE fid=?', [userid], cb);
}

// #Users

// ## login
exports.login = function(username, password, cb){
	db.all('SELECT * FROM users WHERE username=?', [username], function(err, users){
		if(users.length == 0){
			cb('User not found!', undefined);
		}
		else{
			db.all('SELECT * FROM users WHERE username=? AND password=?', [username, password], function(err, users){
				if(users.length == 0){
					cb('Password is incorrect.', undefined);
				}
				else{
					console.log(users[0]);
					cb(undefined, users[0]);
				}
			});
		}
	});
}