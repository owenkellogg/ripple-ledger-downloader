var Sequelize = require('sequelize');
var database = require(__dirname+'/../database.js');

var Ledger = database.define('ledgers', {
  id: Sequelize.INTEGER,
  hash: Sequelize.STRING
});

module.exports = Ledger;

