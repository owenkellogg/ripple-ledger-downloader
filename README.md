# Ripple Ledger Downloader

### Ledger Importer
The ledger importer imports ledgers from the Ripple Network into the data store.  The process is set up to import continously in real time as ledgers are validated, as well as import historical ledgers.

### Usage

The LedgerDownloader class is used to download ledgers from the network and perform some task with those ledgers:

    var LedgerDownloader = require(__dirname+'/../lib/ledger_downloader.js');

    var ledgerDownloader = new LedgerDownloader({
      onLedger: function(ledger, next) {

        // do something with the ledger here
        console.log('LEDGER', ledger);
        next(null, ledger.ledger_index);
      }
    });

    ledgerDownloader.start();

Upon successful processing of the ledger, call the `next()` callback function with the current ledger index to tell the ledger downloader that it is okay to download the ledger prior to the index returned.

