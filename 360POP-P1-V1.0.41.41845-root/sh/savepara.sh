
#!/bin/sh

#############################################################################
#save para
#############################################################################
. /sh/CFGFILE.sh
USERACCCFG=/var/cfg/umconfig.txt

if [ -e "$USERACCCFG" ];then
        CFGFILE="$CFGFILE $USERACCCFG"
fi
if [ -e "/var/router.lua" ];then
        CFGFILE="$CFGFILE /var/router.lua"
fi

$NTPARA new
$NTPARA add $CFGFILE
$NTPARA close
/sh/lock.sh unlock savepara_lock

exit 0
