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

//Info function
//Useless, should be deleted, keep until we understand callbacks.
exports.info = function(cb){
	db.all('SELECT * FROM users', cb);
}

// Autocomplete function
// To be used with our AJAX functionality for user search
// **Parameters**
// &nbsp;&nbsp; **req and res** Standard reqest/response parameters.
// **Returns**
// &nbsp;&nbsp; **res.send(names)**  Sends the array made in the function.

exports.autocomplete = function (req, res, cb) {
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
  					for(var i = 0; i < tableLength; i++){
  						curname = user[i].name;
  						curusername = user[i].username;

  						if(curname.toLowerCase().indexOf(query) != -1) {
  							names.push(curname);
  							names.push(curusername);
  						}
  					}
  					res.send(names);
  				
  				} 
  			});

  	});
}	


exports.addChirp = function(data, uid, date, cb)
{
	db.run('INSERT INTO chirps VALUES(NULL,?,?,?)',[data, uid, date],function(err){
		if(err) {
			console.log("SQLite error!");		
		}
	}
		);
}


exports.homeChirps = function(cb){
	db.all('select * from chirps', cb);
}