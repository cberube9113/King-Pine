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
exports.addUser = function(uid, name, email, username, password)
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

// Autocomplete function
// To be used with our AJAX functionality for user search
// **Parameters**
// &nbsp;&nbsp; **req and res** Standard reqest/response parameters.
// **Returns**
// &nbsp;&nbsp; **res.send(names)**  Sends the array made in the function.

exports.autocomplete = function (req, res) {
  var query = req.params.query.toLowerCase();
  var users = [];
  var names = [];
  var tableLength;
  tableLength = db.run('SELECT COUNT(uid) FROM users');
  console.log(tableLength);
  

  for (var i = 0; i < tableLength; i++) {
  	var name = db.run('SELECT name FROM users WHERE uid='+i);
  	if(name.toLowerCase().indexOf(query) != -1) {
  		names.push(name);
  		names.push(db.run('SELECT username FROM users WHERE name='+name));
  	}
  }

  res.send(names);

};

exports.addChirp = function(data, uid, date, cb)
{
	db.run('INSERT INTO chirps VALUES(NULL,?,?,?)',[data, uid, date],function(err){
		if(err) {
			console.log("SQLite error!");		
		}
	}
		);
}