'use strict';

const greetingCommand = require('./greeting');
const getMotivationalMessage = require('./getMotivationalMessage');
const { APP_NAME, GENERAL_ID, EVENTS_ID, ICON_URL } = require('../config');

module.exports = (scheduler, bot) => {
  const goodMorningGreetingCommand = greetingCommand(GENERAL_ID, bot);
  const getMotivationalMessageCommand = getMotivationalMessage(GENERAL_ID, bot);
  const goodNightGreetingCommand = greetingCommand(GENERAL_ID, bot, `Good night ${APP_NAME}`);
  // const getAstronomyPictureOfTheDayCommand = require('./get_astronomy_picture_of_the_day')(RANDOM_ID, bot);
  const announceEventsHappeningTodayCommand = require('./announce_events_happening_today')(EVENTS_ID, ICON_URL, bot);
  const announceEventsHappeningTomorrowCommand = require('./announce_events_happening_tomorrow')(EVENTS_ID, ICON_URL, bot);

  scheduler.scheduleJob('00 8 * * *', goodMorningGreetingCommand);
  scheduler.scheduleJob('30 9 * * *', getMotivationalMessageCommand);
  scheduler.scheduleJob('30 23 * * *', goodNightGreetingCommand);
  // scheduler.scheduleJob('0 13 * * *', getAstronomyPictureOfTheDayCommand);
  scheduler.scheduleJob('00 6 * * *', announceEventsHappeningTodayCommand);
  scheduler.scheduleJob('0 20 * * *', announceEventsHappeningTomorrowCommand);
  scheduler.scheduleJob('0 16 * * *', announceEventsHappeningTomorrowCommand);
};
