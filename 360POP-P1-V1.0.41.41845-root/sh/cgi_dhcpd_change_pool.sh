#!/bin/sh
source /sh/CFGFILE.sh
source /sh/dhcpd.sh
source $LANCFG
source /sh/file_funs.sh

index=$1
pool_enable=$2
pool_start=$3
pool_end=$4
lease=$5

file_set_key $LANCFG DHCPD_ENABLE${index} $pool_enable
file_set_key $LANCFG DHCPSTART${index} $pool_start
file_set_key $LANCFG DHCPEND${index} $pool_end
file_set_key $LANCFG LEASETIME${index} $lease

dhcpd_start_stop

exit 0