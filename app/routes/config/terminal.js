module.exports = function(application){
	
	application.get('/config_Terminal', function(req, res){
		res.render('home/config_Terminal.ejs');
	});

}