/**
 * Say Welcome to new members when they join
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */
const helpers = require('../helpers');
const config = require('../config');
const logger = require('../logger');

module.exports = (channelIdForGeneral) => {
  return (bot, message) => {
    let channelId = message.channel;

    if (channelId === channelIdForGeneral) {
      bot.api.users.info({
        user: message.user
      }, (err, data) => {
        if (data && data.user && data.user.name) {
          let userHandle = helpers.createUserHandle(message.user, data.user.name);
          let replyMsg = `Welcome to ${config.APP_NAME} ${userHandle}. Remember to fill out the 'What I do' section of your profile.`;
          console.log(new Date() + ' - ' + replyMsg);
          bot.reply(message, replyMsg);
        }
      });
    }
  };
};
