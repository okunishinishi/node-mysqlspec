/**
 * Mysql specifier.
 * @memberof module:mysqlspec/lib/specifying
 * @inner
 * @constructor MysqlSpecifier
 */

"use strict";

var mysqldesc = require('mysqldesc'),
    SpecParser = require('../parsing/spec_parser'),
    async = require('async');

/** @lends MysqlSpecifier */
function MysqlSpecifier(config) {
    var s = this;
    s.parser = new SpecParser({});
    s.describer = mysqldesc.describer(config);
}

MysqlSpecifier.prototype = {
    /**
     * Specify a mysql table.
     * @param {string} database - Name of database.
     * @param {string} tableName - Table name to parse
     * @param {function} callback - Callback when done.
     */
    specifyTable: function (database, tableName, callback) {
        var s = this;
        async.waterfall([
            function (callback) {
                s.describer.describeTable(database, tableName, callback);
            },
            function (desc, callback) {
                var specName = s._nameSpec(database, tableName);
                var spec = s.parser.parseTableDesc(specName, desc);
                callback(null, spec);
            }
        ], callback);
    },
    /**
     * Specify a mysql database.
     * @param {string} database - Name of database.
     * @param {function} callback - Callback when done.
     */
    specifyDatabase: function (database, callback) {
        var s = this;
        async.waterfall([
            function (callback) {
                s.describer.describeDatabase(database, callback);
            },
            function (desc, callback) {
                var spec = {};
                Object.keys(desc).forEach(function (tableName) {
                    var specName = s._nameSpec(database, tableName);
                    spec[tableName] = s.parser.parseTableDesc(specName, desc[tableName]);
                });
                callback(null, spec);
            }
        ], callback);
    },
    _nameSpec: function (database, tableName) {
        return [database, tableName].join('.');
    }
};

module.exports = MysqlSpecifier;