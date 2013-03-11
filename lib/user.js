var lookup = require('../lib/idlookup.js');

// # User Library

/*
* Users stub database
*/
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
     name: 'Katy Boggs',
     email: 'boggs.katy@gmail.com',
     username: 'kboggs',
     password: '123'}
];

// ##Login function - Currently unused.

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

// ##Return all information about a user, based on the searched for username.

exports.info = function(username){
	var c = undefined;
	var id = lookup.idlookup(username);
	c = userdb[id];
	return c;
	}