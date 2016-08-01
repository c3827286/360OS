#!/bin/sh

#############################################################################
#set WAN cfg file
#usage:
#	setwangw.sh gw
#############################################################################
. /sh/CFGFILE.sh
. /sh/if_funs.sh

. $ROUTERCFG

_wanid=$1
WANCFG=/var/cfg/cfg-wan${_wanid}
. $WANCFG
GATEWAY=$2


#get LAN dev and WAN dev name
info_get info_wan${_wanid}_ifname WANDEV

$ROUTE add -net 0.0.0.0 netmask 0.0.0.0 gw "$GATEWAY" dev $WANDEV

#adjust wan cfg
echo "WANTYPE=$WANTYPE" > $WANCFG
echo "ETHERMTU=$ETHERMTU" >> $WANCFG
echo "IPADDR=$IPADDR" >> $WANCFG
echo "NETMASK=$NETMASK" >> $WANCFG
echo "GATEWAY=$GATEWAY" >> $WANCFG
echo "ISP=$ISP" >> $WANCFG
echo "TYPE=$TYPE" >> $WANCFG
echo "IFCHECK_ENABLE=$IFCHECK_ENABLE" >> $WANCFG
echo "IFCHECK_METHOD=$IFCHECK_METHOD" >> $WANCFG
echo "IFCHECK_IP=$IFCHECK_IP" >> $WANCFG

exit 0
