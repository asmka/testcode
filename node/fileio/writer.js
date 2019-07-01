const child_process = require('child_process');
const stream = require('stream');
const fs = require('fs');

const pipeName = `./FIFO`;

const R_BLOCK = fs.constants.O_RDONLY;
const W_BLOCK = fs.constants.O_WRONLY;
const RW_BLOCK = fs.constants.O_RDWR;
const R_NONBLOCK = fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
const W_NONBLOCK = fs.constants.O_WRONLY | fs.constants.O_NONBLOCK;
const RW_NONBLOCK = fs.constants.O_RDWR | fs.constants.O_NONBLOCK;

const fd = fs.openSync(pipeName, W_BLOCK);
console.log('opened FIFO R_BLOCK');
let wstrm = fs.createWriteStream(null, {fd: fd});

wstrm.on('close', () => {
    console.log('wstrm: on close');
});
wstrm.on('drain', () => {
    console.log('wstrm: on drain');
});
wstrm.on('error', (err) => {
    console.log('wstrm: on error');
    console.log('err: ', err);
});
wstrm.on('finish', () => {
    console.log('wstrm: on finish');
});
wstrm.on('pipe', (src) => {
    console.log('wstrm: on pipe');
    console.log('src: ', src);
});
wstrm.on('unpipe', (src) => {
    console.log('wstrm: on unpipe');
    console.log('src: ', src);
});

setTimeout (() => true, 600*1000);
