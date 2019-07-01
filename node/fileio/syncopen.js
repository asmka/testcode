const fs = require('fs');

const R_BLOCK = fs.constants.O_RDONLY;
const W_BLOCK = fs.constants.O_WRONLY;
const RW_BLOCK = fs.constants.O_RDWR;
const R_NONBLOCK = fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
const W_NONBLOCK = fs.constants.O_WRONLY | fs.constants.O_NONBLOCK;
const RW_NONBLOCK = fs.constants.O_RDWR | fs.constants.O_NONBLOCK;

if (process.argv.length !== 3) {
    console.error(`[ERROR] Usage: node ${process.argv[1]} <file1>`);
    process.exit(1);
}
const file = process.argv[2];

setInterval(() => console.log('interval'), 1000);

fs.openSync(file);
