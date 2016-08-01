#!/bin/sh
. /sh/CFGFILE.sh
. /sh/if_funs.sh
. /sh/signal.sh
. /sh/info.sh

PAPFILE=/etc/ppp/pap-secrets
CHAPFILE=/etc/ppp/chap-secrets
RESOLV=/etc/ppp/resolv.conf
LINKFILE=/etc/ppp/link
FIRSTFILE=/etc/ppp/first
FIRSTDEMAND=/etc/ppp/firstdemand

. $ROUTERCFG
_wanid=$1
LINKNAME=ppp${_wanid}

info_get info_wan${_wanid}_devname DEV

OPTIONS=/etc/ppp/options${_wanid}
PPPCFG=/var/cfg/cfg-ppp${_wanid}
PID_FILE=/var/run/ppp-ppp${_wanid}.pid
PPPSHRUN=/var/run/ppp${_wanid}shrun

if [ -e $PPPSHRUN ];then
	echo "$PPPSHRUN already runs"
	exit 0
else
	#纪录下当前sh的pid
	echo $$ > $PPPSHRUN
fi

#$ROUTE del default dev $DEV
#$ROUTE del default dev $LINKNAME

#create options file
. $PPPCFG
PPP_USER_NAME=$USER
PPP_MTU_SIZE=$MTU
echo "name \"$PPP_USER_NAME\"" > $OPTIONS
#adjust ppp option file
#echo "sync" >> $OPTIONS
echo "noauth" >> $OPTIONS
echo "noipdefault" >> $OPTIONS
echo "hide-password" >> $OPTIONS
#echo "defaultroute" >> $OPTIONS #不需要pppd自动添加默认路由，pppd不支持多默认路由的添加
echo "persist" >> $OPTIONS
echo "ipcp-accept-remote" >> $OPTIONS
echo "ipcp-accept-local" >> $OPTIONS
echo "nodetach" >> $OPTIONS
echo "usepeerdns" >> $OPTIONS
echo "mtu $PPP_MTU_SIZE" >> $OPTIONS
echo "mru $PPP_MTU_SIZE" >> $OPTIONS
echo "lcp-echo-interval 6" >> $OPTIONS
echo "lcp-echo-failure 10" >> $OPTIONS
echo "linkname $LINKNAME" >> $OPTIONS
echo "plugin /etc/ppp/plugins/libplugin.a $DEV" >> $OPTIONS

if [ "$PPPTYPE" = "demand" ] ; then
  echo "demand" >> $OPTIONS
  echo "idle $DEMAND" >> $OPTIONS
fi

if [ "$PPPTYPE" = "auto" ] ; then
  echo "holdoff 3" >> $OPTIONS
fi

if [ -e $PID_FILE ];then
	case $PPPTYPE in
		manual)
			PIDPPP=`head -n 1 $PID_FILE`
			$KILL $PIDPPP
			$RM -f $PID_FILE
		;;
		demand)
			PIDPPP=`head -n 1 $PID_FILE`
			$KILL -${SIGUSR2} $PIDPPP	#send padi
		;;
		auto)
#do nothing
		;;
		*)
			echo "$0:wrong type $PPPTYPE"
		;;
	esac
else
	#create pap & chap file
	info_get info_wan_wannum wannum
	i=0
	> $PAPFILE
	> $CHAPFILE
	while [ "$i" -lt "$wannum" ]
	do
		PPPCFG=/var/cfg/cfg-ppp${i}
		. $PPPCFG
		PPP_USER_NAME=$USER
		PPP_PASSWORD=$PWD

		if [ -n "$PPP_USER_NAME" ]; then
			echo "\"$PPP_USER_NAME\"	*	\"$PPP_PASSWORD\"" >> $PAPFILE
			echo "\"$PPP_USER_NAME\"	*	\"$PPP_PASSWORD\"" >> $CHAPFILE
		fi
		((i++))
	done

	echo -n "WAN$((_wanid+1))" > "/tmp/pppoe_if_usrname_${DEV}.tmp"
	
	pppd file $OPTIONS &
fi

rm -f $PPPSHRUN

exit 0