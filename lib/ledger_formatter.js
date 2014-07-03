var _ = require('underscore-node');

function LedgerFormatter(ledger){
  this.ledger = ledger;
}

LedgerFormatter.prototype = {
  formatLedger: function() {
    var self = this;
    var output = {};
    output.ledger_index = self.ledger.ledger_index;
    output.transactions = _.map(self.ledger.transactions, function(transaction) {
      return {
        hash: transaction.hash,
        type: transaction.TransactionType
      }
    });
    return output;
  },
  logFormattedLedger: function() {
    var self = this;
    console.log(self.formatLedger());
  }
}

module.exports = LedgerFormatter;

