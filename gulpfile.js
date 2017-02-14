var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');
 
gulp.task('default', function() {
  return gulp.src('magic.js')
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
      fileName: 'build.js'
    }))
    .pipe(gulp.dest('dist'));
});