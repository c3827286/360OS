#!/bin/sh
. /sh/CFGFILE.sh

DHCPD_CONF_FILE=/var/cfg/dhcpd.conf
DHCPD_LEASE_FILE=/var/cfg/udhcpd.leases
DHCPD_PID_FILE=/var/run/udhcpd.pid

dhcpd_start_stop()
{
	local tmp=
	local pool_enable=
	local pool_enable_num=0
	local i=0
		
	dhcpd_cfg_refresh
	
	source $ROUTERCFG
	source $LANCFG
	
	[ -e "$DHCPD_PID_FILE" ] && kill `cat $DHCPD_PID_FILE` || rm -f "$DHCPD_PID_FILE"
	
	[ "$DHCPD_ENABLE" != "1" ] && return 0
	
	i=0
	while [ $i -lt $DHCPD_POOL_NUM ]
	do
		tmp=\$DHCPD_ENABLE${i}
		pool_enable=`eval echo $tmp`
		[ $pool_enable = "1" ] && ((pool_enable_num++)) && break
		((i++))
	done
		
	if [ $pool_enable_num -gt 0 ];then
		> $DHCPD_LEASE_FILE
		$DHCPD -cf $DHCPD_CONF_FILE -lf $DHCPD_LEASE_FILE  -pf $DHCPD_PID_FILE $LANDEV
	fi
	
	return 0
}

dhcpd_cfg_refresh()
{
	local lease_time=
	local pool_num=
	local pool_enable=
	local pool_enable_num=0
	local pool_start=
	local pool_end=
	
	local lan_ip=
	local lan_netmask=
	local lan_network=
	local lan_broadcast=
	local lan_prefix=
	
	local router_mask=
	local router_network=
	
	local tmp=""
	local i=0
	local j=0
	local found=0
	
	#get LAN dev and WAN dev name
	. $ROUTERCFG
	. $LANCFG
	
	#adjust dhcp.conf
	echo "option domain-name \"router\";" > $DHCPD_CONF_FILE
	echo "option domain-name-servers $IPADDR0;" >> $DHCPD_CONF_FILE
	echo " "  >> $DHCPD_CONF_FILE
	echo "shared-network nets" >> $DHCPD_CONF_FILE
	echo "{" >> $DHCPD_CONF_FILE
#echo "default-lease-time $LEASETIME;" >> $DHCPD_CONF_FILE
#echo "max-lease-time $MAXLEASETIME;" >> $DHCPD_CONF_FILE
#echo " "  >> $DHCPD_CONF_FILE
	
	[ "$DHCPD_POOL_NUM" = "" ] && DHCPD_POOL_NUM=$LAN_NUM && echo DHCPD_POOL_NUM=$DHCPD_POOL_NUM >> $LANCFG && /sh/savepara.sh
	i=0
	pool_enable_num=0
	while [ $i -lt $DHCPD_POOL_NUM ]
	do
		tmp=\$DHCPSTART${i}
		pool_start=`eval echo $tmp`
	
		tmp=\$DHCPEND${i}
		pool_end=`eval echo $tmp`
	
		tmp=\$DHCPD_ENABLE${i}
		pool_enable=`eval echo $tmp`
	
		tmp=\$LEASETIME${i}
		lease_time=`eval echo $tmp`
		[ "$lease_time" = "" ] && lease_time=864000
		
		if [ $pool_enable = "1" ]; then
			j=0
			found=0
			((pool_enable_num++))
			while [ $j -lt $LAN_NUM ]
			do
				tmp=\$IPADDR${j}
				lan_ip=`eval echo $tmp`
			
				tmp=\$NETMASK${j}
				lan_netmask=`eval echo $tmp`
				
				lan_network=`ipcalc -n $lan_ip $lan_netmask | cut -d'=' -f2`
				router_network=`ipcalc -n $pool_start $lan_netmask | cut -d'=' -f2`
				
				[ "$lan_network" = "$router_network" ] && found=1 && ((j++)) && break
				((j++))
			done
			
			
			[ "$found" = "0" ] && ((i++)) && continue
			
			lan_broadcast=`ipcalc -b $lan_ip $lan_netmask | cut -d'=' -f2`
			lan_prefix=`ipcalc -p $lan_ip $lan_netmask | cut -d'=' -f2`
		
			echo "subnet $lan_network netmask $lan_netmask {" >> $DHCPD_CONF_FILE
			echo "  range $pool_start $pool_end;" >> $DHCPD_CONF_FILE
			echo "  option subnet-mask $lan_netmask;" >> $DHCPD_CONF_FILE
			echo "  option broadcast-address $lan_broadcast;" >> $DHCPD_CONF_FILE
			echo "  option routers $lan_ip;" >> $DHCPD_CONF_FILE
			echo "  default-lease-time $lease_time;" >> $DHCPD_CONF_FILE
			echo "  max-lease-time $lease_time;" >> $DHCPD_CONF_FILE
			echo "}"  >> $DHCPD_CONF_FILE
		fi
	
		((i++))
	done
	
	
	echo "}"  >> $DHCPD_CONF_FILE
	
	if [ "$DHCPD_ENABLE" = "" ] ;then
		if [ $pool_enable_num -gt 0 ];then
 			echo "DHCPD_ENABLE=1" >> $LANCFG
 		else
 			echo "DHCPD_ENABLE=0" >> $LANCFG
 		fi
	fi
	
	#dhcp reserve address
	#ip mask mac gw
	i=0
	tmp=""
	if [ -e "$RESERVE_ADDRESS_FILE" ];then
		while read line
		do
			out_mac=`echo $line | cut -d ' '  -f1`
			out_ip=`echo $line | cut -d ' ' -f2`
			out_gw=`echo $line | cut -d ' ' -f3`
			out_mask=`echo $line | cut -d ' ' -f4`
		
			out_boardcast=`ipcalc -b $out_ip $out_mask | cut -d'=' -f2`
		
			echo " " >> $DHCPD_CONF_FILE
			echo "host pc$i {" >> $DHCPD_CONF_FILE
			echo "hardware ethernet $out_mac;" >> $DHCPD_CONF_FILE
			echo "fixed-address $out_ip;" >> $DHCPD_CONF_FILE
			echo "option subnet-mask $out_mask;" >> $DHCPD_CONF_FILE
			echo "option broadcast-address $out_boardcast;" >> $DHCPD_CONF_FILE
			echo "option routers $out_gw;" >> $DHCPD_CONF_FILE
		
			tmp=\$LEASETIME${i}
			lease_time=`eval echo $tmp`
		
			echo "  default-lease-time $lease_time;" >> $DHCPD_CONF_FILE
			echo "  max-lease-time $lease_time;" >> $DHCPD_CONF_FILE
			echo "}" >> $DHCPD_CONF_FILE
			echo " " >> $DHCPD_CONF_FILE
			
			((i++))
		done < $RESERVE_ADDRESS_FILE
	fi

	return 0;
}
