var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');
var sql = require('../lib/sql.js');
var follow = require('../lib/follow.js');
var async = require('async');

// ##list
//Renders home page

exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
        var locals = {};
        locals.title = 'Chirper';
        locals.message = req.flash('auth');

        var username = req.session.user.username;
        var userid;
        var following; // Array of those you're following, where the fid attribute of the objects is the only element.
        var count;
        var dbInput;

        async.series([
            function(callback){
                sql.getUser(username, function(err, user){ // Callback; 'user' is an object returned from the database.
                    console.log('got here 1.5');

                    locals.name = user.name;
                    locals.email = user.email;
                    locals.user = user.name;
                    locals.userid = user.uid;
                    locals.username = user.username;

                    userid = user.uid;
                    console.log(userid);
                    console.log('got here 2');
                    callback();

                })}

                , function(callback){
                    console.log('Calling getNumFollowing...');
                    sql.getNumFollowing(0, function(err, countObject){
                        console.log(countObject);
                        count = countObject.count;
                        console.log(count);
                        callback();
                    });}



                    , function(callback){
                        sql.getFollowing(userid, function(err, fArray){

                            console.log(fArray);

                            dbInput = 'SELECT * FROM chirps WHERE uid IN (' + userid + ',';
                                console.log(dbInput);

                                fArray.forEach(function(value){
                                    dbInput = dbInput + value.fid + ',';
                                });

                                console.log(dbInput);

                        dbInput = dbInput.slice(0,-1); // Remove the last character, i.e. the comma
                        console.log(dbInput);

                        dbInput = dbInput + ') ORDER BY timestamp DESC';

                        console.log(dbInput);

                        sql.homeChirps(dbInput, function(err, Chirps){
                            console.log(Chirps);
                            locals.chirps = Chirps;
                            res.render('home', locals);
                        });


                        callback();

                    })}





            ], function(err){ // Callback function after all parallel calls have completed.
                if(err){
                    console.log('ERROr!');
                }           
            });
// ===========================================================================

/*
var userdata = user.info(username);
var fids = sql.isFollowing(username);
var homeChirps = sql.homeChirps(fids, username);

res.render('home', { title: 'Chirper',
   name: userdata.name,
   email: userdata.email,
   chirps: homeChirps,
   user: req.session.user.name,
   userid: req.session.user.id,
   username: userdata.username,
   message: req.flash('auth')
});
*/
}
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	res.redirect('/');
}
};