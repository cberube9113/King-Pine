var user = require('../lib/user.js');

// #Follow Stub Database 

//Stub database for follows until real database is implemented

// > There is one entry for each follower/following relation.
// > If a user is not following any other users, they will not have an entry with their ID listed
// >in the id field.

//    <div class="highlight">
//    *followdb*
//    > + **id**
//    > : User ID of the subject we are looking at.
//    > + **fid**
//    > : ID of user being followed by user id specified in **id** field
//    </div>

	var followdb = [
	{id: 0,
	 fid: 1},
	{id: 0,
	 fid: 2},
	{id: 2,
	 fid: 0}
];

// ## followdbUpdate
//Updates the follower database, deleting or adding a relationship.

// <div class="highlight">
// **Params**
// &nbsp;&nbsp;**uid** *var* ID of Interacting User
// &nbsp;&nbsp;**fid** *var* ID of User being Interacted With
// This function is called when a user chooses the "follow" option.
// If the user is already following the person, they will stop following them.
// If the user is not following the person, they will start following them.

exports.followdbUpdate = function(uid,fid){
	for(var i = 0; i < followdb.length; i++)
		if(followdb[i].id == uid && followdb[i].fid == fid){
			followdb.splice(i,1);
			console.log("Removed "+uid+" "+fid)
			return;
		}
	
	followdb.push({id:uid,fid:fid});
	console.log("Added "+uid+" "+fid)
}



// ##numfollowing
//Number of users subject is following

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// **Returns**  
// &nbsp;&nbsp;*integer* Number of users **username** is following
//    </div>

exports.numfollowing = function(username){
	var subjectid = user.idlookup(username);
	var c = 0;
	for(var i = 0; i < followdb.length; i++){
		if(subjectid === followdb[i].id){
			c++;
		}
	}
	return c;
}

// ##numfollowers
//Number of users following the subject

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**username** *string* Username of user  
// **Returns**  
// &nbsp;&nbsp;*integer* Number of users following **username**
//    </div>

exports.numfollowers = function(username){
	var subjectid = user.idlookup(username);
	var c = 0;
	for(var i = 0; i < followdb.length; i++){
		if(subjectid === followdb[i].fid){
			c++;
		}
	}
	return c;
}	

// ## isFollowing
// Is user1 following user2? (Used in search results page.)

//    <div class="highlight">
// **Params**  
// &nbsp;&nbsp;**user1** *string* Username of the follower
// &nbsp;&nbsp;**user2** *string* Username of the user being followed
// **Returns**  
// &nbsp;&nbsp;*boolean* True if **user1** is following **user2**, otherwise false
//    </div>

exports.isFollowing = function(user1,user2){
	var uid1 = user.idlookup(user1);
	var uid2 = user.idlookup(user2);
	for(var i = 0; i < followdb.length; i++)
		if(followdb[i].id == uid1 && followdb[i].fid == uid2){
			console.log("isFollowing TRUE");
			return true;
		}
	console.log("isFollowing FALSE");
	return false;
}
	