const mysql = require('mysql');

const connection = mysql.createConnection({
    debug: false,
    host: '127.0.0.1',
    port: 3306,
    database: 'areyna_cs355fa22',
    user: 'areyna_cs355fa22',
    password: 're5790400',
});

module.exports = connection;