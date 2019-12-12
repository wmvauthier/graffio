module.exports = function(application){
	
	application.get('/gerencial_User', function(req, res){
		res.render('home/gerencial_User.ejs');
	});

	application.get('/gerencial_Affiliate', function(req, res){
		res.render('home/gerencial_Affiliate.ejs');
	});

}