#!/bin/sh

_output_file=/tmp/ip_nf_mib_hosts.tmp


_sort_by_index=$1
_sort_by_order=$2

case $_sort_by_index in
	"1")
	_sort_by_index="ip"
	;;
	"2")
	_sort_by_index="conn"
	;;
	"3")
	_sort_by_index="up_speed"
	;;
	"4")
	_sort_by_index="down_speed"
	;;
	"5")
	_sort_by_index="up_byte"
	;;
	"6")
	_sort_by_index="down_byte"
	;;
	*)
	#echo "wrong sort type"
	;;
esac

#out put format "ip_addr conn_cnt up_speed down_speed up down"
/bin/ip_nf_mib --get_hosts --sort $_sort_by_index --order $_sort_by_order > $_output_file

cat $_output_file
