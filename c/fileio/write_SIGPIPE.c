#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int pfd[2];
    pipe(pfd);

    // Close read fd
    close(pfd[0]);

    // Cause SIGPIPE
    if (write(pfd[1], "A", 1) == -1) {
        // Failed to write
        printf("[ERROR] Failed to write pipe (code: %s)\n", strerror(errno));
        exit(EXIT_FAILURE);
    }
}
