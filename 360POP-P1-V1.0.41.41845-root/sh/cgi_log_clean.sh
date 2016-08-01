#!/bin/sh

source /sh/signal.sh

kill -$SIGUSR2 `pidof logd`

exit 0