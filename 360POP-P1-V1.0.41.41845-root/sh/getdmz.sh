#!/bin/sh

#############################################################################
#get dmz
#usage:
#	dmzstart.sh
#############################################################################

. /sh/CFGFILE.sh

. $DMZCFG

if [ -z "$SERVER_IP" ]; then
	echo "0.0.0.0"
else
	echo "$SERVER_IP"
fi

exit 0
