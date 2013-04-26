var sql = require('../lib/sql.js');
	
exports.createRob = function(req,res)
{
	sql.addUser('Rob Sims', 'rsims2013@gmail.com', 'rsims', '123');
}

exports.delRob = function(req,res)
{
	sql.delUser(4);
	res.send('Del');
}

exports.getAll = function(req, res){
	sql.info(function (err,u){
		if(err){
			res.send('Oh shit.');
		}
		else{
			res.render('test', {title:'Damnit:',
								users: u});
		}
	});
}
