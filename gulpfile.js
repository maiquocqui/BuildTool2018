var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpPug = require('gulp-pug');
var del = require('del');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var sitePort = 8138;
// Browser Sync

// ConCat
gulp.task('concat-js', function() {
    return gulp.src([
            "bower_components/popper/popper.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.js",
            "bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js",
            "bower_components/bootstrap-datepicker/dist/locales/bootstrap-datepicker.vi.min.js",
            "bower_components/slick-carousel/slick/slick.js",
            "bower_components/fancybox/dist/jquery.fancybox.js",
            "bower_components/jquery-countimator/dist/js/jquery.countimator.js",
            "bower_components/jquery.countdown/dist/jquery.countdown.js",
            "bower_components/wow/dist/wow.js",
            "bower_components/ScrollToFixed/jquery-scrolltofixed.js",
            "bower_components/jquery-bar-rating/dist/jquery.barrating.min.js",
            "bower_components/scrollup/dist/jquery.scrollUp.js",
            "bower_components/page-scroll-to-id/jquery.malihu.PageScroll2id.js",
            "bower_components/parallax.js/parallax.js",
            "bower_components/responsive-tabs/js/jquery.responsiveTabs.js"
        ])
        .pipe(concat('core.js'))
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('concat-css', function() {
    return gulp.src([
            "bower_components/fancybox/dist/jquery.fancybox.css",
            "bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.css",
            "bower_components/hover/css/hover.css",
            "bower_components/animate.css/animate.css",
            "bower_components/font-awesome/css/font-awesome.css",
            "bower_components/linearicons/icon-font.min.css",
            "bower_components/slick-carousel/slick/slick.css",
            "bower_components/k-flex/dist/css/k-flex.css",
            "bower_components/jquery-bar-rating/dist/themes/fontawesome-stars.css",
            "bower_components/responsive-tabs/css/responsive-tabs.css"
        ])
        .pipe(concat('core.css'))
        .pipe(gulp.dest('./dist/css'));
});

// Task PUG
gulp.task('pug', function buildHTML() {
    return gulp.src([
            'src/templates/*.pug'
        ])
        .pipe(gulpPug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream({ match: '**/*.html' }))
});

// Task SASS
gulp.task('sass', function() {
    return gulp.src('src/styles/main.sass')
        .pipe(sourcemaps.init())
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// Task JS
var through = require('through2');

function logFileHelpers() {
    return through.obj((file, enc, cb) => {
        console.log(file.babel.usedHelpers);
        cb(null, file);
    });
}
gulp.task('js', () =>
    gulp.src('src/scripts/**/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream())
    .pipe(logFileHelpers())
);

// Task copy font
gulp.task('fonts', function() {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(browserSync.stream())
});

// Task copy img
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('./dist/img'))
});

// Task img compress
gulp.task('imagemin', () => {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))

});

// Task refresh
gulp.task('serve', function() {
    browserSync.init({
        server: "./dist",
        port: sitePort,
    });
});

// Task Theo doi
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.sass', ['sass']);
    gulp.watch('src/templates/**/*.pug', ['pug']);
    gulp.watch('src/scripts/**/*.js', ['js']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/img/**/*', ['img']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
}).on('end', browserSync.reload);

// Task ông nội
gulp.task('default', function(cb) {
    runSequence(
        'clean',
        'fonts',
        'img',
        'concat-js',
        'concat-css',
        'pug',
        'sass',
        'js',
        'watch',
        'serve',
        cb)
})

// Tast xoá thư mục dist
gulp.task('clean', function() {
    return del(['dist'])
});