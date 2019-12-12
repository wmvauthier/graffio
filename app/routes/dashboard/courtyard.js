module.exports = function(application){
	
	application.get('/dashboard_Courtyard', function(req, res){
		res.render('home/dashboard_Courtyard.ejs');
	});

}