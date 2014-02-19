var Promise = require('bluebird');
var spawn = require('child_process').spawn
var node = spawn.bind(spawn, 'node');
var parser = require('tap-parser');

var parse = function(stream, cb) {
    var _parse = parser(function(results) {
        cb(null, results);
    });

    stream.pipe(_parse);
}

parse = Promise.promisify(parse);

function exec (filename) {
    return parse(node([filename]).stdout);
}

module.exports = function() {
    return function tap(inputs) {
        return Promise.all(inputs.map(function(i) { return i._filename; }).map(exec)).then(function(results) {
            var failure = false;
            results.forEach(function(result, i) {
                console.log('\n\n' + inputs[i]._filename);
                console.log('Test Finished with Status Code: ' + result.ok)
                console.log('\nASSERT\n');
                result.asserts.forEach(function(v){
                    console.log(v.number, v.ok, v.name);
                })
                console.log('\nFAILURES\n')
                result.fail.forEach(function(v) {
                    console.log(v.number, v.ok, v.name);
                });
                console.log('\nERRORS\n');
                result.errors.forEach(function(v) {
                    console.log(v.message, v.line);
                });

                console.log((result.asserts.length - result.fail.length) + ' out of ' + result.plan.end + ' succeeded!');

                if (!result.ok) failure = true;
            })
            if (failure) {
                console.warn('Exiting Build process, Failure');
                throw new Error('Tape Tests Failed');
            } else {
                return JSON.stringify(results);
            }


        });
    };
}