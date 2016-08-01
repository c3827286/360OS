#!/bin/sh

. /sh/CFGFILE.sh

. /sh/arp_attack_def_file_check.sh

SYS_TEMP_LOG_FILE="/var/tmp/arp_attack_log"

#if [ "$flag" -ne 0 ];then
#	exit 111 
#fi

_date_=`date +"%D +%T"`
if [ "$flag" = 1 ];then
	echo "$_date_ :添加的 ip:$1 mac:$2 与防御列表中的 $_tmp_line 冲突！">>$SYS_TEMP_LOG_FILE
elif [ "$flag" = 2 ];then
	echo "$_date_ :添加的 ip:$1 mac:$2 与防御列表中的 $_tmp_line 重复！">>$SYS_TEMP_LOG_FILE
else
	echo "$1 $2 $3">>$ARP_ATTACK_DEF_PATH
	/sh/arp_attack.sh reload
	/sh/arp_listen.sh reload
fi
exit 0
