exports.list = function(req,res) {
	if(req.session.user != undefined){ //If req.session.user is a value other than undefined, there is a user logged in.
   		 res.render('connect', { title: 'Connect', user: req.session.user.name });
    }
    
    else{ //If there isn't a user logged in, redirect to /index with a message.
    	req.flash('auth', 'You need to be logged in to do that!');
    	res.redirect('/');
    }
};