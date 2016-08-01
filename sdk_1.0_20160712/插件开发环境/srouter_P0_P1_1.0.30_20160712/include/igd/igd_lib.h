#ifndef __IGD_LIB_H_
#define __IGD_LIB_H_

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <inttypes.h>
#include <errno.h>
#include <stdint.h>
#include <getopt.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <time.h>

#include "igd/igd_buffer_size.h"
#include "igd/igd_project.h"
#include  "igd/igd_types.h"
#include  "igd/igd_types.h"
#include "linux_list.h"
#include "nc_types.h"

#define IGD_BITS_LONG (sizeof(long)*8)
#ifndef BITS_TO_LONGS
#define BITS_TO_LONGS(n) ((n + (sizeof(long)*8) - 1)/ (sizeof(long)* 8))
#endif

typedef unsigned long user_group_mask_t[BITS_TO_LONGS(UGRP_MX)];
typedef unsigned long time_group_mask_t[BITS_TO_LONGS(TGRP_MX)];
typedef unsigned long url_group_mask_t[BITS_TO_LONGS(URLGRP_MX)];
typedef unsigned long web_auth_mask_t[BITS_TO_LONGS(WEB_AUTH_MX)];
typedef unsigned long pppoe_mask_t[BITS_TO_LONGS(PPPOE_MX)];

#ifndef ARRAY_SIZE
#define ARRAY_SIZE(x) (sizeof(x) / sizeof((x)[0]))
#endif

#define TABLE_MAX_NUM 512
#define IGD_NAME_LEN_64 64
#define IGD_NAME_LEN 32
#define L7_NAME_LEN 32
#define IGD_NAME_LEN_DB 64
#define IGD_URL_NAME_LEN_DB  32

//通过标示第几位来取得是否具有该操作的权限
#define IGD_ACTION_ADD_PERM_BIT   0x0
#define IGD_ACTION_MOD_PERM_BIT   0x1
#define IGD_ACTION_DEL_PERM_BIT   0x2
#define IGD_ACTION_DUMP_PERM_BIT  0x3

struct igd_nlk_comm {
	int key;
	int action;
	int gid;
	int mid;
	int id;
	int obj_nr;
	int obj_len;
	int prio;
	int index;
};

union log_data {
	char url[32];
};
struct igd_rule_log_comm {
	int type;
	uint32_t ip;
	time_t time;
	int len;
	union log_data data;
};

enum {
	IGD_MID_PPPOE_SERVER = 1,
	IGD_MID_L7,
	IGD_MID_LOG,
	IGD_MID_360,
};

#define MAC_FORMAT_STRING "%02x-%02x-%02x-%02x-%02x-%02x"
#define MAC_FORMAT_STRING_CAPITAL   "%02X-%02X-%02X-%02X-%02X-%02X"
#define MAC_FORMAT_STRING_KERNEL	"%02x:%02x:%02x:%02x:%02x:%02x"
#define MAC_FORMAT_SPLIT(mac) (mac)[0],(mac)[1],(mac)[2],(mac)[3],(mac)[4],(mac)[5]
#define IGD_USER_MSG(fmt,arg...) do{ console_printf("[%s-%s-%d]" fmt,__FILE__,__FUNCTION__,__LINE__, ##arg);}while(0)
#define IGD_FIND_BUG() IGD_USER_MSG("check you code \n")


struct igd_rule_comm {
	uint8_t flags;
	uint16_t id;
	uint16_t kid; /* kernel rule id */
};

/* used by cgi send msg to switch */
struct cgi_info {
	unsigned long msg_id;
	int rule_id;
	int mid;
	int action;
	unsigned long count;
	unsigned long index;
};

struct igd_rule_notifer {
	struct list_head list;
	int (*notifer)(void *data, int action);
	int prio;
};

struct igd_rule_attribute;
struct igd_rule_ops {
	void (*rule_save)(void);
	void *(*rule_get)(struct igd_rule_attribute *attr, int id);
	void *(*rule_alloc)(struct igd_rule_attribute *attr, int id);
	int (*rule_add_finish)(void *new_rule);
	int (*rule_mod_finish)(void *new_rule);
	void (*rule_del_finish)(struct igd_rule_attribute *attr, void *rule);
	void (*rule_clean_finish)(void);
	int (*rule_del_check)(void *data);
	void (*rule_dump_prepare)(void);
	int (*rule_valid_check)(void *new_rule); /* the rule's value is valid ? */
	int (*rule_mod_check)(void *new_rule, void *old_rule);
	int (*rule_compare)(void *new_rule, void *exist_rule);
	int (*rule_msg)(void *rule, int action); /*  used when rule change, notify other deps */
	int (*rule_notify_kernel)(void *rule, void *mod_rule, int action);
};

