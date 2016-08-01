#!/bin/sh

. /sh/CFGFILE.sh

arp_request_pid_file="/var/tmp/arp_request.pid"

if [ -e "$arp_list" ];then
	:
# 	echo ""
fi

. $ROUTERCFG
. $LANCFG

echo $$ > $arp_request_pid_file

i=0
while [ $i -lt $LAN_NUM ];
do
	_tmp=\$IPADDR${i}
	_lan_ip=`eval echo $_tmp`
	_tmp=\$NETMASK${i}
	_net_mask=`eval echo $_tmp`

	arp_request -I $LANDEV  -m $_net_mask $_lan_ip

	((i++))
done

rm -rf $arp_request_pid_file

exit 0

