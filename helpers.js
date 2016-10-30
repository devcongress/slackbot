'use strict';

const request = require('request');
const random_ua = require('random-ua');
const cheerio = require('cheerio');
const config = require('./config');
const gcal = require('googleapis').calendar('v3');

/**
 * Create a helper method to strip ',' from amount and return number to 2 decimals
 * @param  string invalidNumber
 * @return string
 */
function stripCommas(invalidNumber) {
  return parseFloat(invalidNumber.replace(',', '').trim()).toFixed(2);
}

/**
 * getStartOfDay returns the Date object for the start of day of a specific date/time.
 * @param {Date} datetime
 * @return Date
 */
function getStartOfDay(datetime) {
  const day = new Date(datetime);
  day.setHours(0);
  day.setMinutes(0);
  day.setSeconds(0);
  day.setMilliseconds(0);

  return day;
}

/**
 * getNextDay returns date after `datetime`.
 * @param {Date} datetime
 * @return Date
 */
function getNextDay(datetime) {
  const day = getStartOfDay(datetime);
  day.setHours(24);

  return day;
}

function getEventsFor(when) {
  if (when !== 'today' && when !== 'tomorrow') return;

  let timeMax, timeMin, now = new Date;

  if (when === 'today') {
    timeMax = getNextDay(now).toISOString();
    timeMin = getStartOfDay(now).toISOString();
  } else {
    timeMax = getNextDay(getNextDay(now)).toISOString();
    timeMin = getNextDay(now).toISOString();
  }

  return new Promise((resolve, reject) => {
    gcal.events.list({
        timeMax,
        timeMin,
        auth: config.GCAL_API_KEY,
        calendarId: config.GHANA_TECH_CAL_ID
      },
      callback(resolve, reject)
    );
  });


  function callback(resolve, reject) {
    return function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data.items);
    };
  }
}

getEventsFor('today');

module.exports = {
  /**
   * `pluralize` is a poor man's pluralize. Without any inflectors it just
   * assumes that adding `s` to the end of the string is the correct plural.
   * If that doesn't apply to the word you want to pluralize, please avoid
   * at all cost
   *
   * @param {Number} count
   * @param {String} word
   * @return {String}
   */
  pluralize(count, word) {
    Math.abs(count) === 1 ? String(word) : String(word) + 's';
  },

  /**
   * Create a helper method to handle slack user handle creation
   * @param  string userId
   * @param  string username
   * @return string
   */
  createUserHandle(userId, username) {
    return `<@${userId}|${username}>`;
  },

  /**
   * A method to scrape forex from www.xe.com
   * @param  String amount
   * @param  String base
   * @return String
   */
  convertForex(amount, base) {
    return new Promise((resolve, reject) => {
      request(`http://www.xe.com/currencyconverter/convert/?Amount=${amount}&From=${base}&To=GHS`, {
        headers: {
          'User-Agent': random_ua.generate()
        }
      }, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          // Parse HTML with cheerio
          let $ = cheerio.load(html);
          // jQuery style selector
          let result = $('tr.uccRes').children('td.rightCol').text().replace('GHS', '').replace(/\s\s*$/, '');
          // resolve promise if successful
          resolve({
            amount: `GH¢ ${result}`,
            exchangeRate: (stripCommas(result) / amount).toFixed(2)
          });
        } else {
          // reject if an error, false for if there was no error but status code wasn't 200
          reject(error || false);
        }
      });
    });
  },

  /**
   * A method to scrape definition of word from www.urbandictionary.com
   * @param  String word
   * @return Object {url, definition, example}
   */
  getDefinition(word) {
    return new Promise((resolve, reject) => {
      const url = `http://www.urbandictionary.com/define.php?term=${word}`;
      request(url, {
        headers: {
          'User-Agent': random_ua.generate()
        }
      }, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          // Parse HTML with cheerio
          let $ = cheerio.load(html);
          // jQuery style selector
          let defPanel = $('div.def-panel').first();
          if (!defPanel.children().is('div.no-results')) {
            let definition = $('div.def-panel').first().children('div.meaning').text();
            let example = $('div.def-panel').first().children('div.example').text() || 'No Examples here, move along';
            // resolve promise if successful
            return resolve({
              url,
              definition,
              example
            });
          } else {
            // reject if no definition was found
            return resolve({
              url,
              definition: '¯\\_(ツ)_/¯',
              example: 'No Examples here, move along'
            });
          }

        } else {
          // reject if an error, false for if there was no error but status code wasn't 200
          return reject(error || false);
        }
      });
    });
  },

  getAstronomyPictureOfTheDay() {
    return new Promise((resolve, reject) => {
      const url = config.APOD_API_URL;
      request(url, (error, resp, body) => {
        if (resp.statusCode === 200 && resp.headers['content-type'] === 'application/json') {
          // I think I could be more careful and surround `JSON.parse` with a
          // try...catch in case unexpectedly we get something back that's not
          // a JSON string.
          return resolve(JSON.parse(body));
        }
        return reject(error);
      });
    });
  },

  getEventsHappeningToday() { return getEventsFor('today'); },
  getEventsHappeningTomorrow() { return getEventsFor('tomorrow'); }
};
