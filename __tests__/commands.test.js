require('dotenv').config();
const Botmock = require('botkit-mock');
const controllers = require('../commands');

const buildMessage = (text, opts) => {
  let message = Object.assign({
    text: text,
    isAssertion: true
  }, opts);
  
  return message;
};

describe('controllers test', () => {
  beforeEach(() => {
    this.controller = Botmock({
      debug: false
    });

    this.bot = this.controller.spawn({
      type: 'slack'
    });

    this.buildSequence = function (messages){
      return [
        {
          user: 'user123',
          channel: 'channel123',
          messages: messages
        }
      ];
    }

    controllers(this.controller);
  });

  it('should say how are you today?', () => {
    let messages = [
      buildMessage('Good morning')
    ];

    return this.bot.usersInput(this.buildSequence(messages))
      .then(message => {
        return expect(message.text).toBe('How are you today?');
      });
  });

  describe('say i am fine', () => {
    it('should return text I hope you will have a very productive day today.', () => {
      let messages = [
        buildMessage('Good morning', { isAssertion: false }),
        buildMessage('fine')
      ];
      return this.bot.usersInput(this.buildSequence(messages))
        .then(message => {
          return expect(message.text)
            .toBe('I hope you will have a very productive day today.');
        });
    });
  });
});
