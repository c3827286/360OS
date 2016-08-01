#ifndef _IGD_FILTER_H_
#define _IGD_FILTER_H_
#include <linux/version.h>
#include <linux/in.h>
#include <linux/ip.h>
#include <linux/netfilter_ipv4/igd_filter/igd_diff.h>
#include <linux/netfilter_ipv4/igd_filter/nc_types.h>
#include <linux/netfilter_ipv4/igd_filter/igd_dns_match.h>
#include <linux/netfilter_ipv4/igd_filter/igd_url_match.h>
#include <linux/netfilter_ipv4/igd_filter/igd_rule_match.h>
#include <linux/netfilter_ipv4/igd_filter/nc_netlink.h>
#include <linux/netfilter_ipv4/igd_filter/igd_grp.h>
#include <linux/netfilter_ipv4/igd_filter/igd_global.h>
#include <linux/netlink.h>
#include <net/dst.h>
#include <linux/netfilter_ipv4/igd_filter/igd_advert.h>

#define IGD_NLK_DUMP_NR_40 40
//2 connect
#ifdef __KERNEL__
#define DEBUG_RALINK(fmt, arg...) do{ printk("%s[line=%d] "fmt,__FUNCTION__, __LINE__, ##arg);} while(0)
#define IGD_FILTER_CONNECT_FLAG_INUSE 		0
#define IGD_FILTER_CONNECT_FLAG_FASTPATH	1	//用来标记连接是否可以走fastpath
#define IGD_FILTER_CONNECT_FLAG_NEW		2	//新连接
#define IGD_FILTER_CONNECT_FLAG_SEEREPLY	3	//rcv reply pkt
#define IGD_FILTER_CONNECT_FLAG_HELPLER		4	//ct->helper
#define IGD_FILTER_CONNECT_FLAG_UGRP		5

#define IGD_FILTER_CONNECT_TUPLE_STATUS_INSET		1	//记录了进口
#define IGD_FILTER_CONNECT_TUPLE_STATUS_OUTSET		2	//记录了出口
#define IGD_FILTER_CONNECT_TUPLE_STATUS_CONFIRM		3

#ifndef UINT8_MAX
# define UINT8_MAX              (255U)
#endif
#ifndef UINT16_MAX
# define UINT16_MAX             (65535U)
#endif
#ifndef UINT32_MAX
# define UINT32_MAX             (4294967295U)
#endif
#ifndef UINT64_MAX
# define UINT64_MAX             (18446744073709551615ULL)
#endif


#ifndef __IGD_PROJECT_H_
#define __IGD_PROJECT_H_

//3 mv5181 platform
#define IGD_PRODUCT_2507S		0x01
#define IGD_PRODUCT_2500_06		0x02
#define IGD_PRODUCT_2500_07		0x04
//3 cavium platform
#define IGD_PRODUCT_2600_06		0x08
#define IGD_PRODUCT_2600_07		0x10

#define IGD_PRODUCT_298			0x20
#define IGD_PRODUCT_288 		0X40
#define IGD_PRODUCT_RA288 		0X80
#define IGD_PRODUCT_BCM5357		 0X100

#define IGD_PRODUCT IGD_PRODUCT_RA288

#endif /*  end __IGD_PROJECT_H_ */
#endif /*  __KERNEL__*/

#ifdef __KERNEL__

#define LAN_VLAN_MX (IGD_INTERFACE_LAN_PORT_NUM + IGD_INTERFACE_WAN_VARNUM)

#define CONFIG_FILTER_IOBOUND				1

#define	CONFIG_FILTER_MODULE_MAC			1
#define	CONFIG_FILTER_MODULE_IP				1
#define	CONFIG_FILTER_MODULE_DNS			1
#define	CONFIG_FILTER_MODULE_P2P			0
#define	CONFIG_FILTER_MODULE_IM				0
#define	CONFIG_FILTER_MODULE_LIMIT			1
#define	CONFIG_FILTER_MODULE_POLICYROUTE	1
#define	CONFIG_FILTER_MODULE_QOS			1
#define CONFIG_FILTER_MODULE_STATISTICS		1

#define IGD_POLICY_UPDATE 0
#endif

#define IGD_NF_CONNTRACK_HTABLE_SIZE 3000
#define IGD_FILTER_HOST_HASH_SIZE 256
#define IGD_FILTER_MODULE_RULE_USER_MAX	512
#define IGD_FILTER_MODULE_RULE_SYS_MAX	1024
#define IGD_FILTER_MODULE_RULE_MAX 300
#define S_SPECIAL_MAX 512
#define S_ROUTE_MAX	512
#define IGD_PPP_USR_LEN 48
#define IGD_PPP_ROUTE_MX 5
#define IGD_INTERFACE_WAN1_VID 1
#define IGD_INTERFACE_WAN2_VID 2
#define IGD_INTERFACE_WAN3_VID 3
#define IGD_INTERFACE_WAN4_VID 4
#define IGD_INTERFACE_LAN_VID	5
#define IGD_SUPPORT_PPPOE_SERVER
#define S_CONNECT_MAX			40000
#define S_HOST_MAX		10240
#define FP_NUM_OF_HASH_INDEX 		8192	/* must be 2^n, for SMB router */
#define IGD_HBWRR_LIMIT 256
#define IGD_FILTER_STATISTICS_TIMER_INTERVAL (HZ / 4)
#define IGD_HOST_STATS_MX 512

enum {
	IGD_PPPD_TYPE_PPTP_SERVER = 1, /*  pptp server */
	IGD_PPPD_TYPE_PPTP_CLIENT, /*  pptp client */
	IGD_PPPD_TYPE_PPPOE_SERVER, /*  pppoe server */
	IGD_PPPD_TYPE_PPPOE_CLIENT, /*  pppoe client */
	IGD_PPPD_TYPE_L2TP_SERVER,
	IGD_PPPD_TYPE_L2TP_CLIENT,
	IGD_PPPD_TYPE_MX,
};

//2 host
enum IGD_FILTER_HOST_FLAG {
	HOST_REPLY_BIT = 1, /* host rcv pkt */
	HOST_ONLINE_BIT = 2,//the host is alive, because it send pkt out
	HOST_ARP_BIT = 3, /* when host mac doesn't match org mac,send arp request */
	HOST_MAC_BIT = 4, /* MAC set */
};

//2 rule
#define IGD_FILTER_RULE_FLAG_ADDBYUSER	0x01		//用户手工添加的规则
#define IGD_FILTER_RULE_FLAG_ADDBYSYS	0x02		//系统动态添加的规则
#define IGD_FILTER_RULE_FLAG_INUSE		0x04
#define IGD_FILTER_RULE_FLAG_TODEL		0x08		//flag to del
#define IGD_FILTER_RULE_FALG_SEND		0x10		//用来标记此connect 是否被传送到user
#define IGD_FILTER_RULE_FLAG_REMATCH	0x20		//rule change by user, need rematch
#define IGD_FILTER_RULE_FLAG_ADDED		0x40		// rule added to kernel

#define IGD_FILTER_RULE_NAME_LEN	32

#define IGD_FILTER_RULE_PRIO_LOWEST	((unsigned int)(-1))
#define IGD_FILTER_RULE_PRIO_HIGEST	(0)

//2 module
enum IGD_FILTER_MODULE{
	IGD_FILTER_MODULE_MAC = 0,			//mac过滤模块
	IGD_FILTER_MODULE_IP,				//ip过滤模块
	IGD_FILTER_MODULE_LIMIT,			//网络监控
	IGD_FILTER_MODULE_POLICYROUTE,		//策略路由
	IGD_FILTER_MODULE_QOS,				//qos
	IGD_FILTER_MODULE_DNS,				//dns过滤模块
	IGD_FILTER_MODULE_FATPATH,
	IGD_FILTER_MODULE_MAX
};

