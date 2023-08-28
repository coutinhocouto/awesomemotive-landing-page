const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

// Watch for changes.
gulp.task('watch', function() {
  gulp.watch(['./assets/css/**/*.{scss,css}', '!./assets/css/**/*.min.css'])
		.on('change', function(file) {
			console.log('Updated: ' + file.replace('.css', '.min.css').replace('.scss', '.min.css'));

			return gulp.src(file)
				.pipe(gulpif('*.scss', sass().on('error', sass.logError)))
				.pipe(cleanCSS({compatibility: 'ie8'}))
				.pipe(rename(function(file) {
					if (!file.basename.endsWith('.min')) {
						file.basename += '.min';
					}
				}))
				.pipe(gulp.dest(function(file) {
					return file.base;
				}, {overwrite: true}))
		});
});
