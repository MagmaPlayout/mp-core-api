var constants = require('../constants')
// TO-DO -> Create middleware to log event request

/**
 * socket events 
 */
module.exports = function (socket, redisManager, log) {
  
  /**
   * Send PLAYNOW command to redis
   * deprecated
   */
  socket.on('core_playMedia', function (media) {
    
    log.info(constants.PLAYNOW_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLAYNOW_CMD + JSON.stringify(media));

  });

  /**
   * Send PPLPLAYNOW command to redis
   * deprecated
   */
  socket.on('core_playPL', function (pl) {
    
    log.info(constants.PLPLAYNOW_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLPLAYNOW_CMD + JSON.stringify(pl));

  });

  /** 
   * Send APND command to redis
   * @param {PlayoutModel} poItem = playout list item
   */
  socket.on('core_apnd', function (poItem) {

    log.info(constants.APND_CDM);
    redisManager.publish(constants.PCCP_CHANNEL, constants.APND_CDM + JSON.stringify(poItem));

  });

  /** 
   * Send CALLCAHNGE command to redis
   */
  socket.on('core_calchange', function () {

    log.info(constants.CALCHANGE_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.CALCHANGE_CMD);

  });

  /**
   * Send PLAPND command to redis
   * @param {PlayoutModel} poItem = playout list item
   */
  socket.on('core_plApnd', function (poItem) {   

    log.info(constants.PLAPND_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLAPND_CDM + JSON.stringify(poItem.pl));

  });

  /**
   * Send REMOVE command to redis
   * @param {PlayoutModel} poItem = playout list item
   */
  socket.on('core_remove', function (poItem) {

    log.info(constants.REMOVE_CMD);
    log.info(poItem);
    redisManager.publish(constants.PCCP_CHANNEL, constants.REMOVE_CMD + JSON.stringify(poItem));

  });

  /**
   * Send PLREMOVE command to redis
   * @param {PlayoutModel} poItem = playout list item
   */
  socket.on('core_plRemove', function (poItem) {

    log.info(constants.PLREMOVE_CMD);
    redisManager.publish(constants.PCCP_CHANNEL, constants.PLREMOVE_CMD + JSON.stringify(poItem));

  });

  /**
   * Send GOTO command to redis channel
   * @param {PlayoutModel} poItem = playout list item
   */
  socket.on('core_goto', function (poItem) {

    log.info(constants.GOTO_CDM);
    log.info(poItem);
    redisManager.publish(constants.PCCP_CHANNEL, constants.GOTO_CDM + JSON.stringify(poItem));

  });

   /**
   * Send MOVE command to redis channel
   * @param {PlayoutModel} poItem = playout list item
   */
  socket.on('core_move', function (poItem) {

    log.info(constants.MOVE_CDM);
    log.info(poItem);
    redisManager.publish(constants.PCCP_CHANNEL, constants.MOVE_CDM + JSON.stringify(poItem));

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


  /**
   * Send SWITCHMODE command to redis channel(PCCP)
   * @param {CmdModel} cmdModel 
   */
  socket.on('core_switchmode', function (cmdModel) {

    log.info(constants.SWITCHMODE_CMD);
    log.info(cmdModel);
    redisManager.publish(constants.PCCP_CHANNEL, constants.SWITCHMODE_CMD + JSON.stringify(cmdModel));

  });
  
  /**
   * Send a APPLYFILTER command to redis PCCP channel.
   * @param {applyFilter} needs to have a "from", "to" and "filter"
   **/
  socket.on('core_applyFilters', function(applyFilter){
	log.info(constants.APPLYFILTER_CMD);
	log.info(applyFilter);
	redisManager.publish(constants.PCCP_CHANNEL, constants.APPLYFILTER_CMD + JSON.stringify(applyFilter));
  });

  //------------------------------------------------------------------------------
}
