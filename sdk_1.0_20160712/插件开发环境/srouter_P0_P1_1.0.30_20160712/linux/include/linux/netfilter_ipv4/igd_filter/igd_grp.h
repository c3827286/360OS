#ifndef __IGD_GRP__H__
#define __IGD_GRP__H__

struct igd_ip_range {
	t_ipaddr start;
	t_ipaddr end;
};

struct igd_key_list {
	struct list_head list;
	int (*fn)(struct igd_key_list *);
	int type;
	unsigned char key[32];
	unsigned char data[256];
};

union ugrp_data {
	struct igd_ip_range ip;
	char mac[ETH_ALEN];
};

union tgrp_data {
	struct time_type_week week;
	struct time_type_ymd ymd;
	struct time_type_mon mon;
};
	
union igd_grp_data {
	struct igd_ip_range *ip;
	struct igd_key_list *key;
	unsigned char (*mac)[ETH_ALEN];
	struct igd_name_comm_k *name;
	struct dns_tree *dns;
	struct url_tree *url;
	union ugrp_data *ugrp;
	union tgrp_data *tgrp;
	void *data;
};

struct igd_array {
	int nr;
	union igd_grp_data data;
};

struct igd_grp {
	struct igd_rule_comm_k comm;
	char name[IGD_NAME_LEN];
	int nr;
	union igd_grp_data data;
};
#define grp_mid(grp) (((struct igd_grp *)grp)->comm.mid)
#define grp_id(grp) (((struct igd_grp *)grp)->comm.id)
#define grp_prio(grp) (((struct igd_grp *)grp)->comm.prio)

struct dns_grp {
	struct igd_grp dns; /* must be first entry */
	struct dns_tree_head root;
};

#define UGRP_MAC_HASH_MX 64
struct ugrp_mac_h {
	int nr;
	char (*mac)[ETH_ALEN];
};

struct user_grp {
	struct igd_grp ip; /* must be first entry */
	int type;
};

#define IGD_CHECK_IP_GRP_VALID(gid) \
	if ((gid) < 0 || (gid) >= UGRP_MX || !grp_user[gid]){goto error;}

/* notify all notifier in chain the data. */
struct igd_grp_notifier {
    int mid;
    struct igd_grp grp;
    int action;
    grp_map_t idmap;
};

struct igd_grp_nlk;
struct igd_grp_mod {
	grp_map_t rmap;
	int mid;
	int size;
	int grp_nr;
	int mx_nr;
	int obj_len;
	int (*nlk_early_check)(struct igd_grp_nlk *nlk);
	int (*nlk_get_id)(struct igd_grp_mod *m);
	int (*nlk_init)(struct igd_grp_mod *m, void *grp);
	int (*nlk_valid_check)(struct igd_grp_nlk *nlk, void *data, int action);
	int (*nlk_copy)(void *dst, void *src, int len, int index);
	int (*nlk_add_check)(struct igd_grp_nlk *nlk, struct igd_grp_mod *m);
	int (*nlk_add)(void *grp, struct igd_grp_nlk *nlk);
	int (*nlk_msg)(struct igd_grp_mod *m, int id, int action, struct igd_grp *old_grp);
	int (*nlk_dump)(struct nlmsghdr *nlh, void *grp);
	void (*nlk_notifier)(struct igd_grp_mod *m, int action, unsigned long *idmap);
};

extern struct user_grp *grp_user[];
extern struct user_grp *grp_time[];
extern struct dns_grp *grp_url[];
extern struct dns_grp *grp_dns[];
extern spinlock_t grp_lock;

static inline void *__igd_get_grp(int mid, int id)
{
	struct igd_grp *grp = NULL;

	switch (mid) {
	case GRP_USER:
		grp = (void *)grp_user[id];
		break;
	case GRP_URL:
		grp = (void *)grp_url[id];
		break;
	case GRP_DNS:
		grp = (void *)grp_dns[id];
		break;
	case GRP_TIME:
		grp = (void *)grp_time[id];
	default:
		break;
	}
	igd_hold(grp);

	return grp;
}
static inline void *igd_get_grp(int mid, int id)
{
	struct igd_grp *grp = NULL;

	spin_lock_bh(&grp_lock);
	grp = __igd_get_grp(mid, id);
	spin_unlock_bh(&grp_lock);

	return grp;
}

static inline void igd_set_grp(int mid, int id, void *data)
{
	switch (mid) {
	case GRP_USER:
		grp_user[id] = data;
		break;
	case GRP_URL:
		grp_url[id] = data;
		break;
	case GRP_DNS:
		grp_dns[id] = data;
		break;
	case GRP_TIME:
		grp_time[id] = data;

	default:
		break;
	}
		
	return;
}
extern struct igd_grp_mod grp_m[];
static inline struct igd_grp_mod *igd_get_grp_mod(int index)
{
	return &grp_m[index];
}
extern int igd_filter_group_action(struct nlmsghdr * nlh);
extern void igd_grp_init(void);
extern int ugrp_check(user_group_mask_t bitmap);
extern int grp_check(int mid, int id);
extern int ugrp_match_mac(struct user_grp *ugrp, unsigned char *mac);
extern int ugrp_match_ip(struct user_grp *ugrp, uint32_t ip);
extern int ugrp_match(struct user_grp *ugrp, uint32_t ip, unsigned char *mac);

extern int register_grp_notifier(struct notifier_block *nb);
extern int unregister_grp_notifier(struct notifier_block *nb);
extern struct igd_grp * find_grp_by_name(int mid, char *name);
#endif
