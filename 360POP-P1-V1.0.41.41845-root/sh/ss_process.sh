#!/bin/sh

#ssprocs.sh processname start/stop/restart <startarg>

source /sh/signal.sh

if [ -z $1 ];then
	echo "need a process name"
	exit 10
fi

PROCESSNAME=$1
OP=$2
ARGS=$3

pid=`pidof $PROCESSNAME`

fun_ss()
{
	case $1 in
		start)
			if [ -z $pid ];then
				$PROCESSNAME $ARGS &
			else
				echo "$PROCESSNAME is already running"
			fi
		;;
		stop)
			if [ -n $pid ];then
				kill -9 $pid
				pid=
			fi
		;;
		reload)
			if [ -n $pid ];then
				kill -${SIGUSR2} $pid
			fi
		;;
		print)
			if [ -n $pid ];then
				kill -${SIGUSR1} $pid
			fi
		;;
		*)
			echo "fun_ss only allow start/stop/reload"
		;;
	esac
}

case $OP in
	start)
		fun_ss start
	;;
	stop)
		fun_ss stop
	;;
	restart)
		fun_ss stop
		fun_ss start
	;;
	reload)
		fun_ss reload
	;;
	print)
		fun_ss print
	;;
	"")
		echo "$1 need operate start/stop/restart/reload"
	;;
	*)
		echo "only allow start/stop/restart"
	;;
esac

exit 0
