/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(4000, function(){
	console.log('Bem Vindo ao Graffio!');
})