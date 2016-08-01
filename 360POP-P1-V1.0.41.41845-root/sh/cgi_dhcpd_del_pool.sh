#!/bin/sh
source /sh/dhcpd.sh
source /sh/file_funs.sh
source /sh/CFGFILE.sh
source $LANCFG

index=$1

i=$((index+1))
while [ $i -lt $DHCPD_POOL_NUM ]
do
	j=$((i-1))
	tmp=DHCPD_ENABLE${i}
	file_set_key $LANCFG DHCPD_ENABLE${j} ${!tmp}
	
	tmp=DHCPSTART${i}
	file_set_key $LANCFG DHCPSTART${j} ${!tmp}
	
	tmp=DHCPEND${i}
	file_set_key $LANCFG DHCPEND${j} ${!tmp}
	
	tmp=LEASETIME${i}
	file_set_key $LANCFG LEASETIME${j} ${!tmp}
	
	((i++))
done

file_del_key $LANCFG DHCPD_ENABLE$((i-1))
file_del_key $LANCFG DHCPSTART$((i-1))
file_del_key $LANCFG DHCPEND$((i-1))
file_del_key $LANCFG LEASETIME$((i-1))

file_set_key $LANCFG DHCPD_POOL_NUM $((--DHCPD_POOL_NUM))

dhcpd_start_stop

exit 0