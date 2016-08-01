#!/bin/sh

######################################################################
#start or update ddns
#Usage:
#	ddns.sh
######################################################################
source /sh/CFGFILE.sh
source /sh/pid_mark.sh
source /sh/info.sh
source $ROUTERCFG

_wanid=$1

DDNSCFG=/var/cfg/cfg-ddns${_wanid}
DDNSINFO=/var/run/ddns${_wanid}.info
DDNSPID=/var/run/ddns${_wanid}.pid
WANINFO=/var/wan${_wanid}.info

source $ROUTERCFG
source $DDNSCFG

if [ -r "$DDNSPID" ]; then
	PID=`cat $DDNSPID`
	$KILL -9 $PID
fi

if [ "$DDNSFLAG" = "off" ]; then
    exit 0
fi

source $WANINFO
if [ "$WANIP" = "0.0.0.0" ]; then
    exit 0
fi

if [ -z "$DDNSUSER" ]; then
		exit 0
fi

case "$DDNSNAME" in
	oray)
	oray "$DDNSUSER" "$DDNSPWD" &
	;;
	meibu)
	updatedd -o $DDNSINFO meibu $DDNSUSER $DDNSPWD &
	;;
	regfish)
	updatedd -o $DDNSINFO regfish STD=$DDNSUSER:$DDNSPWD $HOSTNAME &
	;;
	*)
	updatedd -o $DDNSINFO $DDNSNAME $DDNSUSER:$DDNSPWD $HOSTNAME &
	;;
esac

echo $! > $DDNSPID

# tmp=\$WAN${_wanid}MARK
# mark=`eval echo $tmp`
info_get info_wan${_wanid}_ifcheck_rttable ifcheck_table
pid_mark_add ddns${_wanid} `cat $DDNSPID` $ifcheck_table

exit 0
