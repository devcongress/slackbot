'use strict';

// Load events handlers here
const welcomeTask = require('./welcome');
const { GENERAL_ID } = require('../config');

module.exports = (controller) => {

  // Register event handlers here
  controller.on('user_channel_join', welcomeTask(GENERAL_ID));
};
