var assert = require('assert');
var RippledLedgerDownloader = require(__dirname+'/../lib/ledger_downloader.js');

describe('Rippled ledger download', function() {

  before(function() {
    ledgerDownloader = new RippledLedgerDownloader();
  });

  describe('Getting a ledger', function() {
    it('getLedger() should get a ledger', function(done) {
      var ledgerIndex = 7512081;
      var expectedLedgerHash = 'A2EE8A908FDFCF69CB7C1FA37046FD45DCE1928C7AF1AD25708325B4FCA727C5';
      ledgerDownloader.getLedger(ledgerIndex, function(error, ledger){
        assert.strictEqual(ledger.hash, expectedLedgerHash);
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

