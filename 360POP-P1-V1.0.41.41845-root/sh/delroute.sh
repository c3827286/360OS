#!/bin/sh

######################################################################
#Usage: delroute.sh	net|host ipaddr netmask gateway
######################################################################
source /sh/CFGFILE.sh
source /sh/wan.sh
source /sh/info.sh


WANCFG=/var/cfg/cfg-wan
TMPCFG=/var/tmpcfg

#get LAN dev and WAN dev name
source $ROUTERCFG

ROUTETYPE=$1
IPADDR=$2
NETMASK=$3
GATEWAY=$4
DEVIF=$5
DEVIF=`echo $DEVIF` #trim nextline char

i=0
info_get info_wan_wannum wannum
while [ $i -lt $wannum ]
do
	info_get info_wan${i}_name name
	if [ "$name" = "$DEVIF" ];then
		info_get info_wan${i}_ifname ifname
		echo "ifname=$ifname"
	fi
	((i++))
done

if [ "$DEVIF" = "LAN" ];then
	DEV=$LANDEV
fi

$ROUTE del -$ROUTETYPE $IPADDR netmask $NETMASK gw $GATEWAY dev $ifname


#grep -v '$IPADDR,$NETMASK,$GATEWAY' $ROUTECFG >"$TMPCFG"
#cat "$TMPCFG" >"$ROUTECFG"

exit 0
