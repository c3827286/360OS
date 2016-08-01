#!/bin/sh

. /sh/CFGFILE.sh

while read _line
do
	echo $_line
done < $IPNFMIBCFG

