module.exports = (bot) => {
  const express = require('express');
  const bodyParser = require('body-parser');
  const routes = require('./routes')(bot);


  const PORT = process.env.PORT || 3000;
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use('/webhooks', routes);

  app.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
  });
};
