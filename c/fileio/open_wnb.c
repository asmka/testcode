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
    if ((fd = open(filename, O_WRONLY | O_NONBLOCK)) == -1) {
        // Failed to open
        if (errno == ENXIO) {
            printf("[ERROR] errno: ENXIO\n");
        }
        printf("[ERROR] Failed to open %s (code: %s)\n", filename, strerror(errno));
        exit(EXIT_FAILURE);
    }

    // Pause process
    getchar();
}
