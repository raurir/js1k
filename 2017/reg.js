const input = process.argv[2], output = process.argv[3];
// console.log("reg", input, output);

"use strict";

var fs = require('fs');
var regPack = require("./regpackrauri/regPack.js");
var cmdRegPack = regPack.cmdRegPack;
var inputFile = fs.readFileSync(`${input}.js`, 'utf-8');
var result = cmdRegPack(inputFile, {
	hash2DContext: true,
	crushGainFactor: 1,
	crushLengthFactor: 0,
	crushCopiesFactor: true
});
fs.writeFile(`${output}.js`, result)