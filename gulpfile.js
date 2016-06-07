const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const jasmine = require('gulp-jasmine-browser');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const banner = require('gulp-banner');
const pkg = require('./package.json');


const today = new Date();

let bannerComment = `/**
 * Copyright (c) 2013-2016 ${pkg.author} (${pkg.name})
 * See license.txt for license information.
 *
 * ${pkg.description}
 *
 * Latest Update: ${pkg.version} (${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()})
 */
`;

gulp.task('build', ['browserify'], () => {
  gulp.src('js/validatinator.js')
    .pipe(uglify())
    .pipe(banner(bannerComment))
    .pipe(rename('validatinator.min.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('browserify', () => {
  browserify('dev/js/validatinator.js')
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .pipe(source('validatinator.js'))
    .pipe(streamify(banner(bannerComment)))
    .pipe(gulp.dest('js/'));
});

gulp.task('test', () => {
  var filesToWatch = ['js/validatinator.js', 'dev/tests/*.js'];

  gulp.src(filesToWatch)
    .pipe(watch(filesToWatch, {usePolling: true}))
    .pipe(jasmine.specRunner())
    .pipe(jasmine.server({port: 3000}));
});

gulp.task('watch', ['browserify', 'test'], () => {
  gulp.watch('./dev/js/**/*.js', ['browserify']);
});
