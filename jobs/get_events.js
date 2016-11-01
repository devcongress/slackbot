'use strict'

const {
  pluralize,
  getNextDay,
  getStartOfDay,
} = require('../helpers');
const config = require('../config');

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
    return function (err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data.items);
    };
  }
}

function displayEvents(events, bot, todayOrTomorrow) {
  if (events.length) {
    let i, event,
      attachments = [],
      text = `${pluralize(events.length, 'event')} happening ${todayOrTomorrow}:`;

    for (i = 0; i < events.length; i++) {
      event = events[i];

      attachments.push({
        fields: [{
          title: 'Location',
          value: event.location
        }, {
          title: 'Start At',
          value: event.start,
          short: true
        }, {
          title: 'Ends At',
          value: event.end,
          short: true
        }, {
          title: 'Description',
          value: event.description
        }],

        title: event.summary,
        title_link: event.htmlLink,
        author_name: event.creator.displayName,
        author_url: `mailto:${event.creator.email}`,
        color: config.ATTACHMENT_COLOR
      });
    }

    return bot.say({
      text,
      channel: config.EVENTS_ID,
      attachments,
      as_user: false,
      icon_emoji: ':calendar:',
      username: bot.identity.name
    });
  }

  return bot.say({
    text: `No events happening ${todayOrTomorrow}`,
    channel: config.EVENTS_ID,
    as_user: false,
    icon_emoji: ':calendar:',
    username: bot.identity.name
  });
}

module.exports = {
  getEventsHappeningToday: (bot) => {
    return () => {
      getEventsFor('today')
        .then(displayEvents(events, bot, 'today')).
      catch(err => console.error(err));
    };
  },
  getEventsHappeningTomorrow: (bot) => {
    return () => {
      getEventsFor('tomorrow')
        .then(displayEvents(events, bot, 'tomorrow')).
      catch(err => console.error(err));
    };
  }
}
