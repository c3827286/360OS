#!/bin/sh
source /sh/CFGFILE.sh
source $ROUTERCFG
source /sh/info.sh

_wanid=$1
WANCFG=/var/cfg/cfg-wan${_wanid}
WANINFO=/var/wan${_wanid}.info
source $WANCFG
source $WANINFO
tmp=\$WAN${_wanid}DEV
WANDEV=`eval echo $tmp`
info_set info_wan${_wanid}_ifname $WANDEV
info_set info_wan${_wanid}_devname $WANDEV
info_set info_wan${_wanid}_ipaddr "0.0.0.0"
info_set info_wan${_wanid}_netmask "0.0.0.0"
info_set info_wan${_wanid}_gw "0.0.0.0"
info_set info_wan${_wanid}_domain ""
info_set info_wan${_wanid}_dns1 "0.0.0.0"
info_set info_wan${_wanid}_dns2 "0.0.0.0"
info_set info_wan${_wanid}_autodns1 "0.0.0.0"
info_set info_wan${_wanid}_autodns2 "0.0.0.0"

# zjx:以下信息用于页面输出
WANINFO=/var/wan${_wanid}.info
echo "WANIP=0.0.0.0" > $WANINFO
echo "WANMASK=0.0.0.0" >> $WANINFO
echo "WANGW=0.0.0.0" >> $WANINFO


$IFCONFIG $WANDEV down

#if up events
/sh/if_down.sh $_wanid

exit 0