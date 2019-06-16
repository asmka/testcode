#define _GNU_SOURCE             /* feature_test_macros(7) 参照 */
#include <fcntl.h>              /* O_* 定数の定義の取得 */
#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int pfd[2];
    pipe2(pfd, O_NONBLOCK);

    while (1) {
        if (write(pfd[1], "AAAAAAAA", 8) == -1) {
            // Failed to write
            if (errno == EAGAIN) {
                printf("[ERROR] errno: EAGAIN\n");
            }
            printf("[ERROR] Failed to write pipe (code: %s)\n", strerror(errno));
            exit(EXIT_FAILURE);
        }
    }
}
