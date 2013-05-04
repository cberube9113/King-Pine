var sql = require('../lib/sql.js');
var async = require('async');

/*
 * GET home page.  Index of not logged in, Home if logged in.
 */

exports.index = function(req, res){
    if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
        var locals = {}; // Object that we will pass to the views in the res.render command. Build it as we go.
        locals.title = 'Chirper';
        locals.message = req.flash('auth');

        // Some variables we'll instantiate as we pull data from the databse....
        var username = req.session.user.username;
        var userid; // Userid of the currently logged in user
        var count; // Number of people the current user is following
        var dbInput; // SQLite command that will select the chirps we want for the homepage

        async.series([
            // Retrieve the data of the currently logged-in user
            function(callback){
                sql.getUser(username, function(err, user){ // Callback; 'user' is an object returned from the database.
                    locals.name = user.name;
                    locals.email = user.email;
                    locals.user = user.name;
                    locals.userid = user.uid;
                    locals.username = user.username;

                    userid = user.uid; // To be used later in getFollowing
                    callback();

                });
            },

            // Find the number of users you're following
            function(callback){
                sql.getNumFollowing(0, function(err, countObject){ // countObject is an object with one property: the count  
                    count = countObject.count;
                    callback();
                });
            },

            // Pull an object containing all the chirps we want for the home page
            function(callback){
                sql.getFollowing(userid, function(err, fArray){ // fArray is an array of objects for each person you're following. The 'fid' property is the object's fid.

                    // Pull chirps whose uid is the current user's uid. Also pull...
                    dbInput = 'SELECT * FROM chirps WHERE uid IN (' + userid + ',';

                    // ... Also pull chirps whose uid is a user you're following.
                    fArray.forEach(function(value){
                        dbInput = dbInput + value.fid + ',';
                    });

                    dbInput = dbInput.slice(0,-1); // Remove the last character, i.e. the comma

                    dbInput = dbInput + ') ORDER BY timestamp DESC LIMIT 5'; // Most recent first, choose first (most recent) five

                    sql.homeChirps(dbInput, function(err, Chirps){ // Chirps is the array of chirps to show on the home page  
                        locals.chirps = Chirps;
                        res.render('home', locals);
                    });

                    callback();
                });
            }],

            function(err){ // Callback function after all serial calls have completed.
                if(err){
                    console.log('ERROR!');
                }           
            });
    }

    else{ //If there isn't a user logged in, redirect to /index with a message.
    	res.render('index', { title: 'Chirper', message: req.flash('auth'), messagesucc: req.flash('authsucc') });
    }
  
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.render('index', { title: 'Chirper' });
}
