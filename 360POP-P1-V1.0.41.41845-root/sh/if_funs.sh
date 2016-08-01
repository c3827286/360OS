#!/bin/sh

. /sh/CFGFILE.sh


#ZJX:FIXME 下一步的任务是把LAN WAN统一对待

#获取lan口ip数目
get_lanipnum()
{
	. $LANCFG

	local param_num=$1

	eval "$param_num=$LAN_NUM"

	return 0
}

get_lanip()
{
	. $LANCFG

	local idx=$1
	local param_ip=$2
	local tmp=
	local ip_tmp=

	tmp=\$IPADDR${idx}
	ip_tmp=`eval echo $tmp`
	eval "$param_ip=$ip_tmp"

	return 0
}

get_lanmask()
{
	. $LANCFG

	local idx=$1
	local param_mask=$2
	local tmp=
	local mask_tmp=


	tmp=\$NETMASK${idx}
	mask_tmp=`eval echo $tmp`
	eval "$param_mask=$mask_tmp"

	return 0
}

get_ifmac()
{
	return 0
}

get_ifip()
{
	return 0
}

#由ifname得到设备名 比如ppp0->egiga0.4005
ifname2dev()
{
	return 0
}

#由dev得到wan,lan的id号
dev2ifid()
{
	return 0
}

ifname2ifid()
{
	return 0
}