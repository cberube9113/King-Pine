// # Chirps Library 

//Stub database
var chirpdb = [
	{id: 1,
	 data: "Just chirpin along...",
	 uid: 0,
	timestamp: '2013-03-10_03:14:53'},
	{id: 2,
	 data: "Having fun programming Chirper!",
	 uid: 1,
	timestamp: '2013-03-10_04:19:20'},
];


//change function to return chirps by uid (not all chirps)
exports.info = function(userid){
	var id = lookup.idlookup(username);
	var userchirps = [];
	for(var i = 0; i < chirpdb.length; i++){
		if(id == chirpdb[i].uid){
			userchirps.push(chirpdb[i]);
		}
	}
	return userchirps;
}
	
//Returns the number of chirps for a specific user
exports.numchirps = function(userid){
	var c = 0;
	for(var i = 0; i < chirpdb.length; i++){
		if(userid == chirpdb[i].uid){
			c++;
		}
	}
	return c;
}
	
