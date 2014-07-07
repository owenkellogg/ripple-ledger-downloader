var logger = require('winston');
var request = require('request');
var winston = require('winston');
var logger = require(__dirname+'/logger.js');

var SERVER = 'http://s1.ripple.com:51234';

function LedgerDownloader(options) {
  if (!options) { options = {} };
  this.server = options.server || SERVER;
  this.onLedger = options.onLedger || console.log;
};

LedgerDownloader.prototype = {
  

  start: function(ledgerIndex) {
    console.log('start');
    var self = this;
    if (!ledgerIndex) {
      try {
      self._getMostRecentlyClosedLedger(function(error, ledger){
        if (error) {
          throw new Error(error);  
        } else {
          self.currentLedgerIndex = ledger.ledger_index; 
          self._getLedgersRecursively(self._getLedgersRecursively);
        }
      }); 
      } catch(error) { console.log('ERROR', error); }
    } else {
      self.currentLedgerIndex = ledgerIndex; 
      self._getLedgersRecursively(self._getLedgersRecursively);
    }
  },
  
  _getLedgersRecursively: function() {
    var self = this;
    console.log('INDEX', self.currentLedgerIndex);
    self._getLedger(self.currentLedgerIndex-1, function(error, ledger) {
      if (error) {
        console.log('error', error);
        self._getLedgersRecursively();
      } else {
        self.onLedger(ledger, function(error, ledgerIndex){
          if (error) {
            console.log('error', error);
            self._getLedgersRecursively();
          } else {
            self.currentLedgerIndex = ledgerIndex;  
            self._getLedgersRecursively();
          }
        })
      }
    });
  },

  _getLedger: function(ledgerIndex, callback) {
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

  _getMostRecentlyClosedLedger: function(callback) {
    var self = this;
    self._getLedger('closed', callback);
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

