ClosureCompiler = require("closurecompiler")
fs = require("fs")
ansicolor = require("ansi-color")

con = console


module.exports = (grunt) ->
  grunt.initConfig(
    # pkg: grunt.file.readJSON("package.json")
    watch:
      js:
        # files: ["combined_curves.js"]
        # files: ["combined.js"]
        files: ["magic.js"]
        tasks: ["closure"]
        options:
          spawn: false

  )


  grunt.loadNpmTasks("grunt-contrib-watch")
  grunt.registerTask("default", ["watch"])
  grunt.registerTask("closure", "", () ->
    con.log("Run the closuer compiler")
    ClosureCompiler.compile(
      # ["combined_curves.js"]
      # ["combined.js"]
      ["magic.js"]
      {compilation_level: "ADVANCED_OPTIMIZATIONS"}
      (error, result) ->

        con.log("inisde")

        if error
          con.log("e",error)

        if result

          result = result.substr(4)

          result = result.replace(/0\./g, ".")
          result = result.replace(/300/g, "L")

          result = "L=300," + result


          con.log("===============================================================\n")
          con.log(result)
          con.log("===============================================================\n")

          len = result.length
          if len < 1024
            con.log(ansicolor.set("\n #{ len } \n", "green"))
          else
            con.log(ansicolor.set("\n #{ len } \n", "red"))

          fs.writeFileSync("compressed.js", result, {encoding:"utf8", mode:"0777"})
        else
          con.log("Erra")
    )

  )