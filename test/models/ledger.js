var assert = require('assert');
var sequelize = require(__dirname+'/../../lib/database.js');
var Ledger = require(__dirname+'/../../lib/models/ledger.js');

describe('Ledger Database Model', function() {

  it('should be able to be saved with only an index', function(done) {
    var ledgerIndex = 7547150;
    ledger = Ledger.build({
      id: ledgerIndex,
      hash: 'someLedgerHash'
    });
    ledger.save().complete(function(error, ledger){
      console.log('ERROR', error);
      assert(ledger.id);
      assert.strictEqual(ledger.id, ledgerIndex);
      done();
    });
  });  

  it('should include a ledger hash', function(done) {
    var ledgerHash = 'someLedgerHash';
    ledger.updateAttributes({ hash: ledgerHash })
    .complete(function(error, ledger) {
      assert.strictEqual(ledger.hash, ledgerHash);
      done();
    });
  });

  before(function(){
    ledger = new Object;
  });

  after(function(done){
    ledger.destroy().complete(done);  
  });
});

