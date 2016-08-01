#!/bin/sh

_wanid=$1

PPPCFG=/var/cfg/cfg-ppp${_wanid}

if [ ! -r "$PPPCFG" ]; then
	echo 0
	
	exit 0
fi

. $PPPCFG

case "$PPPTYPE" in
auto)
	echo 1
;;
manual)
	echo 0
;;
demand)
	echo 2
;;
esac

exit 0
