nwjr
====

[![Flattr nwjr](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=Antrikshy&url=github.com/Antrikshy/nwjr&title=nwjr&language=English&tags=github&category=software)

A simple command line utility to easily launch [NW.js](http://nwjs.io) apps during development. A single call to `nwjr` opens your app right from the command line, with minimal, one-time setup. Compatible with Windows, Linux and Mac.

When starting development on an NW.js app, follow the instructions below as step 1. It is meant to be a replacement for [all of this](https://github.com/nwjs/nw.js/wiki/How-to-run-apps), regardless of platform.

>Currently only tested on Windows and Mac. If you have verified that it works on Linux, please contact me [@Antrikshy](http://twitter.com/Antrikshy). PRs with fixes are welcome. When Linux compatibility is confirmed, this message will disappear.

Contact: [@Antrikshy](http://twitter.com/Antrikshy) for any bugs or suggestions.

Setup
-----

nwjr is an alternative to downloading NW.js and running it manually.

Install using

    npm install nwjr

nwjr requires a one-time setup. It needs to be fed NW.js executable files that it will then use to run your app. Head over to [nwjs.io](http://nwjs.io) and download NW.js for your platform. Unpack it (from the .zip or .tar.gz that it comes in) and run the setup command

    nwjr -s /path/to/unpacked/folder

The folder in this argument should be the uncompressed one that now contains the executables. Once nwjr accepts the NW.js files, you are free to delete the folder.

Usage
-----

After completing setup, you can run

    nwjr /path/to/app

Simply pass in the path to your app's folder, which contains the `package.json`. This means that you can also navigate to your app's directory and run `nwjr .`.

Update NW.js
------------

You can update to newer versions of NW.js by simply downloading the newer version, unpacking it and running the setup script as outlined above.

Contribute
----------



Donate
------
* [Flattr](https://flattr.com/submit/auto?user_id=Antrikshy&url=github.com/Antrikshy/nwjr&title=nwjr&language=English&tags=github&category=software)
* via Bitcoin at 1Aqvg4zVrdskeaS4dVjSGK7eHavSoEbB7V