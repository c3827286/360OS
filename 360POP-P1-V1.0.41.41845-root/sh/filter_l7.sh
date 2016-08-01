#!/bin/sh
. /sh/CFGFILE.sh

filter_l7_init()
{
	iptables -F l7_filter
	iptables -X l7_filter
	iptables -N l7_filter
	
	iptables -A  FORWARD -j l7_filter

	return 0
}

filter_l7_refresh()
{
	local _tmp_l7_filter
	local _tmp_l7_name

	iptables -F l7_filter

	if [ -e "$FILTER_L7_FILE" ];then	
		while read line
		do	
			_tmp_l7_filter=`echo $line | cut -d '='  -f2`
			_tmp_l7_name=`echo $line | cut -d '_'  -f4 | cut -d '='  -f1`
			
			if [ "$_tmp_l7_filter" = "1" ]; then
				iptables -A l7_filter -m layer7 --l7proto $_tmp_l7_name -j DROP
			fi
		done < $FILTER_L7_FILE
	fi

	ip_nf_mib --resetpkts

	return 0
}


filter_l7_add()
{
	filter_l7_refresh
	return 0
}

filter_l7_del()
{
	filter_l7_refresh
	return 0
}

op=$1
case $op in
	init)
		filter_l7_init
		;;
	refresh)
		filter_l7_refresh
		;;
	add)
		filter_l7_refresh
		;;
	del)
		filter_l7_refresh
		;;	
	*)
		echo "$0:$op no such op!"
	;;
esac
