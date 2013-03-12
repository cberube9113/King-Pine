var lookup = require('../lib/idlookup.js');

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
//Currently unused

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// &nbsp;&nbsp;**password** *string* Password of user  
// **Returns**  
// &nbsp;&nbsp;*string* 'Y' or 'N' denoting if login was successful
//    </div>

exports.login = function(username, password){
	var len = userdb.length;
	for (var i = 0; i < len; i++){
		if (u.username === username){
			if(u.password === password){
				return('Y');
			}
			else{
				return('N');
			}
		}
	}
	return('Error');
}

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