var LedgerDownloader = require(__dirname+'/../lib/ledger_downloader.js');
var LedgerFormatter = require(__dirname+'/../lib/ledger_formatter.js');
var Ledger = require(__dirname+'/../lib/models/ledger.js');

var ledgerDownloader = new LedgerDownloader();
var currentLedgerIndex;

ledgerDownloader.getMostRecentlyClosedLedger(function(error, ledger) {
  console.log('got most recently closed ledger');
  if (error) {
    console.log('error', error);
  } else {
    currentLedgerIndex = ledger.ledger_index;
    console.log('ledger', ledger.ledger_index);
    getLedgersRecursively(getLedgersRecursively);
  }
});

function getLedgersRecursively(callback) {
  console.log('getLedgersRecursively');
  ledgerDownloader.getLedger(currentLedgerIndex-1, function(error, ledger) {
    if (error) {
      console.log('error', error);
      callback(callback);
    } else {
      var ledgerFormatter = new LedgerFormatter(ledger);
      ledgerFormatter.logFormattedLedger();
      currentLedgerIndex = ledger.ledger_index;
      Ledger.create({
        id: ledger.ledger_index,
        hash: ledger.hash    
      }).complete(function(){
        callback(callback);
      });
    }
  })
};
/*
downloader = new LedgerDownloader(function(ledger, next) {
  Ledger.createFromRippledFormat(ledger).complete(next);
});

downloader.downloadLedgers();

*/
