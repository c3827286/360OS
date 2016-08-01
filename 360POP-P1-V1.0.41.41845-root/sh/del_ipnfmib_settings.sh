#!/bin/sh
. /sh/CFGFILE.sh

_host=$1

/bin/ip_nf_mib --conn_max 0 --up_max 0 --up_speed 0 --down_max 0 --down_speed 0 $_host

_tmp=/tmp/ip_nf_mib_tmp

> $_tmp
if [ $? = 0 ]; then
	if [ -e "$IPNFMIBCFG" ];then
		grep -v "$_host," $IPNFMIBCFG >> $_tmp
	fi
	mv -f $_tmp $IPNFMIBCFG
fi
