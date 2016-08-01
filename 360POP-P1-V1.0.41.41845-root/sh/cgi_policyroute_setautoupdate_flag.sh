#!/bin/sh

. /sh/CFGFILE.sh
. /sh/policyroute.sh

flag=$1

case $flag in
	0)
		echo "ENABLE=0" > $POLICY_ROUTE_FLAG_CFG
	;;
	1)
		echo "ENABLE=1" > $POLICY_ROUTE_FLAG_CFG
		(proute_dst_autoupdate)&
	;;
	*)
		:
# 		echo "$0 error"
	;;
esac

exit 0