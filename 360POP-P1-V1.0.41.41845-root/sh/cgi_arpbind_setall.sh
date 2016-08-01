#!/bin/sh
. /sh/CFGFILE.sh

tmpfile=/tmp/log-arpreply

i=1
while read ip mac iface 
do
	_tmp_line=""
	_tmp_line=`grep -E "$ip .* $iface" $ARPBINDCFG`
	if [ "" = "$_tmp_line" ]; then
		/bin/arp -s $ip $mac -i $iface
		if [ $? -eq 0 ];then
                	echo "$ip $mac $iface ÊÖ¶¯°ó¶¨" >> $ARPBINDCFG
		fi
	fi
        ((i++))
done < $tmpfile

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload

rm $tmpfile -f
