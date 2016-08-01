#ifndef __IGD_PROJECT_H_
#define __IGD_PROJECT_H_

#include "product.h"

//3 mv5181 platform
#define IGD_PRODUCT_2507S		0x01
#define IGD_PRODUCT_2500_06		0x02
#define IGD_PRODUCT_2500_07		0x04
//3 cavium platform
#define IGD_PRODUCT_2600_06		0x08
#define IGD_PRODUCT_2600_07		0x10

#define IGD_PRODUCT_298			0x20
#define IGD_PRODUCT_288 		0X40
#define IGD_PRODUCT_RA288		0x80
#define IGD_PRODUCT_BCM5357     0x100
#define IGD_PRODUCT_N300		0x200
//#define IGD_PRODUCT IGD_PRODUCT_2600_07

//#define IGD_PRODUCT IGD_PRODUCT_298
//#define IGD_PRODUCT IGD_PRODUCT_298
#define IGD_PRODUCT IGD_PRODUCT_N300
//#define IGD_PRODUCT IGD_PRODUCT_BCM5357

#define IGD_AUTO_WAN_LAN_DETECT 0

#define IGD_SUPPORT_WAN_DETECT 1
#define IGD_SUPPORT_NEWUI 1
#ifdef IGD_SUPPORT_NEWUI 
#define WEB_LOGIN
#endif

/* IGD_DEBUG_SWITCH open :
 *		1. open telneted 
 *		2. login no need encrypt password
 *		3. lightcpd no autorestart
 */
#define IGD_DEBUG_SWITCH //DEBUG_SED_FLAG
#ifndef IGD_DEBUG_SWITCH
#define IGD_EXCLUDE_TELNETD
#endif

#define IGD_INTERFACE_LAN_NUM			1
#define IGD_INTERFACE_LAN_IP			"192.168.0.1"
#define IGD_INTERFACE_LAN_MASK			"255.255.255.0"


/*  take care ! cgi_buf maybe overflow, if the number is too big .such as if L7_SW_MSN_NUM_MAX > 400  */
#define IGD_INTERFACE_LAN_PORTID 	1 // first LAN port id
#define IGD_EXCLUDE_VLAN
#define IGD_EXCLUDE_PORTMIRROR
#define IGD_EXCLUDE_LOG_SERVER
#define L7_EXCLUDE_ADVERTISE
#define L7_EXCLUDE_URL
//#define IGD_EXCLUDE_VLAN
//#define IGD_EXCLUDE_L7_FILTER

