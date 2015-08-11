#!/usr/bin/env node

/**
 * Build this project.
 */
"use strict";

process.chdir(__dirname + '/..');

var apeTasking = require('ape-tasking'),
    coz = require('coz');

apeTasking.runTasks('build', [
    function (callback) {
        coz.render([
            '.*.bud',
            'docs/**/.*.bud',
            'lib/.*.bud',
            'test/.*.bud'
        ], callback);
    }
], true);

