var express = require ("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var Log = require ("log"),
	log = new Log("debug");
var coreEvents = require('./events/core.event');
var config = require("./config.js");
var redisManager = require("./redisManager")(io,log);



io.on('connection',function(socket){
	//log.info("Client %s connected", socket.client.id);	
	// socket events 
	coreEvents(socket, redisManager, log);

});


var port = process.env.PORT || config.ws.port;

function start (){

	http.listen(port,function(){
		log.info("server listening on port %s",port);
		

	});
}


exports.start = start;