var gulp = require('gulp');
var pug = require('gulp-pug');


function onError(error) {
  console.error(error.toString())
  this.emit('end')
}

gulp.task('watch', function() {
  gulp.watch('src/**', ['build:pug']);
});

gulp.task('build:pug', function() {
  gulp.src('src/**/*.pug', { base: '.' })
    .pipe(pug({
      pretty: true
    }))
    .on('error', onError)
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['watch', 'build:pug']);