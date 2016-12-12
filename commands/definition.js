/**
 * Get Definition
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const request = require('request');
const random_ua = require('random-ua');
const cheerio = require('cheerio');
const parseXMLString = require('xml2js').parseString;
const {
  capitalizeFirstLetter
} = require('../helpers');
const config = require('../config');

/**
 * Build Definition 
 * @param  String previousDefinition, string currentDefinition
 * @return string
 */
function definitionBuilder(previousDt, currentDt) {
  return currentDt._ ?
    `${previousDt} ${sanitizeAndFormatWord(currentDt._)}` :
    `${previousDt} ${sanitizeAndFormatWord(currentDt)}`;
}

/**
 * Sanitize string. Trim, remove unwanted ':' and format
 * @param  String
 * @return string 
 */
function sanitizeAndFormatWord(word) {
  word = capitalizeFirstLetter(word.replace(/:/g, '')).trim();
  return word.length > 0 && word !== ':' ? `-  ${word}\n\n` : '';
}

/**
 * Build Dictionary API URL
 * @param  String
 * @return string 
 */
function dictionaryApiUrlBuilder(word) {
  return `${config.DICTIONARY_API_BASE_URL}/${word}?key=${process.env.DICTIONARY_API_KEY}`;
}

/**
 * A method to scrape definition of word from www.urbandictionary.com
 * @param  String word
 * @return Object {url, definition, example}
 */
function getUrbanDefinition(word) {
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
}

/**
 * A method to get definition of word from www.dictionaryapi.com
 * @param  String word
 * @return Object {url, definition}
 */
function getDefinition(word) {
  return new Promise((resolve, reject) => {
    const url = dictionaryApiUrlBuilder(word);
    request(url, {
      headers: {
        'User-Agent': random_ua.generate()
      }
    }, (error, response, xml) => {
      if (!error && response.statusCode == 200) {

        try {
          parseXMLString(xml, function (err, result) {
            if (result.entry_list.entry) {
              var definition = result.entry_list.entry
                .reduce((previousEntry, currentEntry) => {
                  return previousEntry + currentEntry.fl.toString().toUpperCase() + '\n' + currentEntry.def.reduce((previousDefinition, currentDefinition) => {
                    return previousDefinition + currentDefinition.dt.reduce((previousDt, currentDt) => {
                      return definitionBuilder(previousDt, currentDt);
                    }, '');
                  }, '');
                }, '');

              return resolve({
                url,
                definition
              });
            } else {
              return resolve({
                url,
                definition: 'Word does not compute. Sending request to London SW1A 1AA, United Kingdom'
              });
            }
          });
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

module.exports = {
  urbanDefinitionCommand: (bot, message) => {
    // Strip message down to word(s) to be defined
    let keyword = message.match[0];
    let word = message.text.replace(keyword, '')
      .split(' ').splice(1, 2).join(' ');
    // Show bot is typing for best UX
    bot.startTyping(message);
    // Call helper function to do conversion
    getUrbanDefinition(word.toLowerCase())
      .then(result => {
        bot.reply(message, {
          text: `*${word}:*\n${result.definition}`,
          attachments: [{
            color: config.ATTACHMENT_COLOR,
            text: result.example,
            author_name: `Urban Dictionary | Define '${word}'`,
            author_link: result.url
          }]
        });
      })
      .catch(err => {
        bot.reply(message, 'Oh my...something embarassing happened. Try again.');
      });
  },
  definitionCommand: (bot, message) => {
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
          text: `Definition for *${word}*:`,
          attachments: [{
            color: config.ATTACHMENT_COLOR,
            text: result.definition,
            author_name: 'Dictionary API',
            author_link: 'http://www.dictionaryapi.com/'
          }]
        });
      })
      .catch(err => {
        bot.reply(message, 'Oh my...something embarassing happened. Try again.');
      });
  }
}
