#!/bin/sh
. /sh/CFGFILE.sh

_lock_op=$1
_lock_name=$2

i=0
if [ "$_lock_op" = "lock" ]; then
	while [ -e "$PATH_LOCK/$_lock_name" ]
	do
		echo "locked $_lock_name"
		sleep 1
		((i++))
		if [ $i -gt 5 ]; then #Ö»Ëø¶¨5s
			break
		fi
	done
	> "$PATH_LOCK/$_lock_name"
	exit 0
fi

if [ "$_lock_op" = "unlock" ]; then
	$RM -f "$PATH_LOCK/$_lock_name"
	exit 0
fi
