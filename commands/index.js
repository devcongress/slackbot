'use strict';

// Load commands here
const apiai = require('apiai');
const app = apiai(process.env.API_AI_TOKEN);
  
const forexConversionCommand = require('./forex');
const {
  definitionCommand
} = require('./definition');
const morningConvoCommand = require('./morning_conversation');
const jokeCommand = require('./joke');
const config = require('../config');

function generateRandomSessionId() {
  return Math.floor((Math.random() * 9999) + 1).toString();
}

function runNLPResponse(bot, message) {
  const request = app.textRequest(message.text, {
    sessionId: generateRandomSessionId()
  });

  request.on('response', response => {
    switch (response.result.metadata.intentName) {

    case config.NLP_INTENTS.WORD_DEFINITION:
      definitionCommand(bot, message, response.result.parameters['any']);
      break;

    case config.NLP_INTENTS.GHS_CONVERSION: // eslint-disable-line no-case-declarations
      const amount = response.result.parameters['input-money']; // the captured amount
      const currency = response.result.parameters['input-currency'];
      forexConversionCommand(config.CURRENCIES[currency], config.CURRENCY_SYMBOLS[currency], amount)(bot, message);
      break;

    default:
      break;
    }
  });

  request.on('error', () => {
    bot.reply(message, 'Oh my...something embarassing happened. Try again.');
  });

  request.end();
}


module.exports = (controller) => {

  // Register commands here

  // Morning Conversation command
  controller.hears(
    ['morning', 'Good morning'], ['direct_message', 'direct_mention', 'mention'],
    morningConvoCommand
  );

  // Tell Joke Command
  controller.hears(
    ['joke', 'lighten\s+the\s+mood', 'laugh'], ['direct_message', 'direct_mention', 'mention'],
    jokeCommand
  );

  // reply to a direct mention - @anansi 
  controller.on(['direct_message', 'direct_mention'], (bot, message) => runNLPResponse(bot, message));
};
