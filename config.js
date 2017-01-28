module.exports = {
  ATTACHMENT_COLOR: '#4abfa4',
  APOD_API_URL: `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_API_KEY}`,
  APOD_WEB_URL: 'https://apod.nasa.gov/apod/astropix.html',
  XE_WEB_URL: 'http://www.xe.com/currencyconverter/convert',
  ICNDB: 'http://api.icndb.com/jokes/random',
  APP_NAME: process.env.appName || 'MyApp',
  GENERAL_ID: process.env.generalId || '',
  RANDOM_ID: process.env.randomId || '',
  EVENTS_ID: process.env.eventsId || '',
  ICON_URL: process.env.iconUrl || '',
  DICTIONARY_API_BASE_URL: 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml',
  GCAL_API_KEY: process.env.GCAL_API_KEY,
  GHANA_TECH_CAL_ID: process.env.GHANA_TECH_CAL_ID
};
