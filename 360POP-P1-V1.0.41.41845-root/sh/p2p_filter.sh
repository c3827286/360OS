#!/bin/sh
. /sh/CFGFILE.sh

p2p_filter_init()
{
	iptables -F p2p_filter
	iptables -X p2p_filter
	iptables -N p2p_filter

	iptables -A  FORWARD -j p2p_filter

	return 0
}

p2p_filter_refresh()
{
	iptables -F p2p_filter

	if [ ! -e "$P2PCFG" ]; then
		echo "p2p_filter_refresh:$P2PCFG not exist!"
		return 1
	fi
	local cmd=`cat $P2PCFG`

	if [ "$cmd" = "" ];then
# 		echo "$0:$P2PCFG is null"
		return 1
	fi

	iptables -A p2p_filter -p tcp -m ipp2p $cmd -j DROP
	iptables -A p2p_filter -p udp -m ipp2p $cmd -j DROP

	ip_nf_mib --resetpkts

	return 0
}

p2p_filter_add()
{
	local list=$1
	if [ "$list" = "" ];then
		> $P2PCFG
		p2p_filter_refresh
		return 0
	fi
	local i=1
	local tmp=`echo $list | cut -d',' -f${i}`
	local cmd=
	while [ "$tmp" != "" ]
	do
		cmd="$cmd --$tmp"
		((i++))
		tmp=`echo $list | cut -d',' -f${i}`
	done
	echo $cmd > $P2PCFG
	p2p_filter_refresh
	return 0
}

p2p_filter_del()
{
	p2p_filter_refresh
	return 0
}
