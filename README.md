# Slackbot

## Introduction

> A simple slackbot for the DevCongress slack, which does tasks including:

- welcome new members
- greet in the morning and night
- forex exchange to GH¢ e.g. `@botname convert 20 euros` or `@botname convert $30`
- forex exchange from one currency to another e.g. `@botname convert 20 eur to gbp`
- Define common English words e.g. `@botname define fire` or `@botname What is the meaning of marketing`

## Teaching the bot new tricks

- Read the [Contribution Guide](https://github.com/devcongress/slackbot/blob/develop/CONTRIBUTING.md).
- Open your terminal and run `npm run generate`, follow the prompts to scaffold the required files.
- Replace the scaffolded code with your own
- Submit a PR

Find relevant documentation at [Botkit](https://github.com/howdyai/botkit/blob/master/readme.md) and [Slack API](https://api.slack.com/)

## Installation

Clone the repository

> git clone https://github.com/devcongress/slackbot

Go to your terminal and navigate to the directory you cloned the code to and run

```bash
npm install
```

### Run the Bot:

Get a Bot token from Slack:

> http://my.slack.com/services/new/bot

Rename `example.env` to `.env` and update the environment variables in the file.

Run your bot from the command line:
    
```bash
node index.js
```

The bot is written with botkit which you can learn more about it here [http://howdy.ai/botkit](http://howdy.ai/botkit)

## License

This project is licensed under the MIT license.
