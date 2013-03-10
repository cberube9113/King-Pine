// # User Library

//Stub database
var userdb = [
	{name: 'Steven Tenaglia',
	 school: 'UMass Amherst',
	 username: 'stenaglia',
     password: '123'},
    {name: 'Rob Sims',
     school: 'UMass Amherst',
     username: 'rsims',
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

// ##Return all information about a user

exports.info = function(req,res){
	var c = undefined;
	c = userdb[0];
	return c;
	}