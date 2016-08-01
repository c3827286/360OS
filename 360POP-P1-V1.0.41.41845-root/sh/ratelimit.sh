#!/bin/sh
. /sh/CFGFILE.sh

out_port=$1
out_type=$2
out_rate=$3

ratelimit $out_port $out_type $out_rate

exit 0
