mysqlspec
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/okunishinishi/node-mysqlspec
[bd_travis_url]: http://travis-ci.org/okunishinishi/node-mysqlspec
[bd_travis_shield_url]: http://img.shields.io/travis/okunishinishi/node-mysqlspec.svg?style=flat
[bd_license_url]: https://github.com/okunishinishi/node-mysqlspec/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-mysqlspec
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-mysqlspec.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-mysqlspec.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/okunishinishi/node-mysqlspec
[bd_gemnasium_shield_url]: https://gemnasium.com/okunishinishi/node-mysqlspec.svg
[bd_npm_url]: http://www.npmjs.org/package/mysqlspec
[bd_npm_shield_url]: http://img.shields.io/npm/v/mysqlspec.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Generate JSON schema from mysql tables.

<!-- Description End -->



<!-- Sections Start -->
<a name="sections"></a>

Installation
-----

```bash
npm install mysqlspec --save-dev
```

Usage
-------

Describe database data.

```Javascript
var mysqlspec = require('mysqlspec');

// Mysql connect config.
var config = {
    user: 'root',
    password: 'my_password',
    host: 'localhost',
    database: 'my_db'
};
// Get spec for connected database
mysqlspec(config, function (err, schema) {
    console.log("schema=" + JSON.stringify(schema, null, 4));
});
```

This will result like:

```Javascript
schema = { // Schemas for in "my_db" database.
    'TEST_SHOP': { // Schema for in "my_db.TEST_SHOP" table.
        name: 'my_db.TEST_SHOP',
        properties: {
            id: {type: 'integer', maxLength: 5},
            article: {type: 'integer', maxLength: 4},
            dealer: {type: 'string', maxLength: 20},
            price: {type: 'number'}
        },
        required: ['id', 'article', 'dealer', 'price'],
        additionalProperties: false
    },
    'TEST_PERSON':{
        /**...*/
    }
};
```
API
------

| Signature | Description |
| --------- | ----------- |
| mysqlspec(config, callback) | Get JSON schem for tables in a database. |
| mysqlspec(config, databaseName, callback) | Get JSON schem for tables in a database. |
| mysqlspec(config, databaseName, tableName, callback) | Get JSON schem for a specific table. |

Tips
----

### Connection Options

`mysqlspec` uses [node-mysql](https://github.com/felixge/node-mysql/) as connector.
For more advanced setting, see the [node-mysql documents about Connection options](https://github.com/felixge/node-mysql/#connection-options)


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/okunishinishi/node-mysqlspec/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [node-mysql](https://github.com/felixge/node-mysql/)
+ [node-mysqldesc](https://github.com/okunishinishi/node-mysqldesc)
+ [json-schema](http://json-schema.org/)

<!-- Links End -->
