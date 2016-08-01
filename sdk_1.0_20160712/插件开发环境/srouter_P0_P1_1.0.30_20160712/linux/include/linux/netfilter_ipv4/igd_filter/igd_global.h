#ifndef __IGD_FILTER__GLOBAL__H__
#define __IGD_FILTER__GLOBAL__H__

#include <linux/netfilter_ipv4/igd_filter/igd_types.h>

enum {
	VPORT_MAIN_AP,
	VPORT_SEC_AP,
	VPORT_AP_3,
	VPORT_AP_4,
	VPORT_WIFI_MX,
};

struct igd_nlk_global {
	struct igd_nlk_comm comm;
};

struct igd_web_info {
	__be32 ip;
	uint16_t port;
	char web[32];
	int len;
};

struct igd_sw_time {
	int tz; /*time zome*/
	time_t other_time;
	time_t tomorrow;
};

struct web_path_entry {
	struct igd_rule_comm_k comm;
	int path_len;
	char path[URL_NAME_LEN];
	char cgi[URL_NAME_LEN];
};

struct login_session{
	struct list_head list;
	unsigned long time;
	unsigned char session[64];
};

struct login_entry_k {
	struct igd_rule_comm_k comm;
	uint32_t addr;
	char user[32];
	char error_count;
	unsigned long first_req_time;
	unsigned long forbid_time;
	struct list_head session_head;
};

struct ifip_k {
	struct igd_rule_comm_k comm;
	struct nc_ifip entry;
};

struct vpn_entry_k {
	struct igd_rule_comm_k comm;
	struct vpn_entry vpn;
};

struct igd_info_mod {
	struct igd_rule_head r_h;
	int tid;
	int size;
	int mx_nr;
	int read_size;
	int dump_size;
	int (*info_add)(struct igd_info_mod *m, struct igd_nlk_global *nlk, void *info, void *data);
	int (*info_mod)(struct igd_info_mod *m, struct igd_nlk_global *nlk, void *info, void *data);
	int (*entry_dump)(void *data, void *src, int len);
	int (*entry_match)(struct igd_info_mod *m, void *entry, void *data);
	int (*entry_replace)(struct nlmsghdr *nlh, struct igd_info_mod *m, void *entry, void *data);
	void (*info_notifier)(struct igd_info_mod *m, int action, void *data);
	int (*info_mod_action)(struct nlmsghdr *nlh, struct igd_info_mod *m, struct igd_nlk_global *nlk, int offset);
};

struct nlk_dump_ops {
	void *(*next)(struct nlk_dump_ops *ops, void *last, struct igd_nlk_comm *nlk);
	int (*copy)(void *dst, void *src, int len);
	void (*index)(struct igd_nlk_comm *nlk, void *data);
	void *data;
};

#define APP_ID_MX 1
#define ARP_HMX 128
struct arp_entry {
	struct igd_ref ref;
	struct list_head list;
	struct list_head iplist;
	__be32 ip;
	unsigned char mac[ETH_ALEN];
};

struct igd_global_data {
	struct list_head host_stats_h;
	struct list_head host_all;
	struct list_head host_live;
	struct nc_if ifc[IF_MX];
	struct igd_web_info web;
	struct igd_wifi wifi;
	struct igd_info_mod info[INFO_MID_MX];
	user_group_mask_t app_acl[APP_ID_MX];
	struct igd_sw_time sw_time;
	struct timer_list timer;
	struct timer_list web_timer;
	int host_stats_cnt;
	int wan_num; /* current active wan_num */
	unsigned long eighth_cnt; /*  HZ / 8 cnt*/
	unsigned long qtr_cnt; /*  HZ/ 4 cnt*/
	pid_t sw_pid; /*  switch pid */
	pid_t boa_pid; /* used for send msg to boa */
	pid_t resource[RESOURCE_MX];
	struct list_head arp_h[ARP_HMX];
	struct list_head arp_iph[ARP_HMX];
	struct list_head host_mach[ARP_HMX];
	int wanid[PORT_NR_MX];
	int ability[ABILITY_MX];
};

extern struct igd_global_data igd_data;
#define IGD_QTR_CNT (igd_data.qtr_cnt)
#define IGD_EGT_CNT (igd_data.eighth_cnt)
#define WEB_IP (igd_data.web.ip)
#define WEB_PORT (igd_data.web.port)
#define WEB_LEN (igd_data.web.len)
#define WEB_STR (igd_data.web.web)
#define SW_PID (igd_data.sw_pid)
#define BOA_PID (igd_data.boa_pid)
#define WAN_NR	(igd_data.wan_num)

static inline struct igd_global_data *igd_get_data(void)
{
	return &igd_data;
}

static inline struct list_head *igd_get_host_head(void)
{
	return &igd_data.host_all;
}
static inline struct list_head *igd_get_host_live_head(void)
{
	return &igd_data.host_live;
}

static inline struct igd_info_mod *igd_get_info_mod(int mid)
{
	return &igd_data.info[mid];
}

static inline unsigned char *get_if_mac(int index)
{
	return igd_data.ifc[index].mac_clone;
}

static inline __be32 get_if_ip(int index)
{
	return igd_data.ifc[index].ip[0].ip.s_addr;
}

static inline pid_t get_resource_pid(int id)
{
	return igd_data.resource[id];
}
static inline void set_resource_pid(int id, pid_t pid)
{
	igd_data.resource[id] = pid;
	return ;
}

static inline int mac_hash(unsigned char *mac)
{
	return (mac[0] + mac[1] + mac[2] + mac[3] + mac[4] + mac[5]) % ARP_HMX;
}
static inline struct list_head *get_arp_head(int index)
{
	return &igd_data.arp_h[index];
}
static inline struct list_head *get_arp_iph(int index)
{
	return &igd_data.arp_iph[index];
}
static inline struct list_head *get_host_mach(int index)
{
	return &igd_data.host_mach[index];
}

extern void igd_global_data_init(void);
extern int igd_filter_global_action(struct nlmsghdr * nlh);
extern void global_task_event(struct task_struct *tsk);
extern int igd_filter_resource_action(struct nlmsghdr * nlh);
extern int igd_arp_event(void *ptr);
extern int register_nlk_fun(pid_t pid, int (*fn)(struct nlmsghdr *nlh));
extern void unregister_nlk_fun(pid_t pid);
static inline int wire_vport2uid(int vport)
{
	return igd_data.wanid[VPORT_WIRE_ID(vport)];
}

#endif

