'use strict';

// Load commands here
const apiai = require('apiai');
const app = apiai(process.env.API_AI_TOKEN);

const currencies = {
  euros: 'EUR',
  dollars: 'USD',
  pounds: 'GBP'
};

const currencySymbols = {
  euros: '€',
  dollars: '$',
  pounds: '£'
};
const forexConversionCommand = require('./forex');
const {
  definitionCommand
} = require('./definition');
const morningConvoCommand = require('./morning_conversation');

module.exports = (controller) => {

  // Register commands here

  // Morning Conversation command
  controller.hears(
    ['morning', 'Good morning'], ['direct_message', 'direct_mention', 'mention'],
    morningConvoCommand
  );

  // Forex Conversion command
  // Great Britain Pound
  // controller.hears(
  //   ['(?=.)^gbp \?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$'], ['direct_message', 'direct_mention', 'mention'],
  //   forexConversionCommand('gbp', '£')
  // );

  // // US Dollar
  // controller.hears(
  //   ['(?=.)^usd \?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$'], ['direct_message', 'direct_mention', 'mention'],
  //   forexConversionCommand('usd', '$')
  // );

  // // Euro
  // controller.hears(
  //   ['(?=.)^eur \?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$'], ['direct_message', 'direct_mention', 'mention'],
  //   forexConversionCommand('eur', '€')
  // );

  // Definition command
  // controller.hears(
  //   ['define', 'what\'s the meaning of', 'whats the meaning of'], ['direct_message', 'direct_mention', 'mention'],
  //   definitionCommand
  // );
  
  // Urban Definition command
  // controller.hears(
  //   ['define', 'what\'s the urban meaning of', 'whats the urban meaning of'], ['direct_message', 'direct_mention', 'mention'],
  //   urbanDefinitionCommand
  // );

// reply to a direct mention - @anansi 
  controller.on('direct_mention',function(bot,message) {
    
    var request = app.textRequest(message.text, {
      sessionId: '1'
    });

    request.on('response', response => {
      if (response.result.metadata.intentName === 'define-word') {
        definitionCommand(bot, message, response.result.parameters['any']);
      } else if(response.result.metadata.intentName === 'convert-to-ghana-cedis') {
        const amount = response.result.parameters['input-money']; // the captured amount
        const currency = response.result.parameters['input-currency'];
        forexConversionCommand(currencies[currency], currencySymbols[currency], amount)(bot, message);
      } 
    });

    request.on('error', () => {
      bot.reply(message, 'Oh my...something embarassing happened. Try again.');
    });

    request.end();
  });

// reply to a direct message
  controller.on('direct_message',function(bot,message) {
    var request = app.textRequest(message.text, {
      sessionId: '1'
    });

    request.on('response', response => {
      if (response.result.metadata.intentName === 'define-word') {
        definitionCommand(bot, message, response.result.parameters['any']);
      } else if(response.result.metadata.intentName === 'convert-to-ghana-cedis') {
        const amount = response.result.parameters['input-money']; // the captured amount
        const currency = response.result.parameters['input-currency'];
        forexConversionCommand(currencies[currency], currencySymbols[currency], amount)(bot, message);
      } 
    });

    request.on('error',  () => {
      bot.reply(message, 'Oh my...something embarassing happened. Try again.');
    });

    request.end();
  });
};
