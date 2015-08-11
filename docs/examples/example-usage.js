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