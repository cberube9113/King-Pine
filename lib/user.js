var lookup = require('../lib/idlookup.js');

// #Add User Function

//Function to add a new user to database.
//May be implemented in the future with real database.


function newUser(n,e,p,u){
	var user = {
		id: userdb.length,
		name: n,
		email: e,
		password: p,
		username: u
	}
	return user;
}

exports.addUser = function(n,e,p,u){
	userdb.push(newUser(n,e,p,u));
}

// #User Stub Database 

//Stub database for users until real database is implemented

//    <div class="highlight">
//    *iddb*
//    > + **id**
//    > : Integer value simulating auto-incrementing ID
//    > + **name**
//    > : Name of User
//    > + **email**
//    > : Email address of user
//    > + **username**
//    > : Username of user with ID **id**
//    > + **password**
//    > : Password for user with ID **id**
//    </div>

var userdb = [
	{id: 0,
	 name: 'Steven Tenaglia',
	 email: 'stenten@gmail.com',
	 username: 'stenaglia',
     password: '123'},
    {id: 1,
     name: 'Rob Sims',
     email: 'rsims2013@gmail.com',
     username: 'rsims',
     password: '123'},
    {id: 2,
     name: 'Chris Berube',
     email: 'cberube9113@gmail.com',
     username: 'cberube',
     password: '123'},
    {id: 3, 
     name: 'Katy Boggs',
     email: 'boggs.katy@gmail.com',
     username: 'kboggs',
     password: '123'}
];

// ##login
//Login function  

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// &nbsp;&nbsp;**password** *string* Password of user  
// **Returns**  
// &nbsp;&nbsp;*string* 'Y' or 'N' denoting if login was successful
//    </div>

exports.idlookup = function(username){
	var id = -1;
	for(var i = 0; i < userdb.length; i++){
		if(userdb[i].username === username){
			id = i;
			break;
		}
	}
	
	return id;
}
	
	
	
	
exports.login = function(username, password, cb){
	var len = userdb.length;
	for (var i = 0; i < len; i++){
		var u = userdb[i];
		if (u.username === username){
			if(u.password === password){
				cb(undefined, u);
			}
			else{
				cb('Password is incorrect.');
			}
			return;
		}
	}
	cb('User not found!');
};

// ##info
//Return all information about a user based on the queried username

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user   
// **Returns**  
// &nbsp;&nbsp;*User* User object
//    </div>

exports.info = function(username){
	var c = undefined;
	var id = lookup.idlookup(username);
	c = userdb[id];
	return c;
	}