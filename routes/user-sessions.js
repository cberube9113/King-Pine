var userlib = require('../lib/user');

//Logged in Database
var online = {};

//##Authentication Function

exports.auth = function(req,res){
	var user = req.session.user;
	
// Check if user is already logged in.

if(user !== undefined && online[user.uid] !== undefined) {  //If the user is logged in and exists in the logged-in database...

	res.redirect('/main'); //Redirect them to the main page, they are logged in!
	
	}
	
	else{ //Get the username and password from form.

		var username = req.body.username;
		var password = req.body.password;
		
		//Perform a lookup.
		userlib.login(username,password,function(error,user) {

			if(error){ //If the login fails, flash a message and go back to login screen.
				req.flash('auth',error);
				res.redirect('/');
			}
			
			else{ //If the login succeeds, redirect to main and set the user to logged in.

				req.session.user = user;
				online[user.uid] = user;
				req.flash('auth',user.name + ' was successfully logged in');

				res.redirect('/home');
				}
		})
	}
}

//## Logout Function

exports.logout = function(req,res){
	//Check if user is actually logged in  This *should* always be true.
	var user = req.session.user;
	if(user !== undefined && online[user.uid] !== undefined) { //The user is logged in
		online = {}; //Delete the user from the online datbase.
		req.session.user = undefined; // Set the session to be undefined, all checks read this as nobody logged in.
		req.flash('authsucc','Successfully logged out.  Log in to continue.');
		res.redirect('/');
	}
	
	else{
		res.send('How the hell did you get here?');
	}	

}