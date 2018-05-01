var speedTest = require('speedtest-net');
var http = require("http");
var qs = require("querystring");
var port = 9000;
var test = speedTest({maxTime: 5000});

var server = http.createServer(function (req, resp){
	if(req.method == 'GET' && req.url == "/" && req.url != "/favicon.ico"){
		
		resp.statusCode = 200;
		console.log("Request started");
		resp.setHeader('Content-type','application/json');
		test.on('data', data =>{
			console.log("I am here");
			console.dir(data);
			resp.write(JSON.stringify(data));
			resp.end();
		});
		test.on('error', err => {
	  		resp.write(err);
	  		console.log("I am in error");
	  		resp.end();
		});
	}
	
});
server.listen(port,function(){
	console.log("Server listening on port "+port);
});
