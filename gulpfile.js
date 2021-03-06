const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
var deploy        = require('gulp-gh-pages');

// Compile SASS
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move JS Files to SRC
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
   'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Watch SASS & Serve
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Font Awesome Fonts folder to src
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});

// Move font awesome css file
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

// Move normalize.scss file
gulp.task('normalize', function(){
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest("src/css"));
});

/**
 * Push build to gh-pages
 */
gulp.task('deploy',['js', 'serve', 'fa', 'fonts', 'normalize'], function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts', 'normalize']);
