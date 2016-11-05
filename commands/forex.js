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
const config = require('../config');

/**
 * A method to scrape forex from www.xe.com
 * @param  String amount
 * @param  String base
 * @return String
 */
function convertForex(amount, base) {
  return new Promise((resolve, reject) => {
    request(`${config.XE_WEB_URL}/?Amount=${amount}&From=${base}&To=GHS`, {
      headers: {
        'User-Agent': random_ua.generate()
      }
    }, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        // Parse HTML with cheerio
        let $ = cheerio.load(html);
        // jQuery style selector
        let result = $('span.uccResultAmount').text().replace("GHS", "").replace(/\s\s*$/, '');
        // resolve promise if successful
        resolve({
          amount: `GH¢ ${result}`,
          exchangeRate: (stripCommas(result) / amount).toFixed(2)
        });
      } else {
        // reject if an error, false for if there was no error but status code wasn't 200
        reject(error || false);
      }
    })
  });
}

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
