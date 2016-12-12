/**
 * Every morning, announce upcoming events for the day, and
 * events that are due tomorrow.
 *
 * @author Yaw Boakye <wheresyaw@gmail.com>
 */
'use strict';

const config = require('../config');
const { getEventsFor, pluralize } = require('../helpers');

module.exports = (channel, iconUrl, bot) => {
  return () => {
    getEventsFor('tomorrow').
      then(events => {
        if (events.length) {
          let i, event,
            attachments = [],
            text = `${pluralize(events.length, 'event')} happening tomorrow:`;

          for (i = 0; i < events.length; i++) {
            event = events[i];

            attachments.push({
              fields: [
                { title: 'Location', value: event.location },
                { title: 'Start At', value: event.start, short: true },
                { title: 'Ends At', value: event.end, short: true },
                { title: 'Description', value: event.description }
              ],

              title: event.summary,
              title_link: event.htmlLink,
              author_name: event.creator.displayName,
              author_url: `mailto:${event.creator.email}`,
              color: config.ATTACHMENT_COLOR
            });
          }

          bot.api.chat.postMessage({
            text,
            channel,
            attachments,
            as_user: false,
            icon_emoji: ':calendar:',
            username: bot.identity.name
          });
        }
      }).
      catch(err => console.error(err));
  };
};
