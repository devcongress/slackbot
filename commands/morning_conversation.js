/**
 * Morning converation with user
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */
module.exports = (appName) => {
  return (bot, message) => {
    let howAreYou = (response, convo) => {
      let message = 'How are you today?';
      let messageResponse = 'I hope you will have a very productive day today.';
      convo.ask('How are you today?', (response, convo) => {
        console.log(new Date() + ' - ' + message, response);
        convo.say('I hope you will have a very productive day today.');
        convo.next();
      });
    }

    bot.startConversation(message, howAreYou);
  }
};
