var gulp          = require('gulp');
var sass          = require('gulp-sass');
var minifyCss     = require('gulp-minify-css');
var rename        = require('gulp-rename');
var browserSync   = require('browser-sync');
var jade          = require('gulp-jade');

var src = './app/';
var dist = './www/';
var reload = browserSync.reload;

var paths = {
  sass:         [src + 'libs/materialize-src/sass/**/*.scss', src + 'styles/**/*.scss'],
  jade:         [src + 'pages/content/**/*.jade', src + 'pages/deck/**/*.jade', src + 'index.jade'],
  css:          dist + 'css/',
  img:          src +'img/',
  maincss:      src + 'styles/main.scss',
  mainjs:       dist + 'js/main.js',
  js:           [src + 'js/**/*.js', src + 'libs/materialize-src/js/bin/materialize.js']
};

gulp.task('templates', function () {
  return gulp.src(paths.jade)
    .pipe(jade())
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
});

gulp.task('move', function() {
  gulp.src(paths.js)
    .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('default', ['sass', 'templates', 'move', 'watch'], function () {
  browserSync({server: dist});
});
