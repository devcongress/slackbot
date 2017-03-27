/**
 * Combining response for events into 1 module
 *
 * @author Yaw Boakye <wheresyaw@gmail.com>
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */
'use strict';

const config = require('../config');
const format = require('date-fns/format');

module.exports = (events) => {
  if (!events.length) return;

  let i, event,
    attachments = [];

  for (i = 0; i < events.length; i++) {
    event = events[i];

    attachments.push({
      fields: [
        { title: 'Location', value: event.location },
        { title: 'Start At', value: format(event.start.dateTime, ['ddd, MMM DD, YYYY [at] hh:mma']), short: true },
        { title: 'Ends At', value: format(event.end.dateTime, ['ddd, MMM DD, YYYY [at] hh:mma']), short: true },
        { title: 'Description', value: event.description }
      ],

      title: event.summary,
      title_link: event.htmlLink,
      author_name: event.creator.displayName,
      author_url: `mailto:${event.creator.email}`,
      color: config.ATTACHMENT_COLOR
    });
  }

  return attachments;
};
