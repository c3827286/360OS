#!/bin/sh

for pid in `pidof telnetd`
do
	kill $pid
done

exit 0
