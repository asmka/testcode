#include <stdio.h>
#include <stdlib.h>
#include <sys/fcntl.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("[ERROR] Usage: %s <file name>", argv[0]);
        exit(EXIT_FAILURE);
    }

    const char* const filename = argv[1];
    int fd;
    if ((fd = open(filename, O_WRONLY)) == -1) {
        // Failed to open
        printf("[ERROR] Failed to open %s with O_WRONLY\n", filename);
        exit(EXIT_FAILURE);
    }

    // Pause process
    getchar();
}
