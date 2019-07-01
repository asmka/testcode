const child_process = require('child_process');
const stream = require('stream');
const fs = require('fs');
const net = require('net');

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
            const fd = fs.openSync(file, W_NONBLOCK);
            console.log(`opened ${file} W_NONBLOCK`);
            //wstrm = fs.createWriteStream(null, {fd: fd});
			wstrm = new net.Socket({fd});
            clearInterval(timer);
        } catch (err) {
            // Reader doesn't open yet
            if (err.code == 'ENXIO') {
                // Continue to open
                return;
            } else {
                // Return error
                console.error(`[ERROR] Failed to open ${file} W_NONBLOCK (code: ${err.code})`);
                isOpenFailed = true;
                clearInterval(timer);
            }
        }
    });
}

for (let i=0; i<1024; i++) {
    let timer = setInterval(() => {
        if (isOpenFailed) {
            clearInterval(timer);
            return;
        }
        if (wstrm) {
            wstrm.write(i.toString().repeat(1024) + "\n");
            clearInterval(timer);
        }
    });
}
