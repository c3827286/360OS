#!/bin/sh
. /sh/CFGFILE.sh

if [ -e "$ARPBINDCFG" ]; then
	while read LINE
	do
		_ip=`echo $LINE | cut -d' ' -f1`
		_face=`echo $LINE | cut -d' ' -f3`
	/bin/arp -d $_ip -i $_face
	done < $ARPBINDCFG

> $ARPBINDCFG
fi

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload

exit 0

