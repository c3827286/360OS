#!/bin/sh
. /sh/CFGFILE.sh

ip_filter_init()
{
	iptables -F ip_filter
	iptables -X ip_filter
	iptables -N ip_filter

	iptables -A  FORWARD -j ip_filter

	return 0
}

ip_filter_refresh()
{
	. $ROUTERCFG
	iptables -F ip_filter
	. $ACCIPCFG
	if [ "$ACCIPFLAG" = "on" ]; then
	    if [ -e /var/cfg/accip ]; then
	        mkaccip
	        if [ -e "/var/cfg/accip.fw" ]; then
	            AA=`cat /var/cfg/accip.fw`
	            for LINE in $AA
	            do
	                IPTARGET=`echo $LINE | cut -f5 -d,`
	                PROTO=`echo $LINE | cut -f4 -d,`
	                IP=`echo $LINE | cut -f1 -d,`
	                PORTFROM=`echo $LINE | cut -f2 -d,`
	                if [ "$PORTFROM" = "0" ]; then
	                    PORTOPT=""
	                else
	                    PORTTO=`echo $LINE |cut -f3 -d,`
	                    if [ "$PORTTO" != "0" ]; then
	                        PORTOPT="--dport $PORTFROM:$PORTTO"
	                    else
	                        PORTOPT="--dport $PORTFROM"
	                    fi
	                fi
	                if [ "$IP" = "0.0.0.0" ]; then
	                    IPOPT=""
	                else
	                    IPOPT="-s $IP"
	                fi

	                iptables -A ip_filter -p $PROTO $IPOPT $PORTOPT -j $IPTARGET
	            done
	        fi
	    fi
	    if [ "$ACCIPSTAT" = "deny" ]; then
	        iptables -A ip_filter -i $LANDEV -j DROP
	    fi
	fi

	ip_nf_mib --resetpkts

	return 0
}

#cgi代码中做了accip文件的添加，删除操作，在这里无需关心， 只需重新加载
ip_filter_add()
{
	ip_filter_refresh
	return 0
}

ip_filter_del()
{
	ip_filter_refresh
	return 0
}


