#!/bin/sh

source /sh/info.sh
source /sh/pid_mark.sh

PROCESS=ifstate
pidfile=/var/run/ifstate.pid
ARGS=
IF_DEV_PATH="/var/cfg/cfg-portname"
IF_CFG_PATH="/var/cfg/cfg-ifstate"
wannum=

info_get info_wan_wannum wannum

get_if_check_info()
{
	local ifcheck_ip=
	local ifname=
	local ifcheck_method=
	local enable=

	local wanid=$1
	info_get info_wan${wanid}_ifcheck_enable enable

	if [ "$enable" = "1" ];then
		info_get info_wan${wanid}_ifname ifname
		info_get info_wan${wanid}_ifcheck_ip ifcheck_ip
		info_get info_wan${wanid}_ifcheck_method ifcheck_method
		
		echo "$ifname $ifcheck_method $ifcheck_ip">>$IF_CFG_PATH
	fi
}

set_if_check_info()
{
	local wanid=$1
	local enable=$2
	local ifcheck_method=$3
	local dstip=$4
	
	info_set info_wan${wanid}_ifcheck_enable $enable
	info_set info_wan${wanid}_ifcheck_method $ifcheck_method
	[ "$dstip" = "" ] && dstip="0.0.0.0"
	info_set info_wan${wanid}_ifcheck_ip $dstip
}

get_dev_info()
{
	local port=
	local ifname=
	local wanname=

	local wanid=$1

	info_get info_wan${wanid}_port port
	info_get info_wan${wanid}_ifname ifname
	#info_get info_wan${wanid}_name wanname
	
	echo "$port $ifname WAN$((wanid+1))">>$IF_DEV_PATH
}

info_get info_wan_wanifcheck_rttable wanifcheck_rttable
> $IF_DEV_PATH
> $IF_CFG_PATH

case $1 in
	start)
		for((a=0;a<wannum;a++))
		do
			get_dev_info $a
			get_if_check_info $a	
		done
		kill `pidof $PROCESS`
		$PROCESS &
		pid_mark_add $PROCESS $! $wanifcheck_rttable
	;;
	change)
		set_if_check_info $2 $3 $4 $5
		for((a=0;a<wannum;a++))
		do
			get_dev_info $a
			get_if_check_info $a	
		done
		kill `pidof $PROCESS`
		$PROCESS &
		pid_mark_add $PROCESS $! $wanifcheck_rttable
	;;
esac

