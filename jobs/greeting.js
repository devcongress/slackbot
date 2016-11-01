/**
 * Greeting from bot
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */

const config = require('../config');

module.exports = (channelId, bot, message = 'Good morning') => {
  return () => {
    console.log(new Date() + ' - ' + message);
    bot.say({
      channel: channelId,
      text: message,
      username: bot.identity.name,
      icon_url: config.ICON_URL,
      as_user: false
    });
  }
};
