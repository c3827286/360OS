#!/bin/sh
. /sh/CFGFILE.sh
. /sh/route.sh
. /sh/dns.sh

_wanid=$1


#����Ĭ��·��
refresh_default_route $_wanid

#ˢ��·�ɱ�
route_maintable_refresh

#refresh ddns
/sh/ddns.sh

#���ط���ǽ
/sh/firewall.sh refresh

dns_refresh

exit 0