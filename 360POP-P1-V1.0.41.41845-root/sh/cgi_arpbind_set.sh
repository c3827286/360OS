#!/bin/sh
. /sh/CFGFILE.sh

# $1=ip,$2=mac,$3=interface
_tmp_line=""
_tmp_line=`grep "$1 $2 $3" $ARPBINDCFG`

if [ "" = "$_tmp_line" ]; then
    /bin/arp -s $1 $2 -i $3
    if [ $? -eq 0 ];then
	echo "$1 $2 $3 ÊÖ¶¯°ó¶¨" >> $ARPBINDCFG
    fi
fi

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload
