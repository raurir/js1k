var fs = require('fs');
var base64 = require('base-64');
var inputFile = fs.readFileSync('magic-compressed-closure-regpack.js', 'utf-8');
// console.log(btoa(inputFile));
console.log(base64.encode(inputFile));