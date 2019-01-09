/**
 * Convert GBP to GHS
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const request = require('request');
const random_ua = require('random-ua');
const cheerio = require('cheerio');
const {
  stripCommas
} = require('../helpers');
const { XE_WEB_URL } = require('../config');

/**
 * A method to scrape forex from www.xe.com
 * @param  String amount
 * @param  String base
 * @return String
 */
function convertForex(amount, base, resultCurrency) {
  return new Promise((resolve, reject) => {
    request(`${XE_WEB_URL}/?Amount=${amount}&From=${base}&To=${resultCurrency}`, {
      headers: {
        'User-Agent': random_ua.generate()
      }
    }, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        // Parse HTML with cheerio
        let $ = cheerio.load(html);
        // jQuery style selector
        let result = $('span.uccResultAmount').text().replace('GHS', '').replace(/\s\s*$/, '');
        // resolve promise if successful
        resolve({
          amount: `${result} ${resultCurrency}`,
          exchangeRate: (stripCommas(result) / stripCommas(amount)).toFixed(5)
        });
      } else {
        // reject if an error, false for if there was no error but status code wasn't 200
        reject(error || false);
      }
    });
  });
}

module.exports = (base, symbol, amount, result='GHS') => {
  return (bot, message) => {
    // Show bot is typing for best UX
    bot.startTyping(message);
    // Call helper function to do conversion
    convertForex(amount, base.toUpperCase(), result.toUpperCase())
      // resolve promise
      .then(result => bot.reply(message, `*${amount} ${base}* is equivalent to *${result.amount}* at an exchange rate of _${result.exchangeRate}_`))
      // catch error, return appropriate message
      .catch(() => {
        bot.reply(message, 'Oh my...something embarassing happened. Try again.');
      });
  };
};
