fez-tape
========

Tap tests for your fez. Compatible with frontend because it's Tape by Substack. -- Great for automated browser testing builds.

[![browser support](https://ci.testling.com/miketheprogrammer/fez-tape.png)](https://ci.testling.com/miketheprogrammer/fez-tape)



```javascript
npm install fez-tape
```

Pretty simple spec for Fez. It runs the tests, after all tests have completed, it checks for failures.
If failures exist it throws an error ending the build process. 

It prints available result data to stdout.

You can also export the parsed results by including an output file such as

```javascript
spec.rule(files, 'results.json', tape());
```
Otherwise

```javascript
spec.rule(files, tape());
```

```javascript

var fez = require('fez');

var fez = require("fez"),
    tape = require("fez-tape");

exports.build = function(spec) {

  spec.with("tests/*.js").all(function(files) {
    spec.rule(files, 'results.json', tape());
  });
  
};

exports.default = exports.build;

fez(module);

```