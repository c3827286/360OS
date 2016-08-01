#!/bin/sh

######################################################################
#start or stop WAN udhcpc and get dynamic ip
#Usage:
#	udhcpc.sh start|stop
######################################################################

source /sh/CFGFILE.sh
source /sh/signal.sh
source /sh/pid_mark.sh
source /sh/info.sh

SCRIPTFILE_PATH=/sh/udhcpc

#get LAN dev and WAN dev name
source $ROUTERCFG

_wanid=$1
tmp=\$WAN${_wanid}DEV
WANDEV=`eval echo $tmp`

WANINFO=/var/cfg/wan${_wanid}.info
PIDFILE=/var/run/udhcpc-${WANDEV}.pid

CMD=" -f -i $WANDEV -p $PIDFILE -s ${SCRIPTFILE_PATH}/wan${_wanid}.sh"

#start
if [ "$2" = "start" ]; then
	if [ -e $PIDFILE ] ; then
		PID=`cat $PIDFILE`
		if [ "$PID" != "0" ] && [ "$PID" != "" ]; then	# zjx:FIXME 这里为什么是!=0?
			#adjust wan tmp ip
			echo "WANIP=0.0.0.0" > $WANINFO
			echo "WANMASK=0.0.0.0" >> $WANINFO
			echo "WANGW=0.0.0.0" >> $WANINFO
			$KILL -9 $PID
		fi
		$RM -f $PIDFILE
	fi
	
	echo -n "WAN$((_wanid+1))" > "/tmp/dhcp_if_usrname_${WANDEV}.tmp"

	$DHCPC $CMD &
	sleep 1
	_pid=`cat $PIDFILE`
# 	tmp=\$WAN${_wanid}MARK
# 	mark=`eval echo $tmp`
	info_get info_wan${_wanid}_ifcheck_rttable ifcheck_table
	pid_mark_add dhcpc${_wanid} $_pid $ifcheck_table
	echo "dhcpc $_wanid started"
fi

if [ "$2" = "stop" ]; then
	if [ -e $PIDFILE ] ; then
		PID=`cat $PIDFILE`
		if [ "$PID" != "0" ] && [ "$PID" != "" ]; then
			#SIGUSR2 -- release ip
			$KILL -${SIGUSR2} $PID
			sleep 5
			$KILL -9 $PID
		fi
		$RM -f $PIDFILE
	fi
fi

exit 0
