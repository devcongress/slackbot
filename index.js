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

const { controller, bot} = require('./bootstrap');

if (process.env.NODE_ENV !== 'development') {
  // To schedule the bot to say words at a certain date/time or recurringly
  const scheduler = require('node-schedule');

  // Schedule Jobs
  require('./jobs')(scheduler, bot);
}

// Initialise Command Listeners
require('./commands')(controller);

// Initialise Event Listeners
require('./events')(controller);
