#!/bin/sh
source /sh/info.sh

info_get info_wan_wannum wannum

i=0
while [ $i -lt $wannum ]
do
	source /var/cfg/cfg-wan${i}
	[ "$ECHOPING" = "" ] && ECHOPING="1"
	info_set info_wan${i}_echoping $ECHOPING
	((i++))
done

/sh/firewall.sh refresh


exit 0