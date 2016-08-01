#!/bin/sh
source /sh/CFGFILE.sh

pid_mark_init()
{
	iptables -t mangle -F OUTPUT
	iptables -t mangle -F pid_mark
	iptables -t mangle -X pid_mark
	iptables -t mangle -N pid_mark

	iptables -t mangle -A  OUTPUT -j pid_mark
	
	return 0
}

pid_mark_refresh()
{
	local name=
	local pid=
	local mark=
	local line=
	local _mark_file=/var/run/mark_file
	
# 	zjx:FIME 以后这些应该在系统启动的时候初始化，后面只用刷新各自的链
	pid_mark_init
	
	
	iptables -t mangle -F pid_mark

	while read line
	do
		name=`echo $line | cut -d',' -f1`
		pid=`echo $line | cut -d',' -f2`
		mark=`echo $line | cut -d',' -f3`
		iptables -t mangle -A pid_mark -m owner --pid-owner $pid -j MARK --set-mark $mark
	done < $_mark_file
	
	return 0
}

pid_mark_add()
{
	local name=$1
	local pid=$2
	local mark=$3
	local _name=
	local line=
	local found=0
	
	local _mark_file=/var/run/mark_file
	local _mark_file_tmp=/tmp/mark_file.tmp
	
	> $_mark_file_tmp #清空临时文件
	while read line
	do
		_name=`echo $line | cut -d',' -f1`
		if [ "$_name" = "$name" ]; then
			found=1
			echo "$name,$pid,$mark" >> $_mark_file_tmp
		else
			echo $line >> $_mark_file_tmp
		fi
	done < $_mark_file
	
	[ "$found" = "0" ] && echo "$name,$pid,$mark" >> $_mark_file_tmp
	
	cp -f $_mark_file_tmp $_mark_file
	
	pid_mark_refresh
	
	return 0
}

pid_mark_del()
{
	local name=$1
	local _name=
	local line=
	
	local _mark_file=/var/run/mark_file
	local _mark_file_tmp=/tmp/mark_file.tmp
	
	> $_mark_file_tmp #清空临时文件
	while read line
	do
		_name=`echo $line | cut -d',' -f1`
		if [ "$_name" = "$name" ]; then
			:
		else
			echo $line >> $_mark_file_tmp
		fi
	done < $_mark_file
	
	cp -f $_mark_file_tmp $_mark_file
	
	pid_mark_refresh
	
	return 0
}