struct igd_rule_info{
	unsigned long flags;
	uint32_t mx_nr; /*  rule_size <= 65535 */
	uint32_t rule_size; /*  rule size <= 65535 */
	uint32_t value_check_offset; /* compare rule */
	uint32_t value_check_size;
	uint32_t log_mx_nr;
	uint32_t log_cur_nr;
	uint32_t netlink_id;
	char *base_addr; /*  array base addr */
	char *log_addr;
};

struct igd_rule_attribute {
	struct list_head list;
	struct list_head notifer;
	unsigned long id;
	struct igd_rule_info info;
	struct igd_rule_ops ops;
};


#define IGD_BASE_BIT 0
#define IGD_GID_BIT 1
#define IGD_ALL_BIT 2
#define IGD_BASE_SET(mask) ((mask) |= (1 << IGD_BASE_BIT))
#define IGD_GID_SET(mask) ((mask) |= (1 << IGD_GID_BIT))
#define IGD_ALL_SET(mask) ((mask) |= (1 << IGD_ALL_BIT))
#define IGD_BASE_IS_SET(mask) (mask & (1 << IGD_BASE_BIT))
#define IGD_GID_IS_SET(mask) (mask & (1 << IGD_GID_BIT))
#define IGD_ALL_IS_SET(mask) (mask & (1 << IGD_ALL_BIT))
#define IGD_GID_UNSET(mask) (mask &= ~(1 << IGD_GID_BIT))
#define IGD_BASE_UNSET(mask) (mask &= ~(1 << IGD_BASE_BIT))
#define IGD_ALL_UNSET(mask) (mask &= ~(1 << IGD_ALL_BIT))

#define IGD_IP_TYPE_IPMASK		1	//IP+MASK方式
#define IGD_IP_TYPE_STARTEND		2	//ip段方式(单个主机也包括在内)

struct igd_port_union {
	uint8_t mask;
	uint8_t gid;
	uint16_t start;
	uint16_t end;
};

struct igd_filter_port{
	int mask;
	struct{
		t_port start;
		t_port end;
	}src,dst;
};

struct igd_ip_union {
	uint8_t mask;
	user_group_mask_t grp;
	struct igd_ip_comm2 ip;
};

struct igd_time_union {
	uint8_t mask;
	struct igd_time_comm time;
	time_group_mask_t time_map;
};
struct igd_rule {
	struct igd_rule_comm comm;
	struct igd_ip_union ip;
	struct igd_time_union time;
	uint16_t mask;
	uint8_t enable;
};
struct igd_ip_comm_k {
	int mask;
	uint32_t start;
	uint32_t end;
	user_group_mask_t grp;
};
struct igd_name_comm_k {
	char name[IGD_NAME_LEN];
	int len;
};

struct l7_sw_txt {
	uint8_t type;
	union {
		uint8_t txt_id;
		char url[64];
	}txt;
};

struct igd_txt_k {
	int type;
	int txt_id;
	int len;
	char txt[URL_NAME_LEN];
};

struct adv_html_info {
	char file_url[128];	
	char custom_url[128];
	char title[IGD_NAME_LEN];
	char content[5000];
	char title_key[IGD_NAME_LEN_64];
	char content_key[IGD_NAME_LEN_64];
	unsigned char style_id;
};

struct web_style_info {
	char tmpdir_path[128];
	char custom_url[128];
	char title_key[IGD_NAME_LEN_64];
	char content_key[IGD_NAME_LEN_64];
};

#define L7_ARRAY_NUM(array) (sizeof(array)/sizeof(array[0]))
#define L7_ARRAY_SIZE(array) (sizeof(array))

#define igd_charge_hourly(m) (m)->charge.hourly
#define igd_charge_flow(m)	(m)->charge.flow
#define igd_charge_monthly(m)	(m)->charge.monthly.tm_time

/*  take care, make sure check cgi pppoe account import if you change this*/
union __igd_charge {
	struct charge_monthly {
		struct tm tm_time;
	} monthly;
	struct charge_hourly {
		int32_t total_min;
		int32_t used_min;
	} hourly;
	struct charge_flow {
		long total; /* M */
		long remain; /*  M */
	} flow;
};
struct igd_charge {
	uint8_t type;
	union __igd_charge charge;
};
#define LOG_TIME_MX 3
struct ip_log_data {
	time_t day; /* today time */
	time_t online[LOG_TIME_MX];
	time_t offline[LOG_TIME_MX];
	uint64_t upload;
	uint64_t download;
	uint64_t second;
};

