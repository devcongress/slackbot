/**
 * Get Definition
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const config = require('../config');
const getDefinition = require('../helpers').getDefinition;

module.exports = () => {
  return (bot, message) => {
    // Strip message down to word(s) to be defined
    let keyword = message.match[0];
    let word = message.text.replace(keyword, '')
      .split(' ').splice(1, 2).join(' ');
    // Show bot is typing for best UX
    bot.startTyping(message);
    // Call helper function to do conversion
    getDefinition(word.toLowerCase())
      .then(result => {
        bot.reply(message, {
          text: `*${word}:*\n${result.definition}`,
          attachments: [{
            color: config.ATTACHMENT_COLOR,
            text: result.example,
            author_name: `Urban Dictionary | Define '${word}'`,
            author_link: result.url,
          }]
        });
      })
      .catch(err => {
        bot.reply(message, 'Oh my...something embarassing happened. Try again.');
      });
  }
};
