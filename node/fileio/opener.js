const child_process = require('child_process');
const stream = require('stream');
const fs = require('fs');

if (process.argv.length !== 3) {
    console.error(`[ERROR] Usage: node ${process.argv[1]} <FIFO>`);
    process.exit(1);
}

const pipeName = process.argv[2];

const R_NONBLOCK = fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
const W_NONBLOCK = fs.constants.O_WRONLY | fs.constants.O_NONBLOCK;
const RW_NONBLOCK = fs.constants.O_RDWR | fs.constants.O_NONBLOCK;
const RW_BLOCK = fs.constants.O_RDWR

const fd = fs.openSync(pipeName, RW_NONBLOCK);
console.log('opened FIFO RW_BLOCK');

setTimeout (() => true, 600*1000);
