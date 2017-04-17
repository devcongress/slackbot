'use strict';

const greetingCommand = require('./greeting');
const getMotivationalMessage = require('./getMotivationalMessage');
const config = require('../config');

module.exports = (scheduler, bot) => {
  const goodMorningGreetingCommand = greetingCommand(config.GENERAL_ID, bot);
  const getMotivationalMessageCommand = getMotivationalMessage(config.GENERAL_ID, bot);
  const goodNightGreetingCommand = greetingCommand(config.GENERAL_ID, bot, `Good night ${config.APP_NAME}`);
  const getAstronomyPictureOfTheDayCommand = require('./get_astronomy_picture_of_the_day')(config.RANDOM_ID, bot);
  const announceEventsHappeningTodayCommand = require('./announce_events_happening_today')(config.EVENTS_ID, config.ICON_URL, bot);
  const announceEventsHappeningTomorrowCommand = require('./announce_events_happening_tomorrow')(config.EVENTS_ID, config.ICON_URL, bot);

  scheduler.scheduleJob('00 8 * * *', goodMorningGreetingCommand);
  scheduler.scheduleJob('30 9 * * *', getMotivationalMessageCommand);
  scheduler.scheduleJob('30 23 * * *', goodNightGreetingCommand);
  scheduler.scheduleJob('0 13 * * *', getAstronomyPictureOfTheDayCommand);
  scheduler.scheduleJob('00 6 * * *', announceEventsHappeningTodayCommand);
  scheduler.scheduleJob('0 20 * * *', announceEventsHappeningTomorrowCommand);
  scheduler.scheduleJob('0 16 * * *', announceEventsHappeningTomorrowCommand);
};
