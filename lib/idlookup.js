/*
**Relational database connecting usernames to IDs.  Made to improve username lookups.
*/

/*
* ID-Username stub database
*/

var iddb = [
	{id: 0,
	 uname: 'stenaglia'},
	{id: 1,
	 uname: 'rsims'},
	{id: 2,
	 uname: 'cberube'},
	{id: 3,
	 uname: 'kboggs'} 
];

/*
* ID lookup function.
*/

exports.idlookup = function(username){
	var c = -1;
	for(var i = 0; i < iddb.length; i++){
		if(iddb[i].uname == username){
			c = iddb[i].id;
			break;
		}
	}
	return c;
}