var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    paths = {
        scripts: 'app/**/*.js',
        images: 'images/*.{png,jpg,gif}',
        test: [
            'gulpfile.js', 'app/**/*.js'
        ]
    };

gulp.task('js', function() {
    gulp.src('app/main.js')
        .pipe(plumber())
        .pipe(browserify({
            debug: true
        }))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('assets/build'))
});

gulp.task('img', function () {
    gulp.src(paths.images)
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('assets/images'));
});

gulp.task('test', function () {
    gulp.src(paths.test)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['js']);
});

gulp.task('default', ['js', 'img']);