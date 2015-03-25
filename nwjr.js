#! /usr/bin/env node

var fs = require('fs-extra');
var path = require('path');
var child_process = require('child_process');

var MAC_EXECUTABLE = 'nwjs.app';
var LINUX_EXECUTABLE = 'nw';
var WIN_EXECUTABLE = 'nw.exe';

var HELP_TEXT = "\nnwjr is a utility to quickly run and test NW.js apps during development.\n" +
                "usage: nwjr (-s /path/to/NW.js/executables | /path/to/NW.js/app)\n" +
                "   -s: Run in setup mode to copy and store NW.js files (run again to update NW.js)\n"

var argv = require('minimist')(process.argv.slice(2));

if (argv['s']) {
    if (typeof argv['s'] === 'boolean') {
        console.log(HELP_TEXT);
        process.exit(-1);
    }

    if (fs.existsSync(path.resolve(argv['s'], LINUX_EXECUTABLE)) || 
        fs.existsSync(path.resolve(argv['s'], MAC_EXECUTABLE)) ||
        fs.existsSync(path.resolve(argv['s'], WIN_EXECUTABLE))) {
        console.log("\nCopying NW.js executable files...");

        fs.removeSync('executable');
        fs.copySync(path.resolve(argv['s']), path.resolve('.', 'executable'));
        
        console.log("NW.js files accepted. You may now delete your folder.\n");

        process.exit();
    }

    else {
        console.log("Either that directory does not exist, or it's missing appropriate NW.js files.\n");
        process.exit(1);
    }
}

if (argv['_'].length == 1) {
    // TODO: Find better way to check if folder exists
    if (!fs.existsSync(path.resolve('.', 'executable'))) {
        console.log("NW.js executables not found. Run setup using -s first.\n");
        process.exit(-1);
    }

    var pathToApp = path.resolve(argv['_'][0]);

    if (fs.existsSync(path.resolve(pathToApp, 'package.json'))) {
        console.log("Attempting to launch NW.js app...\n");

        if (process.platform == "darwin") {
            var nwjsExecLocation = path.resolve('.', 'executable', MAC_EXECUTABLE + '/Contents/MacOS/nwjs');
            child_process.exec(nwjsExecLocation + " " + pathToApp);
            process.exit();
        }

        else if (process.platform == "win32" || process.platform == "linux") {
            child_process.exec(path.resolve('.', 'executable', LINUX_EXECUTABLE) + " " + pathToApp);
            process.exit();
        }
    }

    else {
        console.log("Directory does not exist or package.json not found. Are you sure that's an NW.js app?\n");
        process.exit(1);
    }
}

else {
    console.log(HELP_TEXT);
    process.exit(-1);    
}
