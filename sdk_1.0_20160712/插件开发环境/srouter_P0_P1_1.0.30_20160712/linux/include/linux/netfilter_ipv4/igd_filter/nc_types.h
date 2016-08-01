#ifndef __NC__TYPE__H__
#define __NC__TYPE__H__

#define UGRP_ALL 		0 
#define UGRP_IPMAC 		1 
#define UGRP_IPMAC_IVS 		2 /*  inverse */
#define UGRP_WIRE 		3 
#define UGRP_WIFI 		4 
#define UGRP_WIFI_1		5 
#define UGRP_WIFI_2		6 
#define UGRP_WIFI_3		7 
#define UGRP_WIFI_4		8 
#define UGRP_WIFI_IPMAC         9 
#define UGRP_WIFI_IPMAC_IVS     10
#define UGRP_WIRE_IPMAC         11
#define UGRP_WIRE_IPMAC_IVS     12
#define UGRP_PPPOE 		13
#define UGRP_PPTP 		14
#define UGRP_L2TP 		15
#define UGRP_PORT_1		16
#define UGRP_PORT_2 		17
#define UGRP_PORT_3 		18
#define UGRP_PORT_4 		19
#define UGRP_PORT_5 		20
#define UGRP_WIFI_2_4G		21
#define UGRP_WIFI_5G		22
#define UGRP_SYS_CUR		23

#define UGRP_SYS_MX 		50 /*  system group mx */

#define UGRP_TYPE_IP	0
#define UGRP_TYPE_MAC	1

enum {
	GRP_USER, /*  user group */
	GRP_TIME, /*  time group */
	GRP_URL, /*  url group */
	GRP_DNS,
	GRP_MX,
};

#define NLKMSG_GRP_IF 1  /* ip or mac change */
#define NLKMSG_GRP_PORT 2 /* port link change */
#define NLKMSG_GRP_DEVICE 3 /* device change  */
#define NLKMSG_GRP_GROUP 4 /* user、time、url ... group change */
#define NLKMSG_GRP_HOST	  5 /* host online or offline */
#define NLKMSG_GRP_SYS	 6 /* system info change, such as: http server port change */
#define NLKMSG_GRP_STOP 8 /* stop msg */
#define NLKMSG_GRP_APP 8 /* app msg */

#define URL_NAME_LEN 64
enum {
	RULE_MID_URL = 0,
	RULE_MID_BR_FILTER,
	RULE_MID_MAX,
};

enum {
       URL_TYPE_VIP = 0,
       URL_TYPE_NVIP,
       URL_TYPE_MX,
};


enum {
	RULE_NLK_URL,
};

#define DNS_TYPE_DENY				0
#define DNS_TYPE_ALLOW				1
#define DNS_TYPE_REDIRECT 			2
#define DNS_TYPE_REPLACE			3
#define DNS_TYPE_GROUP_REDIRECT 	4
#define DNS_TYPE_ERROR				5

enum IGD_FILTER_TARGET_TYPE {
	IGD_FILTER_TARGET_TYPE_DROP = 1,		//丢弃
	IGD_FILTER_TARGET_TYPE_ACCEPT,			//接受
	IGD_FILTER_TARGET_TYPE_MARK,			//标记
	IGD_FILTER_TARGET_TYPE_LIMIT,			//线速
	IGD_FILTER_TARGET_TYPE_QOS,				//qos处理
	IGD_FILTER_TARGET_TYPE_POLICY_ROUTE,	//策略路由
	IGD_FILTER_TARGET_TYPE_REDIRECT, /*  dns redirect */
	IGD_FILTER_TARGET_TYPE_GROUP_REDIRECT, /*dns group redirect*/
	IGD_FILTER_TARGET_TYPE_REPLACE, /*  dns replace */
	IGD_FILTER_TARGET_TYPE_ERROR, 	/* dns error */
	IGD_FILTER_TARGET_TYPE_PASS, 	/* pass anyway*/
};
#define ACTION_TYPE_DENY	0 
#define ACTION_TYPE_ALLOW	1
#define ACTION_TYPE_PASS	2

#define IGD_NLK_ADD 0
#define IGD_NLK_MOD 1
#define IGD_NLK_DEL	2
#define IGD_NLK_CLEAN	3
#define IGD_NLK_DUMP	4
#define IGD_NLK_LOG_DUMP 5
#define IGD_NLK_LOG_DEL  6
#define IGD_NLK_LOG_CLEAN 7
#define IGD_NLK_MATCH	8
#define IGD_NLK_REPLACE	9

#define IGD_ACTION_ADD   IGD_NLK_ADD
#define IGD_ACTION_MOD   IGD_NLK_MOD
#define IGD_ACTION_DEL   IGD_NLK_DEL
#define IGD_ACTION_CLEAN IGD_NLK_CLEAN
#define IGD_ACTION_DUMP  IGD_NLK_DUMP
#define IGD_ACTION_LOG_DUMP IGD_NLK_LOG_DUMP
#define IGD_ACTION_LOG_DEL IGD_NLK_LOG_DEL
#define IGD_ACTION_LOG_CLEAN IGD_NLK_LOG_CLEAN
#define IGD_ACTION_MOD_DEL 50
#define IGD_ACTION_MOD_ADD 51
#define IGD_ACTION_DEL_BYDATA 52
#define IGD_ACTION_NUM 	 53
#define IGD_ACTION_REPLACE 54
#define IGD_ACTION_MOD_DATA 55

#define GRP_MX_NR 256 /*  must > UGRP_MX.TGRP_MX... */
#define RULE_MX 513

enum {
	OS_TYPE_NONE = 0,
	OS_TYPE_WINDOWS,
	OS_TYPE_IPHONE,
	OS_TYPE_ANDROID,
	OS_TYPE_WP,
	OS_TYPE_MAC,
	OS_TYPE_LINUX,
	OS_TYPE_IPAD,
	OS_TYPE_MAX,
};


#ifndef BITS_TO_LONGS
#define BITS_TO_LONGS(n) ((n + (sizeof(long)*8) - 1)/ (sizeof(long)* 8))
#endif
typedef unsigned long grp_map_t[BITS_TO_LONGS(GRP_MX_NR)];

#define igd_min(a,b) (((a)<(b)) ? (a) : (b))

#define igd_strcpy_end(dst,src,end) __igd_strcpy_end(dst, src, sizeof(dst) - 1, end)
static inline int __igd_strcpy_end(char *dst, char *src, int len, int end)
{
	int i = 0;
	while (*src && len-- > 0) {
		if (*src == end) {
			*dst = 0;
			break;
		}
		*dst++ = *src++;
		i++;
	}
	return i;
}
static inline unsigned char *igd_chr_end(unsigned char *src, int key, int end)
{
	while (*src) {
		if (*src == key)
			return src;
		if (*src == end)
			return NULL;
		src++;
	}
	return NULL;
}

#define sizelen(a) (sizeof(a) - 1)
#define RESOURCE_SEC_URL 	0
#define RESOURCE_WIFI_STA	1
#define RESOURCE_MX  64

#endif
