var LedgerDownloader = require(__dirname+'/../lib/ledger_downloader.js');
var _ = require('underscore-node');

var ledgerDownloader = new LedgerDownloader();
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

