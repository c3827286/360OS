#!/bin/sh
server_list=/var/cfg/ntp-servers
pidfile=/var/run/ntp-client.sh.pidfile

[ -e "$pidfile" ] && kill `cat $pidfile`

echo $$ > $pidfile

interval=6

while true
do
	while read server
	do
		ntpdate $server
		[ "$?" = "0" ] && break;
	done < $server_list
	
	sleep $((interval*3600))
done