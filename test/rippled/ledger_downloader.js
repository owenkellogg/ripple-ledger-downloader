var RippledLedgerDownloader = require(__dirname+'/../../lib/rippled/ledger_downloader.js');

describe('Rippled ledger download', function() {

  before(function() {
    ledgerDownloader = new RippledLedgerDownloader();
  });

  describe('Getting a ledger', function() {
    it('getLedger() should get a ledger', function(done) {
      ledgerDownloader.getLedger(ledgerOptions, function(error, ledger){
        done();
      });
    });  
  });

  describe('Getting a batch of ledgers', function() {
    it('getLedgerBatch() should get a batch of ledgers', function(done) {
      ledgerDownloader.getLedgerBatch(ledgerOptions, function(error, ledger){
        done();
      });
    });  
  });

  describe('Downloading the complete history', function() {

    it('should expose a callback hook on every ledger', function(done) {
      var i = 0;
      ledgerDownloader.startDownloading(ledgerOptions, function(error, ledger, next){
        process.stdout.write(ledger);
        if (i++ > 5) { done() };
        next();
      });
    });
  });
});

