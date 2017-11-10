/**
 * Introduce where to find what to new members when they join
 * @author Andrew Smith <a.smith@silentworks.co.uk>
 */

const helpers = require('../helpers');

module.exports = () => {
  return (bot, message) => {
    //  let channelId = message.channel;
    let intro = (response, convo) => {
      // Show bot is typing for best UX
      bot.startTyping(message);

      let replyMsg = `Welcome again \n
Please remember to fill out the 'What I do' section of your profile. \n\n
We are happy to have you all as part of our community, there are some 
channels for specific topics that is good for you to know about. \n
#help - If you want help with any programming issues, after checking stackoverflow, you can post it here. You will have all of the smartest minds trying to help you \n
#random - anything that doest fit anywhere else goes here \n
#jobs - post all you jobs here. its toatlly free. Read the channel description for guidelines for job postings \n
#resources - learning materials that we would like to keep and come back to some time later \n
#events - all upcomming events should be posted here. Do check the DevCongress calendar for availability. As much as possible, lets not have clashing events. The gh dev community is small enough to have clashing events`;

      let replyMsgResponse = 'I hope you will have a very productive day today.';

      convo.ask(replyMsg, (response, convo) => {
        // log message and response object for debugging later
        // bot.botkit.log(new Date() + ' - ' + replyMsg, response);

        // Show bot is typing for best UX
        bot.startTyping(message);

        convo.say(replyMsgResponse);
        convo.next();
      });
    };
    console.log(new Date(), message.user);
    // U0J8P9JRX
    bot.api.im.open({
      user: message.user
    }, (err, res) => {
      if (err) {
        bot.botkit.log('Failed to open IM with user', err);
      }
      console.log('Response: ', res);
      // D7JLTMVFF
      bot.say({
        channel: res.channel.id,
        text: 'Hello mate'
      });
      /* bot.startConversation({
        user: message.user,
        channel: res.channel.id
      }, intro); */
    });
  };
};
