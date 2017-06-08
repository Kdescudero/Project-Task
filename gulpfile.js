var gulp         = require('gulp'),
    path         = require('path'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    concat       = require('gulp-concat'),
    gutil        = require('gulp-util'),
    browserSync  = require('browser-sync').create(),
    fs           = require('fs'),
    browserify   = require('browserify'),
    changed      = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin'),
    notify       = require('gulp-notify');

var date = new Date();
var autoprefixerOptions = {browsers: ['last 5 version']};
var msg = 'Complete task: <%= file.relative %>';

gulp.task('browser-sync', function() {
    browserSync.init({
        server: true
    });
});

gulp.task('build-general-css', function() {
  return gulp.src(['src/**/**/*.scss', '!./src/scss/_variables.scss'])
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    .pipe(sass({ outputStyle: 'compressed'}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({title: 'Ready', message: msg}))
    .pipe(browserSync.stream())
}); 

gulp.task('build-js', function() {
  return gulp.src('src/**/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js')) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'))
     .pipe(notify({title: 'Ready', message: msg}))
    .pipe(browserSync.stream());
});

gulp.task('build-plugins-js', function() {
 return browserify({entries: ['plugins.js']})
    .bundle()
    .pipe(fs.createWriteStream('dist/js/plugins.js'));
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('watch', function () {
  gulp.watch(path.join('src/**/**/*.js'), function(event) {
    gulp.start('build-js');
  });
  gulp.watch(path.join('plugins.js'), function(event) {
    gulp.start('build-plugins-js');
  });
  gulp.watch(path.join('src/**/**/*.scss'), function(event) {
    gulp.start('build-general-css');
  });
  gulp.watch(path.join('src/**/**.html'), function(event) {
    gulp.start('reload');
  });
  gulp.watch(path.join('**.html'), function(event) {
    gulp.start('reload')
  });
});

gulp.task('default', ['browser-sync','build-general-css', 'build-js', 'build-plugins-js', 'watch']);