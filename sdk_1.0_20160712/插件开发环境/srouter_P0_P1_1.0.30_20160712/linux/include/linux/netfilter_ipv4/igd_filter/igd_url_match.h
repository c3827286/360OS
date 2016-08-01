#ifndef __IGD_URL_MATCH__
#define __IGD_URL_MATCH__

struct igd_url_k {
	struct list_head list;
	struct list_head hash_list;
	char url[32];
	int len;
};
struct igd_url_dot {
	unsigned char *name;
	int len;
};
#define HOST_DOT_MX 6
struct igd_url_result {
	struct igd_url_k *url;
	struct igd_url_dot dot[HOST_DOT_MX];
};

struct url_txt_k {
	int type;
	int txt_id;
	int url_len;
	int uri_len;
	char url[IGD_NAME_LEN];
	char uri[IGD_NAME_LEN];
};

typedef uint32_t (*str_hash_fn)(unsigned char *str, int len);

struct str_hash_head {
	struct list_head all;
	struct list_head age_h;
	str_hash_fn hash_fn;
	int hash_nr;
	int nr;
	struct list_head *head;
	void *prev;
};

struct str_hash_entry {
	struct list_head hash_list;
	char value[32];
	int len;
};


static inline void str_split_url(const char *src, char *url, int url_len, char *uri, int uri_len)
{
	char *tmp = strchr(src, '/');

	if (!tmp) {
		strncpy(url, src, url_len - 1);
		return ;
	}
	if (tmp - src) 
		strncpy(url, src, igd_min(url_len - 1, tmp - src));
	if (*(tmp + 1))
		strncpy(uri, tmp + 1, uri_len - 1);
	return ;
}

extern void igd_domain_init(void);
extern int url_rep_err_fn(struct sk_buff *skb, struct nf_conn *ct, const struct net_device *in, const struct net_device *out);
extern int igd_filter_url_action(struct nlmsghdr * nlh);
extern void url_task_event(struct task_struct *tsk);
extern void igd_txt_2_url(struct url_txt_k *dst, struct igd_txt_k *txt);
extern void *url_tree_match2(struct dns_tree_head *root, unsigned char *dns, char *uri);
extern int igd_fill_url_result(unsigned char *start, struct igd_url_result *r);
extern int str_hash_head_init(struct str_hash_head *h, int hash_nr, str_hash_fn fn);
extern int str_hash_add(struct str_hash_head *h, unsigned char *name);

#endif
