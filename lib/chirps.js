var user = require('../lib/user.js');

// #Add Chirp Function

//Function to add a new chirp to database.


function newChirp(data,date){
	var chirp = {
		id: chirpDB.length,
		data: data,
		timestamp: date
	}
	return chirp;
}

exports.addChirp = function(data,date){
	chirpDB.push(newChirp(data,date));
}


// #Chirps Stub Database 

//Stub database for chirps until real database is implemented

//    <div class="highlight">
//    *chirpDB*
//    > + **id**
//    > : Integer value simulating auto-incrementing ID
//    > + **data**
//    > : Text value of chirp
//    > + **uid**
//    > : ID of user which made this chirp
//    </div>
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

// ##info
//Returns array of Chirps made by specific user

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// **Returns**  
// &nbsp;&nbsp;*array* Array of chirps
//    </div>

exports.info = function(username){
	var id = user.idlookup(username);
	var userchirps = [];
	for(var i = 0; i < chirpDB.length; i++){
		if(id == chirpDB[i].uid){
			userchirps.push(chirpDB[i]);
		}
	}
	return userchirps;
}

// ##numchirps
//Returns the number of chirps for a specific user

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// **Returns**  
// &nbsp;&nbsp;*integer* Number of chirps
//    </div>	

exports.numchirps = function(username){
	var id = user.idlookup(username);
	var c = 0;
	for(var i = 0; i < chirpDB.length; i++){
		if(id == chirpDB[i].uid){
			c++;
		}
	}
	return c;
}

// ##discover
//Returns the five most recent chirps for the Discover page

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**req** Page request  
// &nbsp;&nbsp;**req** Page response   
// **Returns**  
// &nbsp;&nbsp;*array* Five most recent chirps
//    </div>	

exports.discover = function(req,res){
	var dbLength = chirpDB.length;
	var discoveryChirps = [];
	for(var i = 1; i < 6; i++){
			discoveryChirps.push(chirpDB[dbLength-i]);
	}
	return discoveryChirps;
}

