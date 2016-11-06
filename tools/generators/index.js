/**
 * Exports the generators so plop knows them
 * 
 * @author Anthony Acquah <tmobster@gmail.com>
 */

const commandGenerator = require('./commands/index.js');
const eventHandlerGenerator = require('./events/index');

module.exports = (plop) => {
  plop.setGenerator('command', commandGenerator);
  plop.setGenerator('eventHandler', eventHandlerGenerator);
};
