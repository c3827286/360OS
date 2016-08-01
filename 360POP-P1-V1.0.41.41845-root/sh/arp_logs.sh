#!/bin/sh

. /sh/CFGFILE.sh

SYS_TEMP_LOG_FILE="/var/tmp/arp_attack_log"

_date_=`date +"%D %T"`
echo "$_date_ :$1">>$SYS_TEMP_LOG_FILE

exit 0
