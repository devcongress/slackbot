/*
# RUN THE BOT:
  Get a Bot token from Slack:
    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:
    token=<MY TOKEN> node index.js

# EXTEND THE BOT:
  Botkit has many features for building cool and useful bots!
  Read all about it here:
    -> http://howdy.ai/botkit
*/
'use strict';

require('dotenv').config();

let controller = {};

if (process.env.NODE_ENV == 'development') {
  // Interactive shell for bot
  const shellbot = require('botkit-shell');

  // Initialise Bot Controller
  controller = shellbot({});

  // Initialise Bot
  controller.spawn({});
} else {
  const Botkit = require('botkit');

  // To schedule the bot to say words at a certain date/time or recurringly
  const scheduler = require('node-schedule');

  if (!process.env.TOKEN) {
    console.log('Error: Specify token in environment');
    process.exit(1);
  }

  // Initialise Bot Controller
  controller = Botkit.slackbot({
    debug: false
  });

  // Initialise Bot
  const bot = controller.spawn({
    token: process.env.TOKEN
  });

  // Start Bot
  bot.startRTM(function (err) {
    if (err) {
      throw new Error(err);
    }
  });

  // Schedule Jobs
  require('./jobs')(scheduler, bot);
}

// Initialise Command Listeners
require('./commands')(controller);

// Initialise Event Listeners
require('./events')(controller);
