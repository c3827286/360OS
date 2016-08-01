#!/bin/sh
. /sh/CFGFILE.sh

mac_filter_init()
{
	iptables -F mac_filter
	iptables -X mac_filter
	iptables -N mac_filter

	iptables -A FORWARD -j mac_filter

	return 0
}

mac_filter_refresh()
{
	#清空mac_filter
	iptables -F mac_filter

	. $ROUTERCFG
	. $ACCMACCFG
	if [ "$ACCMACFLAG" = "on" ]; then
		if [ "$ACCMACSTAT" = "allow" ]; then
			_target=ACCEPT
			_target_all=DROP
		else
			_target=DROP
			_target_all=ACCEPT
		fi

		if [ -e "/var/cfg/accmac" ]; then
			AA=`cat /var/cfg/accmac`
			for LINE in $AA
			do
				MACADDR=`echo $LINE | cut -f1 -d,`
				iptables -A mac_filter -m mac --mac-source $MACADDR -j $_target
			done
		fi
		if [ "$_target_all" = "DROP" ];then
			iptables -A mac_filter -i $LANDEV -j $_target_all
		fi
	fi
	
	ip_nf_mib --resetpkts
	
	return 0
}

#cgi代码中做了accmac文件的添加，删除操作，在这里无需关心， 只需重新加载
mac_filter_add()
{
	mac_filter_refresh
	return 0
}

mac_filter_del()
{
	mac_filter_refresh
	return 0
}
