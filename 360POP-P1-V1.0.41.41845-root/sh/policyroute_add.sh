#!/bin/sh
. /sh/CFGFILE.sh

. /sh/policyroute.sh

. $ROUTERCFG

_ip_start=$1
_ip_end=$2
_wanid=$3
_isp_name=$4
_type=$5

if [ "$_type" = "src" ]; then
	proute_src_add $_ip_start $_ip_end $_wanid $_isp_name
else
	proute_dst_add $_ip_start $_ip_end $_wanid $_isp_name
fi


exit 0
