exports.list = function(req,res) {
  res.render('signup', { title: 'Sign Up for Chirper', message: req.flash('error') });
};