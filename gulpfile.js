var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');

var reload = browserSync.reload;

var src = './app/';
var dist = './www/';

var paths = {
  sass: src + ['styles/**/*.scss', 'libs/materialize-src/sass/**/*.scss'],
  jade: src + ['index.jade'],
  css: dist + 'css/',
  img: src +'img/',
  maincss: src + 'styles/main.scss',
  mainjs: dist + 'js/main.js',
  js: ['./app/js/**/*.js', './app/libs/materialize-src/js/**/*.js']
};

gulp.task('templates', function () {
  var LOCALS = {};
  return gulp.src(paths.jade)
    .pipe(jade({
      locals: LOCALS
    }))
    .pipe(gulp.dest(dist))
});

gulp.task('sass', function (done) {
  gulp.src([paths.maincss])
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.css))
    .pipe(reload({stream: true}))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(paths.css))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass'], reload);
  gulp.watch(paths.jade, ['templates'], reload);
  gulp.watch(paths.js, ['scripts']);
});

gulp.task('scripts', function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(rename('main.js'))
    .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('default', ['sass', 'templates', 'scripts', 'watch'], function () {
  browserSync({server: dist});
});
