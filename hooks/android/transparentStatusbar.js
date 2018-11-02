// This hook overwrites default MainActivity.java to enable transparent statusbar on Android

module.exports = function(ctx) {
    // make sure android platform is part of build
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    var fs = ctx.requireCordovaModule('fs'),
        path = ctx.requireCordovaModule('path'),
        deferral = ctx.requireCordovaModule('q').defer();

    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    var MainActivityLocation = path.join(platformRoot, 'app/src/main/java/io/crazylife/timetracker/MainActivity.java');

    const input = fs.createReadStream(path.join(ctx.opts.projectRoot, 'hooks/android/MainActivity.java'))
    const output = fs.createWriteStream(MainActivityLocation)

    input.pipe(output)
    output.on('finish', function(err) {
      if (err) {
              deferral.reject('Overwrite MainActivity.java fail');
      } else {
          console.log('Overwrite MainActivity.java successfully');
          deferral.resolve();
      }
    })

    return deferral.promise;
};
