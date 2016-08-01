#!/bin/sh
source /sh/CFGFILE.sh
source /sh/if_funs.sh
source /sh/info.sh


input_filter_init()
{
	iptables -F input_filter
	iptables -X input_filter
	iptables -N input_filter

	iptables -A INPUT -j input_filter

	input_filter_refresh

	return 0
}

input_filter_refresh()
{
	source $ROUTERCFG
	source $LANCFG
	source $USER_MANAGE_SET_CFG

	local DNS_PORT=53
	local DHCP_SERVER_PORT=67
	local DHCP_CLIENT_PORT=68
	local wanif=
	local _USER_PORT=$USER_PORT_NUMBER
	local echoping=
	local wannum=
	local wanip=
	local i=0
	local j=0

#清空input_filter
	iptables -F input_filter

	info_get info_wan_wannum wannum
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_echoping echoping
		info_get info_wan${i}_ipaddr wanip
		info_get info_wan${i}_ifcheck_ip checkip
		j=0
		while [ $j -lt $wannum ]
		do
			info_get info_wan${j}_ifname	wanif
			[ "$echoping" = "1" ] && iptables -A input_filter -p icmp -i $wanif -s ! $checkip -d $wanip -j DROP
			((j++))
		done
		((i++))
	done

	if [ -e "$USER_MANAGE_SET_CFG" ];then
		if [ "$USER_IP_ENABLE" = "1" ];then
				iptables -A input_filter  -s ! $USER_IP_ADDRESS  -p tcp --dport $_USER_PORT -j DROP
		fi
	fi

# 	iptables -A input_filter -p tcp --dport $_USER_PORT --tcp-flags SYN,RST,ACK SYN -m limit --limit 4/second --limit-burst 10 -j ACCEPT
# 	iptables -A input_filter -p tcp --dport $_USER_PORT --tcp-flags SYN,RST,ACK SYN -j DROP
# 	iptables -A input_filter -p tcp --dport $_USER_PORT -j ACCEPT

	iptables -A input_filter -m mark --mark 1 -j ACCEPT

# 	iptables -A input_filter -i $LANDEV -p udp --dport $DNS_PORT -j ACCEPT #request to lan

# 	iptables -A input_filter -i $LANDEV -p udp --dport $DHCP_SERVER_PORT -j ACCEPT #to lan

# 	iptables -A input_filter -m state --state NEW -j DROP

# 	iptables -A input_filter -j DROP

	ip_nf_mib --resetpkts

	return 0
}

#cgi代码中做了accmac文件的添加，删除操作，在这里无需关心， 只需重新加载
input_filter_add()
{
	input_filter_refresh
	return 0
}

input_filter_del()
{
	input_filter_refresh
	return 0
}
