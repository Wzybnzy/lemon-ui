var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('sass',function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./src/css'));
});

gulp.task('watch',function(){
	gulp.watch('./src/scss/*.scss',gulp.series('sass'))
});

gulp.task('server',function(){
	return gulp.src('./src')
		.pipe(server({
			port:9090,
			open:true,
			livereload:true
		}));
});

gulp.task('dev',gulp.series('sass','server','watch'));