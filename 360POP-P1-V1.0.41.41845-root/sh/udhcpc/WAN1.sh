#!/bin/sh
. /sh/CFGFILE.sh

_cmd="/sh/udhcpc/${1}"

exec $_cmd "1"
