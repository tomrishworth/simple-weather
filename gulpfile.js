'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notify = require("gulp-notify");



// Compile SCSS
gulp.task('sass', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'))
});


// Start a server with LiveReload to preview the site in
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "/public"
        }
    });
});

// Watch for file changes
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});

// Build the "build" folder by running all of the above tasks
gulp.task('build', ['sass']);

// Run builds, run the server, and watch for file changes
gulp.task('default', ['build']);

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./public/"
    });
    gulp.watch('scss/**/*.scss', ['sass']);
})
