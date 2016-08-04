/**
 * Convert GBP to GHS
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const convertForex = require('../helpers').convertForex;

module.exports = (base, symbol) => {
  return (bot, message) => {
    // Strip message down to amount
    let amount = message.text.replace(base, '').replace(',', '').trim();
    // Show bot is typing for best UX
    bot.startTyping(message);
    // Call helper function to do conversion
    convertForex(amount, base.toUpperCase())
    // resolve promise
    .then(result => bot.reply(message, `*${symbol}${amount}* is equivalent to *${result.amount}* at an exchange rate of _${result.exchangeRate}_`))
    // catch error, return appropriate message
    .catch(err => {
        cosnole.log(err)
        bot.reply(message, 'Oh my...something embarassing happened. Try again.');
    });
  }
};
