sqlite3 = require('sqlite3');

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

// Get a user from **users** table  
// <div class="highlight">  
// **Parameters**  
// &nbsp;&nbsp; **username** Username of the user you want  
// &nbsp;&nbsp; **cb** Callback. First parameter is the error, second is an object for the user.
// **Returns**  
// &nbsp;&nbsp; No return  
exports.getUser = function(username, cb){
	db.get('SELECT * FROM users where username=?', [username], cb);
}


// Determine whether a user exists in the database
// <div class="highlight">  
// **Parameters**  
// &nbsp;&nbsp; **username** Username of the user you want  
// &nbsp;&nbsp; **cb** Callback. First parameter is the error, second is an object whose 'count' property is either 0 or 1.
// **Returns**  
// &nbsp;&nbsp; No return  
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
// <div class="highlight">
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

// Retrieve the number of chirps a user has made
// <div class="highlight">
// **Parameters**
// &nbsp;&nbsp; **userid** The userid of the user whose count you want
// &nbsp;&nbsp; **cb** Callback function. First parameter is the error, second is an object whose 'count' property is the count.  
// **Returns**
// &nbsp;&nbsp; No return.
exports.getNumChirps = function(userid, cb){
	db.get('SELECT COUNT(uid) AS count FROM chirps WHERE uid=?', [userid], cb);
}

// Pull chirps to populate the home page  
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **dbInput** String created dynamically in home route  
// &nbsp;&nbsp; **cb** Callback function. First input is the error, second is an array of chirp objects  
// **Returns**  
// &nbsp;&nbsp; No return.  
exports.homeChirps = function(dbInput, cb){
	db.all(dbInput, cb);
}

// Pull chirps to populate the discovery page  
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **cb** Callback function. First input is the error, second is an array of chirp objects  
// **Returns**  
// &nbsp;&nbsp; No return.
exports.discoveryChirps = function(cb){
	db.all('SELECT * FROM chirps ORDER BY timestamp DESC LIMIT 5', cb);
}

// Pull chirps to populate the me page  
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **userid** userid of the user whose chirps you want  
// &nbsp;&nbsp; **cb** Callback function. First input is the error, second is an array of chirp objects  
// **Returns**  
// &nbsp;&nbsp; No return. 
exports.meChirps = function(userid, cb){
	db.all('SELECT * FROM chirps WHERE uid=? ORDER BY timestamp DESC', [userid], cb);
}


// #Follow database functions

// Get an array of the users you are following  
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **userid** userid of the user whose chirps you want  
// &nbsp;&nbsp; **cb** Callback function. First input is the error, second is an array of objects for each user the original user is following. Each contains an 'fid' property.  
// **Returns**  
// &nbsp;&nbsp; No return. 
exports.getFollowing = function(userid, cb){
	db.all('SELECT fid FROM follow WHERE uid=?', [userid], cb);
}

// Is uid following fid?  
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **uid** userid of the user doing the following  
// &nbsp;&nbsp; **fid** userid of the user being followed  
// &nbsp;&nbsp; **cb** Callback function. First input is the error, second an object whose 'count' property is either 0 or 1  
// **Returns**  
// &nbsp;&nbsp; No return. 
exports.isFollowing = function(uid, fid, cb){
	db.get('SELECT EXISTS (SELECT 1 FROM follow WHERE uid=? AND fid=?)', [uid, fid], cb);
}

// Add an entry to allow uid to follow fid
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **uid** userid of the user doing the following  
// &nbsp;&nbsp; **fid** userid of the user being followed  
// &nbsp;&nbsp; **cb** Callback function.  
// **Returns**  
// &nbsp;&nbsp; No return. 
exports.addFollow = function(uid, fid, cb){
	db.run('INSERT INTO follow VALUES (?,?)', [uid,fid], cb);
}

// Delete an entry in the follow database
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **uid** userid of the user doing the following  
// &nbsp;&nbsp; **fid** userid of the user being followed  
// &nbsp;&nbsp; **cb** Callback function.  
// **Returns**  
// &nbsp;&nbsp; No return. 
exports.delFollow = function(uid, fid, cb){
	db.run('DELETE FROM follow WHERE uid=? AND fid=?', [uid,fid], cb);
}

// Number of users subject is following
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **uid** userid of the user you want the info about  
// &nbsp;&nbsp; **cb** Callback function. First argument is the error, second is an object whose 'count' property is either 0 or 1   
// **Returns**  
// &nbsp;&nbsp; No return. 
exports.getNumFollowing = function(userid, cb){
	db.get('SELECT COUNT(uid) AS count FROM follow WHERE uid=?', [userid], cb);
}

// Number of followers the user has
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **uid** userid of the user you want the info about  
// &nbsp;&nbsp; **cb** Callback function. First argument is the error, second is an object whose 'count' property is either 0 or 1   
// **Returns**  
// &nbsp;&nbsp; No return. 
exports.getNumFollowers = function(userid, cb){
	db.get('SELECT COUNT(uid) AS count FROM follow WHERE fid=?', [userid], cb);
}

exports.getFolloweesForUser = function(userid, cb) {
	db.all('SELECT name, username FROM users inner join follow on follow.fid = users.uid WHERE follow.uid = ?', [userid], cb);
}

exports.getFollowersForUser = function(userid, cb) {
	db.all('SELECT name, username FROM users inner join follow on follow.uid = users.uid WHERE follow.fid = ?', [userid], cb);
}

// #Users

// ## login
// Check the user database for correct login credentials  
// <div class="highlight">
// **Parameters**  
// &nbsp;&nbsp; **username** Username in the login form  
// &nbsp;&nbsp; **password** Password in the login form  
// &nbsp;&nbsp; **cb** Callback function. First argument is the error, second is a message to flash if the credentials are wrong, third is the userobject if the credentials are correct  
// **Returns**  
// &nbsp;&nbsp; No return. 
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