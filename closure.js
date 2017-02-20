var con = console;
const input = process.argv[2], output = process.argv[3];
con.log("closure", input, output);

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
            con.log("result length:", result.length)
            // result = result.replace(/con\.log\(["\w\s,.]+\);?/g, "");
            // con.log("===============")
            // con.log("es6ing fns")
            result = result.replace(/function\(\)/g, "()=>");
            result = result.replace(/function (\w)\(([a-z,]+)\)/g, ";$1=($2)=>");
            result = result.replace(/;var (\w)=/g, ";$1=");

            for (var i = 3; i < 10; i++) {
                var denominator = Math.pow(2, i);
                var decimal = String(1 / denominator).substr(1);
                var fraction = `1/${denominator}`;
                var pattern = "\\" + decimal;
                var regex = new RegExp(pattern, "g");
                // con.log("looking for", decimal, fraction, "with", regex);
                if (regex.test(result)) {
                    con.log("found", decimal);
                    result = result.replace(regex, fraction);
                }
            }

            result = result.replace(/requestAnimationFrame\((\w)\)}for\(/, "requestAnimationFrame($1)};for("); // fucking bullshit
            con.log("post string replace:", result.length);

            con.log(result);

            fs.writeFile(`${output}.js`, result);
            // Write result to file
            // Display error (warnings from stderr)
        } else {
            // Display error...
            con.log("error", error)
         }
    }
);
