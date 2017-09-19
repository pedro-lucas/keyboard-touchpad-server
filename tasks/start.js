const childProcess = require('child_process');
const electron = require('electron');
const gulp = require('gulp');

gulp.task('start', function () {
    childProcess.spawn(electron, ['.'], {
        stdio: 'inherit'
    })
    .on('close', function () {
        process.exit();
    });
});
