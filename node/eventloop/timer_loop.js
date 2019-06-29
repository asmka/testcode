let cnt = 0
let timer = setInterval(() => {
    cnt += 1;
    console.log(`cnt ${cnt}: interval`);
    if (cnt == 10) {
        process.nextTick(() => {
            console.log('Called nextTick');
        });
    }
    console.log(`cnt ${cnt}: interval`);
    if (cnt == 20) {
        clearInterval(timer);
    }
}, 1);
