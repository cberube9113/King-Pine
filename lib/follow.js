/*
** User following relational database and functions.
*/

/*
* Follow relation stub database.
* id: The id of the user in the entry.
* fid: The id of the user being followed by the user specified in the id field of that entry.
* Note there is one entry for each follower/following relation,
* If a user is not following any other users, they will not have an entry with their ID listed
* in the id field.
*/
	var followdb = [
	{id: 0,
	 fid: 1},
	{id: 0,
	 fid: 2},
	{id: 2,
	 fid: 0}
];

/*
* Number of users subject is following.
* subjectid: The id of the user we're looking at.
*/

exports.numfollowing = function(subjectid){
	var c = 0;
	for(var i = 0; i < followdb.length; i++){
		if(subjectid === followdb[i].id){
			c++;
		}
	}
	return c;
}

/*
* Number of users following the subject.
* subjectid: The id of the user we're looking at.
*/

exports.numfollowers = function(subjectid){
	var c = 0;
	for(var i = 0; i < followdb.length; i++){
		if(subjectid === followdb[i].fid){
			c++;
		}
	}
	return c;
}	
	