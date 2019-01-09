/**
 * Every morning, announce upcoming events for the day, and
 * events that are due tomorrow.
 *
 * @author Yaw Boakye <wheresyaw@gmail.com>
 */
'use strict';

const { logger } = require('../logger');
const { getEventsFor, pluralize } = require('../helpers');
const eventResponse = require('./event_response');

module.exports = (channel, iconUrl, bot) => {
  return () => {
    getEventsFor('today').
      then(events => {
        if (!events.length) return;
        
        let attachments = eventResponse(events),
          text = `${pluralize(events.length, 'event')} happening ${when}:`;

        bot.api.chat.postMessage({
          text,
          channel,
          attachments,
          as_user: false,
          icon_emoji: ':calendar:',
          username: bot.identity.name
        });
      }).
      catch(err => logger.error(err));
  };
};
