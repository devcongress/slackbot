'use strict';

// Load events handlers here
const welcomeTask = require('./welcome');
const introductionTask = require('./introduction');
const config = require('../config');

module.exports = (controller) => {

  // Register event handlers here
  controller.on('user_channel_join', welcomeTask(config.GENERAL_ID, config.APP_NAME));
  controller.on('member_joined_channel', introductionTask());
  controller.on('member_left_channel', introductionTask());
};
