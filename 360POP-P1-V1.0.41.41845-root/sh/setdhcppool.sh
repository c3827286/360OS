#!/bin/sh

######################################################################
#start LAN dhcpd server
#Usage:
#	dhcpstart.sh startip stopip subnet
######################################################################

. /sh/CFGFILE.sh

IPSTART=$1
IPEND=$2

. $LANCFG

#adjust lan cfg
#echo "DHCPD_ENABLE=on" > $LANCFG
#echo "IPADDR=$IPADDR" >> $LANCFG
#echo "NETMASK=$NETMASK" >> $LANCFG
#echo "DHCPSTART=$IPSTART" >> $LANCFG
#echo "DHCPEND=$IPEND" >> $LANCFG

#start DHCP server
/sh/dhcpstart.sh
