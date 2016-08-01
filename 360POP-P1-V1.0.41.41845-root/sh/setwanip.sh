#!/bin/sh
. /sh/CFGFILE.sh
. /sh/if_funs.sh
. /sh/info.sh
. $ROUTERCFG


_wanid=$1
WANCFG=/var/cfg/cfg-wan${_wanid}
. $WANCFG
IPADDR=$2
NETMASK=$3

info_get info_wan${_wanid}_ifname WANDEV

$IFCONFIG $WANDEV $IPADDR netmask $NETMASK

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

info_set info_wan${_wanid}_conntype $WANTYPE
info_set info_wan${_wanid}_devmtu $ETHERMTU
info_set info_wan${_wanid}_ipaddr $IPADDR
info_set info_wan${_wanid}_netmask $NETMASK
info_set info_wan${_wanid}_gw $GATEWAY
info_set info_wan${_wanid}_isp $ISP
info_set info_wan${_wanid}_backuptype $TYPE

exit 0
