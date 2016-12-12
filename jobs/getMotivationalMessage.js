/**
 * Daily motivation for Devcongress 
 * @kofiCodes <paulkarikari1@gmail.com>
 */

'use strict';

const config = require('../config');
const request = require('request');

/**
 * A method to get daily motivation message
 * @return Object {url, definition}
 */
function getMotivationalMessage() {
  return new Promise((resolve, reject) => {
    let category = ['inspire','management','life','students'];
    const url = `http://quotes.rest/qod.json?category=${category[Math.floor(Math.random() * 4)]}`;
    request(url, (error, resp, body) => {
      if (resp.statusCode === 200) {
        try {
          let json = JSON.parse(body);
          return resolve(json);
        } catch (error) {
          return reject(error);
        }
      }
      return reject(error);
    });
  });
}

module.exports = (channel, bot) => {
  return () => {
    getMotivationalMessage().then(result => {
      let attachments = [{
        'fallback': 'Daily motivation',
        'color': '#36a64f',
        'author_name': `${result.contents.quotes[0].author} says :`,
        'title': 'Daily Motivation',
        'title_link': 'https://theysaidso.com/',
        'text': result.contents.quotes[0].quote,
        'image_url': result.contents.quotes[0].background,
        'footer': 'devCongress',
        'footer_icon': 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2015-09-01/10034131408_a11ff09bebc68de99de9_88.jpg'
      }];

      bot.say({
        channel,
        attachments,
        as_user: true,
        text: 'Be Inspired',
        username: 'Quote',
        icon_url: config.ICON_URL
      });
    }).catch(err => console.error(err));
  };
};
