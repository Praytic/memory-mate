var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');

var paths = {
    sass: ['./scss/**/*.scss',
           './www/libs/materialize-src/sass/**/*.scss']
};

gulp.task('default', ['sass']);

var lessToScss = require('gulp-less-to-scss');
gulp.task('lessToScss',function(){
  gulp.src('./scss/**/*.less')
    .pipe(lessToScss())
    .pipe(gulp.dest('themes/system/scss'));
});

gulp.task('sass', function(done) {
    gulp.src(['./scss/main.scss'])
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass', 'less']);
});
