/**
 * Get Definition
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const getDefinition = require('../helpers').getDefinition;

module.exports = () => {
    return (bot, message) => {
        // Strip message down to word to be defined
        let word = message.text.replace('define', '').trim();
        // Show bot is typing for best UX
        bot.startTyping(message);
        // Call helper function to do conversion
        getDefinition(word.toLowerCase())
            // resolve promise
            .then(result => bot.reply(message, {
                text: `*${word}:*\n${result.definition}`,
                attachments: [{
                    text: result.example,
                    author_name: `Urban Dictionary | Define '${word}'`,
                    author_link: definition.url,
                }]
            }))
            // catch error, return appropriate message
            .catch(err => {
                bot.reply(message, 'Oh my...something embarassing happened. Try again.');
            });
    }
};