var user = require('../lib/user.js');
var follow = require('../lib/follow.js');

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
	timestamp: '2013-03-10_03:14:53',
	hashtag: ["chirper"]},
	{id: 1,
	 data: "Having fun programming Chirper!",
	 uid: 1,
	timestamp: '2013-03-10_04:19:20',
	hashtag: ["chirper"]},
	{id: 2,
	 data: "Chirpin' all day long.",
	 uid: 2,
	timestamp: '2013-03-10_04:19:21',
	hashtag: ["chirper"]},
	{id: 3,
	 data: "Cherpa-doodle-doo!",
	 uid: 3,
	timestamp: '2013-03-10_04:19:22',
	hashtag: []},
	{id: 4,
	 data: "I'm glad this program isn't called anything else.",
	 uid: 3,
	timestamp: '2013-03-10_04:19:23',
	hashtag: []},
	{id: 5,
	 data: "Because I'd hate my team if it was.",
	 uid: 3,
	timestamp: '2013-03-10_04:19:24',
	hashtag: ["chirper"]}
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

// ##homeChirps
// Returns array of the 5 most recent chirps made by users a user is following or the user himself.
// This is to be used on the Home page.

// <div class="highlight">
// **Params**
// &nbsp;&nbsp;**username** *string* Username of the logged in user.
// **Returns**
// &nbsp;&nbsp;**homeChirps** *array* Array of the most recent chirps, with a size set by hardcoded variable *max*

exports.homeChirps = function(username){
	var homeChirps = [];
	var recent = 0; //This counter must remain at 0.
	var max = 5; //This counter can be modified if the site begins to have more frequent chirps made.
	for(var i = 0; i < chirpDB.length; i++){
		if(recent == max){ //Easiest way to check without using a lot of logic to not have an infinite while loop.
			break;
		}
		var cur = user.unlookup(chirpDB[i].uid);
		if(follow.isFollowing(username,cur) || username === cur){ //If the current chirp we're looking at was made by a user the logged in user is following, or the logged in user himself 
			var curChirp = { //Create a chirp with the data we'll need on the home page.
					data: chirpDB[i].data,
					username: user.unlookup(chirpDB[i].uid),
					name: user.nameFromUsername(user.unlookup(chirpDB[i].uid)),
					date: chirpDB[i].date
				}
			homeChirps.push(curChirp); //Add the chirp to the return database.
			recent++; //Increase the counter.
		}
	}
	return homeChirps;
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
		if(id === chirpDB[i].uid){
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
// &nbsp;&nbsp;**res** Page response   
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

// ##newChirp
//Adds a new chirp to the database
//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**data** Content of chirp  
// &nbsp;&nbsp;**date** Date  
// &nbsp;&nbsp;**uid** User id    
// **Returns**  
// &nbsp;&nbsp;*Object* Chirp object
//    </div>	

function newChirp(data,date,uid){
	var chirp = {
		id: chirpDB.length,
		data: data,
		timestamp: date,
		uid: uid
	}
	return chirp;
}

// ##addChirp
//Export function to allow implementation of *newChirp* function
//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**data** Content of chirp  
// &nbsp;&nbsp;**date** Date  
// &nbsp;&nbsp;**uid** User id    
// **Returns**  
// &nbsp;&nbsp;*void* Adds Chirp to the *chirpDB* virtual database
//    </div>	

// Export function to implement the newChirp function.
exports.addChirp = function(data,date,uid){
	chirpDB.push(newChirp(data,date,uid));
}

