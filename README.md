# Slackbot

## Introduction

> A simple slackbot for the DevCongress slack, which does tasks including:

- welcome new members
- greet in the morning and night
- forex echange to GH¢ e.g. `@botname usd 20`
- `define` word: grabs the meaning of word from the Urban Dictionary

## Commands

You can add new commands under the `commands` directory and load them into the `index.js` file.

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
    
```bash
token=<MY TOKEN> node index.js
```

The bot is written with botkit which you can learn more about it here [http://howdy.ai/botkit](http://howdy.ai/botkit)

## License

This project is licensed under the MIT license.
