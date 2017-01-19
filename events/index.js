'use strict';

// Load events handlers here
const welcomeTask = require('./welcome');
const config = require('../config');

module.exports = (controller) => {

  // Register event handlers here
  controller.on('user_channel_join', welcomeTask(config.GENERAL_ID));
};
