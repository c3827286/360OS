#ifndef __IGD_RULE_MATCH__H__
#define __IGD_RULE_MATCH__H__

#include <linux/netfilter_ipv4/igd_filter/nc_types.h>

#define IGD_RULE_LOG_MX 512
typedef unsigned long rule_map[BITS_TO_LONGS(RULE_MX)];

union log_data {
	char url[32];
};
struct igd_rule_log_comm {
	int type;
	__be32 ip;
	time_t time;
	int len;
	union log_data data;
};
struct igd_rule_log {
	struct list_head list;
	struct igd_rule_log_comm comm;
};

struct igd_rule_head {
	struct list_head head;
	struct list_head log_head;
	rule_map rmap;
	int mid;
	int rematch;
	int log_count ;
};

struct igd_rule_comm_k {
	struct igd_ref ref; /* must be first entry */
	struct list_head list;
	struct list_head task_list;
	int prio;
	int mid;
	int id; /*rule id , used for del */
};

struct igd_filter_host_k;
typedef int (*igd_match_fn)(struct sk_buff *skb, struct nf_conn *ct, const struct net_device *in,
	       	const struct net_device *out, struct igd_filter_host_k *host, void *data);

struct igd_rule_target {
	igd_match_fn pkt_fn;
};

struct igd_rule_k {
	struct igd_rule_comm_k comm;
	struct igd_ip_comm_k src;
	struct igd_rule_target t;
	char data[];
};
inline static void igd_rule_head_init(struct igd_rule_head *h)
{
	memset(h, 0, sizeof(*h));
	INIT_LIST_HEAD(&h->head);
	INIT_LIST_HEAD(&h->log_head);
	return ;
}

extern void *igd_rule_find_by_id(struct igd_rule_head *head, int mid, int id);
extern int igd_rule_del(struct igd_rule_head *head, int tid, int mid, int id);
extern int igd_rule_del_by_id(struct igd_rule_head *head, int mid, int id);
extern void igd_rule_die(struct igd_rule_comm_k *rule);
extern int igd_rule_add_2_list(struct igd_rule_head *head, void *data);
extern int __igd_rule_add_2_list(struct list_head *head, void *data);
extern int igd_filter_rule_action(struct nlmsghdr * nlh);
extern void igd_rule_task_notify(void);
extern int task_rule_del(int tid, int mid, int id);
extern void rule_mod_init(void);
extern int text_replace_send_tcp(struct sk_buff *skb, unsigned int hook,
		int invert, __be32 tcp_flags, int data_len, const void *data);

#endif
