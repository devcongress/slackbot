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

const Botkit = require('botkit');

// To schedule the bot to say words at a certain date/time or recurringly
const scheduler = require('node-schedule');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

// Initialise Bot Controller
const controller = Botkit.slackbot({
  debug: false
});

// Initialise Bot
const bot = controller.spawn({
  token: process.env.token
});

// Start Bot
bot.startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }
});

// Initialise Command Listeners
require('./commands')(controller);

// Schedule Jobs
require('./jobs')(scheduler, bot);

// Initialise Event Listeners
require('./events')(controller);
