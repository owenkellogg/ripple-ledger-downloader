var Sequelize = require('sequelize');
var databaseConfig = require(__dirname+'/../config/config.json').development;

var database = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password, {
  dialect: 'postgres'
});

module.exports = database;

