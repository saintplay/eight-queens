const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('start-coding', ['sass'], function() {
    browserSync.init({
        server: 'dist',
        notify: false,
        ui: false
    });

    gulp.watch('src/sass/main.sass', ['sass']);
    gulp.watch('src/pug/index.pug', ['pug']);
    gulp.watch('dist/index.html').on('change', browserSync.reload);
});

gulp.task('sass', function(){
    return gulp.src('src/sass/main.sass')
        .pipe(sass({
            outputStyle: 'compressed',
            indentedSyntax: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['start-coding']);