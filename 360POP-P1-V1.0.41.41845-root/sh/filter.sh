#!/bin/sh
. /sh/CFGFILE.sh

. /sh/mac_filter.sh
. /sh/arpbind_filter.sh
. /sh/ip_filter.sh
. /sh/url_filter.sh
. /sh/p2p_filter.sh
. /sh/input_filter.sh
. /sh/filter_l7.sh

filter_module_func()
{
	local module=$1
	local op=$2
	local param=$3
	local func="${module}_filter_${op}"

	if [ -z "$module" -o -z "$op" ];then
		return 0
	fi

	eval $func $param
	return $?
}

filter_init()
{
	mac_filter_init
	arpbind_filter_init
	ip_filter_init
	url_filter_init
	p2p_filter_init
 	input_filter_init
	filter_l7_init

	mac_filter_refresh
	arpbind_filter_refresh
	ip_filter_refresh
	url_filter_refresh
	p2p_filter_refresh
 	input_filter_refresh
	filter_l7_refresh

	return 0
}

module=$1
op=$2
param=$3

filter_module_func $module $op $param