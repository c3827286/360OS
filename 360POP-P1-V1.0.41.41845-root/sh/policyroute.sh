#!/bin/sh

#zjx:FIXME 这里的代码需要重写
#1.参数兼容性的问题

. /sh/CFGFILE.sh
. /sh/if_funs.sh
. /sh/file_funs.sh
. /sh/info.sh
. $ROUTERCFG

#src的优先级高于dst
proute_src_usr_prio=50

proute_dst_dns_prio=90
proute_dst_usr_prio=100	#用户输入的策略路由表项的优先级
proute_dst_pre_prio=120	#预定义策略路由表项的优先级
proute_dst_def_prio=130	#默认优先级

proute_base_init()
{
	return 0
}

proute_dst_init()
{

	return 0
}

#zjx:FIXME 要改成dst src独立的形式,利用prio来标定是dst还是src
proute_dst_clean()
{
	local PRIO=
	local RULE=
	
#zjx:FIXME (0|10|20|32765|32766|32767)以后要用变量取代
	ip rule show | grep -E "^($proute_dst_usr_prio|$proute_dst_pre_prio|$proute_dst_def_prio):" \
	| while read PRIO RULE; do
		ip rule del prio ${PRIO%%:*} $( echo $RULE | sed 's|all|0/0|' )
		ip rule del prio ${PRIO%%:*} $( echo $RULE )
	done

	return 0
}

proute_dst_refresh()
{
	local wannum
	local i=0
	local dns1=
	local dns2=
	local autodns1=
	local autodns2=
	local dns_array=
	
	local _ip_start=
	local _ip_end=
	local _wanid=
	local _tmp=
	local _table=
	local _ip_segs=
	local _ip_seg=
	local isp=
	local isp0=
	local isp1=


	proute_dst_clean
	
# zjx:FIXME 加载dns ip
	info_get info_wan_wannum wannum
	
# 	i=0
# 	while [ $i -lt $wannum ]
# 	do
# 		_tmp=\$WAN${i}TABLE
# 		_table=`eval echo $_tmp`
# 		info_get info_wan${i}_dns1 dns1
# 		info_get info_wan${i}_dns2 dns2
# 		info_get info_wan${i}_autodns1 autodns1
# 		info_get info_wan${i}_autodns2 autodns2
# 		
# 		if [ "$dns1" != "0.0.0.0" ] && [ -n "$dns1" ];then
#  			ip rule add to $dns1 table $_table prio $proute_dst_usr_prio
#  		fi
#  		if [ "$dns2" != "0.0.0.0" ] && [ -n "$dns2" ];then
#  			ip rule add to $dns2 table $_table prio $proute_dst_usr_prio
#  		fi
#  		if [ "$autodns1" != "0.0.0.0" ] && [ -n "$autodns1" ];then
#  			ip rule add to $autodns1 table $_table prio $proute_dst_usr_prio
#  		fi
#  		if [ "$autodns2" != "0.0.0.0" ] && [ -n "$autodns2" ];then
#  			ip rule add to $autodns2 table $_table prio $proute_dst_usr_prio
#  		fi
#  		((i++))
# 	done
	
#加载用户输入的数据
	FILE=`cat $POLICY_ROUTE_DST_CFG`
	for LINE in $FILE
	do
		_ip_start=`echo $LINE | cut -d, -f1`
		_ip_end=`echo $LINE | cut -d, -f2`
		_wanid=`echo $LINE | cut -d, -f3`
		info_get info_wan${_wanid}_if_rttable _table
		_ip_segs=`$IPRANGE $_ip_start $_ip_end`
		for _ip_seg in $_ip_segs
		do
			ip rule add to $_ip_seg table $_table prio $proute_dst_usr_prio
		done
	done

#加载我们提供的数据
#zjx:FIFIXME 要兼容两种格式xxx.xxx.xxx.xxx/24和xxx.xxx.xxx.xxx-xxx.xxx.xxx.xxx
	if [ -e $POLICY_ROUTE_IP_LST ]; then
		i=0
		while  [ $i -lt $wannum ]
		do
			info_get info_wan${i}_isp isp
			if [ "$i" = "0" ];then
				isp0=$isp
			else
				isp1=$isp
			fi
			((i++))
		done

		if [ "$isp0" = "CNCGROUP" -o "$isp1" = "CNCGROUP" ];then
			if [ "$isp0" != "$isp1" ]; then
				i=0
				while  [ $i -lt $wannum ]
				do
					info_get info_wan${i}_if_rttable _table
					_tmp=\$isp${i}
					isp=`eval echo $_tmp`
					if [ "$isp" != "" ]; then
						grep $isp $POLICY_ROUTE_IP_LST \
						| while read LINE
						do
							_ip_seg=`echo $LINE | cut -d',' -f1`
							ip rule add to $_ip_seg table $_table prio $proute_dst_pre_prio
						done
					fi

					if [ "$isp" != "CNCGROUP" ]; then
						#zjx:FIXME 在这里将来可能要让用户选择没有匹配中策略路由的那些包从那个口走
						ip rule add to all table $_table prio $proute_dst_def_prio
					fi

					((i++))
				done
			fi
		fi
	fi

	return 0
}

