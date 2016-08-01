#!/bin/sh

. /sh/CFGFILE.sh
_output_filetemp=/var/cfg/cfg-arpbind.tmp

	
if [ -e "$ARPBINDCFG" ]; then
	> $_output_filetemp
	while read LINE
	do
		_ip=`echo $LINE | cut -d' ' -f1`
		_mac=`echo $LINE | cut -d' ' -f2`
		_face=`echo $LINE | cut -d' ' -f3`
		
		_ip1=`echo $_ip | cut -d. -f1`
		_ip2=`echo $_ip | cut -d. -f2`
		_ip3=`echo $_ip | cut -d. -f3`
		_ip4=`echo $_ip | cut -d. -f4`
		 
		let "temp_ip = ${_ip1} * 16777216 + ${_ip2} * 65536 + ${_ip3} * 256 + ${_ip4}"
		  
		if [ "$temp_ip" -ge "$1" -a "$temp_ip" -le "$2" -a "$_face" = "$3" ]; then
				/bin/arp -d $_ip -i $_face
					continue
		fi
		echo "$_ip $_mac $_face" >> $_output_filetemp
	done < $ARPBINDCFG

/bin/mv $_output_filetemp $ARPBINDCFG
fi

/sh/filter.sh arpbind refresh

#/sh/cgi_arp_attack_stop.sh
#/sh/cgi_arp_attack_start.sh

/sh/arp_listen.sh reload

exit 0
