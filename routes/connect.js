exports.list = function(req,res) {
    res.render('connect', { title: 'Connect', user: req.session.user.name });
};