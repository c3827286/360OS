#!/bin/sh

. /sh/CFGFILE.sh
	
. $ROUTERCFG

PROCESSNAME="arp_attack"
ARGS="-I $LANDEV"

ENABLE="0"

if [ -e "/var/cfg/arp_attack_flg" ];then
	. /var/cfg/arp_attack_flg
fi

case $1 in
        start|restart)
                if [ "$ENABLE" = "0" ];then
                        exit 0
                fi
        ;;
        stop)
        ;;
esac
/sh/ss_process.sh "$PROCESSNAME" "$1" "$ARGS"
exit 0
