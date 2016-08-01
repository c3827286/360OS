#!/bin/sh
. /sh/CFGFILE.sh
_FILE=/tmp/arp_not_bind_list.tmp

/bin/arp -n
/bin/arp -n > $_FILE
