const fs = require('fs');
const stream = require('stream');
const net = require('net');
const child_process = require('child_process');

const R_BLOCK = fs.constants.O_RDONLY;
const W_BLOCK = fs.constants.O_WRONLY;
const RW_BLOCK = fs.constants.O_RDWR;
const R_NONBLOCK = fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
const W_NONBLOCK = fs.constants.O_WRONLY | fs.constants.O_NONBLOCK;
const RW_NONBLOCK = fs.constants.O_RDWR | fs.constants.O_NONBLOCK;

if (process.argv.length !== 4) {
    console.error(`[ERROR] Usage: node ${process.argv[1]} <file1> <file2>`);
    process.exit(1);
}
const file1 = process.argv[2];
const file2 = process.argv[3];

let rstrm;
{
    const fd = fs.openSync(file1, R_BLOCK);
    console.log(`opened ${file1} R_BLOCK`);
    //rstrm = fs.createReadStream(null, {fd: fd});
    rstrm = new net.Socket(fd);
}

let wstrm;
{
    const fd = fs.openSync(file2, W_BLOCK);
    console.log(`opened ${file2} W_BLOCK`);
    //wstrm = fs.createWriteStream(null, {fd: fd});
    wstrm = new net.Socket(fd);
}

rstrm.once('connect', () => {
    console.log('rstrm: on connect');
});
rstrm.once('ready', () => {
    console.log('rstrm: on ready');
});
rstrm.once('resume', () => {
    console.log('rstrm: on resume');
});
rstrm.once('readable', () => {
    console.log('rstrm: on readable');
});

rstrm.pipe(wstrm);
