/**
 * Get pictures from http://apod.nasa.gov/apod/astropix.html, NASA's famous
 * Astronomy Picture of the Day collection
 *
 * @author Yaw Boakye <wheresyaw@gmail.com>
 */
'use strict';

const config = require('../config');
const getAstronomyPictureOfTheDay = require('../helpers').getAstronomyPictureOfTheDay;

module.exports = (channel, iconUrl, bot) => {
  return () => {
    getAstronomyPictureOfTheDay().
      then(result => {
        let attachments = [
          {
            fields: [
              { title: 'Description', value: result.explanation },
              { title: 'Copyright', value: result.copyright, short: true }
            ],
            author_name: result.title,
            color: config.ATTACHMENT_COLOR,
            image_url: result.hdurl
          }
        ];

        bot.api.chat.postMessage({
          channel,
          attachments,
          as_user: true,
          icon_url: iconUrl,
          text: 'Incoming from https://apod.nasa.gov/apod/astropix.html',
          username: 'NASA',
        });
      }).
      catch(err => console.error(err));
  };
};
