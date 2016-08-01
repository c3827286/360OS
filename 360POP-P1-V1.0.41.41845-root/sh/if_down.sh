#!/bin/sh
. /sh/CFGFILE.sh
. /sh/route.sh
. /sh/dns.sh

_wanid=$1


#更新默认路由
refresh_default_route $_wanid

#刷新路由表
route_maintable_refresh

#refresh ddns
/sh/ddns.sh

#加载防火墙
/sh/firewall.sh refresh

dns_refresh

exit 0