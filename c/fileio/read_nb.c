#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("[ERROR] Usage: %s <file name>", argv[0]);
        exit(EXIT_FAILURE);
    }

    const char* const filename = argv[1];
    int fd;
    if ((fd = open(filename, O_RDONLY | O_NONBLOCK)) == -1) {
        // Failed to open
        printf("[ERROR] Failed to open %s (code: %s)\n", filename, strerror(errno));
        exit(EXIT_FAILURE);
    }

    char buf[64];
    while (read(fd, buf, 64) > 0) {
        printf("read buf: %s\n", buf);
        //for (int i=0; i<64; i++) {
        //    printf("buf[i]: %d\n", buf[i]);
        //}
    }
}
