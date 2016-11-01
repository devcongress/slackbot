'use strict'

const welcomeTask = require('./welcome');
const config = require('../config');

module.exports = (controller) => {
  // Welcome command
  controller.on('user_channel_join', welcomeTask(config.APP_NAME, config.GENERAL_ID));
}
