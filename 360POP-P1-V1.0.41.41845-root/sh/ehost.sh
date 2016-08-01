OUTERCFG

PROCESSNAME="ehost"
ARGS=-q

case $1 in
        start|restart)
        	;;
        print)
		ARGS
		;;
	stop)
        	;;
esac
/sh/ss_process.sh "$PROCESSNAME" "$1" "$ARGS"
exit 0
