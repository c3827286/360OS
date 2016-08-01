#!/bin/sh
source /sh/CFGFILE.sh
source /sh/dhcpd.sh
source $LANCFG
source /sh/file_funs.sh

pool_start=$1
pool_end=$2
lease=$3

index=$DHCPD_POOL_NUM

file_set_key $LANCFG DHCPD_ENABLE${index} "1"
file_set_key $LANCFG DHCPSTART${index} $pool_start
file_set_key $LANCFG DHCPEND${index} $pool_end
file_set_key $LANCFG LEASETIME${index} $lease
file_set_key $LANCFG DHCPD_POOL_NUM $((++index))

dhcpd_start_stop

exit 0