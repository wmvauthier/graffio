module.exports = function(application){
	
	application.get('/config_PriceTable', function(req, res){
		application.app.controllers.config.priceTable.priceTable(application, req, res);
	});

}