#!/bin/sh
. /sh/CFGFILE.sh

arpbind_filter_init()
{
	iptables -F arpbind_filter
	iptables -X arpbind_filter
	iptables -N arpbind_filter

	iptables -A FORWARD -j arpbind_filter

	ipset -F arpbind
	ipset -X arpbind
	ipset -N arpbind iphash

	return 0
}

arpbind_filter_refresh()
{
	local ip=
	local mac=
	local dev=
	local line=
	local i=0

	if [ -e "$ROUTERCFG" ];then
		. $ROUTERCFG
	else
		return 0
	fi
	
	if [ -e "$ARPBIND_FILTER_CFG" ];then
		. $ARPBIND_FILTER_CFG
	else
		return 0
	fi

	iptables -F arpbind_filter
	ipset -F arpbind

	if [ "$ENABLE" != "1" ];then
		return 0
	fi
	
	if [ -e $ARPBINDCFG ];then
		while read line
		do
			ip=`echo $line | cut -d' ' -f1`
			mac=`echo $line | cut -d' ' -f2`
			dev=`echo $line | cut -d' ' -f3`
			if [ $dev = "$LANDEV" ]; then
				((i++))
				ipset -A arpbind $ip
			fi 
		done < $ARPBINDCFG
	fi

	if [ $i -gt 0 ];then
		iptables -A arpbind_filter -i $LANDEV -m set ! --set arpbind src -j DROP
	fi
	
	ip_nf_mib --resetpkts

	return 0
}

arpbind_filter_add()
{
	arpbind_filter_refresh
	
	return 0
}

arpbind_filter_del()
{
	arpbind_filter_refresh
	
	return 0
}
