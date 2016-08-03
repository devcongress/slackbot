var helpers = {};

/**
 * Create a helper method to handle slack user handle creation
 * @param  string userId
 * @param  string username
 * @return string
 */
helpers.createUserHandle = (userId, username) => {
    return '<@' + userId + '|' + username + '>';
}

module.exports = helpers;
