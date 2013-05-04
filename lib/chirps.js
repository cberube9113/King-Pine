var user = require('../lib/user.js');
var follow = require('../lib/follow.js');

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
	for(var i = chirpDB.length-1; i >=0; i--){
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
// &nbsp;&nbsp;**username** *chirpDB* Database from the routes file
// **Returns**  
// &nbsp;&nbsp;**homeChirps** *array* Array of the most recent chirps, with a size set by hardcoded variable *max*  

exports.homeChirps = function(username,chirpDB){
	var homeChirps = [];
	var recent = 0; //This counter must remain at 0.
	var max = 5; //This counter can be modified if the site begins to have more frequent chirps made.
	var len = chirpDB.length-1;
	for(var i = len; i >= 0; i--){
		if(recent == max){ //Easiest way to check without using a lot of logic to not have an infinite while loop.
			break;
		}
		var cur = user.unlookup(chirpDB[i].uid);
		if(follow.isFollowing(username,cur) || username === cur){ //If the current chirp we're looking at was made by a user the logged in user is following, or the logged in user himself 
			var curChirp = { //Create a chirp with the data we'll need on the home page.
					data: chirpDB[i].data,
					username: user.unlookup(chirpDB[i].uid),
					name: user.nameFromUsername(user.unlookup(chirpDB[i].uid)),
					timestamp: chirpDB[i].timestamp
				}
			homeChirps.push(curChirp); //Add the chirp to the return database.
			recent++; //Increase the counter.
		}
	}
	return homeChirps;
}

// ##discoveryChirps
//Returns the five most recent chirps for the Discover page

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**chirpDB** Database from the route
// **Returns**  
// &nbsp;&nbsp;*array* Array of the most recent chirps made by any user, again with a hardcoded variable.
//    </div>	

exports.discoveryChirps = function(chirpDB){
	var discoveryChirps = [];
	var recent = 0; //The initial value for the counter.  It must remain at 0.
	var max = 5; //This can be modified to show more chirps on the discovery page.
	var len = chirpDB.length-1;
	for(var i = len; i >=0 ; i--){ 
		if(recent == max){ //This method for counting could be implemented differently, but it just keeps it consistent with the other page chirp functions.
			break;
		}
		var curChirp = {
					data: chirpDB[i].data,
					username: user.unlookup(chirpDB[i].uid),
					name: user.nameFromUsername(user.unlookup(chirpDB[i].uid)),
					date: chirpDB[i].date
				}
			discoveryChirps.push(curChirp);
			recent++;
	}
	return discoveryChirps;
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
	
	var locationOfPound = -1;
	var hashtags = new Array();
	
	for(var i = 0; i < data.length; i++){
		if(locationOfPound == -1){
			if(data.charAt(i) == '#'){
				locationOfPound = i;	
			} 
		} else{
			if(data.charAt(i) == " "){
				hashtags.push(data.substring(locationOfPound, (i-1)));
				locationOfPound = -1;
			}
		}
	}
	if(locationOfPound != -1){
		hashtags.push(data.substring(locationOfPound));	
	}
	
	chirpDB.push(newChirp(data,date,uid));
}

