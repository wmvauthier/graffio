module.exports = function(application){
	
	application.get('/config_Terminal', function(req, res){
		application.app.controllers.config.terminal.terminal(application, req, res);
	});

}