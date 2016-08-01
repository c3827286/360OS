#!/bin/sh

. $LANCFG

TMP_PATH="/var/tmp/tmp-packet"

> $TMP_PATH
iptables -L -v -n -x | grep $DEV | \
while read packet bytes target protocol opt in out src dst
do
	if [ "$out" == "$LANDEV" ];then
		echo "$in $packet" >> $TMP_PATH
	fi
done 

#`rm $TMP_PATH`
exit 0
