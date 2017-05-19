const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
var ts = require("gulp-typescript");
const uglify = require('gulp-uglify');
var tsProject = ts.createProject("tsconfig.json");
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('go', ['compile'], function() {
    browserSync.init({
        server: 'dist',
        notify: false,
        ui: false
    });

    gulp.watch('src/sass/main.sass', ['sass']);
    gulp.watch('src/pug/index.pug', ['pug']);
    gulp.watch('src/typescript/*.ts', ['ts']);
    gulp.watch(['dist/js/*.js', 'dist/index.html']).on('change', browserSync.reload);  
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

gulp.task('ts', function() {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/'));
});

gulp.task('compile', ['sass', 'ts', 'pug']);
gulp.task('default', ['go']);