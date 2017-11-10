/**
 * Say Welcome to new members when they join
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */
const helpers = require('../helpers');

module.exports = (channelIdForGeneral, appName) => {
  return (bot, message) => {
    let channelId = message.channel;

    if (channelId === channelIdForGeneral) {
      bot.api.users.info({
        user: message.user
      }, (err, data) => {
        if (data && data.user && data.user.name) {
          let userHandle = helpers.createUserHandle(message.user, data.user.name);
          let replyMsg = `Welcome to ${appName} ${userHandle}. Remember to fill out the 'What I do' section of your profile.`;
          bot.botkit.log(new Date() + ' - ' + replyMsg);
          bot.reply(message, replyMsg);
        }
      });
    }
  };
};
