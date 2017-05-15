module.exports = (bot) => {
  const config = require('../config');
  const { Router } = require('express');

  const router = Router();

  router.post('/github', (req, res) => {
    const { action, number, pull_request, repository } = req.body;

    if(action === 'opened') {
      const message = `Pull Request #${number} opened on *${repository.full_name}*`;
      const payload = {
        icon_url: config.ICON_URL,
        channel: config.RUBY_ID,
        username: bot.identity.name,
        as_user: false,
        attachments: [{
          author_name: pull_request.user.login,
          color: config.ATTACHMENT_COLOR,
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

    res.status(200).end();
  });

  return router;
};

