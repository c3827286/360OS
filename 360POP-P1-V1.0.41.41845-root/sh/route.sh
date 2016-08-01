#!/bin/sh
. /sh/CFGFILE.sh
. /sh/info.sh
. $ROUTERCFG

#zjx:FIXME 1.ip rule 部分代码转移到policyroute中去 2. init_default_route 之前的规则没有清理干净

init_default_route()
{
	local i=0
	local _tmp
	local _table
	local _mark
	local _prio
	local wannum
	local wanmain_rttable

	info_get info_wan_wannum wannum
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_if_rttable _table
		ip route flush table $_table
		ip route del table $_table
		((i++))
	done

#zjx:FIXME 代码结构不好 应该放到策略路由那部分去
	ip rule show | grep -E '^(40|5000):' \
	| while read PRIO RULE; do
		ip rule del prio ${PRIO%%:*} $( echo $RULE | sed 's|all|0/0|' )
		ip rule del prio ${PRIO%%:*} $( echo $RULE )
	done

	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_if_rttable _table
		_prio=$_table
		ip rule show | grep -E "^($_prio):" \
		| while read PRIO RULE; do
			ip rule del prio ${PRIO%%:*} $( echo $RULE | sed 's|all|0/0|' )
			ip rule del prio ${PRIO%%:*} $( echo $RULE )
		done
		((i++))
	done
	
	info_get info_wan_wanmain_rttable wanmain_rttable
	ip route flush table $wanmain_rttable
	ip route del table $wanmain_rttable
	
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_ifcheck_rttable ifcheck_table
		ip route flush table $ifcheck_table
		ip route del table $ifcheck_table
		((i++))
	done
	
	return 0
}

refresh_default_route()
{
	local wannum=
	local wanid=$1
	local ifname=
	local ip=
	local mask=
	local gw=
	local status=
	local prefix=
	local tmp=
	local table=
	local ifcheck_table=
	local prio=
	local route_cmd=
	local wanmain_rttable=
	local wanifcheck_rttable=

	init_default_route

	# main table w/o default gateway here
	ip rule add prio 40 table main
	#删除默认路由
	ip route del default table main

	i=0
	info_get info_wan_wannum wannum
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_ifname ifname
		info_get info_wan${i}_ipaddr ip
		info_get info_wan${i}_netmask mask
		info_get info_wan${i}_gw gw
		info_get info_wan${i}_ifcheck_ping_status ifcheck_ping_status
		info_get info_wan${i}_if_rttable table
		info_get info_wan${i}_ifcheck_rttable ifcheck_table
		prio=$table
		if [ "$ip" != "0.0.0.0" ] && [ "$ip" != "" ]; then
			prefix=`ipcalc -p $ip $mask | cut -d'=' -f2`
			ip rule add prio $prio from ${ip}/${prefix} table $table
			
			if [ "$ifcheck_ping_status" = "OK" ];then
				ip route add default via ${gw} dev ${ifname} src ${ip} proto static table $table
				ip route append prohibit default table $table metric 1 proto static
			fi
			ip route add default via ${gw} dev ${ifname} src ${ip} proto static table $ifcheck_table
			ip route append prohibit default table $ifcheck_table metric 1 proto static

			route_cmd=$route_cmd" nexthop via $gw dev $ifname weight 1"
		fi
		((i++))
	done

	info_get info_wan_wanmain_rttable wanmain_rttable
	ip rule add prio 5000 table $wanmain_rttable

	ip route add default table $wanmain_rttable proto static $route_cmd
	
	info_get info_wan_wanifcheck_rttable wanifcheck_rttable
	ip route flush table $wanifcheck_rttable
	ip route add default table $wanifcheck_rttable proto static $route_cmd

	ip route flush cache

	return 0
}


# zjx:refresh main table.
route_maintable_refresh()
{
	local i=0
	local wannum=
	local routetype=
	local ipaddr=
	local netmask=
	local gateway=
	local dev=
	local ifname=

#refresh route
# 	echo "adjust Route table"
	if [ -e "$ROUTECFG" ]; then
		AA=`cat $ROUTECFG`
		for LINE in $AA
		do
			routetype=`echo $LINE | cut -f1 -d,`
			ipaddr=`echo $LINE | cut -f2 -d,`
			netmask=`echo $LINE | cut -f3 -d,`
			gateway=`echo $LINE | cut -f4 -d,`
			dev=`echo $LINE | cut -f5 -d,`

			i=0
			info_get info_wan_wannum wannum
			while [ $i -lt $wannum ]
			do
				info_get info_wan${i}_name name
				if [ "$name" = "$dev" ];then
					info_get info_wan${i}_ifname ifname
				fi
				((i++))
			done

			if [ "$dev" = "LAN" ];then
				ifname=$LANDEV
			fi

			$ROUTE add -"$routetype" "$ipaddr" netmask "$netmask" gw "$gateway" metric 5 dev "$ifname"
		done
	fi

	return 0
}