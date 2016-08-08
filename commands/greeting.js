/**
 * Greeting from bot
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */
module.exports = (channelId, iconUrl, bot, message = 'Good morning') => {
  return () => {
    console.log(new Date() + ' - ' + message);
    bot.api.chat.postMessage({
      channel: channelId,
      text: message,
      username: bot.identity.name,
      icon_url: iconUrl,
      as_user: false
    });
  }
};
