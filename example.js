var fez = require('fez');


var fez = require("fez"),
    tape = require("./index");

exports.build = function(spec) {

  spec.with("tests/*.js").all(function(files) {
    spec.rule(files, 'results.json', tape());
  });
  
};

exports.default = exports.build;

fez(module);