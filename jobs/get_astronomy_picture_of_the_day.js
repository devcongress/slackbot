/**
 * Get pictures from http://apod.nasa.gov/apod/astropix.html, NASA's famous
 * Astronomy Picture of the Day collection
 *
 * @author Yaw Boakye <wheresyaw@gmail.com>
 */
'use strict';

const config = require('../config');
const request = require('request');

/**
 * A method to get definition of word from APOD
 * @param  String word
 * @return Object {url, definition}
 */
function getAstronomyPictureOfTheDay() {
  return new Promise((resolve, reject) => {
    const url = config.APOD_API_URL;
    request(url, (error, resp, body) => {
      if (resp.statusCode === 200 && resp.headers['content-type'] === 'application/json') {
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
    getAstronomyPictureOfTheDay().
    then(result => {
      let attachments = [{
        fields: [{
          title: 'Description',
          value: result.explanation
        }, {
          title: 'Copyright',
          value: result.copyright,
          short: true
        }],
        author_name: result.title,
        color: config.ATTACHMENT_COLOR,
        image_url: result.hdurl
      }];

      bot.say({
        channel,
        attachments,
        as_user: true,
        icon_url: config.ICON_URL,
        text: 'Incoming from https://apod.nasa.gov/apod/astropix.html',
        username: 'NASA'
      });
    }).
    catch(err => console.error(err));
  };
};
