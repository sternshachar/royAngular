var express = require('express'),
	port = 8080,
	app = express();

app.use(express.static('public'));
app.listen(port, function(){
	console.log('Site ONLINE!')
});