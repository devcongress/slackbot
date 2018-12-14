/**
 * Get Jobs from DevCongress Jobs board
 * @author David Oddoye <oddoyedavid@gmail.com>
 */
'use strict';

const request = require('request');
const config = require('../config');

const stopWords = [
  'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
  'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
  'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
  'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
  'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
  'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
  'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
  'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
  'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i'];

/**
 * A method to get jobs from the DevCongress Jobs board API
 * @param  String searchTerm
 * @return JSON
 */
function getJobs(searchTerm) {
  return new Promise((resolve, reject) => {
    request(`${config.JOBS_URL}/?q=${searchTerm}`, {
      headers: {
        'Accept': 'application/json'
      }
    }, (error, response) => {
      if (!error && response.statusCode == 200) {
        const data = response.body;
        resolve(JSON.parse(data));
      } else {
        // reject if an error, false for if there was no error but status code wasn't 200
        reject(error || false);
      }
    });
  });
}

module.exports = (bot, message) => {
  bot.startTyping(message);
  // Remove matched words (job, jobs) and stop words (https://en.wikipedia.org/wiki/Stop_words)
  const searchTerms = message.text.split(' ').filter((word) => !stopWords.concat(['job', 'jobs']).includes(word));

  // Make requests for all found words
  const promises = searchTerms.map((searchTerm) => getJobs(searchTerm));
  Promise.all(promises).then((arrayOfArrayOfJobs) => {
    const jobsArray = arrayOfArrayOfJobs.reduce((result, arrayOfJobs) => result.concat(arrayOfJobs), []);
    // remove duplicate jobs
    const jobsAdded = new Set();
    const uniqueJobs = [];

    jobsArray.forEach((job) => {
      if (!jobsAdded.has(job.url)) {
        jobsAdded.add(job.url);
        uniqueJobs.push(job);
      }
    });

    if (uniqueJobs.length > 0) {
      uniqueJobs.forEach((job) => {
        bot.reply(message, {
          attachments: [{
            color: config.ATTACHMENT_COLOR,
            title: job.role,
            title_link: job.url,
            text: `*Requirements:*\n\n${job.requirements}`,
            mrkdwn_in: ['text'],
            fields: [
              {
                title: 'Salary',
                value: job.salary,
                short: false
              },
              {
                title: 'RemoteOK',
                value: job.remote_ok ? 'Yes' : 'No',
                short: false
              }
            ],
          }]
        });
      });
    } else {
      bot.reply(message, 'Couldn\'t find any jobs for these search terms');
    }
  });
};
