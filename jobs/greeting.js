/**
 * Greeting from bot
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */

const { ICON_URL } = require('../config');
const { logger } = require('../logger');

module.exports = (channelId, bot, message = 'Good morning') => {
  return () => {
    logger.debug(new Date() + ' - ' + message);
    bot.say({
      channel: channelId,
      text: message,
      username: bot.identity.name,
      icon_url: ICON_URL,
      as_user: false
    });
  };
};