#define MTK_IMP_SURPPORT 
#define RTK_IMP_SURPPORT  //add by zhengzhongli, for rtl8881AQ ,haier
#define IGD_SUPPORT_IP_POOL
#define IGD_EXCLUDE_LOG_SERVER
#define IGD_L7_SUPPORT_WEB_AUTH
#define PORT_NUMBER 5
#define MAX_BRIDGEPORT_NUM		PORT_NUMBER
#define HW_GPIO_TYPE_7207	1
#define IGD_FILTER_MODULE_RULE_USER_MAX 256
#define IGD_FILTER_MODULE_RULE_SYS_MAX  10
#define S_SPECIAL_MAX                   256
#define IGD_FILTER_PROUTE_SYS_MAX IGD_INTERFACE_WAN_NUM
/*  take care, sys rule also use this count */
#define IGD_FILTER_RULE_MAX             ((IGD_FILTER_MODULE_RULE_USER_MAX + 1) * IGD_FILTER_MODULE_MAX)
#define L7_URL_KEY_NR_MAX               128
#define L7_NETLINK_LOG_DUMP_PER_TIME_NR 70
#define L7_SW_LOG_NR_MX                 (L7_NETLINK_LOG_DUMP_PER_TIME_NR*20)
#define L7_SW_QQ_NUM_MAX                256
#define L7_SW_MSN_NUM_MAX               256 /*  MSN NR must >= URL_NUM , cgi use it*/
#define L7_SW_URL_NUM_MAX               256
#define L7_NETLINK_QQ_DUMP_PER_TIME     150
#define L7_QQ_DETAIL_LEN                512
#define L7_SW_GRP_MAX_NUM              30 // the value must be the same as L7_GROUP_MAX_NUM which is defineed in l7_filter.h 
#define L7_SW_PER_TGRP_MAX_NR           2
#define L7_SW_IP_MAX_NUM                10
#define L7_SW_IP_POOL_IP_NUM_MX		L7_SW_IP_MAX_NUM
#define L7_SW_IP_POOL_MX		10
#define L7_SW_TIME_MAX_NUM             30
#define ARP_TABLE_MAX_NUM               64
#define IGD_LOG_MAX_NUM                 513
#define ROUTE_TABLE_MAX_NUM             256
#define HOST_MAX                        HOST_MX
#define IGD_LOG_DATA_MX_NR              1000
#define SW_288_UPNP_MX_NR               100
#define SW_288_UPNP_IP_MATCH_LIST_MX_NR 256
#define SW_288_UPNP_IP_MX_NR            10
#define NAT_TABLE_MAX_NUM               256
#define ATTACK_LOG_MAX_NUM              256
#define PPTPD_MAX_USERNUM               150
#define L2TPD_MAX_USERNUM				60
#define MAX_STATICIP_NUM                512
#define MAX_OPTION82_NUM 256
#define ROUTER_HOSTNAME "netcore router"
#define IGD_PARAM_STR "netcore"
#define IGD_MODEL_NAME "4S"
#define UPNP_MODEL_NAME		"4S"
#define UPNP_OS_NAME "netcore router"
#define UPNP_OS_URL		"http://www.netcoretec.com"
#define UPNP_MANUFACTURER "netcore"
#define NETCORE_DOMAIN  "leike.cc"
#define NETCORE_DOMAIN_1  "guanli.luyou.360.cn"
#define NETCORE_LOGIN_COOKIE "Netcore_login"
#define MAX_DNSMASQ_NUM           5 
#define PPTPD_USER_ROUTE_MX 2
#define L7_SW_ADVERT_TXT_MX_NR  64 
#define L7_SW_ADVERT_LIST_MX_NR	64 
#define IGD_IP_POOL_MX_NR 20
#define IGD_IP_POOL_IP_MX_NR 5
#define PPPOE_SERVER_MAX_ACCOUNT 500
#define PPPOE_SERVER_MAX_ACCOUNT_LOG 32
#define PPPOE_SERVER_MAX_SESSION 250
#define PPPOE_USER_MAX_MAC  32
#define WEB_AUTH_ACCOUNT_MAX 500
#define L7_SW_BW_URL_LIST_MX_NR	 20 
#define IGD_FILTER_BWHOST_MAX (IGD_FILTER_HOST_MAX/2)
#define IGD_TUNNEL_NUM_MAX 20
#define IGD_IPSEC_MX_NR 60
#define IGD_STATIC_NAT_MAX_NUM  10
#define IGD_IPSEC_CONN_STATUS_MX  256
#define IGD_IPSEC_LOG_MX 256
#define IGD_POLICY_GROUP_MX_NR 20
#define IGD_URL_GROUP_MX_NR 20
#define IGD_URL_GROUP_PER_MX 200
#define IGD_WEB_USER_MAX_NUM  20
#define L7_ADV_LOG_MAX 512
#define RALINK_DEBUG(a,b...) console_printf("%s[%d]:"a, __FUNCTION__, __LINE__, ##b)
#define MAC_OFFSET_FROM_LOADER  (0x30000 - 2*1024)
#define NUM_OF_MAC 21	
#define LOADRE_DEV	"/dev/mtdblock1"
#define NOROUTE_URL "/init/index.html"

#define WEB_AUTH_MX 512
#define PPPOE_MX 512
#define IGD_IPSEC_RSA_MX 20

#define WIFI_NUMBER_OF_INTERFACE				1
#define WIFI_AP_BSSID_CHECK_LENGTH 6


#define IGD_TUNNEL     1
#define IGD_WIFI_MODULE		1

enum {
	IGD_PPPD_TYPE_PPTP_SERVER = 1, /*  pptp server */
	IGD_PPPD_TYPE_PPTP_CLIENT, /*  pptp client */
	IGD_PPPD_TYPE_PPPOE_SERVER, /*  pppoe server */
	IGD_PPPD_TYPE_PPPOE_CLIENT, /*  pppoe client */
	IGD_PPPD_TYPE_L2TP_SERVER,
	IGD_PPPD_TYPE_L2TP_CLIENT,
	IGD_PPPD_TYPE_MX,
};

static inline int wan2port(int index)
{
	switch (index) {
	case 1 ... 4:
		return 0;

	default:
		return 0;
	}
}
#endif /*__IGD_PROJECTS_H_*/
