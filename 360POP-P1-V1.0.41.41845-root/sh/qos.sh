#!/bin/sh

. /sh/if_funs.sh
. /sh/info.sh

qos_flag_file="/var/cfg/qos_flag"
qos_class_file="/var/cfg/qos_classes"
qos_filter_file="/var/cfg/qos_filters"

#application level QoS, use u32 classifyer
qos_init()
{
	local i=0
	local dev
	local tmp
	local queue_len=2048

	. /sh/CFGFILE.sh
	. $ROUTERCFG

# 	ip link set egiga0 txqueuelen $((queue_len*2))
	
#init upload
# 	ip link set imq0 txqueuelen $queue_len
	ip link set imq0 up
	tc qdisc del dev imq0 root
# 	tc qdisc del dev imq0 ingress	#zjx:FIXME tc qdisc dev wan0 ingress?

#init download
# 	ip link set imq1 txqueuelen $queue_len
	ip link set imq1 up
	tc qdisc del dev imq1 root
# 	tc qdisc del dev imq1 ingress


	return 0
}

qos_refresh()
{
	local i=0
	local class_id=0
	local class_id_base=10
	local class_id_inter=10
	local class_id_max=200
	local class_line=
	local class_index=1
	local filter_line=
	local filter_up_cmd=
	local filter_down_cmd=

	local ip_bucket=32

	local up_speed=
	local down_speed=
	local up_max=
	local down_max=
	local up_sum=0
	local down_sum=0

	local protocol=
	local protocol_num=
	local s_port=
	local d_port=
	local prio=

	local ip_seg=
	local ip_segs=
	
	local wannum=
	
	info_get info_wan_wannum wannum
	while [ $i -lt $wannum ]
	do
		info_get info_wan${i}_upspeed up_speed
		info_get info_wan${i}_downspeed down_speed
		up_max=$((up_max+up_speed))
		down_max=$((down_max+down_speed))
		((i++))
	done
	up_max=$((up_max*8))
	down_max=$((down_max*8))

	qos_init

	if [ ! -e $qos_flag_file ];then
		return 0
	fi
	. $qos_flag_file
	if [ "$ENABLE" = "0" ];then
		return 0
	fi

#upload
	tc qdisc add dev imq0 root handle 1:0 htb default $class_id_max
	tc class add dev imq0 parent 1:0 classid 1:1 htb rate ${up_max}kbit
#download
	tc qdisc add dev imq1 root handle 1:0 htb default $class_id_max
	tc class add dev imq1 parent 1:0 classid 1:1 htb rate ${down_max}kbit

	if [ -e "$qos_class_file" ];then
		while read class_line
		do
# 			echo "$name,$prio,$up,$down,$bandwidth_rule" >> $qos_class_file
			prio=`echo $class_line | cut -d',' -f2`
			up_speed=`echo $class_line | cut -d',' -f3`
			up_speed=$((up_speed*8))
			down_speed=`echo $class_line | cut -d',' -f4`
			down_speed=$((down_speed*8))
			bandwidth_rule=`echo $class_line | cut -d',' -f5`
			class_id=$((class_id_base+class_index*class_id_inter))

			case $prio in
				high)
					prio=1
				;;
				mid)
					prio=4
				;;
				low)
					prio=7
				;;
				*)
					prio=4
				;;
			esac

			up_sum=$((up_sum+up_speed))
			down_sum=$((down_sum+down_speed))
			tc class add dev imq0 parent 1:1 classid 1:${class_id} htb rate ${up_speed}kbit ceil ${up_max}kbit prio $prio
			tc class add dev imq1 parent 1:1 classid 1:${class_id} htb rate ${down_speed}kbit ceil ${down_max}kbit prio $prio

			if [ "$bandwidth_rule" = "conns" ];then
				tc qdisc add dev imq0 parent 1:${class_id} handle ${class_id}: sfq perturb 10
				tc qdisc add dev imq1 parent 1:${class_id} handle ${class_id}: sfq perturb 10
			else
				tc qdisc add dev imq0 parent 1:${class_id} handle ${class_id}: wrr sour masq $ip_bucket 0
				tc qdisc add dev imq1 parent 1:${class_id} handle ${class_id}: wrr dest ip $ip_bucket 0
			fi

