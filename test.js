var test = require('tape');
var tap = require('./index');

test('Result should be valid JSON', function (t) {

    tap()([{_filename:'tests/test.js'}, {_filename:'tests/test2.js'}])
    .then(function(result) {
        var result = JSON.parse(result);
        t.assert(result.length === 2);
        t.end();
    });
    
});