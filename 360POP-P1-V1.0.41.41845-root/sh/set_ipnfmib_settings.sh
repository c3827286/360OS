#!/bin/sh
. /sh/CFGFILE.sh

_host=$1


#FIX ME
_conn_max=$2
_up_max=$3
_up_speed=$4
_down_max=$5
_down_speed=$6


/bin/ip_nf_mib --conn_max $_conn_max --up_max $_up_max --up_speed $_up_speed --down_max $_down_max --down_speed $_down_speed $_host

_tmp=/tmp/ip_nf_mib_set_tmp
> $_tmp

if [ -e "$IPNFMIBCFG" ]; then
	grep -v "$_host," $IPNFMIBCFG > $_tmp
fi
echo "$_host,$_conn_max,$_up_max,$_up_speed,$_down_max,$_down_speed" >> $_tmp

mv -f $_tmp $IPNFMIBCFG

exit 0
