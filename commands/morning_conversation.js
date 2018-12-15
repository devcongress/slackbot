/**
 * Morning converation with user
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */
const { logger } = require('../logger');

module.exports = (bot, message) => {
  let howAreYou = (response, convo) => {
    // Show bot is typing for best UX
    bot.startTyping(message);

    let replyMsg = 'How are you today?';
    let replyMsgResponse = 'I hope you will have a very productive day today.';

    convo.ask(replyMsg, (response, convo) => {
      // log message and response object for debugging later
      logger.debug(new Date() + ' - ' + replyMsg, response);

      // Show bot is typing for best UX
      bot.startTyping(message);

      convo.say(replyMsgResponse);
      convo.next();
    });
  };

  bot.startConversation(message, howAreYou);
};
