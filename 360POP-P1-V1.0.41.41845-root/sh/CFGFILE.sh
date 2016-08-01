#!/bin/sh

#PATH
PATH_PARAM=/var/run/param
PATH_LOCK=/var/run/lock

VERSIONCFG=/var/cfg/VERSION

LANCFG=/var/cfg/cfg-lan
WANCFG=/var/cfg/cfg-wan
#·���������ļ�
ROUTERCFG=/var/cfg/cfg-router
#·�ɱ����ñ��ļ�
ROUTECFG=/var/cfg/cfg-route

#����·�������ļ�
POLICY_ROUTE_SRC_CFG=/var/cfg/cfg-policyroute-src
POLICY_ROUTE_DST_CFG=/var/cfg/cfg-policyroute	#���������û��ֹ����õĵ�ַ
POLICY_ROUTE_FLAG_CFG=/var/cfg/cfg-proute-autoupdate	#�Ƿ��Զ�����
POLICY_ROUTE_IP_LST=/var/cfg/cfg-ip-lst		#����ip�б�

USER_MANAGE_SET_CFG=/var/cfg/cfg-web-ip
RESERVE_ADDRESS_FILE=/var/cfg/cfg-dhcp-reserve
FILTER_L7_FILE=/var/cfg/cfg-l7

#�����������ļ�
IPNFMIBCFG=/var/cfg/cfg-ip_nf_mib
VSCFG=/var/cfg/cfg-vs
DMZCFG=/var/cfg/cfg-dmz
FTPCFG=/var/cfg/cfg-ftp
#ip���������ļ�
ACCIPCFG=/var/cfg/cfg-accip
#mac���������ļ�
ACCMACCFG=/var/cfg/cfg-accmac
#url���������ļ�
ACCURLCFG=/var/cfg/cfg-accurl
#P2P���������ļ�
P2PCFG=/var/cfg/cfg-p2p
FILTER_MODULE_LIST="mac ip url p2p"
#arp�������ļ�
ARPBINDCFG=/var/cfg/cfg-arpbind
ARPBIND_FILTER_CFG=/var/cfg/cfg-arpbind-filter-status

ARP_ATTACK_DEF_PATH=/var/cfg/cfg-arpattack

PORTMIRRORCFG=/var/cfg/cfg-port_mirror
#time zone config file
TIMEZONE_CFG=/var/cfg/time-zone

#config file for QoS
QOS_APP_CFG=/var/cfg/qos_list

RM=/bin/rm
KILL=/bin/kill
DHCPC=/sbin/udhcpc
DHCPD=/sbin/dhcpd
IFCONFIG=/sbin/ifconfig
ROUTE=/sbin/route
IPRANGE=/bin/iprange
NTPARA=/var/ntpara
SAVEMAC=/bin/saveMAC
TELNETD=/sbin/telnetd

MIRROR_PORT_NUMBER=9

WAN0MARK=10
WAN1MARK=20
WAN0PRIO=10
WAN1PRIO=20
