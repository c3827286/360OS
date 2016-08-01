#!/bin/sh
#
# Script file to set fixed IP, subnet and gateway
#
# Usage: fixedip.sh interface ip netmask gateway
#
. /sh/CFGFILE.sh

if [ -n "$3" ]; then
	$IFCONFIG $1 $2 netmask $3
else
	$IFCONFIG $1 $2
fi

while $ROUTE del  default dev $1
do :
done

if [ -n "$4" ]; then
	if [ "$4" != "0.0.0.0" ]; then
		$ROUTE add -net default gw $4 dev $1
	fi
fi
