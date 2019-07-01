const fs = require('fs')

const FIFO_NAME = './FIFO';
const FILE_NAME = './FILE';

const fd = fs.openSync(FIFO_NAME, fs.constants.O_RDWR);
fs.close(fd);
fs.close(fd);