# 			echo "$class_id,$name,$ip_start,$ip_end,$protocol,$s_port,$d_port" >> $qos_filter_file
			grep "^[${class_index},]" $qos_filter_file \
			| while read filter_line
			do
				ip_start=`echo $filter_line | cut -d',' -f3`
				ip_end=`echo $filter_line | cut -d',' -f4`
				protocol=`echo $filter_line | cut -d',' -f5`
				s_port=`echo $filter_line | cut -d',' -f6`
				d_port=`echo $filter_line | cut -d',' -f7`
				filter_up_cmd="tc filter add dev imq0 parent 1:1 protocol ip u32"
				filter_down_cmd="tc filter add dev imq1 parent 1:1 protocol ip u32"

				case $protocol in
					tcp|TCP)
					protocol_num="0x06"
					;;
					udp|UDP)
					protocol_num="0x11"
					;;
					icmp|ICMP)
					protocol_num="0x01"
					;;
					*)
# 				echo "wrong proto $protocol"
					return 1
					;;
				esac

				if [ "$ip_start" != "" ];then
					ip_segs=`iprange $ip_start $ip_end`
					for ip_seg in $ip_segs
					do
						filter_up_cmd=${filter_up_cmd}" match ip src $ip_seg"
						if [ "$s_port" != "" ];then
							filter_up_cmd=${filter_up_cmd}" match ip sport $s_port 0xffff"
							filter_down_cmd=${filter_down_cmd}" match ip dport $s_port 0xffff"
						fi
						if [ "$d_port" != "" ];then
							filter_up_cmd=${filter_up_cmd}" match ip dport $d_port 0xffff"
							filter_down_cmd=${filter_down_cmd}" match ip sport $d_port 0xffff"
						fi

						filter_up_cmd=${filter_up_cmd}" match ip protocol $protocol_num 0xff"
						filter_down_cmd=${filter_down_cmd}" match ip protocol $protocol_num 0xff"
						filter_up_cmd=${filter_up_cmd}" flowid 1:${class_id}"
						filter_down_cmd=${filter_down_cmd}" flowid 1:${class_id}"
						`$filter_up_cmd`
						`$filter_down_cmd`
					done
				else
					if [ "$s_port" != "" ];then
						filter_up_cmd=${filter_up_cmd}" match ip sport $s_port 0xffff"
						filter_down_cmd=${filter_down_cmd}" match ip dport $s_port 0xffff"
					fi
					if [ "$d_port" != "" ];then
						filter_up_cmd=${filter_up_cmd}" match ip dport $d_port 0xffff"
						filter_down_cmd=${filter_down_cmd}" match ip sport $d_port 0xffff"
					fi
					filter_up_cmd=${filter_up_cmd}" match ip protocol $protocol_num 0xff"
					filter_down_cmd=${filter_down_cmd}" match ip protocol $protocol_num 0xff"
					filter_up_cmd=${filter_up_cmd}" flowid 1:${class_id}"
					filter_down_cmd=${filter_down_cmd}" flowid 1:${class_id}"
					`$filter_up_cmd`
					`$filter_down_cmd`
				fi
			done
			((class_index++))
		done < $qos_class_file
	else
	:	#do nothing
	fi

#default class add filters
	up_speed=$((up_max-up_sum))
	down_speed=$((down_max-down_sum))
	tc class add dev imq0 parent 1:1 classid 1:${class_id_max} htb rate ${up_speed}kbit ceil ${up_max}kbit prio 4
	tc class add dev imq1 parent 1:1 classid 1:${class_id_max} htb rate ${down_speed}kbit ceil ${down_max}kbit prio 4
	grep "^[0,]" $qos_filter_file | \
	while read filter_line
	do
		ip_start=`echo $filter_line | cut -d',' -f3`
		ip_end=`echo $filter_line | cut -d',' -f4`
		protocol=`echo $filter_line | cut -d',' -f5`
		s_port=`echo $filter_line | cut -d',' -f6`
		d_port=`echo $filter_line | cut -d',' -f7`
		filter_up_cmd="tc filter add dev imq0 parent 1:1 protocol ip u32"
		filter_down_cmd="tc filter add dev imq1 parent 1:1 protocol ip u32"
		case $protocol in
			tcp|TCP)
			protocol_num="0x06"
			;;
			udp|UDP)
			protocol_num="0x11"
			;;
			icmp|ICMP)
			protocol_num="0x01"
			;;
			*)
