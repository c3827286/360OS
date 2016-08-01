#!/bin/sh

. /sh/CFGFILE.sh

echo "in del sh"
if [ -e "$ARP_ATTACK_DEF_PATH" ];then
	echo "start d"
	grep -v "\<$1\>.\<$2\>" $ARP_ATTACK_DEF_PATH > /var/tmp/aa.temp
	mv /var/tmp/aa.temp $ARP_ATTACK_DEF_PATH
	echo "end d"
fi

/sh/arp_attack.sh reload 
/sh/arp_listen.sh reload
echo "exit"
