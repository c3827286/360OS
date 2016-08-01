#!/bin/sh
#
. /sh/CFGFILE.sh

echo "pid=$$" > /var/run/absinit.pid

while [ true ];
do
	wlabs &
	sleep 300
done

exit 0
