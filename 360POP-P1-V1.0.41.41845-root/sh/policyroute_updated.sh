#!/bin/sh

. /sh/CFGFILE.sh
. /sh/policyroute.sh

while true
do
	proute_dst_autoupdate
	#ÿ�����һ��
	sleep `expr 24 "*" 3600`
done


exit 0