proute_dst_add()
{
	local ip_start=$1
	local ip_end=$2
	local wanid=$3
	local isp_name=$4

	echo "$ip_start,$ip_end,$wanid,$isp_name" >> $POLICY_ROUTE_DST_CFG

	proute_dst_refresh

	return 0
}

proute_dst_del()
{
	file_del_line_byidx $POLICY_ROUTE_DST_CFG $_line_num

	proute_dst_refresh

	return 0
}

proute_dst_autoupdate()
{
	. $POLICY_ROUTE_FLAG_CFG
	local url="http://www.netcoretec.com/Design/ISP.txt"
	local updatefile="/tmp/proute_update"

	if [ "$ENABLE" = "1" ];then
#zjx:FIXME retry and rename
		wget -O $updatefile $url
		if [ $? -eq 0 ];then
			mv $updatefile $POLICY_ROUTE_IP_LST
			proute_refresh

			/sh/savepara.sh
		fi
	fi

	return 0
}

proute_src_init()
{
	return 0
}

proute_src_clean()
{
	local PRIO=
	local RULE=

	ip rule show | grep -E "^($proute_src_usr_prio):" \
	| while read PRIO RULE; do
		ip rule del prio ${PRIO%%:*} $( echo $RULE | sed 's|all|0/0|' )
		ip rule del prio ${PRIO%%:*} $( echo $RULE )
	done
	return 0
}

proute_src_refresh()
{
	local _ip_start=
	local _ip_end=
	local _wanid=
	local _tmp=
	local _table=
	local _ip_segs=
	local _ip_seg=
	local isp=
	local isp0=
	local isp1=

	proute_src_clean

#加载用户输入的数据
	FILE=`cat $POLICY_ROUTE_SRC_CFG`
	for LINE in $FILE
	do
		_ip_start=`echo $LINE | cut -d, -f1`
		_ip_end=`echo $LINE | cut -d, -f2`
		_wanid=`echo $LINE | cut -d, -f3`
		info_get info_wan${_wanid}_if_rttable _table
		_ip_segs=`$IPRANGE $_ip_start $_ip_end`
		for _ip_seg in $_ip_segs
		do
			ip rule add from $_ip_seg table $_table prio $proute_src_usr_prio
		done
	done

	return 0
}

proute_src_add()
{
	local ip_start=$1
	local ip_end=$2
	local wanid=$3
	local isp_name=$4

	echo "$ip_start,$ip_end,$wanid" >> $POLICY_ROUTE_SRC_CFG

	proute_src_refresh
	return 0
}

proute_src_del()
{
	file_del_line_byidx $POLICY_ROUTE_SRC_CFG $_line_num

	proute_src_refresh
	return 0
}

proute_init()
{
	proute_base_init
	proute_src_init
	proute_dst_init

	return 0
}

proute_refresh()
{
	proute_src_refresh
	proute_dst_refresh

	return 0
}