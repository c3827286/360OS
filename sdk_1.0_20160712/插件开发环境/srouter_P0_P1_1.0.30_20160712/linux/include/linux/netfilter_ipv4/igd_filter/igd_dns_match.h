#ifndef __IGD_DNS_MATCH__
#define __IGD_DNS_MATCH__

struct nf_conn;
struct igd_dns_k;
typedef int (*dns_fn)(struct igd_dns_k *r, struct sk_buff *skb,
       	struct nf_conn *ct, const struct net_device *in, const struct net_device *out);

enum {
	DNS_MID_PROUTE,
	DNS_MID_ACL,
	DNS_MID_QOS,
	DNS_MID_SYS,
	DNS_MID_MX,
	DNS_MID_ERR,
	DNS_MID_REP,
};

enum {
	DNS_SYS_ID_SEC_QQ,
	DNS_SYS_ID_SEC_360,
	DNS_SYS_ID_SEC_BAIDU,
};


#define DNS_INDEX_MX	64
#define TREE_NOT_FREE 0
#define TREE_ROOT 	  1
#define TREE_ALL_MATCH 			1
#define DNS_TREE_URI_WILDCARD_MATCH	2
struct dns_tree_head {
	struct list_head node; /* node */
	unsigned long flags;
	struct dns_tree_head *parent;
	struct dns_tree_head *child[DNS_INDEX_MX];
	void *priv; /* used by url match */
	int cnt;
};

#define DNS_HEAD_BIT 0
#define DNS_TAIL_BIT 1

/* NOTE: change dns_tree must be change url_tree */
/* use ^ for head, use $ for end */
struct dns_tree {
	struct list_head list;
	struct igd_name_dns_k comm;
	unsigned long flags;
	int index;
};

struct url_tree {
	/* dns_tree is base class, these four members must be same as dns_tree
	*/
	struct list_head list;
	struct igd_name_dns_k comm;
	unsigned long flags;
	int index;

	struct igd_name_comm_k uri;
};

struct dns_tree_rule {
	struct dns_tree dns;
	int id;
};

struct dns_tree_res {
	unsigned char *org;
	unsigned char *cur;
	int len;
	#define DNS_TREE_HOST_MATCH	(1<<0)
	int flags;
	int data_len;
	int (*match)(void *s1, void *s2, const int data_len);
	void *data; /* input args */
	void *dst; /* dns_tree if match */
};

struct igd_dns_mod {
	struct list_head age_h;
	struct list_head *ip_head;
	struct timer_list wd;
	dns_fn org_fn;
	dns_fn rep_fn;
	struct dns_tree_head root;
	int dns_ip_cnt;
	int mid;
	int timeout;
	int hash_nr;
};

struct igd_dns_k {
	struct igd_ref ref;
	__be32 org_addr;
	__be32 rep_addr;
	int rid[DNS_MID_MX]; /* set rule id  when mid flags bit set */
};

struct igd_dns_ip {
	struct list_head list;
	struct list_head age_list;
	unsigned long time; /* create time */
	__be32 ip;
	int mid;
	int rid; /* rule id */
};

#define IGD_ISP_DNS_MAX 16
#define IGD_DNS_VALID 0x0
#define IGD_DNS_SYS 0x1
struct isp_dns {
	struct list_head list;
	int isp;
	unsigned long flags; /*  dns can be used or not*/
	__u32 dns;  /*  network bit order */
	__u32 mark; /*  ifc mark */
	int send;   /*  dns send count inc per connection .dns id when it's live check*/
	int rcv;   /* dns rcv count inc per connection.dns udp source port when it's live check*/
	int failed;
	int sucess;
	int prio;
	unsigned long jiffies;
};

struct igd_isp_info {
	struct isp_dns dns[IGD_ISP_DNS_MAX];
	struct list_head head;
	struct list_head bad_head;
	struct list_head ifc; /*  only the active ifc in list */
	struct timer_list dns_timer; /* dns live timer */
	unsigned long ifmap;
	int active_if;
};

struct dns_tree_rule_data {
	int mid;
	struct nf_conn *ct;
};

static inline void dns_tree_root_init(struct dns_tree_head *root)
{
	INIT_LIST_HEAD(&root->node);
	set_bit(TREE_NOT_FREE, &root->flags);
	set_bit(TREE_ROOT, &root->flags);
	return ;
}

extern void igd_dns_init(void);
extern int igd_match_dns_ip(int mid, int rid, __be32 ip);
extern int igd_register_dns_module(int mid, dns_fn org_fn, dns_fn rep_fn, uint32_t hash_nr, uint32_t timeout);
extern int str_2_dns(const unsigned char *str, unsigned char *dns, int dns_len);
extern void dns_2_lower(unsigned char *dns, int dns_len);
extern int igd_dns_getip_rep_fn(struct igd_dns_k *rule, struct sk_buff *skb, struct nf_conn *ct,
					const struct net_device *in, const struct net_device *out);
extern int igd_dns_redirect(struct sk_buff *old, struct nf_conn *ct, __be32 ip);
extern unsigned char *dns_2_str(const unsigned char *dns, unsigned char *dst, int len);
extern void igd_dns_send_confirm(struct nf_conn *ct);
extern int dns_tree_add_root(struct dns_tree_head *root, struct dns_tree *entry);
typedef int (*dns_math_fn)(struct dns_tree *tree, void *data);
extern int dns_filter_match(struct dns_tree_head *root, struct sk_buff *skb, const struct net_device *in,
	       				const struct net_device *out, dns_math_fn fn, void *data);
extern struct dns_tree *dns_group_filter_match(struct dns_tree_head *root, struct sk_buff *skb);
extern void dns_tree_head_free(void *data);
extern int igd_del_dns_ip(int mid, int rid);
extern int dns_filter_match2(struct dns_tree_head *root, int mid, int id, struct sk_buff *skb,
	       			const struct net_device *in, const struct net_device *out);
extern void igd_txt_2_dns(struct igd_txt_k *txt);
extern struct igd_dns_k *igd_dns_add_dns_fn(struct nf_conn *ct, int type, __be32 org_addr, __be32 rep_addr);
extern int igd_syn_dns_ip(int mid, int rid, __be32 ip);
extern int register_dns_rule(int mid, int id, unsigned char *dns);
extern int unregister_dns_rule(int mid, int id);
extern void *text_replace_fnmatch_alg(const unsigned char *data,
		const unsigned int data_len,
		const unsigned char *pattern,
		const unsigned int pattern_len, unsigned int *match_len);
#endif
