/**
 * Exports the generators so plop knows them
 * 
 * @author Anthony Acquah <tmobster@gmail.com>
 */

const commandGenerator = require('./commands/index');
const eventHandlerGenerator = require('./events/index');
const jobGenerator = require('./jobs/index');

module.exports = (plop) => {
  plop.setGenerator('command', commandGenerator);
  plop.setGenerator('eventHandler', eventHandlerGenerator);
  plop.setGenerator('job', jobGenerator);
};
