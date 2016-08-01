#!/bin/sh
source /sh/CFGFILE.sh
source /sh/info.sh
source $ROUTERCFG

_wanid=$1
WANCFG=/var/cfg/cfg-wan${_wanid}
WANINFO=/var/wan${_wanid}.info
source $WANCFG
source $WANINFO

DNSCFG=/var/cfg/cfg-dns${_wanid}
if [ -e "$DNSCFG" ];then
	source $DNSCFG
fi

tmp=\$WAN${_wanid}DEV
WANDEV=`eval echo $tmp`
info_set info_wan${_wanid}_ifname $WANDEV
info_set info_wan${_wanid}_devname $WANDEV
info_set info_wan${_wanid}_ipaddr $IPADDR
info_set info_wan${_wanid}_netmask $NETMASK
info_set info_wan${_wanid}_gw $GATEWAY
info_set info_wan${_wanid}_domain ""
[ -z "$DNS1" ] && DNS1="0.0.0.0"
info_set info_wan${_wanid}_dns1 "$DNS1"
[ -z "$DNS2" ] && DNS2="0.0.0.0"
info_set info_wan${_wanid}_dns2 "$DNS2"
info_set info_wan${_wanid}_autodns1 "0.0.0.0"
info_set info_wan${_wanid}_autodns2 "0.0.0.0"

# zjx:以下信息用于页面输出
WANINFO=/var/wan${_wanid}.info
echo "WANIP=$IPADDR" > $WANINFO
echo "WANMASK=$NETMASK" >> $WANINFO
echo "WANGW=$GATEWAY" >> $WANINFO


$IFCONFIG $WANDEV $IPADDR netmask $NETMASK

#if up events
/sh/if_up.sh $_wanid

exit 0
