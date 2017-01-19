/**
 * Job Generator
 * 
 * @author Anthony Acquah <tmobster@gmail.com>
 */

module.exports = {
  description: 'Add a job. This is used when you want the bot to perform an action on a recurring cycle ' +
    'e.g. greet good morning every day at 9:30am',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the job?',
    validate: (value) => {
      if (value.length < 1 || value.includes(' ')) {
        return 'A name is required and should be 1 word with no spaces';
      }

      return true;
    },
  }, {
    type: 'input',
    name: 'description',
    message: 'What does the job do?',
  }, {
    type: 'input',
    name: 'schedule',
    message: 'On what cycle should the job be run?\n(This is a cron expression, see ' +
      'https://github.com/node-schedule/node-schedule#cron-style-scheduling for details)',
    validate: (value) => {
      if (value.length < 1) {
        return 'A schedule is required';
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
      path: '../../jobs/{{snakeCase name}}.js',
      templateFile: './jobs/job.js.hbs',
      abortOnFail: true,
    }, {
      type: "modify",
      path: '../../jobs/index.js',
      pattern: /(\/\/ Load jobs here)/g,
      template: "$1\nconst {{camelCase name}}Job = require(\'.\/{{snakeCase name}}\');"
    }, {
      type: "modify",
      path: '../../jobs/index.js',
      pattern: /(\/\/ Register jobs here)/g,
      template: "$1\n  scheduler.scheduleJob('{{schedule}}', {{snakeCase name}}Job);"
    }];

    return actions;
  }
};
