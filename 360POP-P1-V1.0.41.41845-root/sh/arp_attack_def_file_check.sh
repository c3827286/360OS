#!/bin/sh

_tmp_line=""
flag=0
#$1=ip,$2=mac
#echo "ip:$1 mac:$2"
if [ -e $ARP_ATTACK_DEF_PATH ];then
	_tmp_line_1=""
	_tmp_line_1=`grep "\<$1\>" $ARP_ATTACK_DEF_PATH`
	_tmp_line_2=""
	_tmp_line_2=`grep "\<$2\>" $ARP_ATTACK_DEF_PATH`
	
	if [ "$_tmp_line_1" != "$_tmp_line_2" ];then
		flag=1
	elif [ "" != "$_tmp_line_1" ];then
		flag=2
	fi
	
	#echo "flag:$flag"
	if [ "$flag" = 2 ];then
		_tmp_line="$_tmp_line_1"
	elif [ "$flag" = 1 ];then
		_tmp_line="$_tmp_line_1 $_tmp_line_2"
	fi
fi
