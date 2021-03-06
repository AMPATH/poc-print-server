'use strict';
const createLabel = require("../lib/createLabel").createLabel;
const print = require("../lib/print").print;
const printer = require('printer');
let internals = {};
internals.getPrinters = function(request, reply) {
  reply(printer.getPrinters());
};
internals.printPayload = function(request, reply) {
  if (request.payload.mergeData) {
    createLabel({
        mergeData: request.payload.mergeData,
        template: request.payload.template
      })
      .then(function(buffer) {
        //We receive a file buffer which we can write to a file or send to printer
        return print({
          printerName: request.payload.printer,
          data: buffer,
          type: 'PDF'
        });
      })
      .then(function(result) {
        reply(result);
      }).catch(function(err) {
        reply('An error occured');
      });
  }
};
module.exports.handlers = internals;
