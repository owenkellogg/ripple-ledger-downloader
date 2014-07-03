var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: ':memory'
  //storage: 'path/to/database.sqlite'
});

module.exports = sequelize;

