'use strict';

// Load commands here
const forexConversionCommand = require('./forex');
const {
  definitionCommand
} = require('./definition');
const { isObject } = require('../helpers');
const morningConvoCommand = require('./morning_conversation');
const jokeCommand = require('./joke');
const botRepo = require('./bot_repo');
const jobsCommand = require('./jobs');
const config = require('../config');

// Load apiai init here
const apiai = require('apiai');
const apiAI = apiai(config.API_AI_TOKEN);

function generateRandomSessionId() {
  return Math.floor((Math.random() * 9999) + 1).toString();
}

function getCurrencySymbol(currency) {
  return config.CURRENCY_SYMBOLS[currency] ? config.CURRENCY_SYMBOLS[currency] : '';
}

function runNLPResponse(api, bot, message) {
  const request = api.textRequest(message.text, {
    sessionId: generateRandomSessionId()
  });

  request.on('response', response => {
    if(!response.result.actionIncomplete) {
      switch (response.result.metadata.intentName) {

      case config.NLP_INTENTS.WORD_DEFINITION:
        definitionCommand(bot, message, response.result.parameters['any']);
        break;

      case config.NLP_INTENTS.GHS_CONVERSION: // eslint-disable-line no-case-declarations
        if(isObject(response.result.parameters['unit-currency'])) {
          const amount = response.result.parameters['unit-currency'].amount; // the captured amount
          const currency = response.result.parameters['unit-currency'].currency;
          forexConversionCommand(currency, getCurrencySymbol(currency), amount)(bot, message);
        } else {
          bot.reply(message, 'Sorry, your query should be in the form `Convert 50 usd`, with the 3 character currency code.');
        }

        break;

      case config.NLP_INTENTS.CONVERT_FROM_X_TO_Y: // eslint-disable-line no-case-declarations
        if(isObject(response.result.parameters['unit-currency'])) {
          const inputAmount = response.result.parameters['unit-currency'].amount; // the captured amount
          const inputCurrency = response.result.parameters['unit-currency'].currency;
          const resultCurrency = response.result.parameters['currency-name'];
          forexConversionCommand(inputCurrency, getCurrencySymbol(inputCurrency), inputAmount, resultCurrency)(bot, message);
        } else {
          bot.reply(message, 'Sorry, your query should be in the form `Convert 50 usd to ngn`, with the 3 character currency codes.');
        }
        break;

      default:
        break;
      }
    } else {
      bot.reply(message, `Sorry, your query seems incomplete. Please refer to the docs for usage rules. ${config.DOCS_URL}`);
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

  // Bot Repo
  controller.hears(
    ['Where can I find you?', 'repo', 'git', 'whoareyou'], ['direct_message', 'direct_mention', 'mention'],
    botRepo(config.BOT_REPO_URL)
  );

  // List jobs
  controller.hears(
    ['jobs', 'job'], ['direct_message'],
    jobsCommand
  );

  // reply to a direct mention - @anansi
  controller.on(['direct_message', 'direct_mention'], (bot, message) => runNLPResponse(apiAI, bot, message));
};
