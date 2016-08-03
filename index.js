/*
# RUN THE BOT:
  Get a Bot token from Slack:
    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:
    token=<MY TOKEN> node index.js

# EXTEND THE BOT:
  Botkit has many features for building cool and useful bots!
  Read all about it here:
    -> http://howdy.ai/botkit
*/
let Botkit = require('botkit');

// To schedule to bot to say things at a certain date/time or recurringly
let schedule = require('node-schedule');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

let appName = 'MyApp';
let channelIdForGeneral = '';

if (process.env.appName) {
  appName = process.env.appName;
}

if (process.env.generalId) {
  channelIdForGeneral = process.env.generalId;
}

let controller = Botkit.slackbot({
  debug: false
});

let bot = controller.spawn({
  token: process.env.token
});

bot.startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

// Load commands here
let greetingCommand = require('./commands/greeting.js');
let welcomeCommand = require('./commands/welcome.js')(appName, channelIdForGeneral);

let goodMorningGreetingCommand = greetingCommand(channelIdForGeneral, bot);
let goodNightGreetingCommand = greetingCommand(channelIdForGeneral, bot, `Good night ${appName}`);

// scheduled messages
schedule.scheduleJob('30 9 * * *', goodMorningGreetingCommand);
schedule.scheduleJob('30 23 * * *', goodNightGreetingCommand);

// Welcome command
controller.on('user_channel_join', welcomeCommand);

// Welcome for bot when it joins a channel - only used for testing
// controller.on('bot_channel_join', welcomeCommand);

// controller.hears(['hello','hi'],['direct_message','direct_mention','mention'], (bot,message) => bot.reply(message,"Hello."));

// controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
//   bot.startConversation(message,function(err,convo) {
//     convo.say('Heard ya');
//   });

//   bot.startPrivateConversation(message,function(err,dm) {
//     dm.say('Private reply!');
//   });
// });
