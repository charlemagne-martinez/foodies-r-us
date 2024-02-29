/*
 * Citation: Citation is from node.js starter code
 * Date: 02/28/2024
 * Copied from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */ 
// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_martcha2',
    password        : '5654',
    database        : 'cs340_martcha2'
})

// Export it for use in our applicaiton
module.exports.pool = pool;