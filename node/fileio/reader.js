const child_process = require('child_process');
const stream = require('stream');
const fs = require('fs');

if (process.argv.length < 3) {
    console.error(`[ERROR] Usage: node ${process.argv[1]} <file1> [<file2> ...]`);
    process.exit(1);
}

const R_BLOCK = fs.constants.O_RDONLY;
const W_BLOCK = fs.constants.O_WRONLY;
const RW_BLOCK = fs.constants.O_RDWR;
const R_NONBLOCK = fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
const W_NONBLOCK = fs.constants.O_WRONLY | fs.constants.O_NONBLOCK;
const RW_NONBLOCK = fs.constants.O_RDWR | fs.constants.O_NONBLOCK;

for (let i=2; i<process.argv.length; i++) {
    const file = process.argv[i];
    
    const fd = fs.openSync(file, R_BLOCK);
    console.log(`opened ${file} R_BLOCK`);
    let rstrm = fs.createReadStream(null, {fd: fd});
    
    rstrm.on('close', () => {
        console.log(`rstrm (${file}): on close`);
    });
    rstrm.on('data', (chunk) => {
        console.log(`rstrm (${file}): on data`);
        console.log('chunk: ', chunk);
    });
    rstrm.on('end', () => {
        console.log(`rstrm (${file}): on end`);
    });
    rstrm.on('error', (err) => {
        console.log(`rstrm (${file}): on error`);
        console.log('err: ', err);
    });
    rstrm.on('pause', () => {
        console.log(`rstrm (${file}): on pause`);
    });
    rstrm.on('readable', () => {
        console.log(`rstrm (${file}): on readable`);
        rstrm.read();
    });
    rstrm.on('resume', () => {
        console.log(`rstrm (${file}): on resume`);
    });
}

setTimeout (() => true, 600*1000);
