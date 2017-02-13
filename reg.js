"use strict";

var fs = require('fs');
var regPack = require("./RegPack/regPack.js");
var cmdRegPack = regPack.cmdRegPack;
var input = fs.readFileSync("magic.js", 'utf-8');
var result = cmdRegPack(input, {});
// console.log(result);
fs.writeFile("magic-compresses-regpack.js", result)
// cmdRegPack()