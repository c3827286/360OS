#!/bin/sh

wan_start()
{
	source /sh/info.sh
	
	local wanid=$1
	local by=$2
	local dev
	local mtu
	local conntype
	
	info_get info_wan${wanid}_devname dev
	info_get info_wan${wanid}_devmtu mtu
	info_get info_wan${wanid}_conntype conntype
	
	ifconfig $dev up
	ifconfig $dev mtu $mtu
	
	case $conntype in
	static)
		/sh/static_up.sh $wanid
	;;
	dynamic)
		/sh/dhcpcd.sh $wanid start
	;;
	pppoe)
		PPPCFG=/var/cfg/cfg-ppp${wanid}
		[ -e "$PPPCFG" ] && source $PPPCFG
		
		[ "$by" = "sys" ] && [ "$PPPTYPE" = "manual" ] && return 0
		
		/sh/dslstart.sh $wanid
	;;
	esac
	
	return 0
}

wan_stop()
{
	source /sh/info.sh
	local wanid=$1
	local conntype
	
	info_get info_wan${wanid}_conntype conntype
	
	case $conntype in
	static)
		/sh/static_down.sh $wanid
	;;
	dynamic)
		/sh/dhcpcd.sh $wanid stop
	;;
	pppoe)
		/sh/dslstop.sh $wanid $3
	;;
	esac
	
	return 0
}
