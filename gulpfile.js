var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// let's name this task 'bundle-dev'
gulp.task('bundle-dev', function () {
  return browserify({
    entries: ['public/src/js/app.js'],
    // debug: true will bundle together a "source map" so we will still be able to view the individual source files in the browser devtools
    debug: true
  })
  .bundle()

  // if there is an error with our javascript, this will keep gulp from breaking
  .on('error', function(error) {
    console.log(error.toString());
    this.emit('end');
  })

  // this names the bundled file
  .pipe(source('bundle.js'))
  .pipe(buffer())

  // this places the file in our public/js/ directory
  .pipe(gulp.dest('public/js/'));
});

// let's name this task 'watch'
gulp.task('watch', function () {
  // this places a 'watcher' on all files within public/src/js/ and runs 'bundle-dev' if any of them change
  gulp.watch('public/src/js/**', ['bundle-dev']);
});

// the 'default' task is a special task. It can run if you type `gulp default`, or just `gulp`, here we want it to run two other tasks, 'bundle-dev' and 'watch'
gulp.task('default', ['bundle-dev', 'watch']);
