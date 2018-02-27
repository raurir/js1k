const input = "coin-compressed.js", output = "coin-regpacked.js";
"use strict";

var fs = require('fs');
var regPack = require("regpack");
var cmdRegPack = regPack.cmdRegPack;
var inputFile = fs.readFileSync(input, 'utf-8');
var result = cmdRegPack(inputFile, {
	hash2DContext: true,
	crushGainFactor: 2,
	crushLengthFactor: 0,
	crushCopiesFactor: true
});
fs.writeFile(output, result)