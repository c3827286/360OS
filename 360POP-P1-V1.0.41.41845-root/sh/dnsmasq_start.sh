#!/bin/sh

. /sh/CFGFILE.sh
PIDFILE=/var/tmp/dnsmasq.pid

/sh/dnsmasq_stop.sh

dnsmasq -E --pid-file=$PIDFILE

exit 0