typedef struct {
	char name[100];
	unsigned int   len;
	unsigned long 	 offset;
	char   type;
}txt_type;

struct txt_list{
	struct list_head list;
	int find;
	txt_type txt;
};

struct txt_list_head{
	struct list_head list;
	struct list_head member;
	struct list_head array;/*member contain array */
	char *init_addr; /*  first array addr */
	char *init_addr2; /*  used by child array when load para ,think about this situation when array contain a child_array */
	int (*load_check)(struct txt_list_head*, void *data);
	int (*save_check)(struct txt_list_head*, unsigned long data);  /* if exist, != 0, ignore */
	int (*locate)(struct txt_list_head*, void* data, unsigned long index); /*  use to locate where to space*/
	int (*move)(struct txt_list_head*, void* data); /*  used to move entry to another space */
	void (*para_reinit)(void);
	int version; /* modify by zmb, 2011-01-15-17:39 to support version match*/
	int offset;/* used by child_array */
	int mx_nr;
	int size; /*  entry size */
	char title[100];
};

struct igd_sw_data {
	int no_route;
	int no_param;
	int ntp_time_ok;
	int lightcpd_time_ok;
	char fast_config_flag;
	#ifdef IGD_AUTO_WAN_LAN_DETECT
	char auto_wan_enable;
	int tz;
	#endif
};

#define HAVE_FAST_CONF_VALUE (100)
#define igd_no_param() (sw_data.no_param)
#define igd_fast_conf_flag() (sw_data.fast_config_flag)

extern struct igd_sw_data sw_data;
static inline struct igd_sw_data *igd_get_sw_data(void)
{
	return &sw_data;
}

enum {
	IGD_ADV_TYPE_NONE = 0,
	IGD_ADV_TYPE_LOGIN,
	IGD_ADV_TYPE_EMERG,
	IGD_ADV_TYPE_MX,
};
enum {
	IGD_CHARGE_NONE = 0,
	IGD_CHARGE_MONTHLY,
	IGD_CHARGE_HOURLY,
	IGD_CHARGE_FLOW,
	IGD_CHARGE_MX,
};


enum {
	IGD_CGI_MSG_L7_SW_ADVERT_LIST = 1,
	IGD_CGI_MSG_L7_SW_ADVERT_TXT,
	IGD_CGI_MSG_IP_POOL,
	IGD_CGI_MSG_L7_SW_WEB_AUTH,
	IGD_CGI_MSG_L7_SW_WEB_AUTH_USER,
	IGD_CGI_MSG_HOST_BLACK_LIST,
	IGD_CGI_MSG_HOST_WHITE_LIST,
	IGD_CGI_MSG_IPSEC,
	IGD_CGI_MSG_IPSEC_RSA,
	IGD_CGI_MSG_WAKE_UP,
	IGD_CGI_MSG_L2TPD_USER,
	IGD_CGI_MSG_POLICY_GROUP,
	IGD_CGI_MSG_WEB_USER_PASS,
	IGD_CGI_MSG_QH_360,
	IGD_CGI_MSG_UGRP,
};

extern int param_delay_save_flag;
extern time_t param_delay_save_time;
static inline void igd_param_save_delay_flag_clear(void)
{
	param_delay_save_flag = 0;
	time(&param_delay_save_time);

	return;
}
static inline void igd_param_save_delay_flag_set(void)
{
	param_delay_save_flag = 1;

	return;
}

static inline int igd_test_bit(int nr, unsigned long *bit)
{
	unsigned long mask = 1UL << (nr % IGD_BITS_LONG);
	unsigned long *p = bit + nr / IGD_BITS_LONG;

	return (*p & mask) != 0;
}
static inline int igd_set_bit(int nr, unsigned long *bit)
{
	unsigned long mask = 1UL << (nr % IGD_BITS_LONG);
	unsigned long *p = bit + nr / IGD_BITS_LONG;
	*p |= mask;
	return 0;
}
static inline int igd_clear_bit(int nr, unsigned long *bit)
{
	unsigned long mask = 1UL << (nr % IGD_BITS_LONG);
	unsigned long *p = bit + nr / IGD_BITS_LONG;
	*p &= ~mask;
	return 0;
}
static inline int igd_test_and_set_bit(int nr, unsigned long *bit)
{
	unsigned long mask = 1UL << (nr % IGD_BITS_LONG);
	unsigned long *p = bit + nr / IGD_BITS_LONG;
	unsigned long old = *p;

	*p |= mask;
	return (old & mask) != 0;
}

