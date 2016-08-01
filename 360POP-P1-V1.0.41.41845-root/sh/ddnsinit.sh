#!/bin/sh  
#                                 

#sleep 10
_wanid=$1

while [ true ];
do
    /sh/ddns.sh $_wanid
		sleep 3600
done
