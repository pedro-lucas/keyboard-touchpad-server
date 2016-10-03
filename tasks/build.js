'use strict';

const gulp = require('gulp');
const packager = require('electron-packager');

gulp.task('build', function () {

  const path = require('path');
  const baseDir = path.dirname(__dirname);

  let options = {
      dir: baseDir,
      'app-version': '0.0.1',
      'build-version': '0.0.1',
      arch: process.arch,
      platform: process.platform,
      asar: false,
      ignore: [
          path.join(baseDir, '.git'),
          path.join(baseDir, 'build'),
          path.join(baseDir, 'config'),
          path.join(baseDir, 'resources'),
          __dirname,
          path.join(baseDir, '.DS_Store'),
          path.join(baseDir, '.gitignore'),
          path.join(baseDir, 'gulpfile.js'),
          path.join(baseDir, 'README.md')
      ],
      name: 'Electron Boilerplate',
      out: path.join(baseDir, 'build'),
      overwrite: true,
      version: '1.2.8',
      'app-bundle-id': 'com.electorn.boilerplate'
  };

  packager(options, (err, appPaths) => {
      if(err) {
          console.error('Ops, An error ocurred in the build', err);
          return;
      }
      console.log('Build finished', appPaths);
  });

});
