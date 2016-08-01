#!/bin/sh

. /sh/CFGFILE.sh

. $ROUTERCFG

PROCESSNAME="arp_listen"
ARGS="-I $LANDEV"

ENABLE="0"

#if [ -e "/var/cfg/arp_listen_flag" ];then
#	. /var/cfg/arp_listen_flag
#fi

case $1 in
	start|restart)
#		if [ "$ENABLE" = "0" ];then
#			exit 0
#		fi
	;;
	print)
	;;
	stop)
	;;
esac

/sh/ss_process.sh "$PROCESSNAME" "$1" "$ARGS"

exit 0
