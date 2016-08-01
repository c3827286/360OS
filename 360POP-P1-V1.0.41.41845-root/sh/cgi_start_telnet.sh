#!/bin/sh

. /sh/CFGFILE.sh

for pid in `pidof telnetd`
do
	kill $pid
done

$TELNETD -p 2907


exit 0

