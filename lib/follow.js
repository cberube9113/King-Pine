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
		if(followdb[i].id == uid && followdb[i].fid = fid){
			followdb.splice(i,1);
			return;
		}
		else{
			followdb.push({id:uid,fid:fid});
		}
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
	