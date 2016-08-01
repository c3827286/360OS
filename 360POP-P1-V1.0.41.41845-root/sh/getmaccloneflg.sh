#!/bin/sh

MACCLONE_FLAG_FILE=/var/cfg/cfg-macclone-flag
. $MACCLONE_FLAG_FILE

_wanid=$1

_tmp=\$WAN${_wanid}_MAC_CLONE_FLAG
FLAG=`eval echo $_tmp`

echo $FLAG
echo $FLAG > /var/macclone.debug
exit 0