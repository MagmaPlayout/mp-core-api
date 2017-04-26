module.exports = function(io, redisClient, log){
  //redis subscribes goes here
  //redisClient.subscribe("?");

  redisClient.on("message",function(channel, message){
    if(channel=="PCCP"){
      
      // channel messages goes here
      if(message.includes("?")){
        
        log.info("? message received. IdFilter= " + idFilter );

        io.sockets.emit('?',"");

      };

    
    }

  });
};
