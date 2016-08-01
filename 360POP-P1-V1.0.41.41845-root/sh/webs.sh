#!/bin/sh

. /sh/CFGFILE.sh
. $LANCFG
. $USER_MANAGE_SET_CFG

i=0
_USER_PORT=80
_tmp=\$IPADDR${i}
LanIP=`eval echo $_tmp`

webs_pid_file="/var/run/webs.pid"
webs_sh_pid_file="/var/run/webs_sh.pid"
hours=1

# echo "start webs"

if [ -e "$webs_sh_pid_file" ];then
	kill `cat $webs_sh_pid_file`
fi

echo $$ > $webs_sh_pid_file

while true
do
	cd /

	if [ -e "$webs_pid_file" ]; then
			kill `cat $webs_pid_file`
	fi

	rm -f /tmp/cgi*

	_USER_PORT=$USER_PORT_NUMBER

	webs -i $LanIP -p $_USER_PORT &
	echo $! > $webs_pid_file

 	sleep `expr $hours "*" 3600`
# 	sleep 120

done

exit 0
