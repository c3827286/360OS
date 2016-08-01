#!/bin/sh
source /sh/CFGFILE.sh
PIDFILE=/var/tmp/dnsmasq.pid

#如果pid文件不存在，则退出
[ ! -e $PIDFILE ] && exit 0

kill -9 `cat $PIDFILE`

rm -f $PIDFILE

exit 0
