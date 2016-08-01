#!/bin/sh

info_set()
{
	local key=$1
	local value=$2
	local file=
	local dir="/var/`echo $key | cut -d'_' -f1`"
	dir="${dir}/`echo $key | cut -d'_' -f2`"
	file="${dir}/$key"

	if [ ! -d $dir ];then
		mkdir -p $dir
	fi

	echo "$value" > $file

	return 0
}

info_get()
{
	local key=$1
	local value=$2
	local dir=
	local file=
	dir="/var/`echo $key | cut -d'_' -f1`"
	dir="${dir}/`echo $key | cut -d'_' -f2`"
	file="${dir}/$key"

	if [ -e "$file" ];then
		eval "$value=`cat $file`"
	else
		eval "$value="
	fi
	
	return 0
}
