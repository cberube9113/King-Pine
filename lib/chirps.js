var lookup = require('../lib/idlookup.js');

// # Chirps Library 

//Stub database
var chirpDB = [
	{id: 0,
	 data: "Just chirpin along...",
	 uid: 0,
	timestamp: '2013-03-10_03:14:53'},
	{id: 1,
	 data: "Having fun programming Chirper!",
	 uid: 1,
	timestamp: '2013-03-10_04:19:20'},
	{id: 2,
	 data: "Chirpin' all day long.",
	 uid: 2,
	timestamp: '2013-03-10_04:19:21'},
	{id: 3,
	 data: "Cherpa-doodle-doo!",
	 uid: 3,
	timestamp: '2013-03-10_04:19:22'},
	{id: 4,
	 data: "I'm glad this program isn't called anything else.",
	 uid: 3,
	timestamp: '2013-03-10_04:19:23'},
	{id: 5,
	 data: "Because I'd hate my team if it was.",
	 uid: 3,
	timestamp: '2013-03-10_04:19:24'}
];


//Returns array of Chirps made by specific user.
exports.info = function(username){
	var id = lookup.idlookup(username);
	var userchirps = [];
	for(var i = 0; i < chirpDB.length; i++){
		if(id == chirpDB[i].uid){
			userchirps.push(chirpDB[i]);
		}
	}
	return userchirps;
}
	
//Returns the number of chirps for a specific user
exports.numchirps = function(username){
	var id = lookup.idlookup(username);
	var c = 0;
	for(var i = 0; i < chirpDB.length; i++){
		if(id == chirpDB[i].uid){
			c++;
		}
	}
	return c;
}

/*
*  Returns the five most recent chirps for the Discover page.
*/
exports.discover = function(req,res){
	var dbLength = chirpDB.length;
	var discoveryChirps = [];
	for(var i = 1; i < 6; i++){
			discoveryChirps.push(chirpDB[dbLength-i]);
	}
	return discoveryChirps;
}

