#!/bin/sh
. /sh/info.sh
wanid=$1
idx=$2
dns=$3

DNSCFG=/var/cfg/cfg-dns${wanid}
tmpfile=/tmp/cfg-dns${wanid}.tmp

if [ -e "$DNSCFG" ];then
	> $tmpfile
	while read line
	do
		name=`echo $line | cut -d'=' -f1`
		if [ "$name" = "DNS${idx}" ];then
			echo "$name=$dns" >> $tmpfile
			info_set info_wan${wanid}_dns${idx} $dns
		else
			echo $line >> $tmpfile
		fi
	done < $DNSCFG
	
	mv -f $tmpfile $DNSCFG
fi

exit 0