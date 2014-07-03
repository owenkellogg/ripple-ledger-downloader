var assert = require('assert');
var Ledger = require(__dirname+'/../../lib/models/ledger.js');

describe('Ledger Database Model', function() {
  it('should be able to be saved with only a ledgerIndex', function() {
    var ledgerIndex = 7547150;
    var ledger = Ledger.build({
      ledgerIndex: ledgerIndex
    });
    ledger.save().complete(function(error, ledger){
      assert(ledger.id);
      assert.strictEqual(ledger.ledgerIndex, ledgerIndex);
    });
  });  
});

