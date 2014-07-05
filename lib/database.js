var Sequelize = require('sequelize');
var databaseConfig = require(__dirname+'/../config/config.json');

var sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password, {
  dialect: 'postgres'
});

module.exports = sequelize;

