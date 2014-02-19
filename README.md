fez-tap
========

TAP tests for your fez. Keep your tests ultra portable by using Tape. Run them on the backend with Fez, and on the frontend with anything else.

[![build status](https://secure.travis-ci.org/miketheprogrammer/fez-tap.png)](http://travis-ci.org/miketheprogrammer/fez-tap)

```javascript
npm install fez-tap
```

Pretty simple spec for Fez. It runs the tests, after all tests have completed, it checks for failures.
If failures exist it throws an error ending the build process. 

It prints available result data to stdout.

You can also export the parsed results by including an output file such as

```javascript
spec.rule(files, 'results.json', tap());
```
Otherwise

```javascript
spec.rule(files, tap());
```

```javascript

var fez = require('fez');

var fez = require("fez"),
    tap = require("fez-tap");

exports.build = function(spec) {

  spec.with("tests/*.js").all(function(files) {
    spec.rule(files, 'results.json', tap());
  });
  
};

exports.default = exports.build;

fez(module);

```