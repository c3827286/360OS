#!/bin/sh

. /sh/CFGFILE.sh


if [ -e "$PORTMIRRORCFG" ];then
	. $PORTMIRRORCFG
	if [ "$ENABLE" = "1" ];then
		if [ "$mirror_port" != "" ];then
			mirror $((mirror_port+3)) "0b"${port_mask}
		fi
	else
		mirror 3 0
	fi

fi

exit 0
