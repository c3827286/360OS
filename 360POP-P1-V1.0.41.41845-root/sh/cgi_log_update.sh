#!/bin/sh

source /sh/signal.sh

kill -$SIGUSR1 `pidof logd`

exit 0