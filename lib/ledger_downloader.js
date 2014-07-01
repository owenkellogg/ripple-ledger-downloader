var logger = require('winston');
var request = require('request');
var winston = require('winston');
var logger = require(__dirname+'/logger.js');

var SERVER = 'http://s1.ripple.com:51234';

function LedgerDownloader(options) {
  if (!options) { options = {} };
  this.server = options.server || SERVER;
};

LedgerDownloader.prototype = {

  getLedger: function(ledgerIndex, callback) {
    var self = this;
    if (!ledgerIndex) { 
      callback(new Error('ledgerIndex required.'), null);
    }
    self._requestLedgerFromRippled(ledgerIndex, function(error, response) {
      if (error) {
        logger.error('request:ledger:complete', error);
        callback(error, null);
      } else {
        logger.info('request:ledger:complete', response);
        callback(null, response.result.ledger);
      }
    });
  },
  
  _requestLedgerFromRippled: function(ledgerIndex, callback) {
    var self = this;
    if (!ledgerIndex) { 
      callback(new Error('ledgerIndex required.'), null);
    }
    var rpcRequestData = { 
      'method': 'ledger', 
      'params' : [{ 
        'transactions' : true, 
        'expand'       : true,
        'ledger_index' : ledgerIndex
      }]
    };
    request({
      url: self.server,
      method: 'POST',
      json: rpcRequestData,
      timeout : 10000,
    }, function(error, response) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.body);
      }
    });
  }
    
};

module.exports = LedgerDownloader;