static inline int igd_test_and_clear_bit(int nr, unsigned long *bit)
{
	unsigned long mask = 1UL << (nr % IGD_BITS_LONG);
	unsigned long *p = bit + nr / IGD_BITS_LONG;
	unsigned long old = *p;

	*p &= ~mask;
	return (old & mask) != 0;
}

/*  all bit is zero */
static inline int igd_bit_is_zero(int nr, unsigned long *bit)
{
	unsigned long *p;
	unsigned long i;

	for (i = 0; i < (nr + IGD_BITS_LONG - 1) / IGD_BITS_LONG; i++) {
		p = bit + i;
		if(*p)
			return 0;
	}
	return 1;
}
static inline int igd_init_bit(int nr, unsigned long *bit)
{
	unsigned long *p;
	unsigned long i;

	for (i = 0; i < (nr + IGD_BITS_LONG - 1) / IGD_BITS_LONG; i++) {
		p = bit + i;
		*p = 0;
	}
	return 0;
}

static inline void igd_array_2_bitmap(int *array, unsigned long *bitmap, int mx_nr)
{
	int j;

	for (j = 0; j < mx_nr; j++) {
		if (array[j])
			igd_set_bit(j, bitmap);
	}
	return ;
}

static inline void igd_bitmap_2_array(unsigned long *bitmap, int *array, int mx_nr)
{
	int i;

	for (i = 0; i < mx_nr; i++) {
		if (igd_test_bit(i, bitmap))
			array[i] = 1;
	}
	return ;
}

/*  only can be used by array copy, dst must array ptr */
#define igd_strcpy(dst,src) do{\
	strncpy(dst, src, sizeof(dst) - 1);\
	dst[sizeof(dst) - 1] = '\0';\
}while(0)

#define ENABLE_TRUE  0
#define ENABLE_FALSE 1

extern char * html_mime_type_text;

#define arg_match(str) !strcasecmp(argv[idx], str)

#ifndef NIPQUAD
#define NIPQUAD(addr) \
	((unsigned char *)&addr)[0], \
	((unsigned char *)&addr)[1], \
	((unsigned char *)&addr)[2], \
	((unsigned char *)&addr)[3]
#endif

