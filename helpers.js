'use strict';

module.exports = {
  /**
   * Create a helper method to strip ',' from amount and return number to 2 decimals
   * @param  string invalidNumber
   * @return string
   */
  stripCommas(invalidNumber) {
    return parseFloat(invalidNumber.replace(',', '').trim()).toFixed(2);
  },

  /**
   * Capitalizes first letter of string and returns string
   * @param  string text
   * @return string
   */
  capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  /**
   * Create a helper method to handle slack user handle creation
   * @param  string userId
   * @param  string username
   * @return string
   */
  createUserHandle(userId, username) {
    return `<@${userId}|${username}>`;
  }
};
