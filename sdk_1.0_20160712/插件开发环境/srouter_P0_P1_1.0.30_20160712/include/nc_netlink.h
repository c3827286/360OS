#ifndef __IGD__SHARE__NETLINK__H
#define __IGD__SHARE__NETLINK__H
#include <linux/netfilter/nf_conntrack_tuple_common.h>

//2  netlink msg
#define IGD_FILTER_NETLINK_CODE_GET(t)		((t)&0xfff)
#define IGD_FILTER_NETLINK_CODE_SET(t,v)	(t)=((t)&0xf000)|((v)&0xfff)
#define IGD_FILTER_NETLINK_FLAG_GET(t)		(((t)>>12)&0xf)
#define IGD_FILTER_NETLINK_FLAG_SET(t,v)	(t)=((t)&0xfff)|((v<<12)&0xf000)

#define igd_list_for_each_2(val,min,max) do{ \
	int val;\
	for (val = min; val < (max); val++) {

#define igd_list_for_each(min, max) do{ \
	int i;\
	for (i = min; i < (max); i++) {
#define igd_list_for_each_end() }}while(0)

enum {
	ERR_FAILURE = -1,
	ERR_GROUP = -2, /* group invalid */
	ERR_NO_RESOURCE = -3, /*  resource erro */
	ERR_RULE_FULL = -4, /* rule full */
	ERR_NO_PERMISSION = -5, /* no permission */
	ERR_NO_MEM = -6, /* no memory */
	ERR_NAME_EXIST = - 7,
	ERR_NON_EXIST = -8, /* rule non exist */
	ERR_DATA_ERR = -9,
	ERR_EXIST = -10, /*  rule already exist */
	ERR_NOT_SUPPORT = -11,
};

enum  {
	TIME_GROUP_TYPE_WEEK = 0,
	TIME_GROUP_TYPE_YMD,	
	TIME_GROUP_TYPE_MON,		
};

struct time_type_week {
	u_int8_t flags;
	uint8_t day_flags;
	uint8_t start_hour;
	uint8_t start_min;
	uint8_t end_hour;
	uint8_t end_min;
};

struct time_type_ymd {
	u_int8_t flags;
	u_int8_t start_mon;
	u_int8_t start_mday;
	u_int8_t start_hour;
	u_int8_t start_min;
	u_int8_t end_mon;
	u_int8_t end_mday;
	u_int8_t end_hour;
	u_int8_t end_min;
	u_int16_t start_year;
	u_int16_t end_year;
};

struct time_type_mon {
	u_int8_t flags;
	u_int32_t mon_day_flags;
	u_int8_t start_hour;
	u_int8_t start_min;
	u_int8_t end_hour;
	u_int8_t end_min;
};

union time_info {
	struct time_type_week time_week[TGRP_PER_MX];
	struct time_type_ymd time_ymd[TGRP_PER_MX];
	struct time_type_mon time_mon[TGRP_PER_MX];
};

struct tgrp_dump_info {
	int id;
	int type;
	union time_info data;
};

struct rule_comm {
	int id;
	char name[IGD_NAME_LEN];
};

struct grp_mask_comm {
	int id; /* old kid */
	int kid; /*new kid*/
	char name[IGD_NAME_LEN];
};

struct igd_grp_nlk {
	struct igd_nlk_comm comm;
	char name[IGD_NAME_LEN];
	grp_map_t rmap;
	int type;
};
struct igd_url_txt {
	char url[URL_NAME_LEN];
	int len;
};

struct url_cgi_txt {
	char url[URL_NAME_LEN];
	char cgi[URL_NAME_LEN];
	int len;
};

enum IGD_FILTER_NETLINK_MSG{
/*  1  */	IGD_FILTER_NETLINK_MSG_RULE_ADD = 1,
/*  2  */	IGD_FILTER_NETLINK_MSG_RULE_DEL,
/*  3  */	IGD_FILTER_NETLINK_MSG_RULE_DUMP,
/*  5  */	IGD_FILTER_NETLINK_MSG_CONN_GET,
/*  6  */	IGD_FILTER_NETLINK_MSG_CONN_DEL,
/*  7  */	IGD_FILTER_NETLINK_MSG_CONN_DUMP,
/*  8  */	IGD_FILTER_NETLINK_MSG_HOST_GET,
/*  9  */	IGD_FILTER_NETLINK_MSG_HOST_DUMP,
/*  10 */	IGD_FILTER_NETLINK_MSG_DEV,
/*  11 */	IGD_ARP_WORK_MODE_SET,
/*  12 */	IGD_FILTER_NETLINK_MSG_STATISTICS_DUMP,
/*  13 */	IGD_FILTER_FLUX_AUTO,
/*  14 */	IGD_FILTER_TCPACK_HIGH,
/*  15 */	IGD_FILTER_QOS_DEFAULT_LEVEL_SET,
/*  16 */	IGD_FILTER_QOS_WEB_FIRST,
/*  16 */	IGD_FILTER_NETLINK_MSG_GET_INFO,
/*  17 */	IGD_FILTER_NETLINK_MSG_POLIY_UPDATE_DUMP,
/*  18 */	IGD_FILTER_NETLINK_MSG_SET_BANDWIDTH,
/*  19 */	IGD_FILTER_NETLINK_MSG_ACL_SET,
//			#if CONFIG_FILTER_MODULE_DDOS
/*  20 */	IGD_FILTER_NETLINK_MSG_DDOS_ENABLED,
/*  21 */	IGD_FILTER_NETLINK_MSG_DDOS_LOG_CLEAN,
/*  22 */	IGD_FILTER_NETLINK_MSG_DMZ_ENABLED,
/*  23 */	IGD_FILTER_NETLINK_MSG_ARPBIND,
/*  24 */	IGD_FILTER_NETLINK_MSG_ARPUNBIND,
/*  25 */	IGD_FILTER_NETLINK_MSG_LAN2LAN_ROUTE_ENABLED,
/*  26 */	IGD_FILTER_NETLINK_MSG_WANPING_DISABLE,
/*  27 */	IGD_FILTER_NETLINK_MSG_SPECIAL_ADD,
/*  28 */	IGD_FILTER_NETLINK_MSG_SPECIAL_DEL,
/*  29 */	IGD_FILTER_NETLINK_MSG_ROUTE_ADD,
/*  30 */	IGD_FILTER_NETLINK_MSG_ROUTE_DEL,
/*  31 */	IGD_FILTER_NETLINK_MSG_ROUTE_CLEAN,
/*  32 */	IGD_FILTER_NETLINK_MSG_TIMEZONE_SET,
/*  33 */	IGD_FILTER_NETLINK_MSG_LANIFSTATE_CHANGE,
/*  34 */	IGD_FILTER_NETLINK_MSG_WANWORKMODE_SET,
//			#endif
/*  35 */	IGD_FILTER_NETLINK_MSG_ARP_SHOW,
/*  36 */	IGD_FILTER_NS_MODE_SET,
/*  37 */	IGD_FILTER_NETLINK_MSG_PPP_USER,
/*  38 */	IGD_FILTER_NETLINK_MSG_ISP,
/*  39 */	IGD_FILTER_NETLINK_MSG_BWHOST_SET,
/*  40 */	IGD_FILTER_MSG_CHANGE_DEVNAME, // change the devname of wan. FIXME:WW
//#ifdef CONFIG_IP_NF_MATCH_L7
/*  41 */	IGD_FILTER_NETLINK_MSG_L7 ,
//#endif
/*  42*/	IGD_FILTER_NETLINK_MSG_PPPOE,
/*  43 */	IGD_FILTER_NETLINK_MSG_ISP_ROUTE,
//#ifdef CONFIG_IP_NF_IGD_PORT_TRIGGER
/*  44 */	IGD_FILTER_NETLINK_MSG_PT_ADD,
/*  45 */	IGD_FILTER_NETLINK_MSG_PT_DEL,
//#endif
/*  46*/	IGD_FILTER_NETLINK_MSG_FTP_PORT_ADD,
/*  47 */	IGD_FILTER_NETLINK_MSG_FTP_PORT_DEL,
//#if IGD_TOPCOUNTER_ENABLE
/*  48 */	IGD_FILTER_NETLINK_MSG_DNSCOUNTER_DUMP,
/*  49 */	IGD_FILTER_NETLINK_MSG_IPMAC_STOLEN,
/*  51 */	IGD_FILTER_NETLINK_MSG_PROXYARP_ACTION,
		IGD_FILTER_NETLINK_AUDIT,
		IGD_FILTER_NETLINK_MSG_PGROUP_ACTION,
		IGD_FILTER_NETLINK_MSG_L7_MONITOR,
		IGD_FILTER_NETLINK_MSG_DDOS_LOG_ADD,
		IGD_FILTER_NETLINK_RULE,
		IGD_FILTER_NETLINK_HOST,
		IGD_FILTER_NETLINK_SEC_URL, /* obsolete */
		IGD_FILTER_NETLINK_DAY,
		IGD_FILTER_NETLINK_GROUP,
		IGD_FILTER_NETLINK_MSG_ADV,
		IGD_FILTER_NETLINK_MSG_RESOURCE,
		IGD_FILTER_NETLINK_GLOBAL,
		IGD_FILTER_NETLINK_URL,
		IGD_FILTER_NETLINK_DNS_PROXY,
		IGD_FILTER_NETLINK_WIFIDOG = 100,
		IGD_FILTER_NETLINK_MSG_END,
};
#define NLK_MSG_SYS_MX 0xfff

enum {
	ABILITY_HOST_MX,
	ABILITY_CON_MX,
	ABILITY_MX,
};


//flag
enum IGD_FILTER_NETLINK_FLAG {
	IGD_FILTER_NETLINK_FLAG_END = 0x01,
};

#define PROUTE_IFINDEX_FLAG (1<<31)

#define URL_ARGS_PCIP   	0
#define URL_ARGS_PCMAC  	1
#define URL_ARGS_RGW   		2
#define URL_ARGS_RMAC 		3
#define URL_ARGS_RIP  		4
#define URL_ARGS_MAGIC 		5
#define URL_ARGS_URL  		6
#define URL_ARGS_SSID		7
#define URL_ARGS_SMX		8
#define URL_ARGS_MX		64

struct ip_range {
	struct in_addr start;
	struct in_addr end;
};

struct resource_nlk {
	struct igd_nlk_comm comm;
	pid_t pid;
	char task_name[32];
};

enum webauth_user_band_mac_mode {
	WEBAUTH_USER_BAND_MAC_NONE = 0,
	WEBAUTH_USER_BAND_MAC_AUTO = 1,
	WEBAUTH_USER_BAND_MAC_MANUAL = 2,
	WEBAUTH_USER_BAND_MAC_ALWAYS = 3,
	WEBAUTH_USER_BAND_MAC_ERROR
};
enum {
	L7_NLK_WEB_AUTH,
};

enum {
	L7_NETLINK_ADV,
	L7_NETLINK_WEBAUTH_PARAM,
	L7_NETLINK_WEBAUTH_USER,
	L7_NETLINK_ADV_SKIP_HOST,
	L7_NETLINK_WEBAUTH_DUMP,
	L7_NETLINK_ADV_ARGS,
	L7_NETLINK_ADV_CONFIRM,
	L7_NETLINK_ADV_SKIP_UGRP,
};

enum {
	ADV_MID_WEBAUTH = 0,
	ADV_MID_ADV,
	ADV_MID_360,
	ADV_MID_AUTO_UPDATE,
	ADV_MID_360_LOITER_NET,
	ADV_MID_SYS,
	ADV_MID_MX,
};

#define HTTP_CTRL_TYPE_REDIRECT			0
#define HTTP_CTRL_TYPE_WEBAUTH			1
#define HTTP_CTRL_TYPE_JS			2
#define HTTP_CTRL_TYPE_JS_HTML			3
#define HTTP_CTRL_TYPE_DROP			4
#define HTTP_CTRL_TYPE_ADV_AUTO_UPDATE 		5
#define HTTP_CTRL_TYPE_MAX			6

struct adv_host_nlk {
	struct igd_nlk_comm comm;
	t_ipaddr ip;
	int kid;
	int uid;
	int kick;
	int is_webauth;
	uint32_t idle_cut;
};

struct adv_ugrp_nlk {
	struct igd_nlk_comm comm;
	user_group_mask_t ugrp;
};

struct adv_args_nlk {
	struct igd_nlk_comm comm;
};

struct l7_sw_webauth_host{
	t_ipaddr ip;
	int kid;
	uint32_t uptime;
	char user[IGD_NAME_LEN];
};

struct l7_netlink_webauth_user {
	struct igd_nlk_comm comm;
	int id;
};

struct session_flow {
	__u64 up_bytes;
	__u64 down_bytes;
	__u16 sid;
	unsigned char mac[ETH_ALEN];
	__u64 upload; /* used by log */
	__u64 download;/* used by log */
	__u32 second;
};

struct host_info {
	uint32_t size_of_struct;
	struct in_addr addr;
	unsigned char mac[ETH_ALEN];
	char name[32]; /* auto host name */
	char manu_name[32]; /* manu host name */
	char dev_label[32]; 
	user_group_mask_t grp; /* host belongs to which grp bitmap */
	int conn_cnt; /* connection count */
	int up_speed; /*  Byte per second*/
	int down_speed;/* Byte per second*/
	__u64 up_bytes; /*  upload bytes */
	__u64 down_bytes; /* download bytes */
	unsigned long up_pkts; /*  upload pkts */
	unsigned long down_pkts; /* download pkts */
	__u64 magic; /* magic number for web auth */
	__u32 second; /*  online second */
	int os_type; /* OS_TYPE_WINDOWS,OS_TYPE_IPHONE... nc_types.h */
	int speed_mx[IP_CT_DIR_MAX]; /* peak speed value */
	int device_label; /* device manufacturer */
#if 0
	char vendor[32]; /* manufacturer string */
#endif
	uint8_t pad[200];
};

struct url_log_nlk {
	struct igd_nlk_comm comm;
	char mac[ETH_ALEN];
	int type;
};

struct nlk_host_value {
	int os_type;
	char auto_name[32];
	char manu_name[32];
	char dev_label[32];
};

enum {
	IGD_HOST_INFO,
	IGD_HOST_DAY,
	IGD_HOST_INFO_ALIVE,
	IGD_HOST_SET,
};
struct igd_nlk_dev {
	struct igd_nlk_comm comm;
	char ifname[32];
	int uiindex;
};

struct igd_netlink_host {
	struct igd_nlk_comm comm;
	uint32_t ip;
	unsigned char mac[ETH_ALEN];
};

struct l7_netlink_webauth_msg {
	struct igd_nlk_comm comm;
	int need_count;
	uint32_t ip;
	unsigned long used_time;
	struct session_flow flow;
};

struct l7_netlink_bulletin {
	struct igd_nlk_comm comm;
	struct igd_ip_comm_k ip;/*  ip is cpu order */
	struct igd_txt_k src_txt; /*  src url */
	unsigned long flags[BITS_TO_LONGS(URL_ARGS_MX)]; 
	int type; /* norm bulletin or drop bulletin */
	int index;
	int repeat;
	int interval;
	int url_type;
	int txt_id;
	int islocal;
	int skip_static;
	int skip_pppoe;
	int skip_pptp;
	int skip_l2tp;
	int skip_wire;
	int auto_del;
	pid_t pid;
	char url[128]; /* redirect url. or bulletin_0.html etc. log need copy this*/
	char data[256]; /*other data, web auth used. such as : |ip=192.168.1.3*/
};

struct l7_netlink_webauth_dump_head {
	struct igd_nlk_comm comm;
	unsigned long index;
};
struct l7_netlink_webauth_dump_host{
	uint32_t uptime;
	t_ipaddr ip;
	int uid;
	struct session_flow flow;
};
enum {
	AUDIT_LOG_URL,
};
enum {
	AUDIT_DUMP_HOST,
	AUDIT_DUMP_LOG,
};
struct audit_log_nlk {
	struct igd_nlk_comm comm;
	char mac[ETH_ALEN];
};

struct url_log {
	time_t time;
	char host[64];
	char uri[128];
	char cookie[128];
	char refer[64];
	char ua[64]; /*  user-agent */
	char suffix[16]; /* suffix:htm, php,shtml... */
	char pad[200]; /* reserved */
};

struct igd_time_nlk {

};

struct rule_url_data_u {
	int url_type; /*  url type */
	int mode;	/* for ad blcok */
	struct igd_txt_k txt;
};

union rule_data_u {
	struct rule_url_data_u url;
	int action;
};

struct igd_netlink_rule {
	struct igd_nlk_comm comm;
	struct igd_ip_comm_k ip;/*  ip is cpu order */
	union rule_data_u rule;
};

struct nlk_grp_msg {
	struct igd_nlk_comm comm;
	char name[IGD_NAME_LEN];
	char old_name[IGD_NAME_LEN];
};

struct nlk_host_msg {
	struct igd_nlk_comm comm;
	struct in_addr addr;
	char mac[ETH_ALEN];
};

struct nlk_url_msg {
	struct igd_nlk_comm comm;
	int error;
	char var[32];
	char url[64];
};

enum{
	MATCH_PART=0,
	MATCH_ALL
};

struct igd_ip_dst_k {
	int type;
	t_ipaddr start;
	t_ipaddr end;
	int dns_gid;
	int dst_gid; /*  reserved for ip group, NOT SUPPORT NOW */
	char match_type; /*0: part match  1: all match  */
	char dns[32];
};

enum {
	NC_IF,
	NC_PID,/*  only used by switch */
	NC_TIME,
	NC_HTTP_SERVER,
	NC_WIFI,
	NC_BOA,
	NC_BOA_PID, /* only used by boa  */
	NC_VPN, /* used by policy route */
	NC_WAN_NR, 
	NC_ATEXIT,
	NC_IFIP, /*  add/del ip addr  */
	NC_APP_ACL,
	NC_IP_MAC, /* mac to ip, or ip to mac */
	NC_ABILITY,
};

#define INET_L3_TYPE_STD 			0
#define INET_L3_TYPE_DNS 			1
#define INET_L3_TYPE_DNS_GROUP 		2
#define INET_L3_TYPE_DNS_IP_GROUP 	3
#define INET_L3_TYPE_MX				4

struct inet_l3 {
	int type;
	int dns_gid; /* dns group id */
	int addr_gid; /*reserved for dst addr group, Doesn't support NOW */
	char dns[URL_NAME_LEN]; /* domain name */
	struct ip_range addr; /* addr range */
};

struct inet_l4 {
	uint8_t protocol;
	uint16_t port_start; /* dst port */
	uint16_t port_end;   /* dst port end */
	uint16_t src_port_start; /* src port start */
	uint16_t src_port_end; /* src port end */
};

enum {
	INFO_MID_BOA_NOAUTH,
	INFO_MID_BOA_CGI,
	INFO_MID_VPN,
	INFO_MID_BOA_LOGIN,
	INFO_MID_IFIP,
	INFO_MID_MX,
};

#define IF_IP_MX 4
#define IF_DNS_MX 2
#define IF_TYPE_LAN 1
#define IF_TYPE_WAN 2
#define IF_TYPE_ALL 3
#define IF_MX 	(IGD_INTERFACE_LAN_NUM + IGD_INTERFACE_WAN_NUM)	//接口数目

#define IF_MODE_ROUTE	0	//route工作模式
#define IF_MODE_NAT	1	//NAT工作模式

#define IF_MSG_IP 		0
#define IF_MSG_MAC 		1
#define IF_MSG_WORK_MODE	2/*  work mode change, nat or route */
#define IF_MSG_ROUTE		3 /* default route change */
#define IF_MSG_DEV		4 /*  reserved */

#ifndef IFNAMSIZ
#define IFNAMSIZ 16
#endif

struct nlk_if_msg {
	struct igd_nlk_comm comm;
	int type;
	char uiname[IFNAMSIZ];
	char devname[IFNAMSIZ];
	char ifname[IFNAMSIZ];
	struct in_addr ip;
	struct in_addr mask;
	struct in_addr gw;
	int offline; /* 1 offline, 0 online */
};

struct nc_if {
	int enable;
	int type;/* LAN or WAN */
	int work_mode;
	int mtu;
	char uiname[IFNAMSIZ]; /*LAN,WAN1,WAN2... */
	char devname[IFNAMSIZ];/*eth2.1,eth2.2...*/
	char ifname[IFNAMSIZ];/*ppp0,ppp1... */
	unsigned char mac_default[ETH_ALEN]; /*  router default mac */
	unsigned char mac_clone[ETH_ALEN]; /* set by user */
	struct ipaddrmsk ip[IF_IP_MX];
	struct in_addr auto_dns[IF_DNS_MX];/* set by server */
	struct in_addr manu_dns[IF_DNS_MX]; /* set by user */
	struct in_addr gw;
	int offline; /* 1 offline, 0 online */
};

struct nc_ifip {
	int ifid;/*ifid, 0 for LAN, 1 for WAN1.. */
	int isnat; /* if set, add masq rule*/
	int def_route; /* 1: add default route */
	char uiname[IFNAMSIZ]; /*LAN,WAN1,WAN2... */
	char devname[IFNAMSIZ];/*eth2.1,eth2.2...*/
	char ifname[IFNAMSIZ];/*ppp0,ppp1... */
	unsigned char mac[ETH_ALEN]; /* doesn't use */
	struct in_addr ip;
	struct in_addr mask;
	struct in_addr gw;
	struct in_addr dns[IF_DNS_MX];/* set by server */
	struct in_addr manu_dns[IF_DNS_MX];/* set by user */
	int sub_wan_route; /*substitute wan, !0: wan doesn't add default route*/
};

struct nlk_boa_msg {
	struct igd_nlk_comm comm;
};

struct ability_nlk {
	struct igd_nlk_comm comm;
	int ability;
};


struct login_entry {
	uint32_t addr;
	char user[32];
	char error_count;
	char session[64];
	unsigned long forbid_left_time;
};

struct vpn_entry {
	char name[IGD_NAME_LEN];
	char devname[32];
	int ifindex;
};

struct account_pwd {
	char account[IGD_NAME_LEN];
	char pwd[IGD_NAME_LEN];
};

struct igd_wifi {
	char ssid[128];
};

enum {
	NC_IPCP_UP,
	NC_IPCP_DOWN,
	NC_IPCP_DEMAND,
};

/*  msg from pppd or udhcp */
struct sys_msg_ipcp {
	char devname[16];
	char ifname[16];
	struct in_addr ip;
	struct in_addr mask;
	struct in_addr gw;
	struct in_addr dns[2];
	int client_type; /* client_type 0 for pppd, 1 for udhcp */
	pid_t pid; /* pppd pid */
	int pppd_type; /* pppd type ,such as: pptp client */
	int pppid; /* used by pppd when multi dial*/
	int uid; /*ui index */
	int tunnel_id; /* used by pptp l2tp client */
	int tid; /* used by l2tp server */
	uint32_t peer_magic; /* lcp magic number */
	uint32_t my_magic; /*  lcp magic number */
	uint16_t sid; /* session id , used by pppoe server*/
};

enum announce_type
{
    /* when set the mask ANNOUNCE_BIT_DEL,
     * will announce the wireless MAC del event. */
	ANNOUNCE_MAC_DEL = 0,

    /* when set the mask ANNOUNCE_BIT_ADD,
     * will announce the wireless MAC add event. */
	ANNOUNCE_MAC_ADD,

    /* when set the mask ANNOUNCE_BIT_RSSI,
     * will announce the wireless close event and 
     *  tell the current rssi. */
	ANNOUNCE_MAC_RSSI,
	ANNOUNCE_MAC_RSSI_WITHOUT_ASSOC,

    /*when set the mask ANNOUNCE_BIT_SSID,
     * will announce ssid(special format:SD|360|...) change event */
	ANNOUNCE_MAC_SSID_ADD,
	ANNOUNCE_MAC_SSID_DEL,
	ANNOUNCE_MAC_SSID_CHANGE,

    /*when set the mask ANNOUNCE_BIT_MAC_INFO,
     * will announce the mac info received from probe request pkts */
    ANNOUNCE_MAC_RECV_INFO, 

    /*when set the mask ANNOUNCE_BIT_AUTH_ASSOC,
     * will announce received AUTH/ASSOC pkts */
    ANNOUNCE_AUTH_ASSOC,

    /*when set the mask ANNOUNCE_BIT_ROUTER,
     * will announce 360's router information */
    ANNOUNCE_AUTH_ROUTER,

	ANNOUNCE_MAX,
};

enum {
	NOS_SSID_CHANGE,
	NOS_MAC_ANNOUNCE,
	NOS_WIFI_PARAM_CHANGE,
};

/* msg from wifi.c */
struct sys_msg_wifi {
	int if_id;
	int ap_id;
	char ssid[33];	
	char key[65];
};

/*chenyu, added*/
struct sys_msg_wisp {
	char wisp_ssid[33];	
	uint8_t wisp_bssid[6];
	char wisp_key[65];
};

#if 1		/* wy,added */
typedef struct
{
	uint8_t ifname[IFNAMSIZ];	/* with terminal char '\0' */
	uint8_t mac[6];
	uint32_t event;				/* accroding to enum announce_type */
	int8_t rssi;			    /* current rssi */
    char ssid[32+1];            /* data for ANNOUNCE_MAC_SSID_* */

	char pm[6];			/* phone's MAC */
	char sm[6];			/* sender's MAC */
}wifi_anoc_t;
#endif

struct speed_result {
    u_int64_t up_speed;
    u_int64_t down_speed;
};

union sys_msg_union {
	uint16_t web_port;
	struct sys_msg_ipcp ipcp;
	struct sys_msg_wifi wifi;
#if 1		/* wy,added */
	wifi_anoc_t wifi_info;
#endif
	struct sys_msg_wisp wisp;
    struct speed_result speed;
};

#define SYS_GRP_MID_WEB 	0
#define SYS_GRP_MID_VPN 	1	/* reserved for system */
#define SYS_GRP_MID_IPCP	2 	/*reserved for pppd  */
#define SYS_GRP_MID_PPPOE 	3
#define SYS_GRP_MID_DAY  	4
#define SYS_GRP_MID_IFIP	5
#define SYS_GRP_MID_WIFI	6
/*cuiying,added*/
#define SYS_GRP_MID_KEY         7
#define SYS_GRP_MID_SPEED_TEST  8

struct nlk_sys_msg {
	struct igd_nlk_comm comm;
	union sys_msg_union msg;
};

#define IGD_CHECK_NR_VALID(nr, min, max) \
	do {\
		if((nr) < (min) || (nr) >= (max)) {\
			goto error;\
		}\
	}while(0)

#define WEB_LOGIN_ERROR_MAX_COUNT  (30)



enum gen_cmd {
	HTTP_FILTER_CMD_UNSPEC,
	HTTP_FILTER_CMD_ADD_RULE,
	HTTP_FILTER_CMD_NEW_GROUP,
	HTTP_FILTER_CMD_DELETE_GROUP,
	/* add after */
};

enum text_attr {
	HTTP_FILTER_ATTR_UNSPEC,
	HTTP_FILTER_ATTR_URL,
	HTTP_FILTER_ATTR_MODE,
	HTTP_FILTER_ATTR_TXT_MATCH,
	HTTP_FILTER_ATTR_TXT_ORIGINAL_NEST,
	HTTP_FILTER_ATTR_TXT_REPLY_NEST,
	HTTP_FILTER_ATTR_FLAGS,
	HTTP_FILTER_ATTR_GROUP_ID,
	HTTP_FILTER_ATTR_GROUP_NAME,
	HTTP_FILTER_ATTR_GROUP_PRIO,
	HTTP_FILTER_ATTR_STATUS_CODE,
	HTTP_FILTER_ATTR_CUSTOM_HTTP_RESPONSE,
	/* add after */

	__HTTP_FILTER_ATTR_MAX, 
	HTTP_FILTER_ATTR_MAX = __HTTP_FILTER_ATTR_MAX - 1,
};

enum {
	HTTP_FILTER_TYPE_UNSPEC,
	HTTP_FILTER_TYPE_REPLACE,
	HTTP_FILTER_TYPE_DELETE,
	HTTP_FILTER_TYPE_INSERT,
	/* add after */
};

enum {
	HTTP_FILTER_RESET_MODE,
	HTTP_FILTER_PROXY_MODE,
	HTTP_FILTER_HTTP_200_MODE,
	HTTP_FILTER_REPLACE_MODE,
	HTTP_FILTER_DROP_MODE,
	HTTP_FILTER_ACCEPT_MODE,
	HTTP_FILTER_FAKE_RESPONSE_MODE,
	/* add after */
};

#define GENL_HTTP_FILTER_NAME "text_replace"

struct k_text_option {
	uint16_t type;
	uint16_t flags;
	char data[0];
}__attribute__((aligned(4)));

/* text replace option flags */
#define HTTP_FILTER_MATCH_REPEAT		(1<<0)
#define HTTP_FILTER_MATCH_INSERT_BEFORE		(1<<1)

/* URL item flags */
#define HTTP_FILTER_URI_WILDCARD_MATCH		(1<<0)

typedef unsigned char HTTP_FILTER_LEN_TYPE;
#define HTTP_FILTER_ALIGNTO   (sizeof(HTTP_FILTER_LEN_TYPE))
#define HTTP_FILTER_ALIGN(len) (((len)+HTTP_FILTER_ALIGNTO-1) & ~(HTTP_FILTER_ALIGNTO-1))

#define PUT_MATCH_TYPE(opt, type)	((opt)->type = type)
#define PUT_MATCH_FLAGS(opt, flags) 	((opt)->flags |= flags)

#define GET_MATCH_LEN(opt)	(*(HTTP_FILTER_LEN_TYPE *)((opt)->data))
#define GET_REPLACE_LEN(opt) 	(*(HTTP_FILTER_LEN_TYPE *)((opt)->data + sizeof(HTTP_FILTER_LEN_TYPE) + HTTP_FILTER_ALIGN(GET_MATCH_LEN(opt))))
#define GET_MATCH_DATA(opt) 	((opt)->data + sizeof(HTTP_FILTER_LEN_TYPE))
#define GET_REPLACE_DATA(opt) 	((opt)->data + HTTP_FILTER_ALIGN(GET_MATCH_LEN(opt)) + 2 * sizeof(HTTP_FILTER_LEN_TYPE))
#define GET_OPTION_LEN(opt) 	(sizeof(struct k_text_option) + \
				HTTP_FILTER_ALIGN(GET_MATCH_LEN(opt)) + \
				HTTP_FILTER_ALIGN(GET_REPLACE_LEN(opt)) + 2 * sizeof(HTTP_FILTER_LEN_TYPE))

#define PUT_MATCH_LEN(opt, len) 	(*(HTTP_FILTER_LEN_TYPE *)((opt)->data) = len)
#define PUT_MATCH_DATA(opt, src, len) 	(memcpy((opt)->data + sizeof(HTTP_FILTER_LEN_TYPE), src, len))
#define PUT_REPLACE_LEN(opt, len) 	(*(HTTP_FILTER_LEN_TYPE *)((opt)->data + sizeof(HTTP_FILTER_LEN_TYPE) + \
					HTTP_FILTER_ALIGN(GET_MATCH_LEN(opt))) = len)
#define PUT_REPLACE_DATA(opt, src, len) (memcpy((opt)->data + 2 * sizeof(HTTP_FILTER_LEN_TYPE) + \
					HTTP_FILTER_ALIGN(GET_MATCH_LEN(opt)), src, len))


#endif
