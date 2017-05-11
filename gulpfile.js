'use strict'
const gulp = require('gulp')
const del = require('del')
const rename = require('gulp-rename')
const exec = require('child_process').exec
const DIST_DIR = 'dist'

gulp.task('clean', (cb) => {
  del([DIST_DIR + '/**/*'])
    .then(() => cb())
})

gulp.task('webpack', ['clean'], (cb) => {
  exec('webpack  -p --config webpack.config.prod.js', (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('copy-index', ['clean'], () => {
  return gulp.src(['client/index.html'])
    .pipe(gulp.dest(DIST_DIR + '/public'))
})

gulp.task('copy-server', ['clean'], () => {
  return gulp.src(['server/**/*', '!server/config/*'])
    .pipe(gulp.dest(DIST_DIR + '/server'))
})

gulp.task('copy-config', ['clean'], () => {
  return gulp.src(['server/config/config.prod.js'])
    .pipe(rename('config.js'))
    .pipe(gulp.dest(DIST_DIR + '/server/config'))
})

gulp.task('copy-package-json', ['clean'], () => {
  return gulp.src(['package.json'])
    .pipe(gulp.dest(DIST_DIR))
})

gulp.task('default', [
  'webpack',
  'copy-index',
  'copy-server',
  'copy-config',
  'copy-package-json'
])