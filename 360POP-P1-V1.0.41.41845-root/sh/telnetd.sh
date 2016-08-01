#!/bin/sh

while true
do
	/sh/cgi_start_telnet.sh 
	sleep $((15*60))
done

exit 0