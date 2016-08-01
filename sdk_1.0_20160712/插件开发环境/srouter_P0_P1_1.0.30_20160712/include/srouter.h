#ifndef __SROUTER__IPC__H__
#define __SROUTER__IPC__H__

#include <netinet/in.h>
#include <linux/if_ether.h>
#include <linux/types.h>
#include "igd/igd_types.h"
#include "igd/igd_lib.h"
#include "igd/igd_netlink.h"
#include "nc_netlink.h"
#include "igd/igd_project.h"
#include "cJSON.h"

#ifdef __cplusplus
extern "C" {
#endif

#define NOS_STRUCT_INIT(p)			(*((uint32_t *)(p)) = sizeof(*(p))) //p is point

#ifndef IGD_CONNECT_PPPOE_USER_LEN
#define IGD_CONNECT_PPPOE_USER_LEN 128
#endif
#ifndef IGD_CONNECT_PPPOE_PASS_LEN
#define IGD_CONNECT_PPPOE_PASS_LEN 128
#endif
#ifndef IFNAMSIZ
#define IFNAMSIZ 16
#endif
#ifndef NRET_TRUE
#define NRET_TRUE	0
#endif
#ifndef NRET_FALSE
#define NRET_FALSE	-1
#endif

struct igd_nlk_global {
	struct igd_nlk_comm comm;
};

struct redirect_url {
	uint32_t size_of_struct;
	int interval;
	int times;
	int prio;
	int islocal;
	unsigned long flags[BITS_TO_LONGS(URL_ARGS_MX)];
	char args[256];
};

enum {
	WAN_CONN_TYPE_PPPOE = 1,
	WAN_CONN_TYPE_STATIC,
	WAN_CONN_TYPE_DHCP,
};

struct nos_wan_cfg {
	uint32_t size_of_struct;
	int wanid; /* current support: 1 */
	int connect_type;
	int mtu;
	int nat_mode; /* do nat when !0 */
	char mac[6];
	char user[IGD_CONNECT_PPPOE_USER_LEN]; /*  valid when pppoe */
	char passwd[IGD_CONNECT_PPPOE_PASS_LEN]; /* valid when pppoe */
	char server_name[IGD_CONNECT_PPPOE_USER_LEN];/* valid when pppoe */
	char ac_name[IGD_CONNECT_PPPOE_USER_LEN]; /* valid when pppoe */
	struct in_addr ip; /* valid when static ip */
	struct in_addr mask;/* valid when static ip */
	struct in_addr gw;/* valid when static ip */
	struct in_addr auto_dns[IF_DNS_MX];
	struct in_addr manu_dns[IF_DNS_MX];
};

struct nos_lan_cfg {
	uint32_t size_of_struct;
	unsigned char	mac[6];
	struct in_addr ip;
	struct in_addr mask;
};

extern int register_url_filter(user_group_mask_t gmask, int type, char *url);
extern int register_url_filter_by_url_group(user_group_mask_t gmask, int type, int url_gid);
extern int unregister_url_filter(int id);
extern void unregister_url_filter_all(int type);

extern int register_http_ctrl(user_group_mask_t gmask, int type, char *url_pattern,
	       				char *redir_url, struct redirect_url *data);
extern int register_http_ctrl_by_url_group(user_group_mask_t gmask, int type, int url_gid,
						char *redir_url, struct redirect_url *data);
extern int register_http_ctrl_once(struct in_addr addr, int type, char *url_pattern,
	       				char *redir_url, struct redirect_url *data);
extern int register_http_ctrl_once_by_url_group(struct in_addr addr, int type, int url_gid,
	       				char *redir_url, struct redirect_url *data);
extern int http_ctrl_skip(user_group_mask_t gmask, int id);
extern int http_ctrl_action(struct in_addr addr, int id, int action);
extern int replace_http_ctrl_args(int id, char *url[URL_ARGS_MX]);
extern int unregister_http_ctrl(int id);

extern int register_url_group(char *name, int nr, char (*url)[URL_NAME_LEN]);
extern int replace_url_group(int id, char *name, int nr, char (*url)[URL_NAME_LEN]);
extern int unregister_group(int mid, int id);
extern void unregister_group_all(int mid);
extern int dump_group_all(int mid, struct rule_comm *res);

extern int register_user_group_by_mac(char *name, int nr,unsigned char (*mac)[6]);
extern int replace_user_group_by_mac(int id, char *name, int nr,unsigned char (*mac)[6]);
extern int register_user_group(char *name, int nr, struct ip_range *addr);
extern int replace_user_group(int id, char *name, int nr, struct ip_range *addr);

extern int register_noauth_url(char *url);
extern int get_device_hardware_id (void *hwid);
extern int dump_host_info(struct in_addr addr, struct host_info *info) ;
extern int register_rate_limit(user_group_mask_t gmask, int up_rate, int down_rate, int conn);
extern int unregister_rate_limit(int id);
extern int dump_host_alive(struct host_info *info);
extern int get_wan_config(struct nos_wan_cfg *wan);
extern int set_wan_config(struct nos_wan_cfg *wan);
extern int set_lan_config(struct nos_lan_cfg *lan);
extern int get_lan_config(struct nos_lan_cfg *lan);
extern int get_raminfo(unsigned long *ramtotal, unsigned long *ramfree);
extern unsigned long get_system_uptime(void);
extern int get_config_path(int len,char *cfgpath);
extern int get_tmp_path(int len,char *tmppath);
extern int save_param(void);

struct u_text_replace {
	uint32_t size_of_struct;
	uint16_t type;
	uint16_t flags;
	unsigned char match_len;
	unsigned char replace_len;
	void *match_data;
	void *replace_data;
};

int register_http_filter_group(const char *name, int16_t priority);
int unregister_http_filter_group(uint16_t group_id);
int register_http_filter_replace_rule_by_group(uint16_t group_id, const char *url,
			const struct u_text_replace *original, int o_num,
			const struct u_text_replace *reply, int r_num);
int register_http_filter_reset_rule_by_group(uint16_t group_id, const char *url);
int register_http_filter_drop_rule_by_group(uint16_t group_id, const char *url);
int register_http_filter_whitelist_rule_by_group(uint16_t group_id, const char *url);
int register_http_filter_fake_response_rule_by_group(uint16_t group_id, const char *url, 
			uint16_t status_code, const char *response);

#ifdef __cplusplus
}
#endif

#endif

