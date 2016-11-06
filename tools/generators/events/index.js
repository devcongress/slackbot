/**
 * Eventhandler Generator
 * 
 * @author Anthony Acquah <tmobster@gmail.com>
 */

module.exports = {
  description: 'Add an event handler. This is used when you want the bot to react to an event occuring' +
    'e.g. to welcome new members when the "user_channel_join" event is raised.',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the event handler?',
    validate: (value) => {
      if (value.length < 1 || value.includes(' ')) {
        return 'A name is required and should be 1 word with no spaces';
      }

      return true;
    },
  }, {
    type: 'input',
    name: 'description',
    message: 'What does the event handler do?',
  }, {
    type: 'input',
    name: 'event',
    message: 'What event should trigger this handler?\n(Check https://api.slack.com/events ' +
      'and https://github.com/howdyai/botkit/blob/master/readme-slack.md#slack-specific-events for available events)',
    validate: (value) => {
      if (value.length < 1) {
        return 'An event is required';
      }

      return true;
    },
  }, {
    type: 'input',
    name: 'author',
    message: 'What is your name?',
  }, {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../events/{{snakeCase name}}.js',
      templateFile: './events/event.js.hbs',
      abortOnFail: true,
    }, {
      type: "modify",
      path: '../../events/index.js',
      pattern: /(\/\/ Load events handlers here)/g,
      template: "$1\nconst {{camelCase name}}Handler = require(\'.\/{{snakeCase name}}\');"
    }, {
      type: "modify",
      path: '../../events/index.js',
      pattern: /(\/\/ Register event handlers here)/g,
      template: "$1\n  controller.on('{{snakeCase event}}', {{camelCase name}}Handler);"
    }];

    return actions;
  }
};
