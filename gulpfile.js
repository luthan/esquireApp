var gulp = require('gulp'),
	gutil = require('gulp-util'),
	webserver = require('gulp-webserver');
	
gulp.task('css', function() {
  gulp.src('www-public/css/*.css')
});

gulp.task('watch', function(){
	gulp.watch('www-public/js/**/*');
	gulp.watch('www-public/css/*.css');
	gulp.watch(['www-public/*.html', 'www-public/views/*.html']);
});

gulp.task('webserver', function(){
	gulp.src('www-public/')
		.pipe(webserver({
			livereload: true,
			open: true
	}));
});

gulp.task('default', ['watch', 'webserver']);