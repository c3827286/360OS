#!/bin/sh
. /sh/CFGFILE.sh

. /sh/filter.sh
. /sh/if_funs.sh
. /sh/qos.sh
. /sh/info.sh

firewall_init()
{
	local i=0
	local wanif=
	local lanif=
	local wannum=
	local workmode=

. $ROUTERCFG
. $LANCFG

	#echo "set default FORWARD policy"
	iptables -F -t filter
	#iptables -F -t mangle
	iptables -P INPUT ACCEPT
	iptables -P OUTPUT ACCEPT
	info_get info_wan_workmode workmode
	if [ "$workmode" = "NAT" ];then
		iptables -P FORWARD ACCEPT
	else	#路由模式下默认为accept
		iptables -P FORWARD ACCEPT
	fi
	iptables -F -t nat

	ip link set imq0 up	#for upload
	ip link set imq1 up	#for download

#init qos
	iptables -t mangle -F PREROUTING
	iptables -t mangle -F POSTROUTING
	info_get info_wan_wannum wannum
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_ifname wanif
		iptables -t mangle -A POSTROUTING -o $wanif -j IMQ --todev 0
		((i++))
	done
	iptables -t mangle -A POSTROUTING -o $LANDEV -j IMQ --todev 1

# 	qos_refresh


	filter_init

	return 0
}

firewall_refresh()
{
	local wannum=
	local workmode=
	local wanip=
	local wanif=
	local lanip=
	local lanip_num=
	local lanmask=
	local i=0
	local j=0
	local _USER_PORT=80


	RMCFG=/var/cfg/cfg-rmm
	TMPIPFILE=/var/wan.info

	/sh/lock.sh lock firewall_refresh

	firewall_init

	. $ROUTERCFG
	. $LANCFG
	. $USER_MANAGE_SET_CFG

	iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

	#pptp through 06-1-20
	iptables -A FORWARD -p TCP --dport 1723 -j ACCEPT
	#L2TP through 06-1-20
	iptables -A FORWARD -p UDP --dport 1701 -j ACCEPT
	#IPSEC through 06-1-20
	iptables -A FORWARD -p UDP --dport 500 -j ACCEPT

	iptables -A FORWARD -m mark --mark 2 -j ACCEPT

	info_get info_wan_wannum wannum
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_ifname wanif
		iptables -A FORWARD -i $LANDEV -o $wanif -j ACCEPT
		((i++))
	done
	
	i=0
	while [ $i -lt $wannum ]
	do
		WANCFG=/var/cfg/cfg-wan${i}
		WANINFO=/var/wan${i}.info
		. $WANCFG

		info_get info_wan${i}_ipaddr wanip
		if [ "$wanip" = "0.0.0.0" ]; then
			((i++))
			continue
		fi

		info_get info_wan${i}_ifname wanif
		
		info_get info_wan_workmode workmode
		if [ "$workmode" = "NAT" ];then
			#echo "start SNAT"
			#iptables -t nat -A POSTROUTING -o $wanif -j SNAT --to "$wanip"
			iptables -t nat -A POSTROUTING -o $wanif -j MASQUERADE
			#yangq:modify
			j=0
			get_lanipnum lanip_num
			while [ $j -lt $lanip_num ]
			do
				get_lanip $j lanip
				get_lanmask $j lanmask
				#iptables -t nat -A POSTROUTING -s $lanip/$lanmask -m mark --mark 2 -j SNAT --to "$wanip"
				iptables -t nat -A POSTROUTING -s $lanip/$lanmask -m mark --mark 2 -j MASQUERADE
				((j++))
			done

			#echo "start remote management"
			if [ -e $RMCFG ];then
				. $RMCFG
				if [ "$RMMFLAG" = "on" ]; then
					get_lanip 0 lanip
						if [ "$USER_PORT_NUMBER" != "80" ]; then
								_USER_PORT=$USER_PORT_NUMBER
						fi
					iptables -t nat -A PREROUTING -p tcp -d $wanip --dport "$RMMPORT" -j DNAT --to "$lanip":$_USER_PORT
				fi
			fi

			#echo "start virtul server"
			if [ -e "$VSCFG" ]; then
				AA=`cat $VSCFG`
				for LINE in $AA
				do
					PROTO=`echo "$LINE" | cut -f1 -d,`
					DPORT=`echo "$LINE" | cut -f2 -d,`
					DPORT2=`echo "$LINE" | cut -f3 -d,`
					SERVER_IP=`echo "$LINE" | cut -f4 -d,`
					VS_IP=`echo "$SERVER_IP" | cut -f1 -d:`

					iptables -t nat -A PREROUTING -p "$PROTO" --dport "$DPORT:$DPORT2" -d "$wanip" -j DNAT --to "$SERVER_IP"
					iptables -t mangle -A PREROUTING -p "$PROTO" --dport "$DPORT:$DPORT2" -d "$wanip" -j MARK --set-mark 2
				done
			fi

			#echo "start dmz"
			if [ -e $DMZCFG ];then
				. $DMZCFG
				if [ "$SERVER_IP" != "0.0.0.0" ]; then
					iptables -t nat -A PREROUTING -d "$wanip" -j DNAT --to "$SERVER_IP"
					iptables -t mangle -A PREROUTING -d "$wanip" -j MARK --set-mark 2
				fi
			fi

			#add remote management mark
			if [ "$RMMFLAG" = "on" ]; then
				iptables -t mangle -A PREROUTING -p tcp -d $wanip --dport "$RMMPORT" -j MARK --set-mark 1
			fi
			
			iptables  -A FORWARD -i $wanif -o $LANDEV -m state --state ESTABLISHED,RELATED -j ACCEPT
			
			iptables  -A FORWARD -i $wanif -m state --state NEW -j DROP
		fi
		((i++))
	done
	
	iptables  -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT

	ip_nf_mib --resetpkts

	/sh/lock.sh unlock firewall_refresh
}

op=$1
case $op in
	init)
		firewall_init
	;;
	refresh)
		firewall_refresh
	;;
	*)
		:
# 		echo "$0:$op no such op!"
	;;
esac
