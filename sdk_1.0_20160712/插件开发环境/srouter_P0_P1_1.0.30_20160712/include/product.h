#ifndef __IGD__PRODUCT__H__
#define __IGD__PRODUCT__H__ 

#define IGD_INTERFACE_WAN_NUM 1
#define IGD_INTERFACE_WAN_VARNUM        0  // interface of wan variable Num 
#define IGD_INTERFACE_WAN_ENABLE_NUM	1
#define IGD_INTERFACE_LAN_PORT_NUM      4
#define IGD_INTERFACE_LAN_NUM 1
#define IGD_INTERFACE_LAN_PORTMASK 0x1e
#define IGD_FILTER_HOST_MAX             64
#define HOST_MX	IGD_FILTER_HOST_MAX
#define IGD_FILTER_CONNECT_MAX	5000
#define CONN_MX IGD_FILTER_CONNECT_MAX
#define LAN_PORT_MASK IGD_INTERFACE_LAN_PORTMASK
#define WAN1_PORT_ID 0
#define PORT_NR_MX 5

#define UGRP_MX 256
#define TGRP_MX 256
#define URLGRP_MX 256
#define DNSGRP_MX 256
#define WEB_AUTH_MX 512
#define PPPOE_MX 512
#define UGRP_PER_MX 2000
#define TGRP_PER_MX 10
#define URLGRP_PER_MX 1000
#define DNSGRP_PER_MX 2000
#define IGD_INTERFACE_WIRE_DEVNAME	"eth0.5"
#define IGD_INTERFACE_LAN_IFNAME	"br0"
#define IGD_INTERFACE_WAN1_IFNAME   	"eth1.1"
#define IGD_INTERFACE_WAN2_IFNAME   	"eth1.2"
#define IGD_INTERFACE_WAN3_IFNAME   	"eth1.3"
#define IGD_INTERFACE_WAN4_IFNAME   	"eth1.4"
#define IGD_INTERFACE_IFNAME "eth1."
#define ACCOUNT_MX 1000
#define PLATFORM_RTK

#define SYS_MIN_RAM_SIZE 8192 //minimum free ram size 8M
#endif
