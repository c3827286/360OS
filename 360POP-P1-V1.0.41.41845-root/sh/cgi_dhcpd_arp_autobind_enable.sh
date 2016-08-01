#!/bin/sh
source /sh/CFGFILE.sh

source $LANCFG
source $ROUTERCFG

tmp_file=/tmp/cgi_dhcpd_arp_autobind_enable.sh.tmp

[ "$DHCPD_ARP_AUTOBIND" = "" ] || [ "$DHCPD_ARP_AUTOBIND" = "0" ] && DHCPD_ARP_AUTOBIND=0 

[ ! -e "$ARPBINDCFG" ] && exit 0

grep "DHCP" $ARPBINDCFG | \
while read line
do
	ip=`echo $line | cut -d' ' -f1`
	mac=`echo $line | cut -d' ' -f2`
	ifname=`echo $line | cut -d' ' -f3`
	arp -d $ip -i $ifname
done

grep -v "DHCP" $ARPBINDCFG  > $tmp_file
mv -f $tmp_file $ARPBINDCFG

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload
