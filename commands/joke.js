'use strict';

const request = require('request');
const randomUA = require('random-ua');
const config = require('../config');
const { capitalizeFirstLetter } = require('../helpers');

/**
 * Returns the default request headers
 * @return {Object} 
 */
function getRequestHeaders() {
    return {
        headers: {
            'User-Agent': randomUA.generate()
        }
    }
}

/**
 * Get slack IDs of users mentioned in a message
 * @param  {String} input
 * @return {Array}     
 */
function getMentionedUsers(input) {
    var pattern = /<@([\d\w]+)>/ig;
    var matches = [];
    var match = pattern.exec(input);
    while (match) {
        matches.push(match[1]);
        match = pattern.exec(input);
    }

    return matches;
}

/**
 * Post a joke
 * @param  {Object} message 
 * @param  {Object} bot     
 * @param  {String} joke   
 */
function postJoke(message, bot, joke) {
    bot.startTyping(message);
    bot.reply(message, joke);
}

/**
 * Post a human friendly error message
 * @param  {Object} message 
 * @param  {Object} bot     
 * @param  {String} error   
 */
function postErrorMessage(message, bot, error) {
    bot.startTyping(message);
    bot.reply(message, error);
}

/**
 * Get a random joke from the ICNDB
 * @param  {Object} character 
 * @return {Promise} 
 */
function fetchJoke(character) {
    let url = `${config.ICNDB}?firstName=${character.firstname}&lastName=${character.lastname}`;
    return new Promise(
        (resolve, reject) => {
            request(url, getRequestHeaders(),
                (error, response, html) => {
                    if (!error && response.statusCode == 200) {
                        resolve(JSON.parse(html).value.joke);
                    } else {
                        reject(error || false);
                    }
                }); // request
        }); // Promise
}

/**
 * Tell a joke with any mentioned user as the main character
 * @param  {Object} message 
 * @param  {Object} bot     
 * @param  {String} user     
 */
function tellJokeWithUser(message, bot, user) {
    bot.api.users.info({ user: user }, (error, response) => {
        if (!error) {
            let fetchedUser = response.user;
            let firstname = fetchedUser.first_name || fetchedUser.name;
            let lastname = fetchedUser.lastname || "";
            let userDetails = {
                firstname: capitalizeFirstLetter(firstname),
                lastname: capitalizeFirstLetter(lastname)
            };
            tellJoke(message, bot, userDetails);
        }
        else {
            postErrorMessage(message, bot, "I dont know who you're talking about");
        }
    });
}

/**
 * Tell a joke
 * @param  {Object} message 
 * @param  {Object} bot     
 * @param  {String} user     
 */
function tellJoke(message, bot, user) {
    user = Object.assign({ firstname: "Chuck", lastname: "Norris" }, user);
    fetchJoke(user)
        .then(joke => {
            postJoke(message, bot, joke);
        })
        .catch(error => {
            postErrorMessage(message, bot, "I got nothing.Guess the joke's on you");
        });
}

module.exports = (bot, message) => {
    let mentions = getMentionedUsers(message.match.input);
    if (mentions.length > 0) {
        mentions.forEach((user) => {
            tellJokeWithUser(message, bot, user)
        });
    }
    else {
        tellJoke(message, bot);
    }
};
