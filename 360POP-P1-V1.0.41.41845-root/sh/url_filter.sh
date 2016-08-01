#!/bin/sh

. /sh/CFGFILE.sh
. $ACCURLCFG

ACCURL=/var/cfg/accurl

url_filter_init()
{
	iptables -F url_filter
	iptables -X url_filter
	iptables -N url_filter

	iptables -A FORWARD -j url_filter
	iptables -A OUTPUT -j url_filter

	return 0
}

url_filter_refresh()
{
	iptables -F url_filter

	. $ACCURLCFG

	if [ "$ACCURLFLAG" = "off" ]; then
		return 0
	fi
	if [ "$ACCURLSTAT" = "deny" ];then
		_target=DROP
		_target_all=ACCEPT
	else
		_target=ACCEPT
		_target_all=DROP
	fi
	iptables -F url_filter

	_url_lst=`cat $ACCURL`
	for _url in $_url_lst
	do
		iptables -A url_filter -m domain --name "$_url" -j $_target
	done
	if [ "$_target_all" = "DROP" ]; then
		iptables -A url_filter -p udp --dport 53 -j $_target_all
	fi

	ip_nf_mib --resetpkts

	return 0
}

url_filter_add()
{
	local _key=$1
	echo "$_key" >> $ACCURL

	url_filter_refresh

	return 0
}

url_filter_del()
{
	#在cgi代码中删除了ACCURL中的条目，所以在这里无需删除
	url_filter_refresh

	return 0
}
