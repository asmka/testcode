const child_process = require('child_process');
const stream = require('stream');
const fs = require('fs');

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
let rstrmPause = false;
{
    const fd = fs.openSync(file1, R_BLOCK);
    console.log(`opened ${file1} R_BLOCK`);
    rstrm = fs.createReadStream(null, {fd: fd});
}

let wstrm;
{
    const fd = fs.openSync(file2, W_BLOCK);
    console.log(`opened ${file2} W_BLOCK`);
    wstrm = fs.createWriteStream(null, {fd: fd});
}

// Reader event
rstrm.on('close', () => {
    console.log(`rstrm (${file1}): on close`);
    console.log(`rstrm (${file1}): end wstrm`);
    wstrm.end();
});
rstrm.on('data', (chunk) => {
    console.log(`rstrm (${file1}): on data`);
    console.log(`rstrm (${file1}): write to ${file2}`);
    if (!wstrm.write(chunk)) {
        rstrmPause = true;
    }
});
rstrm.on('end', () => {
    console.log(`rstrm (${file1}): on end`);
});
rstrm.on('error', (err) => {
    console.log(`rstrm (${file1}): on error`);
    console.log('err: ', err);
});
rstrm.on('pause', () => {
    console.log(`rstrm (${file1}): on pause`);
});
rstrm.on('readable', () => {
    console.log(`rstrm (${file1}): on readable`);
    if (!rstrmPause) {
        rstrm.read();
    }
});
//rstrm.once('resume', () => {
//    console.log(`rstrm (${file1}): once resume`);
//});
rstrm.on('resume', () => {
    console.log(`rstrm (${file1}): on resume`);
});

// Writer event
wstrm.on('close', () => {
    console.log(`wstrm (${file2}): on close`);
    return;
});
wstrm.on('drain', () => {
    console.log(`wstrm (${file2}): on drain`);
    console.log(`wstrm (${file2}): resume ${file1}`);
    rstrmPause = false;
    rstrm.resume();
});
wstrm.on('error', (err) => {
    console.log(`wstrm (${file2}): on error`);
    console.log('err: ', err);
});
wstrm.on('finish', () => {
    console.log(`wstrm (${file2}): on finish`);
});
wstrm.on('pipe', (src) => {
    console.log(`wstrm (${file2}): on pipe`);
});
wstrm.on('unpipe', (src) => {
    console.log(`wstrm (${file2}): on unpipe`);
});

setTimeout(() => true, 600*1000);
