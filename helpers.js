'use strict';

const config = require('./config');
const { google } = require('googleapis');
const gcal = google.calendar({ version: 'v3' });

const helpers = {
  /**
   * Create a helper method to strip ',' from amount and return number to 2 decimals
   * @param {String} invalidNumber
   * @return String
   */
  stripCommas(invalidNumber) {
    return invalidNumber.toString().replace(new RegExp(',', 'g'), '');
  },

  /**
   * Capitalizes first letter of string and returns string
   * @param {String} text
   * @return String
   */
  capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  /**
   * Create a helper method to handle slack user handle creation
   * @param {String} userId
   * @param {String} username
   * @return String
   */
  createUserHandle(userId, username) {
    return `<@${userId}|${username}>`;
  },

  /**
   * getStartOfDay returns the Date object for the start of day of a specific date/time.
   * @param {Date} datetime
   * @return Date
   */
  getStartOfDay(datetime) {
    const day = new Date(datetime);
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);

    return day;
  },

  /**
   * getNextDay returns date after `datetime`.
   * @param {Date} datetime
   * @return Date
   */
  getNextDay(datetime) {
    const day = helpers.getStartOfDay(datetime);
    day.setHours(24);

    return day;
  },

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
    return Math.abs(count) === 1 ? String(word) : String(word) + 's';
  },

  /**
   * @param {String} when
   */
  getEventsFor(when) {
    if (when !== 'today' && when !== 'tomorrow') return;

    let timeMax, timeMin, now = new Date;
    
    if (when === 'today') {
      timeMax = helpers.getNextDay(now).toISOString();
      timeMin = helpers.getStartOfDay(now).toISOString();
    } else {
      timeMax = helpers.getNextDay(helpers.getNextDay(now)).toISOString();
      timeMin = helpers.getNextDay(now).toISOString();
    }

    return new Promise((resolve, reject) => {
      gcal.events.list({
        timeMax,
        timeMin,
        auth: config.GCAL_API_KEY,
        calendarId: config.GHANA_TECH_CAL_ID
      }, callback(resolve, reject));
    });


    function callback(resolve, reject) {
      return function(err, data) {
        if (err) {
          return reject(err);
        }
        return resolve(data.items);
      };
    }
  },
  /**
   * checks if param is an object
   *
   * @param {any} obj
   * @return {Boolean}
   */
  isObject(obj) {
    return obj && typeof obj === 'object';
  }
};

module.exports = helpers;
