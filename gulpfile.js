var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();
var del     = require('del');
var path    = require('path');
var argv    = require('yargs').argv;
var gulpsync = plugins.sync(gulp);

var destDir = './';

var sources = [ './index.pug' ];

gulp.task('clean', function () {
    log('Cleaning index file...');
    return del([ './index.html' ], { force: true });
});

gulp.task('pug', function() {
    log('Building HTML from Pug sources...');
    return gulp.src([].concat(sources, '!**/_*.*'))
        .pipe(plugins.pug())
        .on('error', handleError)
        .pipe(gulp.dest(destDir))
    ;
});

gulp.task('watch', function() {
    log('Starting watch and LiveReload...');

    plugins.livereload.listen();

    gulp.watch(sources, ['pug']);

    // a delay before triggering browser reload to ensure everything is compiled
    var livereloadDelay = 500;

    gulp.watch(sources)
        .on('change', function(event) {
            setTimeout(function() {
                plugins.livereload.changed(event.path);
            }, livereloadDelay);
        })
        .on('error', handleError)
    ;

    log('************************');
    log('* Watching for changes *');
    log('************************');
});

gulp.task('build', gulpsync.sync([
    'clean',
    'pug'
]), function(){
    log('*******************');
    log('* Build Completed *');
    log('*******************');
});

gulp.task('default', gulpsync.sync([
    'build',
    'watch'
]));

/////////////////////

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    plugins.util.log(plugins.util.colors.blue(msg));
}
