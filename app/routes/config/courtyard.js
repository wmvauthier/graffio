module.exports = function(application){
	
	application.get('/config_Courtyard', function(req, res){
		application.app.controllers.config.courtyard.courtyard(application, req, res);
	});

}