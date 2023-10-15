const gulp = require('gulp');
const { src, dest, parallel, series, watch } = require('gulp');

// Load plugins

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const reload = browsersync.reload;
const fileinclude = require('gulp-file-include');
const prettyHtml = require('gulp-pretty-html');
const replace = require('gulp-replace');
const removeEmptyLines = require('gulp-remove-empty-lines');
const beautify = require('gulp-beautify');

// Clean assets
function clear() {
  const path = [{ destination: '/index.html' }];

  for (var i = 0; i < path.length; i++) {
    return src(path[i].destination, {
      read: false,
      allowEmpty: true,
    }).pipe(clean({ force: true }));
  }
}
// coding List CSS function
function lib_font(done) {
  return src(['./src/font/**/*.*']).pipe(dest('./assets/font'));
  done();
}
function lib_css() {
  return src(['./src/scss/lib/*.*']).pipe(dest('./assets/css/'));

  done();
}
function lib_js(done) {
  return src(['./src/js/data/*.*']).pipe(dest('./assets/js/data'));

  done();
}

function css() {
  const source = ['./src/scss/style.scss'];

  return gulp
    .src(source, { sourcemaps: false })
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./assets/css/', { sourcemaps: false }))
    .pipe(browsersync.stream());
}
function js() {
  const source = './src/js/*.js';

  return src(source).pipe(changed(source)).pipe(concat('bundle.js')).pipe(dest('./assets/js/')).pipe(browsersync.stream());
}
function images() {
  return src('./src/images/**/*.*').pipe(dest('./assets/images'));
}
function html(done) {
  return src(['./src/html/**/*.*'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: './src/',
      }),
    )
    .pipe(replace('<!-- prettier-ignore -->', ''))
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: ' ',
        unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
      }),
    )
    .pipe(removeEmptyLines())
    .pipe(dest('./'));
  done();
}

// Watch files
function watchFiles() {
  watch('./src/html/**/*.*', html);
  watch('./src/images/**/*.*', images);
  watch('./src/scss/**', css);
  watch('./src/js/*', js);
  watch('./src/js/data/*', lib_js);
}

// BrowserSync
function browserSync() {
  browsersync.init({
    server: {
      baseDir: './',
    },
    port: 3000,
  });

  watch('./**').on('change', reload);
}

// Tasks to define the execution of the functions simultaneously or in series
exports.src = parallel(watchFiles, browserSync);
exports.build = series(clear, parallel(lib_font, lib_css, lib_js, html, css, js, images));
