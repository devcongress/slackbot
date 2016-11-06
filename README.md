# Slackbot

## Introduction

> A simple slackbot for the DevCongress slack, which does tasks including:

- welcome new members
- greet in the morning and night
- forex echange to GH¢ e.g. `@botname usd 20`
- `define` word: grabs the meaning of word from the Urban Dictionary

## Teaching the bot new tricks

- Read the Contribution guide.
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

Run your bot from the command line:
    
```basb
token=<MY TOKEN> node index.js
```

The bot is written with botkit which you can learn more about it here [http://howdy.ai/botkit](http://howdy.ai/botkit)

## License

This project is licensed under the MIT license.
