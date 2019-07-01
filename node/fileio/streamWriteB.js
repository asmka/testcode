const child_process = require('child_process');
const stream = require('stream');
const fs = require('fs');

const R_BLOCK = fs.constants.O_RDONLY;
const W_BLOCK = fs.constants.O_WRONLY;
const RW_BLOCK = fs.constants.O_RDWR;
const R_NONBLOCK = fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
const W_NONBLOCK = fs.constants.O_WRONLY | fs.constants.O_NONBLOCK;
const RW_NONBLOCK = fs.constants.O_RDWR | fs.constants.O_NONBLOCK;

if (process.argv.length !== 3) {
    console.error(`[ERROR] Usage: node ${process.argv[1]} <file>`);
    process.exit(1);
}
const file = process.argv[2];

let isOpenFailed = false;
let wstrm = null;
{
    let timer = setInterval(() => {
        try {
            const fd = fs.openSync(file, W_BLOCK);
            console.log(`opened ${file} W_BLOCK`);
            wstrm = fs.createWriteStream(null, {fd: fd});
            clearInterval(timer);
        } catch (err) {
            if (err.code == 'ENXIO') {
                // Return error
                console.error(`[ERROR] Failed to open ${file} W_BLOCK (code: ${err.code})`);
                isOpenFailed = true;
                clearInterval(timer);
            }
        }
    });
}

let timer = setInterval(() => {
    if (isOpenFailed) {
        clearInterval(timer);
        return;
    }
    if (wstrm) {
        wstrm.write('A'.repeat(1024*1024) + "\n");
        clearInterval(timer);
    }
});
