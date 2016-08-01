#!/bin/sh

######################################################################
#Usage: setroute.sh	net|host ipaddr netmask gateway LAN/WAN
######################################################################
. /sh/CFGFILE.sh
. /sh/info.sh

#get LAN dev and WAN dev name
. $ROUTERCFG

ROUTETYPE=$1
IPADDR=$2
NETMASK=$3
GATEWAY=$4
DEVIF=$5

i=0
info_get info_wan_wannum wannum
while [ $i -lt $wannum ]
do
	info_get info_wan${i}_name name
	if [ "$name" = "$DEVIF" ];then
		info_get info_wan${i}_ifname DEV
	fi
	((i++))
done

if [ "$DEVIF" = "LAN" ];then
	DEV=$LANDEV
fi

if [ "$ROUTETYPE" = "net" ]; then
	METRIC=5
else #if ROUTETYPE=host
	METRIC=4
fi
$ROUTE add -$ROUTETYPE $IPADDR netmask $NETMASK gw $GATEWAY metric $METRIC dev $DEV

echo "$ROUTETYPE,$IPADDR,$NETMASK,$GATEWAY,$DEVIF" >> "$ROUTECFG"

exit 0
