#!/bin/sh
#adjust sys resolv.conf
dns_refresh()
{
	local i=0
	local j=0
	local flag=
	local dns1=
	local dns2=
	local autodns1=
	local autodns2=
	local domain=
	local wannum=
	local dnsnum=
	local dnsarray=
	local dnstmp=
	
	. /sh/CFGFILE.sh
	. /sh/info.sh

	info_get info_wan_wannum wannum
		
	echo "nameserver 127.0.0.1" > "/etc/resolv.conf"
	
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_domain domain
		[ -n "$domain" ] && echo "domain $domain" >> "/etc/resolv.conf"	
		((i++))
	done
	
	dnsnum=0
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_dns1 dns1
		info_get info_wan${i}_autodns1 autodns1
		if [ "$dns1" != "0.0.0.0" ] && [ "$dns1" != "" ];then
			dnsarray[dnsnum]=$dns1
			((dnsnum++))
# 			echo "nameserver $dns1" >> "/etc/resolv.conf"
		fi
		if [ "$autodns1" != "0.0.0.0" ] && [ "$autodns1" != "" ];then
			dnsarray[dnsnum]=$autodns1
			((dnsnum++))
# 			echo "nameserver $autodns1" >> "/etc/resolv.conf"
		fi
		((i++))
	done
	
	i=0
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_dns2 dns2
		info_get info_wan${i}_autodns2 autodns2
		if [ "$dns2" != "0.0.0.0" ] && [ "$dns2" != "" ];then
			dnsarray[dnsnum]=$dns2
			((dnsnum++))
# 			echo "nameserver $dns2" >> "/etc/resolv.conf"
		fi
		if [ "$autodns2" != "0.0.0.0" ] && [ "$autodns2" != "" ];then
			dnsarray[dnsnum]=$autodns2
			((dnsnum++))
# 			echo "nameserver $autodns2" >> "/etc/resolv.conf"
		fi
		((i++))
	done
	
	i=0
	while [ $i -lt $dnsnum ]
	do
		dnstmp=${dnsarray[i]}
		j=$((i+1))
		while [ $j -lt $dnsnum ]
		do
			if [ "${dnsarray[i]}" = "${dnsarray[j]}" ];then
				dnsarray[j]=""
			fi
			((j++))
		done
		((i++))
	done
	
	i=0
	while [ $i -lt $dnsnum ]
	do
		if [ "${dnsarray[i]}" != "" ];then
			echo "nameserver ${dnsarray[i]}" >> "/etc/resolv.conf"
		fi
		((i++))
	done
	
	return 0
}