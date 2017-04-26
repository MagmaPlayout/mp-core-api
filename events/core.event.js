/**
 * socket events 
 */
module.exports = function (socket, redisClient, log) {
  
  var PCCPChannel = "PCCP";

  // registration related behaviour goes here...
  socket.on('core_play', function (mediaId) {
    
    log.info('core_play request');

    redisClient.publish(PCCPChannel, "PLAYNOW " + mediaId );

  });

  socket.on('core_schedulerPlay', function (data) {
    
    lof.info('core_schedulerPlay request');

    redisClient.publish( PCCPChannel, "PLSCHED " + data.plId + " " + data.start);

  });
}
