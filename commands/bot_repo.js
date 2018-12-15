/**
 * Whoami
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */
module.exports = (botRepoUrl) => {
  return (bot, message) => {
    bot.startTyping(message);
    bot.reply(message, `You can contribute to me at ${botRepoUrl}`);
  };
};
