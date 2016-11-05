/**
 * Exports the generators so plop knows them
 * 
 * @author Anthony Acquah <tmobster@gmail.com>
 */

const commandGenerator = require('./commands/index.js');

module.exports = (plop) => {
  plop.setGenerator('command', commandGenerator);
};
