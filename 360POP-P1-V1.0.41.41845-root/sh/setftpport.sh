#!/bin/sh
#############################################
#   setftpport.sh
#############################################

. /sh/CFGFILE.sh
FTPSET=/proc/net/ftpport

. $FTPCFG

if [ -w "$FTPSET" ]; then
    echo "$FTPPORT" > $FTPSET
fi

exit 0
