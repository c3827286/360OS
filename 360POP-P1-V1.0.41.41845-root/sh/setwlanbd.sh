#!/bin/sh
#############################################
#   setwlanbd.sh
#############################################

WLANBD=$1

/sh/wlcfg.sh

iwpriv wlan0 write_reg b,bd,$WLANBD

exit 0
