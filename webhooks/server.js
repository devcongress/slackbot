const { ICON_URL, GITHUB_ID, ATTACHMENT_COLOR } = require('../config');
const app = require('polka');
const { json } = require('body-parser');
const { logger } = require('../logger');
const PORT = process.env.PORT || 3000;

module.exports = (bot) => {
  app()
    .use(json())
    .post('/webhooks/github', (req, res) => {
      const { action, number, pull_request, repository } = req.body;

      if (action === 'opened' || action === 'reopened') {
        const message = `Pull Request #${number} opened on *${repository.full_name}*`;
        const payload = {
          icon_url: ICON_URL,
          channel: GITHUB_ID,
          username: bot.identity.name,
          as_user: false,
          attachments: [{
            author_name: pull_request.user.login,
            color: ATTACHMENT_COLOR,
            title: 'View on Github',
            title_link: pull_request.html_url,
            text: pull_request.title,
            pretext: message,
            mrkdwn_in: ['text', 'pretext'],
            footer: 'Github',
            footer_icon: 'http://www.zib.de/miltenberger/github-icon.png'
          }],
        };

        bot.say(payload);
      }

      res.status = 200;
      res.end();
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      logger.info('> Running on localhost:3000');
    });
};
