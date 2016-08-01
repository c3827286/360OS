#!/bin/sh
log_max=512
log=/var/cfg/logs
tmp=/tmp/logs.tmp
pidfile=/var/run/log.sh.pid

[ -e "$pidfile" ] && exit 0
echo $$ > $pidfile

[ -e "$log" ] && tail -n $((log_max-1)) $log > $tmp

echo `date "+%Y-%m-%d %H:%M:%S "` "$@" >> $tmp
mv -f $tmp $log

rm -f $pidfile

exit 0
