module.exports = {
  ATTACHMENT_COLOR: '#4abfa4',
  APOD_API_URL: `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_API_KEY}`,
  APOD_WEB_URL: 'https://apod.nasa.gov/apod/astropix.html',
  XE_WEB_URL: 'http://www.xe.com/currencyconverter/convert',
  ICNDB: 'http://api.icndb.com/jokes/random',
  APP_NAME: process.env.APP_NAME || 'MyApp',
  GENERAL_ID: process.env.GENERAL_ID || '',
  RANDOM_ID: process.env.RANDOM_ID || '',
  EVENTS_ID: process.env.EVENTS_ID || '',
  ICON_URL: process.env.ICON_URL || '',
  API_AI_TOKEN: process.env.API_AI_TOKEN,
  DICTIONARY_API_BASE_URL: 'https://owlbot.info/api/v1/dictionary',
  GCAL_API_KEY: process.env.GCAL_API_KEY,
  GHANA_TECH_CAL_ID: process.env.GHANA_TECH_CAL_ID,
  DOCS_URL: 'https://github.com/devcongress/slackbot/blob/master/README.md',
  CURRENCY_SYMBOLS :{
    EUR: '€',
    USD: '$',
    GBP: '£'
  },
  NLP_INTENTS : {
    WORD_DEFINITION: 'define-word',
    GHS_CONVERSION: 'convert-to-ghana-cedis',
    CONVERT_FROM_X_TO_Y: 'convert-from-x-to-y'
  }
};
