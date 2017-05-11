module.exports = function(io, log){
  var mod = {};
  var request = require('request');
  var config = require("./config.js");
  var constants = require("./constants");
  var redis = require("redis")
    , subscriber = redis.createClient(config.redis.port)
    , publisher  = redis.createClient(config.redis.port);

  //Redis error log
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

          getMediasByPathList(mge.resp, function(err, resp){
              if(!err){
                log.info("GETPL Response : ");
                log.info(resp);
                io.sockets.emit("core_getPlResp", resp);
              }
                
          })                   
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

  /**Private method */
  var getMediasByPathList = function(pathList,callback){
    
    //options to call mp-playout-api
    var options = {
        uri : config.apis.mp_playout_api + "medias/path/"+ JSON.stringify(pathList),
        method : 'GET'
    }; 

    request(options, function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
        
            callback(error,body)
        }
        else {
            log.error(response.statusCode);
            log.error(error);
        }
        
    });
  }

  return mod;

};
