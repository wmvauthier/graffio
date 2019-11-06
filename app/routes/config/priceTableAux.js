module.exports = function(application){
	
	application.get('/config_PriceTableAux', function(req, res){
		application.app.controllers.config.priceTableAux.priceTableAux(application, req, res);
	});

}