# 			echo "wrong proto $protocol"
			return 1
			;;
		esac
		filter_up_cmd=${filter_up_cmd}" match ip protocol $protocol_num 0xff"
		filter_down_cmd=${filter_down_cmd}" match ip protocol $protocol_num 0xff"
		if [ "$s_port" != "" ];then
			filter_up_cmd=${filter_up_cmd}" match ip sport $s_port 0xffff"
			filter_down_cmd=${filter_down_cmd}" match ip dport $s_port 0xffff"
		fi
		if [ "$d_port" != "" ];then
			filter_up_cmd=${filter_up_cmd}" match ip dport $d_port 0xffff"
			filter_down_cmd=${filter_down_cmd}" match ip sport $d_port 0xffff"
		fi
		filter_up_cmd=${filter_up_cmd}" flowid 1:${class_id}"
		filter_down_cmd=${filter_down_cmd}" flowid 1:${class_id}"
		`$filter_up_cmd`
		`$filter_down_cmd`
	done
	return 0
}

qos_set_status()
{
	if [ "$1" = "1" ];then
		echo "ENABLE=1" > $qos_flag_file
	else
		echo "ENABLE=0" > $qos_flag_file
	fi

	qos_refresh

	return 0
}

qos_class_add()
{
	local name=$1
	local prio=$2
	local up=$3
	local down=$4
	local bandwidth_rule=$5

	echo "$name,$prio,$up,$down,$bandwidth_rule" >> $qos_class_file

	qos_refresh

	return 0
}

qos_class_del()
{
	local class_id=$1
	local filter_class_id=
	local filter_line=
	local filter_line_tail=
	local qos_filter_tmp3="/var/tmp/qos_filter_tmp3"

	. /sh/file_funs.sh

	if [ -e "$qos_class_file" ];then
		file_del_line_byidx $qos_class_file $class_id
		if [ -e "$qos_filter_file" ];then
			grep -v "^[$class_id,]" $qos_filter_file > $qos_filter_tmp3
			rm -f $qos_filter_file
			while read filter_line
			do
				filter_class_id=`echo $filter_line | cut -d',' -f1`
				filter_line_tail=`echo $filter_line | cut -d',' -f2-`
				if [ $filter_class_id -gt $class_id ];then
					((filter_class_id--))
					echo "$filter_class_id,$filter_line_tail"  >> $qos_filter_file
				fi
			done < $qos_filter_tmp3
		fi
	fi

	qos_refresh

	return 0
}

qos_filter_add()
{
	local class_id=$1
	local name=$2
	local ip_start=$3
	local ip_end=$4
	local protocol=$5
	local s_port=$6
	local d_port=$7

	echo "$class_id,$name,$ip_start,$ip_end,$protocol,$s_port,$d_port" >> $qos_filter_file

	qos_refresh

	return 0
}

qos_filter_del()
{
	local class_id=$1
	local filter_id=$2
	local qos_filter_tmp1="/tmp/qos_filter_tmp1"
	local qos_filter_tmp2="/tmp/qos_filter_tmp2"
	local filter=

	. /sh/file_funs.sh

	if [ -e "$qos_filter_file" ];then
		grep "^[$class_id,]" $qos_filter_file > $qos_filter_tmp1

		file_del_line_byidx $qos_filter_tmp1 $filter_id

		grep -v "^[$class_id,]" $qos_filter_file > $qos_filter_tmp2

		cat $qos_filter_tmp1 $qos_filter_tmp2 > $qos_filter_file
	fi

	qos_refresh

	return 0
}
