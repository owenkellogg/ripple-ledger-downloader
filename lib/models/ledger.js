var Sequelize = require('sequelize');
var database = require(__dirname+'/../database.js');

var Ledger = database.model('Ledger', {
  ledgerIndex: Sequelize.INTEGER
});

module.exports = Ledger;

