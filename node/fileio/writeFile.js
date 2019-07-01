const fs = require('fs');
const pipeName = './FIFO';
fs.writeFile(pipeName, 'a', (err) => {
    console.log(err);
});

