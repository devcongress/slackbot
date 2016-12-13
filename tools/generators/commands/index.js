/**
 * Command Generator
 * 
 * @author Anthony Acquah <tmobster@gmail.com>
 */

module.exports = {
  description: 'Add a command. This is used when you want the bot to listen for and respond to ' +
    'specific phrases e.g. "Define word"',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the command?',
    validate: (value) => {
      if (value.length < 1 || value.includes(' ')) {
        return 'A name is required and should be 1 word with no spaces';
      }

      return true;
    },
  }, {
    type: 'input',
    name: 'description',
    message: 'What does the command do?',
  }, {
    type: 'input',
    name: 'triggers',
    message: 'What words should trigger this command?\nSeparate multiple words with ",". You can also specify a regex:',
  }, {
    type: 'checkbox',
    name: 'listenFor',
    message: 'What should the bot respond to?',
    choices: [{
      name: 'Direct messages',
      value: 'direct_message',
      checked: true
    }, {
      name: 'Direct mentions',
      value: 'direct_mention',
      checked: true
    }, {
      name: 'Mentions',
      value: 'mention',
      checked: true
    }],
    validate: (choices) => {
      if (choices.length < 1) {
        return 'You must select at least 1 of these';
      }

      return true;
    }
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
      path: '../../commands/{{snakeCase name}}.js',
      templateFile: './commands/command.js.hbs',
      abortOnFail: true,
    }, {
      type: "modify",
      path: '../../commands/index.js',
      pattern: /(\/\/ Load commands here)/g,
      template: "$1\nconst {{camelCase name}}Command = require(\'.\/{{snakeCase name}}\');"
    }, {
      type: "modify",
      path: '../../commands/index.js',
      pattern: /(\/\/ Register commands here)/g,
      templateFile: './commands/register_command.js.hbs'
    }];

    return actions;
  }
};
