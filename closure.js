const input = process.argv[2], output = process.argv[3];
console.log("closure", input, output);


var ClosureCompiler = require("closurecompiler");
var fs = require("fs");

ClosureCompiler.compile(
    [`${input}.js`],
    {
        // Options in the API exclude the "--" prefix
        compilation_level: "ADVANCED_OPTIMIZATIONS",
        // Capitalization does not matter
        // Formatting: "PRETTY_PRINT",
        // If you specify a directory here, all files inside are used
        // externs: ["externs/file3.js", "externs/contrib/"],
        // ^ As you've seen, multiple options with the same name are
        //   specified using an array.
    },
    function(error, result) {
        if (result) {
            console.log("result")
            // result = result.replace(/con\.log\(["\w\s,.]+\);?/g, "");
            console.log(result.length)
            console.log("===============")
            console.log("es6ing fns")
            result = result.replace(/function\(\)/g, "()=>");
            result = result.replace(/function (\w)\(([a-z,]+)\)/g, ";$1=($2)=>");
            result = result.replace(/;var (\w)=/g, ";$1=");
            result = result.replace(/requestAnimationFrame\((\w)\)}for\(/, "requestAnimationFrame($1)};for("); // fucking bullshit
            console.log(result.length);

            console.log(result)

            fs.writeFile(`${output}.js`, result);
            // Write result to file
            // Display error (warnings from stderr)
        } else {
            // Display error...
            console.log("error", error)
         }
    }
);
