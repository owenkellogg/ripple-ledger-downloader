var Sequelize = require('sequelize');
var database = require(__dirname+'/../lib/database.js');

database.query('select * from ledgers').complete(console.log);

