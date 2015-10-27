var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var electron = require('electron-connect').server.create();

gulp.task('serve', ['build-html', 'build-css', 'build-js'], function () {
  electron.start('--disable-http-cache');

  gulp.watch('main.js', function(){
    electron.restart('--disable-http-cache');
  });

  gulp.watch('src/css/*.css', ['rebuild-css']);
  gulp.watch('src/js/**/*.*', ['rebuild-js']);
  gulp.watch('src/html/index.html', ['rebuild-html']);
});

gulp.task('rebuild-html', ['build-html'], function(){
  electron.reload();
});
gulp.task('rebuild-css', ['build-css'], function(){
  electron.reload();
});
gulp.task('rebuild-js', ['build-js'], function(){
  electron.reload();
});

gulp.task('build-js', function () {
  return browserify({
    entries: 'src/js/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('build-html', function() {
  return gulp.src('src/html/index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-css', function() {
  return gulp.src('src/css/*.css')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/stylesheets/'));
});

electron.on("appClosed", function(){
  electron.stop(function(){
    process.exit(0);
  });
});

gulp.task('start', ['serve']);
