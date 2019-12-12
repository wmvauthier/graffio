module.exports = function(application){
	
	application.get('/config_Courtyard', function(req, res){
		res.render('home/config_Courtyard.ejs');
	});

}