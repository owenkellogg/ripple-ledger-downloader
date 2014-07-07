var LedgerDownloader = require(__dirname+'/../lib/ledger_downloader.js');
var Ledger = require(__dirname+'/../lib/models/ledger.js');

var ledgerDownloader = new LedgerDownloader({
  onLedger: function(ledger, next) {
    Ledger.find({ where: {
      id: ledger.ledger_index
    }}).complete(function(error, record) {
      if (error)  { return next(error, null); }
      if (record) { return next(null, record.id); }
      Ledger.create({
        id: ledger.ledger_index,
        hash: ledger.hash    
      }).complete(function(error, ledger){
        if (error) {
          next(error, null);
        } else {
          next(null, ledger.id);
        }  
      });
    })
  }
});

ledgerDownloader.start();

