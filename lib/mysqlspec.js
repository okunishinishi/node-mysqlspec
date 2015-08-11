/**
 * Get spec of tables in a database.
 * @function mysqlspec
 * @param {object} config - Connect configuration.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqlspec({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *      database: 'my_db'
 *  }, function (err, spec) {
 *  });
 */

/**
 * Get spec of tables in a database.
 * @function mysqlspec
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqlspec({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', function (err, spec) {
 *  });
 */

/**
 * Get spec of a table.
 * @function mysqlspec
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table to describe.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqlspec({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', 'some_table', function (err, spec) {
 *  });
 */


/**
 * Get spec of tables in a database.
 * @function mysqlspec.specifyDatabase
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqlspec.specifyDatabase({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', function (err, spec) {
 *  });
 */

/**
 * Get spec of a table.
 * @function mysqlspec.specifyTable
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table to describe.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqlspec.specifyTable({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', 'some_table', function (err, spec) {
 *  });
 */

"use strict";

var argx = require('argx'),
    MysqlSpecifier = require('./specifying/mysql_specifier');

/** @lends mysqlspec */
function mysqlspec(config, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    config = args.shift();

    var database = args.shift('string') || config.database;
    if (!database) {
        callback(new Error('database is required.'));
        return;
    }
    var table = args.shift('string');
    if (table) {
        mysqlspec.specifyTable(config, database, table, callback);
    } else {
        mysqlspec.specifyDatabase(config, database, callback);
    }
}

/** @lends mysqlspec.specifyDatabase */
mysqlspec.specifyDatabase = function specifyDatabase(config, database, callback) {
    new MysqlSpecifier(config).specifyDatabase(database, callback);
};

/** @lends mysqlspec.specifyTable */
mysqlspec.specifyTable = function specifyTable(config, database, table, callback) {
    new MysqlSpecifier(config).specifyTable(database, table, callback);
};


module.exports = mysqlspec;