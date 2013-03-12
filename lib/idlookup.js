// #ID-Username Stub Database 

//Stub database connecting usernames to IDs before real database is implemented  
//Helps with username lookups

//    <div class="highlight">
//    *iddb*
//    > + **id**
//    > : Integer value simulating auto-incrementing ID
//    > + **uname**
//    > : Username of user with ID **id**
//    </div>

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

// ##idlookup
//Look up a user's ID

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// **Returns**  
// &nbsp;&nbsp;*integer* ID of user specified by **username**
//    </div>

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