'use strict';

// Load commands here
const forexConversionCommand = require('./forex');
const {
  definitionCommand,
  urbanDefinitionCommand
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
  controller.hears(
    ['(?=.)^gbp \?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$'], ['direct_message', 'direct_mention', 'mention'],
    forexConversionCommand('gbp', '£')
  );

  // US Dollar
  controller.hears(
    ['(?=.)^usd \?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$'], ['direct_message', 'direct_mention', 'mention'],
    forexConversionCommand('usd', '$')
  );

  // Euro
  controller.hears(
    ['(?=.)^eur \?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$'], ['direct_message', 'direct_mention', 'mention'],
    forexConversionCommand('eur', '€')
  );

  // Urban Definition command
  controller.hears(
    ['define', 'what\'s the urban meaning of', 'whats the urban meaning of'], ['direct_message', 'direct_mention', 'mention'],
    urbanDefinitionCommand
  );

  // Definition command
  controller.hears(
    ['real-define', 'what\'s the meaning of', 'whats the meaning of'], ['direct_message', 'direct_mention', 'mention'],
    definitionCommand
  );
};
