#!/bin/sh

. /sh/CFGFILE.sh
. /sh/info.sh


argv_if=`grep egiga $1 | cut -d ' ' -f3`

info_get info_wan_wannum wannum

i=0
while [ $i -lt $wannum ];
do
	info_get info_wan${i}_devname _wan_dev
	if [ "$_wan_dev" = "$argv_if" ]; then
		exit $i 	
	fi

	((i++))
done

exit $i
