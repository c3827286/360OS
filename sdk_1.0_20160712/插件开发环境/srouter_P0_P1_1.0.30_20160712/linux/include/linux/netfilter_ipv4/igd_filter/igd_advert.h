#ifndef __IGD_ADVERT_H__
#define __IGD_ADVERT_H__

typedef unsigned long adv_rule_map[BITS_TO_LONGS(512)];
struct adv_host {
	adv_rule_map skip_rmap;
	u64 magic; /*  magic number */
	void *webh; /* web auth host pointer */
};

#define L7_BULLETIN_IP_MX 512
struct l7_bulletin_ip {
	struct list_head list;
	unsigned long next_time; /* next time adv time*/
	__be32 ip;
	int left;
};

#define L7_BULLETIN_LOG_MX 512
struct l7_bulletin_log {
	struct list_head list;
	__be32 ip;
	time_t time;
	short type;
	short txt_id;
	char data[64];
};

struct l7_bulletin_rule;
typedef int (*adv_fill_fn)(struct l7_bulletin_rule *rule, struct nf_conn *ct, struct sk_buff *skb, unsigned char *out);
typedef int (*bulletin_fn)(struct l7_bulletin_rule *, struct nf_conn *,\
	       	struct sk_buff *, const struct net_device *in, const struct net_device *out);
struct l7_bulletin_target {
	bulletin_fn fn;
	int (*finish)(struct l7_bulletin_rule *rule);
	int (*before)(struct l7_bulletin_rule *, struct igd_filter_host_k *host);/* send msg when return 0, or go confirm*/
	int (*log)(struct l7_bulletin_rule *, __be32 );
	struct igd_array key;
	int islocal;
	int repeat;
	int interval;
	int url_type; /*  url or advertise text */
	int txt_id;
	int data_len; /*  url+data len */
	int add_len;
	char url[IGD_NAME_LEN_64];
	char data[300];
	adv_fill_fn fill_fn;
	void *fill_data;
};

#define ADV_DIE_BIT 0
#define ADV_NEED_CONFIRM_BIT 1

struct l7_bulletin_rule {
	struct igd_rule_comm_k comm;
	struct igd_ip_comm_k src; /* ip from lan */
	struct url_txt_k src_txt;
	user_group_mask_t skip_ugrp; /* for skip ugrp */
	struct l7_bulletin_target target;
	bulletin_fn stop_match;
	bulletin_fn extra_match;
	struct igd_head ip_head;
	int action; /* drop or not */
	int type;
};

struct l7_bulletin_skip {
	int skip_static;
	int skip_pppoe;
	int skip_l2tp;
	int skip_pptp;
	int skip_wire; /*  only work for wifi */
};

struct l7_bulletin {
	spinlock_t lock;
	struct list_head head;
	struct list_head http_rule_head[IP_CT_DIR_MAX];
	struct list_head ip_head;
	struct list_head log_head;
	struct l7_bulletin_skip skip[ADV_MID_MX];
	rule_map rmap;

	int ip_count;
	int log_count ;
};

struct l7_sw_adv_log {
	__u32 ip;
	time_t time;
	short type;
	short txt_id;
	char data[64];
};

#define L7_WEBAUTH_HASH_MAX 128

struct l7_webauth_host {
	struct list_head list;
	struct list_head aging_list;
	struct igd_filter_host_k *host;
	t_ipaddr ip;
	int kid;
	int uid; //user id;
	u64 start ;
	unsigned long last;
	u64 last_second; /*used by log */
	uint32_t idle_cut; //second
};

struct l7_webauth_struct{
	struct timer_list timer;
	struct list_head host[L7_WEBAUTH_HASH_MAX];
	struct list_head age_h;
};

#define HTTP_KEY_MX 64
#define HTTP_MOD_MX 200
#define PKT_MOD_ERR -1
#define PKT_MOD_SUCESS 0
#define PKT_MOD_STOP 1
struct l7_http_pkt_rule;
struct l7_http_pkt_rule_data {
	struct l7_bulletin_rule *rule;
	struct sk_buff *skb;
	struct nf_conn *ct;
	struct tcphdr *tcph;
	unsigned char *content_len;
	unsigned char *org;
	int data_len; /* tcp total data len */
	int len; /* pkt left len */
	int offset;
};
typedef int (*http_pkt_fn)(struct l7_http_pkt_rule *rule, struct l7_http_pkt_rule_data *data);
struct l7_http_pkt_rule {
	struct list_head list;
	http_pkt_fn fn;
	int id;
	int key_len;
	char key[HTTP_KEY_MX];
	char data[HTTP_MOD_MX];
};
#define JS_1 "<script type=\"text/javascript\" src=\"http://"
#define JS_2 "\" charset=\"utf-8\"></script>\n"

