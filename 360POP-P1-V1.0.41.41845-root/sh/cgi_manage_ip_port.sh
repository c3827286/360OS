#!/bin/sh

/sh/filter.sh input refresh

/sh/firewall.sh refresh

/sh/webs.sh &

exit 0
