#!/bin/sh
. /sh/CFGFILE.sh
. $LANCFG
. $ROUTERCFG

[ "$DHCPD_ARP_AUTOBIND" = "" ] || [ "$DHCPD_ARP_AUTOBIND" = "0" ] && exit 0

# $1=ip,$2=mac
tmp_file="/tmp/dhcpd_arp_autobind.sh.tmp"
if [ -e "$ARPBINDCFG" ];then
	line=`grep "$2 $LANDEV DHCP" $ARPBINDCFG`
	if [ "$line" != "" ];then
		ip=`echo $line | cut -d' ' -f1`
		mac=`echo $line | cut -d' ' -f2`
		arp -d $ip -i $LANDEV
		grep -v "$2 $LANDEV DHCP" $ARPBINDCFG > $tmp_file
		mv -f $tmp_file $ARPBINDCFG
	fi
fi

if [ "" = "$_tmp_line" ]; then
    /bin/arp -s $1 $2 -i $LANDEV
    if [ $? -eq 0 ];then
		echo "$1 $2 $LANDEV DHCP×Ô¶¯°ó¶¨" >> $ARPBINDCFG
    fi
fi

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload

exit 0
