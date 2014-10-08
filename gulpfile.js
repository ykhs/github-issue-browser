'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var NwBuilder = require('node-webkit-builder');

gulp.task('clean', del.bind(null, ['build']));

gulp.task('jshint', function () {
  return gulp.src(['app/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function () {
  return gulp.src('app/css/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 Chrome versions']
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('scripts', function () {
  return gulp.src([
      'app/js/main.js',
      'app/js/mixins/**/*.js',
      'app/js/models/**/*.js',
      'app/js/collections/**/*.js',
      'app/js/views/**/*.js',
      'app/js/regions/**/*.js',
      'app/js/modules/**/*.js'
    ]).pipe(concat('bundle.js'))
      .pipe(gulp.dest('app'));
});

gulp.task('templates', function () {
  runSequence('scripts', function () {
    gulp.src('app/templates/**/*.hbs')
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        root: 'exports',
        noRedeclare: true,
        processName: function(filePath) {
          return declare.processNameByPath(filePath.replace('app/templates/', ''));
        }
      }))
      .pipe(concat('templates.js'))
      .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
      .pipe(gulp.dest('app'));
  });
});

gulp.task('default', function (cb) {
  runSequence(['templates', 'jshint', 'scripts', 'styles'], cb);
});

gulp.task('nwbuild', ['clean', 'default'], function () {
  var nw = new NwBuilder({
    version: 'latest',
    files: ['./**', '!./cache/**', '!./build/**'],
    platforms: ['osx']
  });

  nw.on('log', function (msg) {
    gutil.log('node-webkit-builder', msg);
  });

  return nw.build().catch(function (err) {
    gutil.log('node-webkit-builder', err);
  });
});

gulp.task('watch', function () {
  gulp.watch(['app/js/**/*.js'], ['jshint']);
});
