#!/bin/sh
source /sh/CFGFILE.sh
source $LANCFG
source /sh/file_funs.sh

index=$1

i=$((index+1))
while [ $i -lt $LAN_NUM ]
do
	j=$((i-1))
	tmp=IPADDR${i}
	file_set_key $LANCFG IPADDR${j} ${!tmp}
	
	tmp=NETMASK${i}
	file_set_key $LANCFG NETMASK${j} ${!tmp}

	((i++))
done

file_del_key $LANCFG IPADDR$((i-1))
file_del_key $LANCFG NETMASK$((i-1))

file_set_key $LANCFG LAN_NUM $((--LAN_NUM))

exit 0
