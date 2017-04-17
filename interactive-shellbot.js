/*
# RUN THE BOT:
  Get a Bot token from Slack:
    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:
    token=<MY TOKEN> API_AI_TOKEN=<MY AI TOKEN> node interactive-shellbot.js

# EXTEND THE BOT:
  Botkit has many features for building cool and useful bots!
  Read all about it here:
    -> http://howdy.ai/botkit
*/
'use strict';

// Interactive shell for bot
const shellbot = require('botkit-shell');

// Initialise Bot Controller
const controller = shellbot({});

// Initialise Bot
controller.spawn({});

// Initialise Command Listeners
require('./commands')(controller);

// Initialise Event Listeners
require('./events')(controller);
