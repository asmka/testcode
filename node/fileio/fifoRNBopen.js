const child_process = require('child_process');
const stream = require('stream');
const fs = require('fs');

const pipeName = `./FIFO`;
try {
    child_process.execSync(`mkfifo ${pipeName}`);
} catch (err) {
    // pass
}

const R_NONBLOCK = fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
const W_NONBLOCK = fs.constants.O_WRONLY | fs.constants.O_NONBLOCK;

const rfd = fs.openSync(pipeName, R_NONBLOCK);
console.log('opened FIFO R_NONBLOCK');
let rstrm = fs.createReadStream(null, {fd: rfd});

rstrm.on('close', () => {
    console.log('rstrm: on close');
});
rstrm.on('data', (chunk) => {
    console.log('rstrm: on data');
    console.log('chunk: ', chunk);
});
rstrm.on('end', () => {
    console.log('rstrm: on close');
});
rstrm.on('error', (err) => {
    console.log('rstrm: on error');
    console.log('err: ', err);
});
rstrm.on('pause', () => {
    console.log('rstrm: on pause');
});
rstrm.on('readable', () => {
    console.log('rstrm: on readable');
});
rstrm.on('resume', () => {
    console.log('rstrm: on resume');
});

//const wfd = fs.openSync(pipeName, W_NONBLOCK);
//console.log('opened FIFO W_NONBLOCK');
//let wstrm = stream.createWriteStream(null, {fd: wfd});
