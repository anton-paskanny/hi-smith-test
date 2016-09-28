const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('./app/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
	return gulp.src([
			'./app/css/normalize.css',
			'./app/css/style.css'
	])
		.pipe(csso())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('watcher', ['browser-sync', 'sass', 'css'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/css/style.css', ['css']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watcher']);

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'css'], function() {
	const buildCSS = gulp.src('app/css/style.min.css')
	.pipe(gulp.dest('dist/css'))

	const buildHTML = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))

	const buildIMG = gulp.src('app/img/*')
	.pipe(gulp.dest('dist/img'))
});
