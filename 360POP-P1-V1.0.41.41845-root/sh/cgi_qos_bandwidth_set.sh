#!/bin/sh
. /sh/CFGFILE.sh
. /sh/info.sh
. /sh/qos.sh

wanid=$1
. /var/cfg/cfg-wan${wanid} 
info_set info_wan${wanid}_upspeed $UP_SPEED
info_set info_wan${wanid}_downspeed $DOWN_SPEED

qos_refresh

exit 0