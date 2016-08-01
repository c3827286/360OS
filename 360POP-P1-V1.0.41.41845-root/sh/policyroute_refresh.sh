#!/bin/sh
. /sh/CFGFILE.sh
. /sh/policyroute.sh

. $ROUTERCFG

proute_refresh

exit 0
