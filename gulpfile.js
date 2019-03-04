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
			livereload:true,
			proxies:[
				{
					source:'/iconlist',
					target:'http://localhost:3000/classify/iconlist'
				},
				{
					source:'/addClassify',
					target:'http://localhost:3000/classify/addClassify'
				},
				{
					source:'/adduser',
					target:'http://localhost:3000/users/adduser'
				},
				{
					source:'/getClassify',
					target:'http://localhost:3000/classify/getClassify'
				},
				{
					source:'/addbill',
					target:'http://localhost:3000/bill/addbill'
				},
				{
					source:'/getbill',
					target:'http://localhost:3000/bill/getbill'
				}
			]
		}));
});

gulp.task('dev',gulp.series('sass','server','watch'));