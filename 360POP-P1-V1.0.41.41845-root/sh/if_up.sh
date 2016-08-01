#!/bin/sh
. /sh/CFGFILE.sh
. /sh/info.sh
. /sh/route.sh
. /sh/qos.sh
. /sh/dns.sh

pid_file="/var/run/if_up.pid"

while [ -e "$pid_file" ];
do
	sleep 1
done

echo $$ > $pid_file

wanid=$1

#更新默认路由
refresh_default_route $wanid

#刷新路由表
route_maintable_refresh

#adjust sys resolv.conf
dns_refresh

#加载防火墙
/sh/firewall.sh refresh
# sh -x /sh/firewall.sh refresh > /tmp/firewall_refresh 2>&1

#refresh_qos
qos_refresh

#refresh ddns
/sh/ddns.sh

/sh/ifstate.sh start

/sh/ntp-client.sh &

rm -f $pid_file

exit 0