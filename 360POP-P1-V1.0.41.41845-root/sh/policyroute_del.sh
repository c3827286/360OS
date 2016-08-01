#!/bin/sh
. /sh/CFGFILE.sh
. /sh/policyroute.sh

. $ROUTERCFG
_line_num=$1
_type=$2

if [ "$_type" = "src" ]; then
	proute_src_del $_line_num
else
	proute_dst_del $_line_num
fi

exit 0