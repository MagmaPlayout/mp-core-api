module.exports = function(io, log){
  var mod = {};
  var config = require("./config.js");
  var constants = require("./constants");
  //example -> https://gist.github.com/reu/5342276
  var redis = require("redis")
    , subscriber = redis.createClient(config.redis.port)
    , publisher  = redis.createClient(config.redis.port);


  publisher,subscriber.on("error",function(err){
    log.error(err);
  });

  //subscribe to PCR(Protocol Channel Response) channel
  subscriber.subscribe(constants.PCR_CHANNEL);


 /**
   * wait message on PCR channel.
   * message format : {resp : "value"" , opcode : "value"}  
   */
  subscriber.on("message",function(channel, message){
    
    if(channel == constants.PCR_CHANNEL){
      var mge = JSON.parse(message);
      switch(mge.opcode){
        case constants.GETPL_CMD:        
          console.log(mge);
          //aca meter llamada al playout-core para obtener los medias por sus paths
          //io.sockets.emit("core_getPlResp", mge.resp);
          break;
        case constants.GETTIMERS_CMD:
          console.log(mge);
          io.sockets.emit("core_getTimersResp", mge.resp);
          break;
        default :
          log.info("opcode not found");

      }
    }

  });
  
  /**
   * Wrapper of redis publish
   */
  mod.publish = function(channel, cmd){

    publisher.publish(channel, cmd);

  }

  return mod;
  
};
