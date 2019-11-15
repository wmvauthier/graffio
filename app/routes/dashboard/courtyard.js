module.exports = function(application){
	
	application.get('/dashboard_Courtyard', function(req, res){
		application.app.controllers.dashboard.courtyard.courtyard(application, req, res);
	});

}