#define IGD_LIST_FOR_EACH_ENTRY(tmp,fn,max) do { \
	int i;\
	struct igd_rule_comm *rule;\
	for (i = 0; i < max; i++) {\
		tmp = fn(i);\
		rule = (void *)tmp;\

#define IGD_LIST_FOR_EACH_ACTIVE_ENTRY(tmp,fn,max) do { \
	int i;\
	struct igd_rule_comm *rule;\
	for (i = 0; i < max; i++) {\
		tmp = fn(i);\
		rule = (void *)tmp;\
		if (!rule->flags) \
			continue;\

#define IGD_LIST_FOR_EACH_ENTRY_END() }}while(0)

#define B_2_M(byte) (byte / (1024*1024))
#define B_2_G(byte) (byte / (1024 * 1024 * 1024))
#define G_2_M(g) (g * 1024)
#define M_2_G(m) (m / 1024)
#define M_2_B(m) (m * (1024 * 1024))
#define G_2_B(m) (m * (1024 * 1024 * 1024))
#ifndef MIN
#define MIN(a,b)	((a) < (b) ? (a) : (b))
#endif

#define VPORT_IS_WIFI(vport) ((vport) & (3 << 28))

#define uiname2index(uiname) atoi(&uiname[3]) /* only valid when it's wan */
#define ifc2index(ifc) (atoi(&ifc->uiname[3]))
#define IGD_FD_SET(fd, where) { FD_SET(fd, where); if (fd > max_fd) max_fd = fd; }

#define IGD_SET_CGI_ENV() do{\
		char env[128] = {0};\
		sys_time sw_time;\
		scall_param sw_pa, sw_pb, sw_pc;\
		memset(&sw_time, 0, sizeof(sw_time));\
		client_SwitchCall(IGD_MISC_SYSTIME_DUMP, PRM_POINTER(sw_pa, &sw_time, sizeof(sw_time)),  PRM_VALUE(sw_pb, 0), PRM_VALUE_NULL(sw_pc));\
		sprintf(env,"TZ=GMT%s",sw_time.ntp);\
		putenv(env);\
		tzset();\
	}while(0)

#define IS_MAC_00(m) ((m[0]|m[1]|m[2]|m[3]|m[4]|m[5]) == 0x00)
#define IS_MAC_FF(m) ((m[0]&m[1]&m[2]&m[3]&m[4]&m[5]) == 0xFF)

extern char *ifc_uiname_2_webname(char *name);
extern int ip_mask_set(char *ip,char *mask);
extern char * _parse_ipad(unsigned long * out,char * mask);
extern  int EncryptPWDStr(char *textString);
extern  int IGD_SetCfgStr(const char *cpFileName, const char *cpKeyWord, const char *cpValue);


extern char *mac2str(unsigned char * mac);
extern int str2mac(char *str, unsigned char *mac);
extern int igd_get_flash_value(const char *name,char *use,int use_len);
extern int ip_check_valid(char *ip);
extern int mac_check_valid(char *mac);
extern int console_printf(const char *fmt, ...);
extern int igd_show_bytes(void *data, int len, const char *desc);
extern int boa_logs_printf(const char *fmt, ...);
extern char *parame_file_flag_str;
extern int igd_rule_action(struct cgi_info *info, unsigned long pb, void *pv);
extern struct igd_rule_attribute *igd_get_rule_attribut_by_id(unsigned long id);
extern int igd_register_rule_notifer(int msgid, struct igd_rule_notifer *notifer);
extern int igd_unregister_rule_notifer(struct igd_rule_notifer *notifer);
extern int igd_register_rule_attribute(struct igd_rule_attribute *attr);
extern int igd_unregister_rule_attribute(unsigned long id);
extern int ip_mask_check(uint32_t ip,uint32_t mask);
extern uint32_t str2ip(char *str);
extern char * ip2str(uint32_t ip);
extern char * mac2mac(char* mac);
extern char * mac2str(unsigned char * mac);
extern void mac_add_num(unsigned char *p_mac, int num);
extern uint32_t igd_ip_is_usable(uint32_t ip);
extern uint32_t igd_mask_check(uint32_t mask);
extern char * _parse_ipad(unsigned long * out,char * mask);
extern int ip_mask_set(char *ip,char *mask);
extern void igd_generic_rule_para_init(struct txt_list_head *head);
extern void igd_generic_grp_init(struct list_head *head, void *addr, int mid);
extern int igd_generic_rule_save_check(struct txt_list_head *head, unsigned long index);
extern int igd_generic_save_param(char *name, struct list_head *head);
extern int igd_generic_load_param(char *name, struct list_head *head, void (*fn)(void));
extern uint32_t igd_ip_is_overlap(uint32_t ip_start, uint32_t ip_end, uint32_t old_ip_start, uint32_t old_ip_end);
extern int igd_mac_is_valid(unsigned char *mac);
extern int pppd_ip_is_invalid(uint32_t ip);
extern int mask2bit(uint32_t mask);
extern void igd_ip_union_param_init(struct list_head *head, struct igd_ip_union *ip, int offset);
extern void igd_dst_ip_param_init(struct list_head *head, struct igd_dst_ip *ip, int offset);
extern void igd_time_union_param_init(struct list_head *head, struct igd_time_union *time, int offset);
extern void igd_ip_union_2_kernel(struct igd_ip_union *u, struct igd_ip_comm_k *k);
extern int igd_time_is_on(struct igd_time_union *time, struct tm *time_now);
extern int igd_monthly_check(struct igd_charge *charge, uint32_t offset);
extern int igd_charge_message(struct igd_charge *charge, int adv_type, char *message);
extern int igd_charge_check(struct igd_charge *charge);
extern char *dns_check(const char *in);
extern void local_server_nat_refresh(int proto, unsigned short port, int action);
extern int igd_write_file(char *path, void *value);
extern void igd_param_save_delay(time_t delay, void (*fn)(void));
extern int igd_ip_union_check(struct igd_ip_union *ip);
extern int igd_ip_dst_check(struct igd_dst_ip *dst);
extern void ugrp_2_kernel(user_group_mask_t u, struct igd_ip_comm_k *k);
extern int nlk_dump_from_kernel(void *h, int len, int msgid, void *dst, int nr);
extern int igd_detect_net(int type, int time_out, char *url);
extern int igd_hex_str_2_uc(void *in,int isize,void *out, int osize);
extern int igd_uc_2_hex_str(void *in,int isize,void *out, int osize);

#endif /*__IGD_LIB_H_*/
