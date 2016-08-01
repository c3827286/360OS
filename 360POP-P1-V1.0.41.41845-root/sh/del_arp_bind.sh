#!/bin/sh
. /sh/CFGFILE.sh

_output_filetemp=/tmp/cfg-arpbind.tmp
if [ -e "$ARPBINDCFG" ]; then
	/bin/arp -d $1 -i $3
	/bin/grep -v "$1 $2 $3" $ARPBINDCFG  > $_output_filetemp

	/bin/mv $_output_filetemp $ARPBINDCFG
fi

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload

exit 0
