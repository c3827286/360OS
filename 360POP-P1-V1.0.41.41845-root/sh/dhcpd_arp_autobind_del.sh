#!/bin/sh
source /sh/CFGFILE.sh

source $LANCFG
source $ROUTERCFG

[ "$DHCPD_ARP_AUTOBIND" = "" ] || [ "$DHCPD_ARP_AUTOBIND" = "0" ] && exit 0

# $1=ip,$2=mac
tmp_file=/tmp/dhcpd_arp_autobind_del.sh.tmp

_tmp_line=""
_tmp_line=`grep "$1 $2 $LANDEV DHCP" $ARPBINDCFG`

if [ "$_tmp_line" != "" ]; then
    /bin/arp -d $1 -i $LANDEV
    if [ $? -eq 0 ];then
		grep -v "$1 $2 $LANDEV" $ARPBINDCFG  > $tmp_file
		mv -f $tmp_file $ARPBINDCFG
    fi
fi

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload

exit 0
