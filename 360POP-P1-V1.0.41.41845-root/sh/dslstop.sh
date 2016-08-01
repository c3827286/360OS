#!/bin/sh

#############################################################################
#stop pppoe dail
#############################################################################
. /sh/CFGFILE.sh
_wanid=$1
_ping_check=$2

PPPFILE=/var/run/ppp-ppp${_wanid}.pid
PPPCFG=/var/cfg/cfg-ppp${_wanid}
PPPSHRUN=/var/run/ppp${_wanid}shrun
#if [ ! -r "$PPPFILE" ]; then
#	exit 0
#fi

#如果pid文件不存在，则退出
if ! [ -e $PPPFILE ]; then
	exit 0
fi

PPPPID=`head -n 1 $PPPFILE`

. $PPPCFG
if [ "$PPPTYPE" = "manual" ]; then
	$KILL $PPPPID
	$RM -f $PPPSHRUN
	exit 0
fi
if [ "$PPPTYPE" = "auto" -a "$_ping_check" = "check_ok" ];then
	$KILL $PPPPID
	$RM -f $PPPSHRUN
	exit 0
fi

$KILL -1 $PPPPID

exit 0
