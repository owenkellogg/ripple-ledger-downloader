var LedgerDownloader = require(__dirname+'/../lib/ledger_downloader.js');
var _ = require('underscore-node');

ledgerDownloader = new LedgerDownloader();

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

var currentLedgerIndex;

ledgerDownloader.getMostRecentlyClosedLedger(function(error, ledger) {
  if (error) {
    console.log('error', error);
  } else {
    currentLedgerIndex = ledger.ledger_index;
    console.log('ledger', ledger.ledger_index);
    getLedgersRecursively(getLedgersRecursively);
  }
});

function getLedgersRecursively(callback) {
  ledgerDownloader.getLedger(currentLedgerIndex-1, function(error, ledger) {
    if (error) {
      console.log('error', error);
      callback(callback);
    } else {
      var ledgerFormatter = new LedgerFormatter(ledger);
      ledgerFormatter.logFormattedLedger();

      currentLedgerIndex = ledger.ledger_index;
      callback(callback);
    }
  })
};

