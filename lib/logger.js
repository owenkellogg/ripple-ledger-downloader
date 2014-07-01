var winston = require('winston');

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      filename: '../importer.log',
      handleExceptions: true,
      json: true
    })
  ],
  exitOnError: false
});

