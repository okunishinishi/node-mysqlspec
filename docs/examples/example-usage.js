var mysqlspec = require('mysqlspec');

// Mysql connect config.
var config = {
    user: 'root',
    password: 'my_password',
    host: 'localhost',
    database: 'my_db'
};
// Get spec for connected database
mysqlspec(config, function (err, data) {
    console.log("structure=" + JSON.stringify(data, null, 4));
});