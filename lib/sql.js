sqlite3 = require('sqlite3');

//Connect to the database which has already been created.
var db = new sqlite3.Database('./data/chirper.db');

// # User Database Functions
//Add user to the **users** table
// <div class="highlight">
// **Parameters**
// &nbsp;&nbsp; **uid** User's uid, based simply on sign up order.
// &nbsp;&nbsp; **name** User's full name
// &nbsp;&nbsp; **email** User's email address
// &nbsp;&nbsp; **username** User's username
// &nbsp;&nbsp; **password** User's password
// **Returns**
// &nbsp;&nbsp; No return, but the table in the database is updated.
exports.addUser = function(uid, name, email, username, password)
{
	db.run('INSERT INTO users VALUES ("'+uid+'", "'+name+'", "'+email+'", "'+username+'", "'+password+'")');
}

//Delete user from **users** table
// <div class="highlight">
// **Parameters**
// &nbsp;&nbsp; **uid** User's uid.
// **Returns**
// &nbsp;&nbsp; No return, the user is deleted from the database.

exports.delUser = function(uid)
{
	db.run('DELETE FROM users WHERE uid='+uid);
}