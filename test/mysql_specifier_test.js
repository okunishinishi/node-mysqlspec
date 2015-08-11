/**
 * Test case for mysqlSpecifier.
 * Runs with nodeunit.
 */

var MysqlSpecifier = require('../lib/specifying/mysql_specifier.js');


var testDbConfig = require('../ci/configs/test_db_config'),
    setupTestDb = require('../ci/helpers/setup_test_db');

exports.setUp = function (done) {
    setupTestDb(function (err) {
        done();
    });
};

exports['specify a table.'] = function (test) {
    var specifier = new MysqlSpecifier(testDbConfig);
    specifier.specifyTable('my_test_database', 'TEST_SHOP', function (err, spec) {
        test.ifError(err);
        test.deepEqual(spec.properties, {
            id: {type: 'integer', maxLength: 5},
            article: {type: 'integer', maxLength: 4},
            dealer: {type: 'string', maxLength: 20},
            price: {type: 'number', maxLength: undefined}
        });
        test.deepEqual(spec.required, [
            'id', 'article', 'dealer', 'price'
        ]);
        test.done();
    });
};

exports['specify a database.'] = function (test) {
    var specifier = new MysqlSpecifier(testDbConfig);
    specifier.specifyDatabase('my_test_database', function (err, spec) {
        test.ifError(err);
        var names = Object.keys(spec);
        test.deepEqual(names, ['TEST_PERSON', 'TEST_PRODUCT', 'TEST_SHOP']);
        test.deepEqual(spec['TEST_PERSON']['properties'], {
            id: {type: 'integer', maxLength: 11},
            last_name: {type: 'string', maxLength: 255},
            first_name: {type: 'string', maxLength: 255},
            address: {type: 'string', maxLength: 255},
            city: {type: 'string', maxLength: 255}
        });
        test.done();
    });
};