extern struct l7_bulletin igd_bulletin;
extern struct l7_webauth_struct igd_webauth;

static inline struct l7_webauth_struct *l7_get_web_auth(void)
{
	return &igd_webauth;
}

static inline struct list_head *l7_get_web_auth_host_head(int index)
{
	return &igd_webauth.host[index];
}

static inline struct l7_bulletin *l7_get_bulletin(void)
{
	return &igd_bulletin;
}

static inline unsigned long *l7_get_bulletin_rmap(void)
{
	return igd_bulletin.rmap;
}

static inline struct list_head *l7_get_http_rule_head(int dir)
{
	return &igd_bulletin.http_rule_head[dir];
}

static inline struct l7_bulletin_skip *l7_get_bulletin_skip(int mid)
{
	return &igd_bulletin.skip[mid];
}

static inline void l7_bulletin_init(void)
{
	struct l7_bulletin *bulletin;
	bulletin = l7_get_bulletin();

	spin_lock_init(&bulletin->lock);
	INIT_LIST_HEAD(&bulletin->head);
	INIT_LIST_HEAD(&bulletin->ip_head);
	INIT_LIST_HEAD(&bulletin->http_rule_head[0]);
	INIT_LIST_HEAD(&bulletin->http_rule_head[1]);
	INIT_LIST_HEAD(&bulletin->log_head);
	return ;
}
static inline void l7_bulletin_reinit(void)
{
	struct l7_bulletin *bulletin;
	bulletin = l7_get_bulletin();

	INIT_LIST_HEAD(&bulletin->head);
	INIT_LIST_HEAD(&bulletin->ip_head);
	return ;
}

static inline void l7_bulletin_lock(void)
{
	spin_lock_bh(&igd_bulletin.lock);
}
static inline void l7_bulletin_unlock(void)
{
	spin_unlock_bh(&igd_bulletin.lock);
}
static inline struct list_head *l7_get_bulletin_head(void)
{
	return &igd_bulletin.head;
}

static inline struct list_head *l7_get_bulletin_log_head(void)
{
	return &igd_bulletin.log_head;
}

#define MOVE_HEAD "HTTP/1.1 302 Moved Temporarily\r\nServer: boa 1.1\r\nDate: S"\
"at, 21 Dec 2009 12:00:00 GMT\r\nConnection: close\r\nCache-Control: no-cache\r\nContent-Type: text/html\r\nLocation: http://"
#define MOVE_TAIL "\r\n\r\n<html><body><br><br></body></html>\r\n"

#define WEB_AUTH_HEAD "HTTP/1.1 511 Network Authentication Required\r\nServer: boa 1.1\r\n"\
	"Date: Thu, 1 May 2014 12:00:00 GMT\r\nConnection: close\r\nCache-Control: no-cache\r\n"\
	"Content-Type: text/html\r\n\r\n<html><head>"\
	"<meta http-equiv=\"refresh\" content=\"0; url=http://"
#define WEB_AUTH_TAIL "\"></head><body><br></body></html>"

extern int igd_netlink_adv(struct nlmsghdr *nlh);
extern int l7_register_content_length_rule(void);
struct l7_netlink_bulletin;
extern int l7_bulletin_action(struct nlmsghdr *nlh, struct l7_netlink_bulletin *nlk);
extern int l7_bulletin_send(struct l7_bulletin_rule *rule, struct nf_conn *ct, struct sk_buff *skb);
extern int l7_url_warn(const struct sk_buff *skb, struct sk_buff *url_skb, struct nf_conn *ct);
extern int l7_web_auth_del_by_ip(__be32 ip);
extern int l7_bulletin_key_fill(struct l7_bulletin_rule *rule, struct igd_key_list *key, struct nf_conn *ct, struct sk_buff *skb);
extern int l7_bulletin_add_dns_rule(struct l7_bulletin_rule *b);
extern int l7_send_synack(struct sk_buff *old, struct sk_buff *skb);

#endif
