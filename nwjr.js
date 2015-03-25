#! /usr/bin/env node

var fs = require('fs-extra');
var path = require('path');
var child_process = require('child_process');

// If nwjr ever breaks due to changes in NW.js's executable naming system, modify these
var MAC_EXECUTABLE = 'nwjs.app';
var LINUX_EXECUTABLE = 'nw';
var WIN_EXECUTABLE = 'nw.exe';

var HELP_TEXT = "\nnwjr is a utility to quickly run and test NW.js apps during development.\n" +
                "usage: nwjr (-s /path/to/NW.js/executables | /path/to/NW.js/app)\n" +
                "   -s: Run in setup mode to copy and store NW.js files (run again to update NW.js)\n"

// Reading in arguments
var argv = require('minimist')(process.argv.slice(2));

// If setup mode requested
if (argv['s']) {
    // If nothing else passed in, minimist sets -s == true
    if (typeof argv['s'] === 'boolean') {
        console.log(HELP_TEXT);
        process.exit(-1);
    }

    // Setup stuff
    try {
        switch (process.platform) {
            case "darwin":
            fs.statSync(path.resolve(argv['s'], MAC_EXECUTABLE)).isFile();
            break;
            case "linux":
            fs.statSync(path.resolve(argv['s'], LINUX_EXECUTABLE)).isFile();
            break;
            case "win32":
            fs.statSync(path.resolve(argv['s'], WIN_EXECUTABLE)).isFile();
            break;
        }

        console.log("\nCopying NW.js executable files...");

        // Replacing any existing executable directory and copy new files
        fs.removeSync('executable');
        fs.copySync(path.resolve(argv['s']), path.resolve('.', 'executable'));
        
        console.log("NW.js files accepted. You may now delete your folder.\n");

        process.exit();
    }
    // If setup directory doesn't exist or is missing platform-specific NW.js executables
    catch(err) {
        if (err.code === "ENOENT") {
            console.log("Either that directory does not exist, or it's missing appropriate NW.js files.\n");
            process.exit(1);
        }
    }
}

// If no -s, but 1 argument (presumably app location)
if (argv['_'].length == 1) {
    // Check if NW.js executable files have been set up
    try {
        fs.statSync(path.resolve('.', 'executable')).isDirectory()
    }
    catch(err) {
        if (err.code === "ENOENT") {
            console.log("NW.js executables not found. Run setup using -s first.\n");
            process.exit(-1);
        }
    }

    var pathToApp = path.resolve(argv['_'][0]);

    // Run platform specific executable
    try { 
        // To check if location and package.json exist
        fs.statSync(path.resolve(pathToApp, 'package.json')).isFile()
        console.log("Launching NW.js app...\n");

        if (process.platform === "darwin") {
            var nwjsExecLocation = path.resolve('.', 'executable', MAC_EXECUTABLE + '/Contents/MacOS/nwjs');
            child_process.exec(nwjsExecLocation + " " + pathToApp);
            process.exit();
        }

        else if (process.platform === "win32" || process.platform === "linux") {
            child_process.exec(path.resolve('.', 'executable', LINUX_EXECUTABLE) + " " + pathToApp);
            process.exit();
        }
    }
    // If package.json or app folder was not found
    catch(err) {
        if (err.code === "ENOENT") {
            console.log("Directory does not exist or package.json not found. Are you sure that's an NW.js app?\n");
            process.exit(1);
        }
    }
}

// If no -s and something weird
else {
    console.log(HELP_TEXT);
    process.exit(-1);    
}
