#!/bin/sh

######################################################################
#Upgrade Firmware
#Usage:
#	upgrade.sh fdno startAddr size
######################################################################
. /sh/CFGFILE.sh

FDNO=$1
STARTADDR=$2
LENGTH=$3
$NTPARA update $FDNO $STARTADDR $LENGTH
