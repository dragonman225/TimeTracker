// This hook overwrites default MainActivity.java to enable transparent statusbar on Android

module.exports = function (ctx) {
    return new Promise((resolve, reject) => {
        // make sure android platform is part of build
        if (ctx.opts.platforms.indexOf('android') < 0) {
            return;
        }
        const fs = require('fs');
        const path = require('path');

        const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
        const MainActivityLocation = path.join(platformRoot, 'app/src/main/java/io/crazylife/timetracker/MainActivity.java');

        const input = fs.createReadStream(path.join(ctx.opts.projectRoot, 'hooks/android/MainActivity.java'))
        const output = fs.createWriteStream(MainActivityLocation)

        input.pipe(output)
        output.on('finish', function (err) {
            if (err) {
                reject('Overwrite MainActivity.java fail');
            } else {
                console.log('Overwrite MainActivity.java successfully');
                resolve();
            }
        })
    })
};
