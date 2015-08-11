/**
 * Spec parser.
 * @memberof module:mysqlspec/lib/parsing
 * @inner
 * @constructor SpecParser
 */

"use strict";


/** @lends SpecParser */
function SpecParser(config) {
    var s = this;
}

SpecParser.prototype = {
    /**
     * Parse desc for table.
     */
    parseTableDesc: function (name, desc) {
        var s = this,
            required = [],
            properties = {};
        Object.keys(desc).forEach(function (key) {
            var col = desc[key];
            if (s._parseRequired(col)) {
                required.push(key);
            }
            properties[key] = {
                type: s._parseType(col),
                maxLength: s._parseMaxlength(col)
            }
        });
        return s._cleanEmptyProperty({
            title: name,
            description: 'JSON schema for mysql table "' + name + '"',
            type: "object",
            properties: properties,
            required: required,
            additionalProperties: false
        });
    },
    _cleanEmptyProperty: function (data) {
        Object.keys(data).forEach(function (key) {
            var isEmpty = (key === undefined) || (key === null) || (key === '');
            if (isEmpty) {
                delete data[key];
            }
        });
        return data;
    },
    _parseRequired: function (col) {
        return col.Null === 'NO';
    },
    _parseMaxlength: function (col) {
        var type = col.Type;
        if (!type) {
            return undefined;
        }
        var matched = type.match(/\((\d+)\)/);
        return matched ? Number(matched.pop()) : undefined;
    },
    _parseType: function (col) {
        var s = this;
        var type = col.Type;
        if (!type) {
            return undefined;
        }
        var mysqlType = type.replace(/\([\d,]+\)/, '').toUpperCase().split(' ').shift();
        switch (mysqlType) {
            case 'LONGTEXT':
            case 'MEDIUMTEXT':
            case 'TEXT':
            case 'TINYTEXT':
            case 'VARCHAR':
            case 'CHAR':
                return 'string';
            case 'TINYINT':
            case 'SMALLINT':
            case 'MEDIUMINT':
            case 'INT':
            case 'BIGINT':
                return 'integer';
            case 'FLOAT':
            case 'DOUBLE':
            case 'DECIMAL':
            case 'NUMERIC':
                return 'number';
            case 'DATE':
            case 'DATETIME':
                return 'date';
            case 'LONGBLOB':
            case 'MEDIUMBLOB':
            case 'TINYBLOB':
                return 'string';
            default:
                return mysqlType;
        }
    }
};

module.exports = SpecParser;