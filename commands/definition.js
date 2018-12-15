/**
 * Get Definition
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const request = require('request');
const random_ua = require('random-ua');
const cheerio = require('cheerio');
const {
  capitalizeFirstLetter
} = require('../helpers');
const { ATTACHMENT_COLOR, DICTIONARY_API_BASE_URL } = require('../config');

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
  return `${DICTIONARY_API_BASE_URL}/${word}`;
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
 * A method to get definition of word
 * @param  String word
 * @return Object {definition}
 */
function getDefinition(word) {
  return new Promise((resolve, reject) => {
    const url = dictionaryApiUrlBuilder(word);
    request(url, {
      headers: {
        'User-Agent': random_ua.generate()
      }
    }, (error, response, data) => {
      if (!error && response.statusCode == 200) {
        const response = JSON.parse(data).reduce((previousEntry, currentEntry) => {
          return `${previousEntry}• *${currentEntry.type.toUpperCase()}*\n${currentEntry.defenition}\n_${currentEntry.example || 'N/A'}_\n\n`;
        }, '').replace('<b>', '*').replace('</b>', '*').replace('<i>', '_').replace('</i>', '_');

        return resolve(response);

      } else {
        reject();
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
            color: ATTACHMENT_COLOR,
            text: result.example,
            author_name: `Urban Dictionary | Define '${word}'`,
            author_link: result.url
          }]
        });
      })
      .catch(() => {
        bot.reply(message, 'Oh my...something embarassing happened. Try again.');
      });
  },
  definitionCommand: (bot, message, text='') => {
    // Strip message down to word(s) to be defined
    let keyword = '';
    let word = '';

    if(text) {
      word = text;
    } else {
      keyword = message.match[0];
      word = message.text.replace(keyword, '').split(' ').splice(1, 2).join(' ');
    }

    // Show bot is typing for best UX
    bot.startTyping(message);
    // Call helper function to do conversion
    getDefinition(word.toLowerCase())
      .then(result => {
        if(result) {
          bot.reply(message, {
            text: `Definition for *${word}*:`,
            attachments: [{
              color: ATTACHMENT_COLOR,
              text: result,
              mrkdwn_in: ['text']
            }]
          });
        } else {
          bot.reply(message, '¯\\_(ツ)_/¯ Sorry, couldn\'t find a definition for that');
        }
        
      })
      .catch(() => {
        bot.reply(message, 'Oh my...something embarassing happened. Try again.');
      });
  }
};
