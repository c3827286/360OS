#!/bin/sh

for NAME in "ip addr" "hardware addr" "uid" "hostname" "client hostname" "offered expiry" 
do
	echo "$NAME:$1">> /tmp/dhcp-arp
	shift
done

echo

exit 0
