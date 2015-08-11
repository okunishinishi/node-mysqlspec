/**
 * Setup database for test.
 * @function setupTestDb
 * @param {function} callback - Callback when done.
 */

"use strict";

var path = require('path'),
    mysql = require('mysql'),
    async = require('async'),
    fs = require('fs');

var basedir = path.resolve(__dirname, '../..'),
    config = require('../configs/test_db_config'),
    SETUP_SQL_FILE = path.resolve(basedir, 'ci/assets/setup_test_db.sql');

/** @lends setupTestDb */
function setupTestDb(callback) {
    var connection = mysql.createConnection(config);
    async.waterfall([
        function (callback) {
            fs.readFile(SETUP_SQL_FILE, callback);
        },
        function (sql, callback) {
            connection.connect();
            connection.query(String(sql), callback);
        }
    ], function (err) {
        connection.end(function () {
            if (err) {
                console.error(err);
            }
            callback(err);
        });
    });
}
module.exports = setupTestDb;