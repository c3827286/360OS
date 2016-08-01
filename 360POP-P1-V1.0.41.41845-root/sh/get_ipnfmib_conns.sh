#!/bin/sh
. /sh/signal.sh

_output_file=/tmp/ip_nf_mib_conns.tmp

_pid_file=/var/run/dnsmasq.pid

_host=$1

#_sort_type=$2
_sort_type=1
_sort_filed=
if [ -e "$_pid_file" ];then
	_pid=`cat $_pid_file`
	kill -${SIGUSR1} $_pid
	sleep 1
fi

#output format "proto src_ip:src_port dst_ip:dst_port up_speed down_speed up down"
/bin/ip_nf_mib --get_conns $_host > $_output_file

case $_sort_type in
	by_proto)
	_sort_filed=1
	;;
	by_src)
	_sort_filed=2
	;;
	by_dst)
	_sort_filed=3
	;;
	by_up)
	_sort_filed=6
	;;
	by_up_speed)
	_sort_filed=4
	;;
	by_down)
	_sort_filed=7
	;;
	by_down_speed)
	_sort_filed=5
	;;
	*)
	#	echo "wrong sort type"
	;;
esac


#sort "-k=$_sort_filed $_output_file"
cat $_output_file
