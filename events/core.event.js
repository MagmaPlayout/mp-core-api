/**
 * socket events 
 */
module.exports = function (socket, redisClient, log) {
  
  var PCCPChannel = "PCCP";

  // registration related behaviour goes here...

  /**
   * Send PLAYNOW command to redis
   */
  socket.on('core_playMedia', function (media) {
    
    log.info('core_playMedia request');

    redisClient.publish(PCCPChannel, "PLAYNOW " + JSON.stringify(media));

  });

  /**
   * Send PPLPLAYNOW command to redis
   */
  socket.on('core_playPL', function (pl) {
    
    lof.info('core_playPL request');

    redisClient.publish( PCCPChannel, "PLPLAYNOW" + JSO.stringify(pl));

  });

  /*
  // deprecated?
  socket.on('core_schedulerPlay', function (data) {
    
    lof.info('core_schedulerPlay request');

    redisClient.publish( PCCPChannel, "PLSCHED " + data.plId + " " + data.start);

  });
  */
}
