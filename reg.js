"use strict";

var fs = require('fs');
var regPack = require("./regpackrauri/regPack.js");
var cmdRegPack = regPack.cmdRegPack;
var input = fs.readFileSync("magic.js", 'utf-8');
var result = cmdRegPack(input, {
	hash2DContext: true,
	crushGainFactor: 1,
	crushLengthFactor: 0,
	crushCopiesFactor: true
});
// console.log(result);
fs.writeFile("magic-compresses-regpack.js", result)
// cmdRegPack()