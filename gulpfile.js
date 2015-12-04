'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minifyHTML = require('gulp-minify-html');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
  lint: [
    'app.js',
    'server/**/*.js',
    'client/src/**/*.js',
    '!client/public',
  ],
  browserify: [
    'client/src/**/*.js',
  ],
  css: [
    'client/src/**/*.css',
  ],
  html: [
    'client/src/**/*.html',
  ],
};

gulp.task('default', ['app', 'lint'], function() {
  gulp.watch(paths.lint, ['lint']);
  gulp.watch(paths.browserify, ['browserify']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['minify-html']);
  console.log('gulp default task run');
});

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('app', function() {
  return nodemon({script: 'bin/www', ext: 'html js', ignore: ['client/*']})
    .on('restart', function() {
    });
});

gulp.task('browserify', function() {
  return browserify('./client/src/app.js', {
      insertGlobals: true,
      debug: true
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./client/public'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(uglifycss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./client/public/css'));
});

gulp.task('minify-html', function() {
  return gulp.src(paths.html)
    .pipe(minifyHTML({}))
    .pipe(gulp.dest('./client/public'));
});
