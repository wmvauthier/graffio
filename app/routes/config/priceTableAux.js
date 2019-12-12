module.exports = function(application){
	
	application.get('/config_PriceTableAux', function(req, res){
		res.render('home/config_priceTableAux.ejs');
	});

}