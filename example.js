var fez = require('fez');


var fez = require("fez"),
    tap = require("./index");

exports.build = function(spec) {

  spec.with("tests/*.js").all(function(files) {
    spec.rule(files, 'results.json', tap());
  });
  
};

exports.default = exports.build;

fez(module);