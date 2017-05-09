var constants = require('../constants')
// TO-DO -> Create middleware to log event request

/**
 * socket events 
 */
module.exports = function (socket, redisManager, log) {
  
  /**
   * Send PLAYNOW command to redis
   */
  socket.on('core_playMedia', function (media) {
    
    log.info(constants.PLAYNOW_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLAYNOW_CMD + JSON.stringify(media));

  });

  /**
   * Send PPLPLAYNOW command to redis
   */
  socket.on('core_playPL', function (pl) {
    
    log.info(constants.PLPLAYNOW_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLPLAYNOW_CMD + JSON.stringify(pl));

  });

  /**
   * Send APND command to redis
   */
  socket.on('core_apnd', function (media) {

    log.info(constants.APND_CDM);
    redisManager.publish(constants.PCCP_CHANNEL, constants.APND_CDM + JSON.stringify(media));

  });

  /**
   * Send PLAPND command to redis
   */
  socket.on('core_plApnd', function (pl) {   

    log.info(constants.PLAPND_CMDD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLAPND_CDM + JSON.stringify(pl));

  });

  /**
   * Send REMOVE command to redis
   */
  socket.on('core_remove', function (media) {

    log.info(constants.REMOVE_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.REMOVE_CMD + JSON.stringify(media));

  });

  /**
   * Send PLREMOVE command to redis
   */
  socket.on('core_plRemove', function (pl) {

    log.info(constants.PLREMOVE_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLREMOVE_CMD + JSON.stringify(pl));

  });

  /**
   * Send GETPL command to redis
   */
  socket.on('core_getPl', function () {
    
    log.info(constants.GETPL_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.GETPL_CMD);

  });

   /**
   * Send GETTIMERS command to redis
   */
  socket.on('core_getTimers', function () {
    
    log.info(constants.GETTIMERS_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.GETTIMERS_CMD);

  });

  //------------------------------------------------------------------------------


  /*
  // deprecated?
  socket.on('core_schedulerPlay', function (data) {
    
    lof.info('core_schedulerPlay request');

    redisManager.publish( PCCPChannel, "PLSCHED " + data.plId + " " + data.start);

  });
  */
}
