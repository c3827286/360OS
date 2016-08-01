#!/bin/sh

#这里主要是对文件进行操作的函数

#从文件中删除指定的那一行
file_del_line_byidx()
{
	local file=$1
	local idx=$2
	local tmp_file="/tmp/${file##/*/}.tmp"
	local line
	local i=1
	if [ ! -e $file ];then
		return 1
	fi

	> $tmp_file
	while read line
	do
		if [ $i -ne $idx ]; then
			echo $line >> $tmp_file
		fi
		((i++))
	done < $file

	rm -rf $file
	mv -f $tmp_file $file

	return 0
}

file_get_line_byidx()
{
	local file=$1
	local idx=$2
	local i=1
	local __line=
	local __param=$3

	if [ ! -e $file ];then
		return 1
	fi

	while read __line
	do
		if [ $i -eq $idx ]; then
			eval "$__param="$__line""
		fi
		((i++))
	done < $file

	return 0
}

file_set_key()
{
	local file=$1
	local key=$2
	local value=$3
	local key_tmp=
	local tmp_file="/tmp/${file##/*/}.tmp"
	local line
	local found=0
	
	[ ! -e "$file" ] && return 1
	
	> $tmp_file
	while read line
	do
		key_tmp=`echo $line | cut -d'=' -f1`
		[ "$key" = "$key_tmp" ] && found=1 &&  echo "$key=$value" >> $tmp_file && continue
		echo "$line" >> $tmp_file
	done < $file
	
	[ "$found" = "0" ] && echo "$key=$value" >> $tmp_file
	
	rm -rf $file
	mv -f $tmp_file $file
	
	return 0
}

file_get_key()
{
	return 0
}

file_del_key()
{
	local file=$1
	local key=$2
	local key_tmp=
	local tmp_file="/tmp/${file##/*/}.tmp"
	local line=
	
	[ ! -e "$file" ] && return 1
	
	> $tmp_file
	while read line
	do
		key_tmp=`echo $line | cut -d'=' -f1`
		[ "$key" = "$key_tmp" ] && continue
		echo "$line" >> $tmp_file
	done < $file
	
	rm -rf $file
	mv -f $tmp_file $file
	
	return 0
}