var Sequelize = require('sequelize');
var database = require(__dirname+'/../database.js');

var Ledger = database.define('ledgers', {
  ledgerIndex: Sequelize.INTEGER
});

module.exports = Ledger;

