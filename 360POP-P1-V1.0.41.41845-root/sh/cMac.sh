#!/bin/sh
. /sh/CFGFILE.sh
. /sh/info.sh

info_get info_wan_wannum wannum
while true
do
	_mac_num=$((wannum + 1))
	_mac_list=`cmac $_mac_num`
	
	_mac=`echo $_mac_list | cut -d' ' -f1`
	#–¥»Îflash
	$SAVEMAC w $_mac
	sleep 1
done
exit 0
