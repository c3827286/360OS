#!/bin/sh

source /sh/CFGFILE.sh
source /sh/info.sh
source /sh/pid_mark.sh

event_if_state_change()
{
	local wanid=$1
	local wannum=
	local ip=
	local netmask=
	local gw=
	local ifname=
	local conntype=
	local backuptype=
	local route_cmd=
	local tmp=
	local table=
	local i=0
	local wanmain_rttable=
	
	info_get info_wan_wannum wannum
	info_get info_wan${wanid}_backuptype backuptype
	info_get info_wan${wanid}_ifcheck_ping_status ifcheck_ping_status
	info_get info_wan${wanid}_ifcheck_port_status ifcheck_port_status
	if [ "$backuptype" = "primary" ];then
		if [ "$ifcheck_ping_status" = "FAILED" ];then
			i=0
			while [ $i -lt $wannum ]
			do
	#zjx:FIXME 如果有几个backup口，那么这里会出问题。
				info_get info_wan${i}_backuptype backuptype
				if [ "$backuptype" = "backup" ];then
					wan_start $i sys
				fi
				((i++))
			done
		else
			i=0
			while [ $i -lt $wannum ]
			do
	#zjx:FIXME 如果有几个backup口，那么这里会出问题。
				info_get info_wan${i}_backuptype backuptype
				if [ "$backuptype" = "backup" ];then
					wan_stop $i
				fi
				((i++))
			done
		fi
	fi
	
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_ipaddr ip
		info_get info_wan${i}_netmask netmask
		info_get info_wan${i}_gw gw
		info_get info_wan${i}_ifname ifname
		info_get info_wan${i}_ifcheck_ping_status ifcheck_ping_status
		info_get info_wan${i}_ifcheck_port_status ifcheck_port_status
		info_get info_wan${i}_if_rttable table
		
		ip route flush table $table
		ip route del table $table
		
		if [ "$ip" != "0.0.0.0" ] && [ "$ip" != "" ] && [ "$ifcheck_ping_status" = "OK" ];then
			prefix=`ipcalc -p $ip $netmask | cut -d'=' -f2`

			ip route add default via ${gw} dev ${ifname} src ${ip} proto static table $table
			ip route append prohibit default table $table metric 1 proto static

			route_cmd=$route_cmd" nexthop via $gw dev $ifname weight 1"
		fi
		((i++))
	done

	info_get info_wan_wanmain_rttable wanmain_rttable
	if [ "$route_cmd" != "" ];then
		ip route flush table $wanmain_rttable
		ip route del table $wanmain_rttable
		ip route add default table $wanmain_rttable proto static $route_cmd
	fi

	ip route flush cache
	
	return 0
}


wanif=$1
state=$2

info_get info_wan_wannum wannum
i=0
while [ $i -lt $wannum ]
do
	info_get info_wan${i}_ifname ifname
	if [ "$wanif"  =  "$ifname" ];then
		info_set info_wan${i}_ifcheck_ping_status $state
	fi
	((i++))
done

event_if_state_change


exit 0;


