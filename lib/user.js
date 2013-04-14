// ##newUser
//Function to add a new user to database.  
//May be implemented in the future with real database.
//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**n** User's name   
// &nbsp;&nbsp;**e** User's email    
// &nbsp;&nbsp;**p** User's password  
// &nbsp;&nbsp;**u** User's username    
// **Returns**  
// &nbsp;&nbsp;*Object* User object
//    </div>	

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

// ##addUser
//Export function to allow implementation of *newUser* function
//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**n** User's name   
// &nbsp;&nbsp;**e** User's email    
// &nbsp;&nbsp;**p** User's password  
// &nbsp;&nbsp;**u** User's username  
// **Returns**  
// &nbsp;&nbsp;*void* Adds User to the *userdb* virtual database
//    </div>	

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

exports.autocomplete = function (req, res) {
   var query = req.params.query;
   var names = [];

   for (var i = 0; i < userdb.length; i++) {
   	if(userdb[i].name.toLowerCase().indexOf(query) != -1) {
   		names.push(userdb[i].name);
   		names.push(userdb[i].username);
   	}
   }

   res.send(names);

};

// ##exits
//Checks that a user exists in the database.
//	<div class="highlight">
// **Params**
// &nbsp;&nbsp;**username** The username we're checking.
// **Returns**
// 0 if user does not exist, 1 if user exists.

exports.exists = function(username){
	var exists = 0;
	for(var i=0; i<userdb.length; i++){
		if(userdb[i].username === username){
			exists=1;
			break;
		}
	}
	return exists;
}

// ##idLookup
//Resolves uid value given username.  
//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** User's username    
// **Returns**  
// &nbsp;&nbsp;*integer* User's id (uid)
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
	
// ##login
//Login function  

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// &nbsp;&nbsp;**password** *string* Password of user  
// **Returns**  
// &nbsp;&nbsp;*string* 'Y' or 'N' denoting if login was successful
//    </div>
	
	
	
exports.login = function(username, password, cb){
	var len = userdb.length;
	for (var i = 0; i < len; i++){
		var u = userdb[i];
		if (u.username === username){
			if(u.password === password){
				cb(undefined, u);
			}
			else{
				cb('Password is incorrect.', undefined);
			}
			return;
		}
	}
	cb('User not found!', undefined);
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
	var id = this.idlookup(username);
	c = userdb[id];
	return c;
	}