#define IGD_LIST_EACH_3(val,min,max) do{ \
	int val;\
	for (val = (max - 1); val >= (min); val--) {

#define IGD_LIST_EACH_2(val,min,max) do{ \
	int val;\
	for (val = min; val < (max); val++) {

#define IGD_LIST_EACH(min, max) do {\
	int i;\
	for (i = min; i < (max); i++) {
		
#define IGD_LIST_EACH_END() }}while(0)
enum IGD_QOS_LEVEL{
	IGD_QOS_LEVEL_MIN,
	IGD_QOS_LEVEL_HIGHEST,	//qos queue 1
	IGD_QOS_LEVEL_HIGHER,	//qos queue 2
	IGD_QOS_LEVEL_HIGH,		//qos queue 3	//队列0
	IGD_QOS_LEVEL_MIDHIGH,	//qos queue 4
	IGD_QOS_LEVEL_MID,		//qos queue 5
	IGD_QOS_LEVEL_MIDLOW,	//qos queue 6
	IGD_QOS_LEVEL_LOW,		//qos queue 7
	IGD_QOS_LEVEL_LOWER,	//qos queue 8
	//IGD_QOS_LEVEL_LOWEST,			//队列7
	IGD_QOS_LEVEL_MAX
};

enum IGD_FILTER_MODULE_PRIO{
	IGD_FILTER_MODULE_PRIO_HIGHEST = 0,
	IGD_FILTER_MODULE_PRIO_MAC,
	IGD_FILTER_MODULE_PRIO_IP,
	IGD_FILTER_MODULE_PRIO_DNS,
	IGD_FILTER_MODULE_PRIO_LIMIT,
	IGD_FILTER_MODULE_PRIO_POLICYROUTE,
	IGD_FILTER_MODULE_PRIO_QOS,
	IGD_FILTER_MODULE_PRIO_MIN
};

#define IGD_FILTER_MODULE_NAME_LEN 32


#define IGD_FILTER_SPEED_INTERVAL	(2*HZ)

//2 counter

struct statistics{
	unsigned long long connect;							//连接数
	unsigned long long pkt;
	unsigned long long byte;
	unsigned long bps;
	unsigned long speed;
};

#define IGD_QOS_SIZEARR_SIZE 12
struct igd_filter_counter{
	unsigned long last;		//tick
	struct{
		unsigned long connect;							//连接数
		unsigned long pkt;
		u64 byte;
	}old,new,speed;
};

//2 Statistics

#define STATISTICS_SIZE			10

struct igd_filter_statistics_counter {
	struct igd_filter_counter all;
	struct igd_filter_counter udp;
	struct igd_filter_counter tcp;
	struct igd_filter_counter icmp;
	struct igd_filter_counter speed;
};

struct igd_filter_statistics{
	int ifindex;
	char uiname[IFNAMSIZ];
	spinlock_t lock;
	struct igd_filter_statistics_counter in;
	struct igd_filter_statistics_counter out;
	int speed_mx[IP_CT_DIR_MAX]; /* 0: out, 1: in*/
	int select; /* select by multi route */
	int congest; /* hbwrr congest ip */
	uint32_t qlen; /*  wan congest pkt len */
};

#define wan_up_speed(stat) (stat->out.speed.speed.byte)
#define wan_down_speed(stat) (stat->in.speed.speed.byte)

struct igd_filter_statistics_u {
	int ifindex;
	char uiname[IFNAMSIZ];
	struct igd_filter_statistics_counter in;
	struct igd_filter_statistics_counter out;
};

struct igd_filter_counter;

#ifdef __KERNEL__
struct igd_filter_connect_k;
struct igd_filter_host_k;
#else
struct igd_filter_connect_u;
struct igd_filter_host_u;
#endif


//1 IFMAP
#ifdef __KERNEL__
struct ip_entry{
	struct list_head list;
	t_ipaddr ip;
	t_ipaddr mask;
	int count;
};
#endif

enum S_SPECIAL_ENTRY_TYPE{
	S_SPECIAL_ENTRY_TYPE_INIT,
	S_SPECIAL_ENTRY_TYPE_SERVICE,
	S_SPECIAL_ENTRY_TYPE_VS,
	S_SPECIAL_ENTRY_TYPE_MAX
};

#ifndef S_LOG_DES_LEN
#define     S_LOG_DES_LEN	64
#endif

struct s_special_entry_u{
	char uiname[IFNAMSIZ];
	char des[S_LOG_DES_LEN];
	int type;
	int app_type; /* modify by zmb, 2010-09-13-13:08 */
	t_proto proto;
	t_port port_start;
	t_port port_end;
};

#ifdef __KERNEL__
#ifdef CONFIG_IP_NF_IGD_DDOS
enum {
	IGD_DDOS_SPECIAL_APP_REMOTE_WEB = 1,
	IGD_DDOS_SPECIAL_APP_LOCAL_WEB ,
	IGD_DDOS_SPECIAL_APP_DHCPD,
	IGD_DDOS_SPECIAL_APP_DHCPC,
	IGD_DDOS_SPECIAL_APP_DNSMASQ,
	IGD_DDOS_SPECIAL_APP_TELNETD, 
	IGD_DDOS_SPECIAL_APP_PPTPD,
	IGD_DDOS_SPECIAL_APP_IPSEC_IKE,
	IGD_DDOS_SPECIAL_APP_VS,
	IGD_DDOS_SPECIAL_APP_UPNP,
	IGD_DDOS_SPECIAL_APP_L2TPD,
	IGD_DDOS_SPECIAL_APP_HELPER = 100,
};
struct s_special_entry_k {
	struct list_head list;
	struct list_head list_ifc;
	int id;
	atomic_t ref;
	struct igd_ifindex_map_entry *ifc;
	t_proto proto;
	t_port port_start;
	t_port port_end;
	struct count_limit_data cd;	//限制链接数
};
#endif
#endif /*__KERNEL__*/

struct s_route_entry_u{
	t_ipaddr ip;
	t_ipaddr mask;
	t_ipaddr gw;
};

#if __KERNEL__
struct s_route_entry_k{
	struct list_head list;

	t_ipaddr ip;
	t_ipaddr mask;
	t_ipaddr gw;
};
#endif

#if __KERNEL__

enum policy_isp{
	CHINATELECOM,//电信
	CNCGROUP,//网通
	MAXISP,
	ISP_AUTO = MAXISP,
	ALL_IP = MAXISP,
	/*
	 *CRTC,
	 *GWBN,
	 *CERNET,
	 *OTHERS,
	 */
};

#define ISP_ROUTE_NUM_MX 3000 
struct igd_route_k {
	struct list_head list;
	__be32 key;
	unsigned long mark;
};

struct igd_nlk_route {
	__be32 key;
	int prefix;
	unsigned long mark;
};

#define ROUTE_HASH_MAX 256
#define IGD_NLK_ROUTE_MX 100
struct igd_netlink_isp_route {
	struct igd_nlk_comm comm;
	struct igd_nlk_route route[IGD_NLK_ROUTE_MX];
};

struct igd_route_index_entry {
	struct list_head list;
	struct list_head hash_head[ROUTE_HASH_MAX];
	__be32 mask;
	int prefix;
};

struct igd_wan_info {
	int isp;
	int load;
	int active;
};
struct igd_dns_info {
	__u32 dns;
	__u32 mark; /*  this dns may belong to multi interface */
};
struct igd_netlink_isp_info {
	struct igd_wan_info wan[IGD_INTERFACE_WAN_NUM];
	struct igd_dns_info dns[MAXISP][IGD_ISP_DNS_MAX]; /*  network bit order */
};

struct igd_netlink_pppoe_server {
	struct igd_nlk_comm comm;
	__u32 lcp_echo_interval;
	__u32 lcp_echo_failure;
	__u32 localip;
};

struct igd_netlink_pppoe_session {
	struct igd_nlk_comm comm;
	__u32 peerip;
	__u32 local_magic;
	__u32 peer_magic;
	__u16 sid; /*  network bit order */
	char mac[ETH_ALEN];
	int action;
	int charge_mode;
	int year;
	int month;
	int day;
	int total_min;
	int used_min;
	unsigned long  total_flow;
	unsigned long  remain_flow;
	int txt_id;
	char txt_url[32];
	int pgid;
};

struct igd_netlink_pppoe_session_flow {
	struct igd_nlk_comm comm;
	int hash_index;
	int cur_index;
};

struct igd_if{
	struct list_head list;
	char name[IFNAMSIZ];
	int ifindex;
};
struct igd_ifindex_map_entry{
	int type;					//LAN or WAN
	//dev info
	char uiname[IFNAMSIZ];
	char devname[IFNAMSIZ];
	int ui_index;
	int ifindex;		//devname对应的ifindex
	struct list_head dns;
	struct list_head ifs;		//这个设备上的接口
	rwlock_t ifs_lock;			//保护ifs

	int load;
	int isp;
	int active;
	int fid;

	unsigned char mac[ETH_ALEN];
	unsigned long flag;
	int dmz_enabled;		//dmz
	int ping_enable;		//是否允许ping
	int ifc2ifc_enable;		//是否允许lan->lan, wan->wan的路由
	
	int workmode;			//接口工作模式， nat 或者路由， lan口总工作在路由模式
	t_ipaddr gw;			//网关ip
	t_ipaddr ip;
	struct list_head special_list;	//这个接口上需要特殊对待的端口
#ifdef CONFIG_IP_NF_IGD_DDOS
	struct rate_limit_data conn_rd;
	struct rate_limit_data rd_arp;		//对arp包限速
	struct rate_limit_data rd_ping;		//对ping进行限速
	struct rate_limit_data rd_bc;			//对ip广播包进行限速
	struct rate_limit_data rd_mc;			//对ip多波包进行限速
	struct rate_limit_data rd_un;			//对未知ip(source ip)进行限速
	struct rate_limit_data rd_mac_bc;		//对mac广播包进行限速
	struct rate_limit_data rd_mac_mc;		//对mac多波包进行限速
	struct rate_limit_data rd_mac_ot;		//对mac other包进行限速	
	struct rate_limit_data rd_mac_un;		//对未知mac(source mac)进行限速
	struct rate_limit_data rd_mac_iv;		//对mac unconfirmed包进行限速	//TODO:zjx
	struct count_limit_data cd_dmz;		//限制dmz连接
#endif
};
enum{
	IGD_STAT_SKIP,
	IGD_DDOS_MAC_SKIP,
	IGD_DDOS_SRCNET,
	IGD_DDOS_SKIP,
};
#endif /*__KERNEL__*/

#ifdef __KERNEL__
//2 ifindex map
#define IGD_IFINDEX_TYPE_LAN	0x1
#define IGD_IFINDEX_TYPE_WAN	0x2	
#define IGD_IFINDEX_TYPE_LO	0x4
#define IGD_IFINDEX_TYPE_SERVER	  0x8 

//static struct igd_ifindex_map_entry igd_filter_ifmap[];

#endif /* __KERNEL__ */


struct igd_filter_host_key {
	int flag;
	unsigned char mac[ETH_ALEN];
	unsigned char sec_mac[ETH_ALEN];
	char name[32]; //auto hostname
	char manu_name[32]; //manu hostname
	char dev_label[32]; //host dev label
	t_ipaddr ipaddr;
	int os_type; /*  device type :windows, linux. ios */
};

//2 connect
#ifdef __KERNEL__
struct igd_filter_connect_k {
	struct list_head list;		//list connect
	struct list_head hlist;     //list connect to host 
	int id;
	unsigned long flag;
	__u32 fp_rematch; /*  rule change, need rematch */
	struct igd_filter_host_k * host;
	struct nf_conn * ct;
	struct{
		unsigned long status;
		enum ip_conntrack_dir dir_cache;			//此tuple方向, up/down
		struct igd_ifindex_map_entry *iif;
		struct igd_ifindex_map_entry *oif;
		struct dst_entry* dst;
		struct igd_filter_counter counter;
	}tuple[IP_CT_DIR_MAX];
	struct {
		int rematch;
		struct igd_filter_rule_k *rule;
	}rules[IGD_FILTER_MODULE_MAX];
	struct conn_tb *tb;
	int ddos_id; /* s_special_id */
};
#endif /* __KERNEL__ */

struct igd_filter_connect_u{
	int id;
	int flag;
	u_int8_t proto;
	u8 mid;
	u8 appid;
	unsigned long timeout;
	struct{
		t_ipaddr ip_src;
		t_ipaddr ip_dst;
		t_port port_src;
		t_port port_dst;
		char in[IFNAMSIZ];
		char ou[IFNAMSIZ];
		struct igd_filter_counter counter;
	}tuple[IP_CT_DIR_MAX];
	char url[32];
};

struct igd_filter_conns_struct {
	struct igd_nlk_comm comm;
	t_ipaddr ip;
	int id;
};

//2 host
#ifdef __KERNEL__
struct tb_entry {
	unsigned long last;
	int interval;			//令牌桶增加间隔
	int inc;				//每次增加数量
	int limit;
 	int size;				//令牌桶大小
};

struct conn_tb {
	atomic_t ref;
	struct list_head list; /*  add to host head */
	int id; /* tb id, equal to rule id */
	struct tb_entry tb[IP_CT_DIR_MAX];
	struct tb_entry *stb[IP_CT_DIR_MAX]; /* share tb */
};

#define HOUR_MAX (30*24)
#define MONTH 31
struct stats_info {
	time_t online;
	time_t offline;
	u64 byte[IP_CT_DIR_MAX];
	u32 minute; /* use minitue */
};

struct host_stats {
	struct list_head list;
	struct timer_list timer;
	struct igd_filter_host_k *host;
	unsigned long last;
	__be32 ip;
	u64 total_minitue;
	u64 total_byte[IP_CT_DIR_MAX];
	struct stats_info *day[MONTH];
};

#ifdef IGD_TOPCOUNTER_ENABLE
#define TOP_NUM 10
struct dns_host{
	struct list_head list;
	t_ipaddr ip;
	struct dns_domain * domain;
};

#define DNS_DOMAIN_LEN	32
struct dns_domain{
	struct list_head list;

	atomic_t ref;
	char domain[DNS_DOMAIN_LEN];
};

#define OUT_HOST_HASH_SIZE 128
struct out_host{
	struct list_head list;

	t_ipaddr ip;
	struct dns_domain * domain;

	u64 pkt[IP_CT_DIR_MAX];
	u64 byte[IP_CT_DIR_MAX];
};

struct top_counter{
	char domain[DNS_DOMAIN_LEN]; //include ip address
	u64 byte[IP_CT_DIR_MAX];
	u64 pkt[IP_CT_DIR_MAX];
};

struct host_top_counter{
	t_ipaddr ip;	// 0 -> total
	struct top_counter month[TOP_NUM];
	struct top_counter week[TOP_NUM];
	struct top_counter day[TOP_NUM];
	struct top_counter hour[TOP_NUM];
};

#endif /*IGD_TOPCOUNTER_ENABLE*/

#define IGD_FILTER_HOST_PORT_HASH_SIZE 256
struct igd_filter_host_k {
	atomic_t ref;
	struct list_head all;
	struct list_head list;		//list to hash table
	struct list_head aging_list;
	struct list_head live_list; /*  host is alive, can rcv pkt or arp response */
	struct list_head tb_head; /* token_basket head */
	struct list_head arp_list; /* when mac change, send arp request and update mac */
	struct list_head mac_list;	
	struct list_head conn_list;
	user_group_mask_t ugrp; /*  which grps , host belong to*/
	int conn_count;					//connect number in conn_list
	u32 in_vport;
	unsigned long flag;
	unsigned long jiffies;
	u64 alive_time;
	struct igd_filter_host_key key;
	struct igd_filter_counter counter[IP_CT_DIR_MAX];
	int speed_mx[IP_CT_DIR_MAX]; /* peak speed value */
	struct adv_host adv;
#ifdef IGD_TOPCOUNTER_ENABLE
	struct{
		spinlock_t lock;
		unsigned int index;
		struct out_host * hours[HOUR_MAX][TOP_NUM];
		struct list_head htable[OUT_HOST_HASH_SIZE];//hash table for out host
	}top;
#endif

#ifdef CONFIG_IP_NF_L7_MONITOR
	struct list_head vtl_list;
#endif 
	void *sec_host; /* safe host, used by 360 qq */
};
#define host2speed(host,i) (host->counter[i].speed.byte)
#define host2flow(host,i) (host->counter[i].new.byte)
#define host2rule(host,i) (&host->rule[i])
#endif /* __KERNEL__ */

struct igd_filter_host_key_u {
	int flag;
	unsigned char mac[ETH_ALEN];
	t_ipaddr ipaddr;
};
struct igd_filter_host_u{
	int conn_count;				//current connection number
	int in_vport;
	int web_auth_id;
	unsigned long flag;
	unsigned long alive_time;
	struct igd_filter_host_key_u key;
	struct igd_filter_counter counter[IP_CT_DIR_MAX];
	char qh_360_host; /*0 dosn't install, 1 install*/
};

//1 RULE
//2 base filter
#define IGD_FILTER_MAC_MASK_SRC	0x01
#define IGD_FILTER_MAC_MASK_DST	0x02
struct igd_filter_mac{
	int mask;
	unsigned char src[ETH_ALEN];
	unsigned char dst[ETH_ALEN];
};

#define IGD_FILTER_IP_MASK_SRC	0x01
#define IGD_FILTER_IP_MASK_DST	0x02

struct igd_filter_ip_k {
	int mask;
	struct igd_ip_comm_k src;
	struct igd_ip_dst_k dst;
};

#define IGD_FILTER_PORT_MASK_SRC	0x01
#define IGD_FILTER_PORT_MASK_DST	0x02
struct igd_filter_port{
	int mask;
	struct{
		t_port start;
		t_port end;
	}src,dst;
};

#define IGD_FILTER_INTERFACE_MASK_SRC	0x01
#define IGD_FILTER_INTERFACE_MASK_DST	0x02
struct igd_filter_interface_u {
	uint8_t mask;
	uint8_t in_uiindex;
	uint8_t out_uiindex;
};

#ifdef __KERNEL__
struct igd_filter_interface_k{
	int mask;
	int in_uiindex;
	int out_uiindex;
};
#endif /*__KERNEL__*/

struct igd_filter_time{
	int hour;				//小时
	int min;				//分
};

struct igd_filter_day{
	struct igd_filter_time start;
	struct igd_filter_time end;
};

struct igd_filter_week{
	struct igd_filter_day day[7];
};

//2 基本匹配项
#define IGD_FILTER_RULE_BASE_MASK_MAC		0x01
#define IGD_FILTER_RULE_BASE_MASK_IP		0x02
#define IGD_FILTER_RULE_BASE_MASK_PROTO		0x04
#define IGD_FILTER_RULE_BASE_MASK_PORT		0x08
#define IGD_FILTER_RULE_BASE_MASK_INTERFACE	0x10
#define IGD_FILTER_RULE_BASE_MASK_DNS		0x20
#define IGD_FILTER_RULE_BASE_MASK 0x1F

#ifdef __KERNEL__
struct igd_filter_rule_base_k {
	int mask;
	struct igd_filter_mac mac;				//mac
	struct igd_filter_ip_k ip;	//ip
	struct igd_filter_port port;	//端口
	struct igd_filter_interface_k interface;	//接口
	int proto;							//protocol
};

#endif /*__KERNEL__*/

#ifdef __KERNEL__
#include <linux/version.h>

typedef int (*filter_rule_match)(struct sk_buff *, const struct net_device *, const struct net_device *, void *);

struct dns_h{
	 __be16 id;
	__be16 flag; /* bits 15 :::0 request ,1 response */
	__be16 request;
	__be16 anser;
	__be16 auth;
	__be16 add;
}__packed;
struct dns_data{
	short name;
	short type;
	short cls; /*class*/
	__u32 time; 
	__be16 len;
}__packed;
#define L7_DNS_REQ_BIT htons(1<<15)
#endif /*__KERNEL__*/

struct igd_filter_dns_extra {
	struct dns_tree_head root;
	struct dns_tree tree;
	int dns_mid;
};

struct igd_filter_target_drop{
};

struct igd_filter_target_accept{
};

struct igd_filter_target_mark{
	unsigned long mark;
};
struct igd_filter_target_redirect {
	int type; /*  cname or A */
	int len;
	char dns[32];
};

struct igd_filter_target_replace {
	__be32 org_addr;
	__be32 rep_addr;
};

struct igd_filter_target_limit {
	int connect;									//连接数
	struct{
		unsigned long speed;
		unsigned long share_speed;
		void *tb;
	}tuple[IP_CT_DIR_MAX];
};

struct igd_filter_target_policyroute{
	int if_map;
	unsigned long mark;
	char vpn_name[IGD_NAME_LEN];
	int type;
};

struct igd_filter_target_qos{
	unsigned long mark;
	int class;
};

union igd_filter_target_target{
	struct igd_filter_target_limit limit;
	struct igd_filter_target_drop drop;
	struct igd_filter_target_accept accept;
	struct igd_filter_target_mark mark;
	struct igd_filter_target_policyroute proute;
	struct igd_filter_target_qos qos;
	struct igd_filter_target_redirect redirect;
	struct igd_filter_target_replace replace;
};

#ifdef __KERNEL__
typedef int (*IGD_FILTER_TARGET_FUNC)(struct igd_filter_rule_k *,union igd_filter_target_target *,unsigned int,struct sk_buff *);

struct igd_filter_target_k{
	int type;
	int mark;
	IGD_FILTER_TARGET_FUNC func;
	union igd_filter_target_target target;
};
#endif /*__KERNEL__*/
struct igd_filter_target_u{
	int type;
	int mark;
	union igd_filter_target_target target;
};

struct igd_filter_rule_nlk {
	struct igd_nlk_comm comm;
	struct igd_filter_rule_base_k base;
	struct igd_filter_target_u target;
	struct igd_filter_counter counter; //统计规则匹配中的次数
};


//2 rule
#ifdef __KERNEL__

#define IGD_CONTINUE_BIT IGD_BIT_MX

struct igd_filter_rule_k {
	struct igd_rule_comm_k comm;
	struct igd_filter_rule_base_k base;
	struct igd_filter_target_k target;
	struct igd_filter_counter counter; //统计规则匹配中的次数
	filter_rule_match match;
	struct igd_filter_dns_extra dns;
};

#define igd_rid(r) (r->comm.id)
#define igd_mid(r) (r->comm.mid)
#endif /* __KERNEL__ */

#ifdef __KERNEL__
struct igd_filter_module_k {
	struct igd_rule_head r_h;
	char *name;									//模块名称
	int (*early_match)(struct igd_filter_module_k *,unsigned int, struct sk_buff *, 
			const struct net_device *, const struct net_device *);
	int (*base_match)(unsigned int hooknum, struct sk_buff *skb,
		const struct net_device *, const struct net_device *,
	       	struct igd_filter_connect_k *conn, struct igd_filter_rule_k *rule);
	int (*match)(struct igd_filter_module_k *,unsigned int, struct sk_buff *, 
			const struct net_device *, const struct net_device *);
	void (*destory)(void *data);
};
#endif /* __KERNEL__ */

struct igd_filter_module_u{
	int module;										//模块id
	int prio;
	char name[IGD_FILTER_MODULE_NAME_LEN];			//模块名称
	int enable;										//启用/禁用
	int def;										//默认允许/禁止
	unsigned int def_id;							//default rule id
};

//2 config
struct igd_filter_configs{
	int enable_speedup;
	int enable_dstbind;
};
extern struct igd_filter_configs igd_filter_config;

//2  netlink msg
#define IGD_FILTER_NETLINK_JUMP_FLAG_CLEAR(t) (t)=((t)&0x00ff)
#define IGD_FILTER_NETLINK_JUMP_FLAG_SET(t,v) (t)=(t)|(1<<v)
#define IGD_FILTER_NETLINK_JUMP_FLAG_GET(t,v) (t&(1<<v))

enum IGD_FILTER_NETLINK_JUMP_FLAG{
	IGD_FILTER_NETLINK_JUMP_IP = 8,
	IGD_FILTER_NETLINK_JUMP_PROTO,	
	IGD_FILTER_NETLINK_JUMP_SPORT,
	IGD_FILTER_NETLINK_JUMP_DPORT
};
struct net_sniffer{
	char uiname[IFNAMSIZ];
	int version;
	int wan_mode;
};

#define PPP_RTTABLE 99
#define STATIC_RTTABLE 40

struct igd_ppp_route{
	int flags;
	t_ipaddr dst;
	int dst_len;
};

struct igd_ppp_user{
	struct list_head list;
	char user[IGD_PPP_USR_LEN];
	int pppd_type;
	struct igd_ppp_route route[IGD_PPP_ROUTE_MX];
};

struct igd_ppp_user_nlk{
	char name[32];
	int cmd;
	int pppd_type;
	int route_nr;
};
struct igd_qos_nlk {
	int private_skip; /*  skip qos if ip is private subnet ip  */
	int web_first;
	int movie_first;
};

struct igd_policy_port_info{
	struct list_head	list;
	t_port 				port;
	int 				counter;
	t_proto				proto;
};

struct igd_policy_info{
	struct list_head 	list;
	t_ipaddr			ip;
	int 				check_flag;	
	int					port_counter;
	struct list_head 	port_list;
};

struct policy_dump_info{
	t_ipaddr ip;
	t_port port;
	t_proto proto;
	int counter;
};

struct bandwidth
{
	int ifindex;
	uint32_t up;
};

union pppoe_charge
{
	struct charge_monthly {
		int year;
		int month;
		int day;
	}monthly;
	struct charge_hourly {
		int total_min;
		int used_min;
	}hourly;
	struct charge_flow {
		unsigned long total;
		unsigned long remain;
	}flow;
};

enum pppoe_charge_mode
{
	PPPOE_CHARGE_NONE = 0,
	PPPOE_CHARGE_MONTHLY = 1,
	PPPOE_CHARGE_HOURLY = 2,
	PPPOE_CHARGE_FLOW = 3,
	PPPOE_CHARGE_MAX,
};

struct pppoe_netlink_account {
	struct igd_nlk_comm comm;
	int id;
	int action;
	int charge_mode;
	int year;
	int month;
	int day;
	int total_min;
	int used_min;
	unsigned long  total_flow;
	unsigned long  remain_flow;
	int txt_id;
	char txt_url[32];
};

struct igd_proute_dns_ip {
	struct list_head list;
	struct list_head age;
	unsigned long time; /* create time */
	__be32 ip;
	int rid; /* rule id */
};

enum igd_proxy_arp_entry_type{
	IGD_PROXY_ARP_TYPE_INIT = 0,
	IGD_PROXY_ARP_TYPE_STATIC_NAT,
};
struct igd_proxy_arp_entry {
	struct list_head list;
	struct in_addr ip;
	int type;
	char ifname[IFNAMSIZ];
};
#ifdef __KERNEL__
struct igd_proxy_arp {
	rwlock_t lock;
	struct list_head list;
};
#endif

struct igd_netlink_proxy_arp {
	struct igd_nlk_comm comm;
	struct igd_proxy_arp_entry entry;
};

struct igd_filter_pgroup {
	rwlock_t lock;
	struct list_head head;
	atomic_t rematch;
};

struct igd_pgroup_rule{
	struct list_head list;
	int id;
	atomic_t use;
	unsigned long flags;
	struct igd_filter_target_limit limit;
	struct igd_filter_target_policyroute proute;
};

struct igd_netlink_pgroup_rule {
	struct igd_nlk_comm comm;
	int id;
	unsigned long up_speed;
	unsigned long down_speed;
	unsigned long up_share_speed;
	unsigned long down_share_speed;
	unsigned long conn_max;
	__u32 mark;
};

enum igd_pgroup_flags{
	IGD_PGROUP_USE_BIT = 0,
	IGD_PGROUP_USE = (1 << IPS_EXPECTED_BIT),
};

struct igd_netlink_proxy_dns {
    int enable;
};

#if LINUX_VERSION_CODE <= KERNEL_VERSION(2, 6, 30)
struct tm
{
	int tm_sec;                   /* Seconds.     [0-60] (1 leap second) */
	int tm_min;                   /* Minutes.     [0-59] */
	int tm_hour;                  /* Hours.       [0-23] */
	int tm_mday;                  /* Day.         [1-31] */
	int tm_mon;                   /* Month.       [0-11] */
	int tm_year;                  /* Year - 1900.  */
	int tm_wday;                  /* Day of week. [0-6] */
	int tm_yday;                  /* Days in year.[0-365] */
	int tm_isdst;                 /* DST.         [-1/0/1]*/

	long int tm_gmtoff;           /* we don't care, we count from GMT */
	const char *tm_zone;          /* we don't care, we count from GMT */
};
#endif


#if LINUX_VERSION_CODE < KERNEL_VERSION(2, 6, 27)
#define TOTAL_PACKETS(conntrack) (conntrack->counters[IP_CT_DIR_ORIGINAL].packets + conntrack->counters[IP_CT_DIR_REPLY].packets)
#define TOTAL_BYTES(conntrack) (conntrack->counters[IP_CT_DIR_ORIGINAL].bytes + conntrack->counters[IP_CT_DIR_REPLY].bytes)       
#elif LINUX_VERSION_CODE < KERNEL_VERSION(3,0,0)
#define TOTAL_PACKETS(acct) 	(acct[IP_CT_DIR_ORIGINAL].packets + acct[IP_CT_DIR_REPLY].packets)
#define TOTAL_BYTES(acct) 	(acct[IP_CT_DIR_ORIGINAL].bytes + acct[IP_CT_DIR_REPLY].bytes)
#else
#define TOTAL_PACKETS(acct) 	(atomic64_read(&acct[0].packets) + atomic64_read(&acct[1].packets))
#define TOTAL_BYTES(acct) 	(atomic64_read(&acct[0].bytes) + atomic64_read(&acct[1].bytes))
#endif

/*  only can be used by array copy, dst must array ptr */
#define igd_strcpy(dst,src) do{\
	strncpy(dst, src, sizeof(dst) - 1);\
	dst[sizeof(dst) - 1] = '\0';\
}while(0)

#define DYNAMIC_PLOLICY_LOAD 0

#ifdef __KERNEL__
struct session_info {
	struct list_head list;
	struct list_head iplist;
	struct list_head time_list;
	struct list_head web_list;
	struct list_head ct_list;
	struct list_head padt_list; /*  used when rcv lcp term or padt msg */
	unsigned long flags;
	atomic_t ref;
	unsigned long lcp_echo_jiffies;
	__u32 lcp_echo_failed;
	__u32 padt_send; /*  used when rcv padt msg, send lcp echo to test  ddos*/
	__u32 padt_sucess;
	__be32 remote_ip;
	__be32 local_magic;
	__be32 peer_magic;
	__be16 sid;
	__u8 ident;
	char remote_mac[ETH_ALEN];
	u64 up_bytes;
	u64 down_bytes;
	u64 last_upload; /* used by log*/
	u64 last_download;/* used by log*/
	int charge_mode;
	union pppoe_charge charge;
	int txt_id;
	char txt_url[32];
	int pgid;
};

struct proc_iter_state {
	int index;
};

struct platform_struct {
	int (*dev_event)(struct net_device *dev, unsigned long event);
};

extern struct platform_struct *igd_platform;
extern void platform_init(void);

extern void __session_put(struct session_info *session);
extern struct session_info *igd_find_session_weblist(int sid);
extern void session_list_del_weblist(struct session_info *session);

enum {
	IGD_PPPOE_BULLETIN,
	IGD_PPPOE_PADT,
	IGD_PPPOE_LIVE,
};

#if LINUX_VERSION_CODE > KERNEL_VERSION(3, 0, 0)
#define IP_NAT_MANIP_DST NF_NAT_MANIP_DST
#define IP_NAT_MANIP_SRC NF_NAT_MANIP_SRC
#define IP_NAT_RANGE_MAP_IPS	NF_NAT_RANGE_MAP_IPS
#define IP_NAT_RANGE_PROTO_SPECIFIED NF_NAT_RANGE_PROTO_SPECIFIED
#define nf_nat_range nf_nat_ipv4_range
#define nf_conntrack_register_notifier(a) nf_conntrack_register_notifier(&init_net, a)
#endif

#if LINUX_VERSION_CODE < KERNEL_VERSION(3, 0, 0) && LINUX_VERSION_CODE > KERNEL_VERSION(2,6,27)
#define fib_table_lookup(a,b,c,d) fib_table_lookup(a,b,c)
#endif

#if LINUX_VERSION_CODE < KERNEL_VERSION(2, 6, 31)
#define ip_route_input_noref(a,b,c,d,e) ip_route_input(a,b,c,d,e)
#define skb_dst(skb) (skb->dst)
#define rtable_dev(rt) ((rt)->u.dst.dev)
#define skb_dst_set(s,p)	(s)->dst = (p)
#define skb_dst_drop(s) do{ \
	if ((s)->dst) \
		dst_release((s)->dst); \
		(s)->dst = NULL; \
	}while(0)
extern void dst_release(struct dst_entry *dst);
static inline struct rtable *skb_rtable(const struct sk_buff *skb)
{
	return (struct rtable *)skb_dst(skb);
}
#define rtable_dst(rt) (&(rt)->u.dst)
#else
#define rtable_dev(rt) ((rt)->dst.dev)
#define rtable_dst(rt) (&(rt)->dst)
#endif

#if LINUX_VERSION_CODE >= KERNEL_VERSION(2, 6, 27)
#define IGD_CONNTRACK_LOCK() spin_lock_bh(&nf_conntrack_lock)
#define IGD_CONNTRACK_UNLOCK() spin_unlock_bh(&nf_conntrack_lock)
#else
#define IGD_CONNTRACK_LOCK() write_lock_bh(&nf_conntrack_lock)
#define IGD_CONNTRACK_UNLOCK() write_unlock_bh(&nf_conntrack_lock)
#endif
#if ( LINUX_VERSION_CODE < KERNEL_VERSION(2,6,22) )
#define tcp_hdr(skb) (skb->h.th)
#define tcp_hdrlen(skb) (skb->h.th->doff << 2)
#define skb_transport_offset(skb) (skb->h.raw - skb->data)
#define skb_transport_header(skb) (skb->h.raw)
#define ipv6_hdr(skb) (skb->nh.ipv6h)
#define ip_hdr(skb) (skb->nh.iph)
#define ip_hdrlen(skb) ((skb->nh.iph)->ihl*4)

#define skb_network_offset(skb) (skb->nh.raw - skb->data)
#define skb_network_header(skb) (skb->nh.raw)
#define skb_tail_pointer(skb) skb->tail
#define skb_copy_to_linear_data_offset(skb, offset, from, len) \
                                 memcpy(skb->data + offset, from, len)
#define skb_network_header_len(skb) (skb->h.raw - skb->nh.raw)
#define pci_register_driver pci_module_init
#define skb_mac_header(skb) skb->mac.raw
#define skb_reset_transport_header(skb) (skb->h.raw = skb->data)
#define skb_reset_network_header(skb) (skb->nh.raw = skb->data)
#define skb_reset_mac_header(skb) (skb->mac.raw = skb->data)

#ifdef NETIF_F_MULTI_QUEUE
#ifndef alloc_etherdev_mq
#define alloc_etherdev_mq(_a, _b) alloc_etherdev(_a)
#endif
#endif /* NETIF_F_MULTI_QUEUE */

#ifndef ETH_FCS_LEN
#define ETH_FCS_LEN 4
#endif


#include <linux/if_arp.h>
static inline struct arphdr *arp_hdr(const struct sk_buff *skb)
{
	return (struct arphdr *)skb_network_header(skb);
}

static inline int arp_hdr_len(struct net_device *dev)
{
	/* ARP header, plus 2 device addresses, plus 2 IP addresses. */
	return sizeof(struct arphdr) + (dev->addr_len + sizeof(u32)) * 2;
}

#endif /* < 2.6.22 */

#if ( LINUX_VERSION_CODE < KERNEL_VERSION(2,6,24) )
/* NAPI API changes in 2.6.24 break everything */
struct napi_struct {
	/* used to look up the real NAPI polling routine */
	int (*poll)(struct napi_struct *, int);
	int weight;
};
#ifdef NAPI
extern int __kc_adapter_clean(struct net_device *, int *);
#define netif_rx_complete(netdev, napi) netif_rx_complete(netdev)
#define netif_rx_schedule_prep(netdev, napi) netif_rx_schedule_prep(netdev)
#define netif_rx_schedule(netdev, napi) netif_rx_schedule(netdev)
#define __netif_rx_schedule(netdev, napi) __netif_rx_schedule(netdev)
#define napi_enable(napi) netif_poll_enable(adapter->netdev)
#define napi_disable(napi) netif_poll_disable(adapter->netdev)
#define netif_napi_add(_netdev, _napi, _poll, _weight) \
	do { \
		struct napi_struct *__napi = _napi; \
		_netdev->poll = &(__kc_adapter_clean); \
		_netdev->weight = (_weight); \
		__napi->poll = &(_poll); \
		__napi->weight = (_weight); \
		netif_poll_disable(_netdev); \
	} while (0)
#else /* NAPI */
#define netif_napi_add(_netdev, _napi, _poll, _weight) \
	do { \
		struct napi_struct *__napi = _napi; \
		_netdev->poll = &(_poll); \
		_netdev->weight = (_weight); \
		__napi->poll = &(_poll); \
		__napi->weight = (_weight); \
	} while (0)
#endif /* NAPI */

#define __netif_subqueue_stopped(_a, _b) netif_subqueue_stopped(_a, _b)
#endif /* < 2.6.24 */
extern int igd_filter_fasthpath_rule_match(struct sk_buff *skb, int hooknum, int mid);
void conn_free(struct igd_filter_connect_k * conn);
void host_free(struct igd_filter_host_k * host);
int host_conn_del(struct igd_filter_host_k * host,struct igd_filter_connect_k * conn);
void host_del(struct igd_filter_host_k * host);
extern void aginghost_add(struct igd_filter_host_k * host);
extern int igd_filter_netlink_skb_pop_data(struct nlmsghdr * nlh, int *offset, void * data, int len);
extern int igd_filter_netlink_skb_push_data(struct nlmsghdr * nlh, int *offset, void * data, int len);
extern int igd_filter_netlink_send_end(struct nlmsghdr * nlh);
extern int l7_filter_netlink_send(struct nlmsghdr * nlh, void *index, int index_len, void * data, int len);
extern struct igd_ifindex_map_entry *igd_dev_2_ifmap(const struct net_device *dev);

int igd_filter_init(void);
void igd_filter_fini(void);
#endif /*__KERNEL__*/
int * igd_get_weight(int ifindex0,int ifindex1);
extern int igd_fastpath(int protonum, struct sk_buff **pskb, struct nf_conn *ct, enum ip_conntrack_info ctinfo);
#define IGD_KERNEL_MSG(fmt, arg...) do{ printk("%s[line=%d] "fmt,__FUNCTION__, __LINE__, ##arg);} while(0)
#define IGD_KERNEL_MSG_RATE(fmt, arg...) do{\
       	if (net_ratelimit()) \
		printk("%s[line=%d] "fmt,__FUNCTION__, __LINE__, ##arg);\
	} while(0)

#define MAC_FORMAT_STRING_KERNEL	"%02x:%02x:%02x:%02x:%02x:%02x"
#define MAC_FORMAT_SPLIT(mac) \
	((unsigned char *)mac)[0], \
	((unsigned char *)mac)[1], \
	((unsigned char *)mac)[2], \
	((unsigned char *)mac)[3], \
	((unsigned char *)mac)[4], \
	((unsigned char *)mac)[5]

#define IGD_LIST_EACH_CT_DIR() do {\
	int i;\
	for (i = 0; i < IP_CT_DIR_MAX; i++) {
		
#define IGD_LIST_EACH_CT_DIR_END() }}while(0)

static inline int conn_is_from_wan(struct igd_filter_connect_k *conn)
{
	return conn->tuple[IP_CT_DIR_ORIGINAL].iif->ui_index;
}

static inline int dev_is_lan(const struct net_device *dev)
{
	return test_bit(IGD_DEV_LAN_FLAG, &dev->igd_flags);
}

static inline int conn_is_lan2wan(struct igd_filter_connect_k *conn, enum ip_conntrack_dir ct_dir)
{
	return (conn->tuple[ct_dir].iif->type | conn->tuple[ct_dir].oif->type) 
		== (IGD_IFINDEX_TYPE_LAN | IGD_IFINDEX_TYPE_WAN);
}

static inline int conn_is_iobound(const struct igd_filter_connect_k * conn, enum ip_conntrack_dir ct_dir)
{
	return test_bit(IGD_FILTER_CONNECT_TUPLE_STATUS_OUTSET,&conn->tuple[ct_dir].status) &&
		test_bit(IGD_FILTER_CONNECT_TUPLE_STATUS_INSET,&conn->tuple[ct_dir].status);
}

static inline unsigned long igd_get_proutemark_by_uiindex(int uiindex)
{
	if (likely(uiindex)) 
		return (0x1 << (uiindex - 1));
	return 0;
}
static inline int igd_get_qosmark_by_uiindex(int index)
{
	return (index << 4);
}
static inline int igd_get_uiindex_by_mark(int mark)
{
	int ui_index = mark >> 4;
	if (ui_index < 1 || ui_index > IGD_INTERFACE_WAN_NUM + 1) 
		ui_index = 1;
	return ui_index;
}

extern struct igd_filter_statistics igd_filter_statistics_wan[IGD_INTERFACE_WAN_NUM + 1];
static inline struct igd_filter_statistics *igd_get_statistics(int index)
{
	if (index < 0 || index > IGD_INTERFACE_WAN_NUM) {
		/*printk("%s[%d] BUG.....\n", __FUNCTION__, __LINE__);*/
		return NULL;
	}
	return &igd_filter_statistics_wan[index];
}

extern struct igd_ifindex_map_entry * igd_ifmap_lo;
extern struct igd_ifindex_map_entry * igd_ifmap_lan;
extern struct igd_ifindex_map_entry * igd_ifmap_pppoe;
extern struct igd_ifindex_map_entry * igd_ifmap_pptp;
extern struct igd_ifindex_map_entry * igd_ifmap_l2tp;
extern struct igd_ifindex_map_entry * igd_ifmap_wan1;

#define IGD_FOR_EACH_WAN() do {\
	struct igd_ifindex_map_entry *ifc;\
	int i = 0; \
	for (ifc = igd_ifmap_wan1; i < IGD_INTERFACE_WAN_NUM ; ifc++, i++) {

#define IGD_FOR_EACH_WAN_END() }} while(0)

static inline struct igd_ifindex_map_entry *igd_get_ifmap_by_uiindex(unsigned int index)
{
	switch (index) {
	case 0:
		return igd_ifmap_lan;
	
	default:
		if (index <= IGD_INTERFACE_WAN_NUM) 
			return igd_ifmap_wan1 + index - 1;
		printk("%s: ui_index = %d , invalid\n", __FUNCTION__, index);
		return igd_ifmap_lan;
	}
}
static inline int igd_dev_is_vlan_dev(struct net_device *dev)
{
	if (dev->priv_flags & IFF_802_1Q_VLAN) 
		return 1;
	return 0;
}

static inline unsigned char *igd_chr(unsigned char *src, int len, int key, int end)
{
	while (len > 0 && *src) {
		if (*src == key)
			return src;
		if (*src == end)
			return NULL;
		src++;
		len--;
	}
	return NULL;
}

#ifndef NIPQUAD
#define NIPQUAD(addr) \
	((unsigned char *)&addr)[0], \
	((unsigned char *)&addr)[1], \
	((unsigned char *)&addr)[2], \
	((unsigned char *)&addr)[3]
#endif
#ifndef NIPQUAD_FMT
#define NIPQUAD_FMT "%u.%u.%u.%u"
#endif

#ifndef HIPQUAD
#ifdef __BIGENDIAN
#define HIPQUAD NIPQUAD
#else
#define HIPQUAD(addr) \
	((unsigned char *)&addr)[3], \
	((unsigned char *)&addr)[2], \
	((unsigned char *)&addr)[1], \
	((unsigned char *)&addr)[0]
#endif
#endif
#define NLK_INT_CHECK(a,n) do{if (a < 0) a=n;}while(0)
#define IGD_IP_DEBUG(str, arg...) do{\
	struct iphdr *iph = (struct iphdr *)skb_network_header(skb);\
		printk("%s[%d]::sip=%u.%u.%u.%u,dip=%u.%u.%u.%u,proto=%d.ipid %d " str, __FUNCTION__, __LINE__,\
				NIPQUAD(iph->saddr),NIPQUAD(iph->daddr),iph->protocol, iph->id,##arg); \
	}while(0)

static inline struct iphdr *iphead(struct sk_buff *skb)
{
	if(skb->protocol == htons(ETH_P_IP))
		return (struct iphdr *)skb_network_header(skb);
	else if(skb->protocol == htons(ETH_P_PPP_SES))
		return (struct iphdr *)(skb->data + ETH_HLEN + 8);
	else 
		return NULL;
}

static void inline counter_inc2(struct igd_filter_counter * counter, int len)
{
	counter->new.pkt++;
	counter->new.byte += len;
	return ;
}

/*  return 0 for valid */
static inline int ip_useable(__be32 ip)
{
	if (ntohl(ip) < 0x01000000 || ntohl(ip) >= 0xe0000000 
			|| ((ntohl(ip) & 0xff000000) == 0x7f000000))
		return 0;
	return 1;
}

extern spinlock_t igd_host_lock;
/*  host_lock maybe in bulletin_lock. take care deadlock */
#define HOST_LOCK() spin_lock_bh(&igd_host_lock)
#define HOST_UNLOCK() spin_unlock_bh(&igd_host_lock)

static inline const char *igd_key_type_2_key(int type)
{
	switch (type) {
	case URL_ARGS_PCIP:
		return "pcip";
	case URL_ARGS_PCMAC:
		return "pcmac";
	case URL_ARGS_RGW:
		return "rgw";
	case URL_ARGS_RMAC:
		return "rmac";
	case URL_ARGS_RIP:
		return "rip";
	case URL_ARGS_MAGIC:
		return "magic";
	case URL_ARGS_URL:
		return "url";
	case URL_ARGS_SSID:
		return "ssid";
	default:
		return "err";
	}
}

static inline void igd_key_init(struct igd_key_list *rule, const char *key, int type)
{
	rule->type = type;
	if (!key) 
		key = igd_key_type_2_key(type);
	igd_strcpy(rule->key, key);
	return ;
}

inline static struct igd_filter_host_k *host_hold(struct igd_filter_host_k *h)
{
	if (h) 
		atomic_inc(&h->ref);
	return h;
}

static inline unsigned long timer_diff(unsigned long last)
{
	return jiffies - last;
}

//获取 tcp,udp,icmp四层协议的头
static inline void * igd_get_l4hdr(const struct sk_buff *skb)
{
	struct iphdr *iph = ip_hdr(skb);

	return skb_network_header(skb) + iph->ihl * 4;
}

static inline struct dst_entry * igd_skb_dst_nohold(struct sk_buff *skb, struct dst_entry * dst)
{
	dst->__use++;
	dst->lastuse = jiffies;
	skb_dst_set(skb, dst);
	return dst;
}

#if LINUX_VERSION_CODE <= KERNEL_VERSION(2,6, 22)
static inline void dst_use(struct dst_entry *dst, unsigned long time)
{
	dst_hold(dst);
	dst->__use++;
	dst->lastuse = time;
}
#endif

static inline struct dst_entry * igd_skb_dst_hold(struct sk_buff *skb, struct dst_entry * dst)
{
	dst_use(dst, jiffies);
	skb_dst_set(skb, dst);
	return dst;
}

static inline struct dst_entry * igd_dst_hold(struct dst_entry * dst)
{
	dst_use(dst, jiffies);
	return dst;
}

static inline void igd_rule_init(struct igd_rule_comm_k *r)
{
	memset(r, 0, sizeof(*r));
	INIT_LIST_HEAD(&r->list);
	INIT_LIST_HEAD(&r->task_list);
	atomic_set(&r->ref.ref, 1);
	return ;
}
static inline struct igd_filter_counter *conn2counter(struct igd_filter_connect_k *conn, int dir)
{
	if (conn->tuple[dir].dir_cache == dir) 
		return &conn->tuple[dir].counter;
	else
		return &conn->tuple[!dir].counter;
}

#define buff_fill(buf,fmt,args...) do{ \
			sprintf((buf)+strlen((buf)), fmt, ##args); \
		}while(0)
#define buff_n_fill(buf,seq,max_len,per_len,fmt,args...) do{ \
			int len = strlen(buf);\
			if((len + per_len ) >= (max_len)){\
				if(seq_printf(seq,"%s\n", (buf)))\
					goto error;\
				memset((buf), 0, (max_len));\
				len = 0;\
			}\
			sprintf((buf)+len, fmt, ##args);\
		}while(0)

extern spinlock_t igd_lock;
#define IGD_LOCK()	spin_lock_bh(&igd_lock)
#define IGD_UNLOCK()	spin_unlock_bh(&igd_lock)

//NF_INET_PRE_ROUTING
#define NF_IP_PRI_CONNTRACK_DNS_LIVE_PRE_ROUTING -1000
#define NF_IP_PRI_CONNTRACK_NETBIOS_PRE_ROUTING -900
#define NF_IP_PRI_IGD_DDOS_PRE_ROUTING -800
#define NF_IP_PRI_CONNTRACK_DEFRAG_PRE_ROUTING -400
#define	NF_IP_PRI_RAW_PRE_ROUTING -300
#define	NF_IP_PRI_CONNTRACK_PRE_ROUTING -200
#define	NF_IP_PRI_IGD_CONNTRACK_PRE_ROUTING -195
#define	NF_IP_PRI_IGD_IOBOUND_PRE_ROUTING -190
#define	NF_IP_PRI_IGD_WIFIDOG_PRE_ROUTING -185
#define	NF_IP_PRI_IGD_PROUTE_PRE_ROUTING -180
#define	NF_IP_PRI_IGD_FILTER_DNS_REFORWARD_PRE_ROUTING -175
#define	NF_IP_PRI_IGD_IOBOUNDSETDST_PRE_ROUTING -170
#define	NF_IP_PRI_L7_PRE_ROUTING -165
#define	NF_IP_PRI_IGD_FILTER_PRE_ROUTING -160
#define	NF_IP_PRI_IGD_FASTPATH_PRE_ROUTING -155
#define	NF_IP_PRI_MANGLE_PRE_ROUTING -150
#define	NF_IP_PRI_NAT_DST_PRE_ROUTING -100
#define	NF_IP_PRI_IGD_ROUTE_PRE_ROUTING -90

	//NF_INET_LOCAL_IN
#define NF_IP_PRI_IGD_DDOS_LOCAL_IN -1000
#define	NF_IP_PRI_IGD_COUNTUPDATE_LOCAL_IN -900
#define NF_IP_PRI_MANGLE_LOCAL_IN -150
/*  after mangle */
#define	NF_IP_PRI_IGD_IOBOUND_LOCAL_IN -149
#define	NF_IP_PRI_IGD_FILTER_LOCAL_IN -148
#define	NF_IP_PRI_FILTER_LOCAL_IN	0 
#define	NF_IP_PRI_SECURITY_LOCAL_IN 50
#define	NF_IP_PRI_NAT_SRC_LOCAL_IN 100
#define	NF_IP_PRI_CONNTRACK_CONFIRM_LOCAL_IN 1000
#define	NF_IP_PRI_CONNTRACK_NETBIOS_LOCAL_IN 2000
#define	NF_IP_PRI_IGD_AFTERCONFIRM_LOCAL_IN 3000

	//NF_INET_FORWARD
#define NF_IP_PRI_L7_EMAIL_FORWARD -200
#define	NF_IP_PRI_MANGLE_FORWARD -150
#define	NF_IP_PRI_IGD_IOBOUND_FORWARD -145
#define	NF_IP_PRI_IGD_LAN2LAN_FORWARD -140
#define	NF_IP_PRI_IGD_HOST_FORWARD -135
#define	NF_IP_PRI_IGD_LIMIT_FORWARD -130
#define	NF_IP_PRI_URL_FORWARD -125
#define	NF_IP_PRI_IGD_FILTER_FORWARD -120
#define	NF_IP_PRI_IGD_BULLETIN_FORWARD -115
#define	NF_IP_PRI_IGD_CT_FN_FORWARD -110
#define	NF_IP_PRI_L7_FORWARD -105
#define	NF_IP_PRI_IGD_FASTPATH_FORWARD -100
#define	NF_IP_PRI_FILTER_FORWARD 0
#define	NF_IP_PRI_SECURITY_FORWARD 100

	//NF_INET_LOCAL_OUT
#define	NF_IP_PRI_CONNTRACK_DEFRAG_LOCAL_OUT -400
#define	NF_IP_PRI_IGD_DDOS_LOCAL_OUT -350
#define	NF_IP_PRI_RAW_LOCAL_OUT -300
#define	NF_IP_PRI_CONNTRACK_LOCAL_OUT -200
#define	NF_IP_PRI_IGD_CONNTRACK_LOCAL_OUT -190
#define	NF_IP_PRI_MANGLE_LOCAL_OUT -150
#define	NF_IP_PRI_NAT_DST_LOCAL_OUT -100
#define	NF_IP_PRI_IGD_IOBOUND_LOCAL_OUT -90
#define	NF_IP_PRI_IGD_PROUTE_LOCAL_OUT -80
#define	NF_IP_PRI_IGD_ROUTE_LOCAL_OUT -70
#define	NF_IP_PRI_IGD_LIMIT_LOCAL_OUT -60
#define	NF_IP_PRI_IGD_FILTER_LOCAL_OUT -50
#define	NF_IP_PRI_FILTER_LOCAL_OUT 0
#define	NF_IP_PRI_SECURITY_LOCAL_OUT 225

	//NF_INET_POST_ROUTING
#define	NF_IP_PRI_IGD_IOBOUND_POST_ROUTING -1000
#define	NF_IP_PRI_IGD_COUNTUPDATE_POST_ROUTING -900
#define	NF_IP_PRI_MANGLE_POST_ROUTING -150
#define	NF_IP_PRI_NAT_SRC_POST_ROUTING 100
#define	NF_IP_PRI_IGD_QOS_POST_ROUTING 150
#define	NF_IP_PRI_IGD_FASTPATH_POST_ROUTING 3000 /* orig=200,fix invalid ALG, by yek */
#define	NF_IP_PRI_POST_ROUTING_SNIFFER 250
#define	NF_IP_PRI_CONNTRACK_CONFIRM_POST_ROUTING 1000
#define	NF_IP_PRI_IGD_AFTERCONFIRM_POST_ROUTING 1500
#define	NF_IP_PRI_IGD_DDOS_POST_ROUTING 2000


extern void host_put(struct igd_filter_host_k *h);

extern int ntp_flag ;
extern time_t other_time;
extern int qos_web_level;
extern struct net_device *igd_lan_dev;
extern struct net_device *igd_pppoe_dev;
extern struct session_info *igd_find_session_by_sid(int sid);
extern struct session_info *__igd_find_session_by_sid(int sid);
extern struct session_info *igd_find_session_by_ip(__be32 ip);
extern void __session_put(struct session_info *session);
extern void host_put(struct igd_filter_host_k *h);
extern int igd_rule_add_log(int mid, int type, struct igd_filter_host_k *host, void *data);
extern struct igd_filter_host_k * host_ip2host(t_ipaddr ipaddr);
extern struct igd_filter_host_k * __host_ip2host(t_ipaddr ipaddr);
extern struct igd_filter_host_k * aginghost_ip2host(t_ipaddr ipaddr);
extern struct igd_filter_host_k * ip2host(t_ipaddr ipaddr);
extern struct igd_filter_host_k *__host_mac2host(unsigned char * mac);
extern void igd_wireless_host_del(unsigned char *mac);
extern int igd_neigh_update(struct neighbour *n, __be32 ip, unsigned char *mac);
extern void pppoe_new_host(struct igd_filter_host_k *host);
extern int ip_finish_output(struct sk_buff *skb);
extern int igd_ip_grp_match(__be32 ip, int gid);
extern int igd_ip_base_match(struct igd_ip_comm_k *rule, __be32 ip);
extern struct proc_dir_entry *proc_net_igd;
extern struct igd_ifindex_map_entry igd_filter_ifmap[];
extern int ifnum(void);
extern struct igd_ifindex_map_entry *igd_ifmap_dev2ifmap(const struct net_device * dev);
extern struct igd_ifindex_map_entry *igd_ifmap_uiname2ifmap(const char * uiname);
extern void del_all_forwarding_conn();
extern void igd_filter_localtime (time_t time, struct tm *r);
extern void igd_ct_destory(struct nf_conn *ct);
extern int conn_need_rematch(struct igd_filter_connect_k *conn, struct sk_buff *skb);
extern int host_ip_match(struct igd_ip_comm_k *rule, struct igd_filter_host_k *host);
extern int host_grp_match(struct igd_filter_host_k *host, user_group_mask_t grp);
extern int host_rule_match(struct sk_buff *skb, struct nf_conn *ct,
	       	struct igd_filter_host_k *host, const struct net_device *in, const struct net_device *out);
extern int igd_rule_event(struct task_struct *tsk);
extern int adv_task_event(struct task_struct *tsk);
extern int grp_task_event(struct task_struct *tsk);
extern void task_rule_add(struct igd_rule_comm_k *rule, int mid);
extern int igd_send_broadcast_msg(int gid, void *data, int len);
extern struct igd_filter_module_k * igd_modules[];
struct nf_http_log;
extern void *url_tree_match(struct dns_tree_head *root, struct nf_http_log *log, int *flags);
extern unsigned char *url_match(struct url_txt_k *txt, struct nf_http_log *log);
extern unsigned char *url_match_all(struct url_txt_k *txt, struct nf_http_log *log);
extern void host_ugrp_notifier(unsigned long *rmap, int action);
extern int nlk_rule_dump(struct nlmsghdr *nlh, struct igd_nlk_comm *nlk, int hlen,
	       	void *(*next)(void *last, void *args), void *args, int (*copy)(void *dst, void *src, int len));
typedef int (*nlk_fun)(struct nlmsghdr *);
extern int igd_send_rst(struct sk_buff *old);
extern int ip_local_deliver_finish(struct sk_buff *skb);
extern struct igd_filter_host_k *__host_mac2host(unsigned char *mac);
extern struct igd_filter_host_k *host_mac2host(unsigned char *mac);
extern int igd_dev_addr_valid(const struct net_device *dev, __be32 addr, int id);
extern int check_reverse_route(const struct net_device *in, __be32 ip);
extern void igd_skb_release(struct sk_buff *skb);
extern int igd_txt_k_check(struct igd_txt_k *txt);
static inline struct igd_filter_module_k *igd_filter_get_mod(int index)
{
	return igd_modules[index];
}
#endif /* _IGD_FILTER_H_ */
