#!/bin/sh
source /sh/CFGFILE.sh
PIDFILE=/var/tmp/dnsmasq.pid

#���pid�ļ������ڣ����˳�
[ ! -e $PIDFILE ] && exit 0

kill -9 `cat $PIDFILE`

rm -f $PIDFILE

exit 0
