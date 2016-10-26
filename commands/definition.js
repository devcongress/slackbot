/**
 * Get Definition
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const getDefinition = require('../helpers').getDefinition;

module.exports = () => {
  return (bot, message) => {
    // Strip message down to word(s) to be defined
    let word = message.text.split(' ').splice(1, 2).join(' ');
    // Show bot is typing for best UX
    bot.startTyping(message);
    // Call helper function to do conversion
    getDefinition(word.toLowerCase())
      .then(result => {
        bot.reply(message, {
          text: `*${word}:*\n${result.definition}`,
          attachments: [{
            color: "#4abfa4",
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
