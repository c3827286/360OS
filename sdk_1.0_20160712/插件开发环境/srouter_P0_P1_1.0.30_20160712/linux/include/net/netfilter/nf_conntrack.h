/*
 * Connection state tracking for netfilter.  This is separated from,
 * but required by, the (future) NAT layer; it can also be used by an iptables
 * extension.
 *
 * 16 Dec 2003: Yasuyuki Kozakai @USAGI <yasuyuki.kozakai@toshiba.co.jp>
 *	- generalize L3 protocol dependent part.
 *
 * Derived from include/linux/netfiter_ipv4/ip_conntrack.h
 */

#ifndef _NF_CONNTRACK_H
#define _NF_CONNTRACK_H

#include <linux/netfilter/nf_conntrack_common.h>

#ifdef __KERNEL__
#include <linux/bitops.h>
#include <linux/compiler.h>
#include <asm/atomic.h>

#include <linux/netfilter/nf_conntrack_tcp.h>
#include <linux/netfilter/nf_conntrack_dccp.h>
#include <linux/netfilter/nf_conntrack_sctp.h>
#include <linux/netfilter/nf_conntrack_proto_gre.h>
#include <net/netfilter/ipv6/nf_conntrack_icmpv6.h>

#include <net/netfilter/nf_conntrack_tuple.h>

/* per conntrack: protocol private data */
union nf_conntrack_proto {
	/* insert conntrack proto private data here */
	struct nf_ct_dccp dccp;
	struct ip_ct_sctp sctp;
	struct ip_ct_tcp tcp;
	struct nf_ct_gre gre;
};

union nf_conntrack_expect_proto {
	/* insert expect proto private data here */
};

/* Add protocol helper include file here */
#include <linux/netfilter/nf_conntrack_ftp.h>
#include <linux/netfilter/nf_conntrack_pptp.h>
#include <linux/netfilter/nf_conntrack_h323.h>
#include <linux/netfilter/nf_conntrack_sane.h>
#include <linux/netfilter/nf_conntrack_sip.h>

/* per conntrack: application helper private data */
union nf_conntrack_help {
	/* insert conntrack helper private data (master) here */
	struct nf_ct_ftp_master ct_ftp_info;
	struct nf_ct_pptp_master ct_pptp_info;
	struct nf_ct_h323_master ct_h323_info;
	struct nf_ct_sane_master ct_sane_info;
	struct nf_ct_sip_master ct_sip_info;
};

#include <linux/types.h>
#include <linux/skbuff.h>
#include <linux/timer.h>

#ifdef CONFIG_NETFILTER_DEBUG
#define NF_CT_ASSERT(x)		WARN_ON(!(x))
#else
#define NF_CT_ASSERT(x)
#endif

struct nf_conntrack_helper;

/* Must be kept in sync with the classes defined by helpers */
#define NF_CT_MAX_EXPECT_CLASSES	4

/* nf_conn feature for connections that have a helper */
struct nf_conn_help {
	/* Helper. if any */
	struct nf_conntrack_helper *helper;

	union nf_conntrack_help help;

	struct hlist_head expectations;

	/* Current number of expected connections */
	u8 expecting[NF_CT_MAX_EXPECT_CLASSES];
};

#include <net/netfilter/ipv4/nf_conntrack_ipv4.h>
#include <net/netfilter/ipv6/nf_conntrack_ipv6.h>
#ifdef CONFIG_IP_NF_IGD_GATE_KEEPER
#ifdef CONFIG_IP_NF_IGD_ADVERT
struct nf_bulletin {
	short seq_off[IP_CT_DIR_MAX];
	u32 min_seq[IP_CT_DIR_MAX];
	u32 rep_last_seq; /* need record last seq when modify content-length  */
	u16 content_len; /*sould < mtu-header.need record offset when modify content-length*/
	void *rule;
	void *data; /* insert js */
	u8 action;
};
#endif
#ifdef CONFIG_IP_NF_MATCH_L7
enum l7_conn_bit{
	L7_CONN_EMAIL_MONITOR,
	L7_CONN_ADDED,
	L7_CONN_GID,
	L7_CONN_CONFIRM,
	L7_CONN_QOS,
	L7_CONN_MID_APPID,/*  set mid and appid yet? */
	L7_CONN_MONITOR_CONFIRM,
};
union l7_conntrack_data{
	struct {
		int org_off;
		int rep_off;/* if need auth, rep_off saved the send pkt len */
		u32 seq[IP_CT_DIR_MAX];/* cpu order */
		u8 gid;
	}email;
	struct {
		__be16 version;
		__be16 cmd;
		u32 qq_number;
	}qq;
};
struct l7_conntrack_info {
	unsigned long flags; /*  see l7_conn_bit */
	struct list_head list; /*  add to list which application it's belongs to */
	u8 mid;
	u8 appid;
	u8 gid; /*  used by l7 app, such as qq  */
	u8 action;	
	u32 status;		
	union l7_conntrack_data data;
};
#endif
#define HTTP_URL_LEN 64
#define HTTP_URI_LEN 128
#define HTTP_COOKIE_LEN 128
#define HTTP_UA_LEN 64
struct nf_http_log {
	atomic_t ref;
	char suffix[16];
	char host[HTTP_URL_LEN];
	char uri[HTTP_URI_LEN];
	char refer[64];
	char cookie[HTTP_COOKIE_LEN];
	char ua[HTTP_UA_LEN];
	uint16_t host_len;
	uint16_t uri_len;
	uint16_t refer_len;
	uint16_t ua_len;
	uint16_t ck_len; /*  cookie len*/
	uint8_t suffix_len;
};

typedef int (*ctfn)(struct sk_buff *skb, struct nf_conn *ct, const struct net_device *in, const struct net_device *out);

struct igd_conn_data {
	unsigned long igd_flags; /*  used by fastpath to indentify which rule already matched */
	unsigned long igd_secflags;
	void *napt;/* used by fastpath */
	struct list_head session_list;
	struct igd_filter_connect_k *conn;
	void *s_connect; /*  ddos connect */
	struct nf_http_log *url;
	ctfn pktfn[IP_CT_DIR_MAX];
	void *dns; /* used by dns */
	void *dns_rule;
	u32 vport[IP_CT_DIR_MAX];
	u16 sid[IP_CT_DIR_MAX];
	u8 qos_level;
	u8 proute_mark;
};
#define ct_igd(ct) (&(ct)->nc_conn)
#define ct_igdflag(ct) (&(ct_igd(ct)->igd_flags)) 
#define ct_secflag(ct) (&(ct_igd(ct)->igd_secflags))
#define ct_url(ct) (ct_igd(ct)->url)
#define ct_sessionlist(ct) (&(ct_igd(ct)->session_list))
#define ct_qoslevel(ct) (ct_igd(ct)->qos_level)
#define ct_conn(ct) (ct_igd(ct)->conn)
#define ct_pktfn(ct) ct_igd(ct)->pktfn
#define ct_proutemark(ct) (ct_igd(ct)->proute_mark)
#define ct_napt(ct) (ct_igd(ct)->napt)
#define ct_dnsrule(ct) (ct_igd(ct)->dns_rule)
#define ct_dns(ct) (ct_igd(ct)->dns)
#define ct_ddosconn(ct) (ct_igd(ct)->s_connect)
#define ct_vport(ct) ct_igd(ct)->vport
#define ct_sid(ct) ct_igd(ct)->sid
#endif

struct nf_conn {
	/* Usage count in here is 1 for hash table/destruct timer, 1 per skb,
           plus 1 for any connection(s) we are `master' for */
	struct nf_conntrack ct_general;

	spinlock_t lock;

	/* XXX should I move this to the tail ? - Y.K */
	/* These are my tuples; original and reply */
	struct nf_conntrack_tuple_hash tuplehash[IP_CT_DIR_MAX];

	/* Have we seen traffic both ways yet? (bitset) */
	unsigned long status;

	/* If we were expected by an expectation, this will be it */
	struct nf_conn *master;

	/* Timer function; drops refcnt when it goes off. */
	struct timer_list timeout;
#ifdef CONFIG_IP_NF_IGD_GATE_KEEPER
#ifdef CONFIG_IP_NF_NETSNIFFER
	u_int32_t offset;
	u_int32_t ack_need;
	u_int32_t ack_drop;
	u_int32_t base_offset;
	u_int16_t mss;
	u_int16_t idoffset;
	u_int8_t ui_index;
	u_int8_t flag;
#endif
#endif
#if defined(CONFIG_NF_CONNTRACK_MARK)
	u_int32_t mark;
#endif

#ifdef CONFIG_NF_CONNTRACK_SECMARK
	u_int32_t secmark;
#endif

#if defined(CONFIG_NETFILTER_XT_MATCH_LAYER7) || \
    defined(CONFIG_NETFILTER_XT_MATCH_LAYER7_MODULE)
	struct {
		/*
		 * e.g. "http". NULL before decision. "unknown" after decision
		 * if no match.
		 */
		char *app_proto;
		/*
		 * application layer data so far. NULL after match decision.
		 */
		char *app_data;
		unsigned int app_data_len;
	} layer7;
#endif
#ifdef CONFIG_IP_NF_IGD_GATE_KEEPER
	struct igd_conn_data nc_conn;
#ifdef CONFIG_IP_NF_MATCH_L7
	struct l7_conntrack_info l7;
#endif
#ifdef CONFIG_IP_NF_IGD_ADVERT
	struct nf_bulletin bulletin;
#endif
#endif

	/* Storage reserved for other modules: */
	union nf_conntrack_proto proto;

	/* Extensions */
	struct nf_ct_ext *ext;
#ifdef CONFIG_NET_NS
	struct net *ct_net;
#endif
};

static inline struct nf_conn *
nf_ct_tuplehash_to_ctrack(const struct nf_conntrack_tuple_hash *hash)
{
	return container_of(hash, struct nf_conn,
			    tuplehash[hash->tuple.dst.dir]);
}

static inline u_int16_t nf_ct_l3num(const struct nf_conn *ct)
{
	return ct->tuplehash[IP_CT_DIR_ORIGINAL].tuple.src.l3num;
}

static inline u_int8_t nf_ct_protonum(const struct nf_conn *ct)
{
	return ct->tuplehash[IP_CT_DIR_ORIGINAL].tuple.dst.protonum;
}

#define nf_ct_tuple(ct, dir) (&(ct)->tuplehash[dir].tuple)

/* get master conntrack via master expectation */
#define master_ct(conntr) (conntr->master)

extern struct net init_net;

static inline struct net *nf_ct_net(const struct nf_conn *ct)
{
	return read_pnet(&ct->ct_net);
}

/* Alter reply tuple (maybe alter helper). */
extern void
nf_conntrack_alter_reply(struct nf_conn *ct,
			 const struct nf_conntrack_tuple *newreply);

/* Is this tuple taken? (ignoring any belonging to the given
   conntrack). */
extern int
nf_conntrack_tuple_taken(const struct nf_conntrack_tuple *tuple,
			 const struct nf_conn *ignored_conntrack);

/* Return conntrack_info and tuple hash for given skb. */
static inline struct nf_conn *
nf_ct_get(const struct sk_buff *skb, enum ip_conntrack_info *ctinfo)
{
	*ctinfo = skb->nfctinfo;
	return (struct nf_conn *)skb->nfct;
}

/* decrement reference count on a conntrack */
static inline void nf_ct_put(struct nf_conn *ct)
{
	NF_CT_ASSERT(ct);
	nf_conntrack_put(&ct->ct_general);
}

/* Protocol module loading */
extern int nf_ct_l3proto_try_module_get(unsigned short l3proto);
extern void nf_ct_l3proto_module_put(unsigned short l3proto);

/*
 * Allocate a hashtable of hlist_head (if nulls == 0),
 * or hlist_nulls_head (if nulls == 1)
 */
extern void *nf_ct_alloc_hashtable(unsigned int *sizep, int *vmalloced, int nulls);

extern void nf_ct_free_hashtable(void *hash, int vmalloced, unsigned int size);

extern struct nf_conntrack_tuple_hash *
__nf_conntrack_find(struct net *net, u16 zone,
		    const struct nf_conntrack_tuple *tuple);

extern void nf_conntrack_hash_insert(struct nf_conn *ct);
extern void nf_ct_delete_from_lists(struct nf_conn *ct);
extern void nf_ct_insert_dying_list(struct nf_conn *ct);

extern void nf_conntrack_flush_report(struct net *net, u32 pid, int report);

extern bool nf_ct_get_tuplepr(const struct sk_buff *skb,
			      unsigned int nhoff, u_int16_t l3num,
			      struct nf_conntrack_tuple *tuple);
extern bool nf_ct_invert_tuplepr(struct nf_conntrack_tuple *inverse,
				 const struct nf_conntrack_tuple *orig);

extern void __nf_ct_refresh_acct(struct nf_conn *ct,
				 enum ip_conntrack_info ctinfo,
				 const struct sk_buff *skb,
				 unsigned long extra_jiffies,
				 int do_acct);

/* Refresh conntrack for this many jiffies and do accounting */
static inline void nf_ct_refresh_acct(struct nf_conn *ct,
				      enum ip_conntrack_info ctinfo,
				      const struct sk_buff *skb,
				      unsigned long extra_jiffies)
{
	__nf_ct_refresh_acct(ct, ctinfo, skb, extra_jiffies, 1);
}

/* Refresh conntrack for this many jiffies */
static inline void nf_ct_refresh(struct nf_conn *ct,
				 const struct sk_buff *skb,
				 unsigned long extra_jiffies)
{
	__nf_ct_refresh_acct(ct, 0, skb, extra_jiffies, 0);
}

extern bool __nf_ct_kill_acct(struct nf_conn *ct,
			      enum ip_conntrack_info ctinfo,
			      const struct sk_buff *skb,
			      int do_acct);

/* kill conntrack and do accounting */
static inline bool nf_ct_kill_acct(struct nf_conn *ct,
				   enum ip_conntrack_info ctinfo,
				   const struct sk_buff *skb)
{
	return __nf_ct_kill_acct(ct, ctinfo, skb, 1);
}

/* kill conntrack without accounting */
static inline bool nf_ct_kill(struct nf_conn *ct)
{
	return __nf_ct_kill_acct(ct, 0, NULL, 0);
}

/* These are for NAT.  Icky. */
extern s16 (*nf_ct_nat_offset)(const struct nf_conn *ct,
			       enum ip_conntrack_dir dir,
			       u32 seq);

/* Fake conntrack entry for untracked connections */
DECLARE_PER_CPU(struct nf_conn, nf_conntrack_untracked);
static inline struct nf_conn *nf_ct_untracked_get(void)
{
	return &__raw_get_cpu_var(nf_conntrack_untracked);
}
extern void nf_ct_untracked_status_or(unsigned long bits);

/* Iterate over all conntracks: if iter returns true, it's deleted. */
extern void
nf_ct_iterate_cleanup(struct net *net, int (*iter)(struct nf_conn *i, void *data), void *data);
extern void nf_conntrack_free(struct nf_conn *ct);
extern struct nf_conn *
nf_conntrack_alloc(struct net *net, u16 zone,
		   const struct nf_conntrack_tuple *orig,
		   const struct nf_conntrack_tuple *repl,
		   gfp_t gfp);
#ifdef CONFIG_IP_NF_IGD_GATE_KEEPER
enum {
	IGD_MATCH_IP_BIT,
	IGD_MATCH_LIMIT_BIT,
	IGD_MATCH_QOS_BIT,
	IGD_MATCH_DNS_BIT,
	IGD_MATCH_URL_BIT,
	IGD_MATCH_DEL_BIT,
	IGD_MATCH_360_BIT,
#ifdef CONFIG_IP_NF_IGD_ADVERT
	IGD_MATCH_BULLETIIN_BIT,
#endif
#ifdef CONFIG_IP_NF_MATCH_L7
	IGD_MATCH_L7_RULE,
#endif
	IGD_MATCH_URL_BW_BIT,
	IGD_MATCH_MAX_BIT,
	MATCH_FLAGS_MASK = (0x1 << IGD_MATCH_MAX_BIT) - 1,
};
enum {
	QOS_TYPE_NONE = 0,
	QOS_TYPE_HOST,
	QOS_TYPE_CONN,
	QOS_TYPE_USER,
	QOS_TYPE_KERNEL,
};
/*  igd_secflags */
enum {
	IGD_NF_DNS_BIT,
	IGD_ADVERT_BIT,
	IGD_ADVERT_DONE_BIT,
	IGD_HTTP_CHUNK_BIT,
	IGD_ADJUST_SEQ_BIT,
	IGD_BULLETIN_CONFIRM_BIT,
	IGD_HTTP_CONFIRM_BIT, /* set when http rcv replay pkt */
	IGD_HTTP_360_BIT,
	IGD_QOS_P2P_BIT,
	IGD_NF_360_REQ_BIT,
};


static inline int nf_ct_set_match_flags(int bit, struct nf_conn *ct)
{
	return test_and_set_bit(bit, ct_igdflag(ct));
}

static inline int nf_ct_unset_match_flags(int bit, struct nf_conn *ct)
{
	return test_and_clear_bit(bit, ct_igdflag(ct));
}

static inline int nf_ct_test_match_flags(int bit, struct nf_conn *ct)
{
	return test_bit(bit, ct_igdflag(ct));
}

static inline int nf_ct_is_null(struct sk_buff *skb)
{
	if (skb->nfct)
		return 0;
	return 1;
}
static inline int conn_test_match(int bit, struct sk_buff *skb)
{
	struct nf_conn *ct = (struct nf_conn *)skb->nfct;
	if (!ct)
		return 0;
	return test_bit(bit, ct_igdflag(ct));
}

static inline void conn_set_match(int bit, struct sk_buff *skb)
{
	struct nf_conn *ct = (struct nf_conn *)skb->nfct;
	if (!ct)
		return;
	set_bit(bit, ct_igdflag(ct));
	return ;
}
static inline void conn_unset_match(int bit, struct sk_buff *skb)
{
	struct nf_conn *ct = (struct nf_conn *)skb->nfct;
	if (!ct)
		return;
	clear_bit(bit, ct_igdflag(ct));
	return ;
}
static inline int skb_is_matched(int bit, struct sk_buff *skb)
{
	struct nf_conn *ct = (struct nf_conn *)skb->nfct;
	if (!ct || test_bit(bit, ct_igdflag(ct)))
		return 1;
	return 0;
}

static inline int nf_ct_can_fastpath(struct nf_conn *conn)
{
	return (*ct_igdflag(conn) & MATCH_FLAGS_MASK) == MATCH_FLAGS_MASK;
}

static inline void nf_ct_match_flags_init(struct nf_conn *conn)
{
	*ct_igdflag(conn) = 0;
	nf_ct_set_match_flags(IGD_MATCH_URL_BIT, conn);
	nf_ct_set_match_flags(IGD_MATCH_DEL_BIT, conn);
	nf_ct_set_match_flags(IGD_MATCH_360_BIT, conn);
	return ;
}

static inline void nf_ct_match_flags_reinit(struct nf_conn *conn)
{
	*ct_igdflag(conn) |= (1<<IGD_MATCH_URL_BIT) | (1<<IGD_MATCH_360_BIT);
	*ct_igdflag(conn) &= (1<<IGD_MATCH_URL_BIT) | (1<<IGD_MATCH_360_BIT) | (1<<IGD_MATCH_DEL_BIT);
}
static inline int nf_ct_is_http(struct nf_conn *conn)
{
	return test_bit(IPS_NET_HTTP_BIT, &conn->status);
}

static inline struct nf_http_log *skb_get_http_log(const struct sk_buff *skb)
{
	struct nf_conn *ct = (struct nf_conn *)skb->nfct;
	if (ct && ct_url(ct)) 
		return ct_url(ct);
	return NULL;
}
static inline void nf_http_log_get(struct nf_http_log *log)
{
	if (log)
		atomic_inc(&log->ref);
	return ;
}

static inline void nf_http_log_put(struct nf_http_log *log)
{
	if (!log)
		return ;
	if (atomic_dec_and_test(&log->ref))
		kfree(log);
}
#ifdef CONFIG_IP_NF_MATCH_L7
static inline int nf_ct_is_l7_confirmed(struct nf_conn *ct)
{
	return test_bit(L7_CONN_CONFIRM, &ct->l7.flags);
}
static inline int nf_ct_is_l7_mid_appid(struct nf_conn *ct)
{
	return test_bit(L7_CONN_MID_APPID, &ct->l7.flags);
}
#endif
static inline int nf_ct_is_replyed(struct nf_conn *ct)
{
	return test_bit(IPS_SEEN_REPLY_BIT, &ct->status);
}

#endif

static inline int nf_ct_is_template(const struct nf_conn *ct)
{
	return test_bit(IPS_TEMPLATE_BIT, &ct->status);
}

/* It's confirmed if it is, or has been in the hash table. */
static inline int nf_ct_is_confirmed(struct nf_conn *ct)
{
	return test_bit(IPS_CONFIRMED_BIT, &ct->status);
}

static inline int nf_ct_is_dying(struct nf_conn *ct)
{
	return test_bit(IPS_DYING_BIT, &ct->status);
}

static inline int nf_ct_is_untracked(const struct nf_conn *ct)
{
	return test_bit(IPS_UNTRACKED_BIT, &ct->status);
}

extern int nf_conntrack_set_hashsize(const char *val, struct kernel_param *kp);
extern unsigned int nf_conntrack_htable_size;
extern unsigned int nf_conntrack_max;

#define NF_CT_STAT_INC(net, count)	\
	__this_cpu_inc((net)->ct.stat->count)
#define NF_CT_STAT_INC_ATOMIC(net, count)		\
do {							\
	local_bh_disable();				\
	__this_cpu_inc((net)->ct.stat->count);		\
	local_bh_enable();				\
} while (0)

#define MODULE_ALIAS_NFCT_HELPER(helper) \
        MODULE_ALIAS("nfct-helper-" helper)

#endif /* __KERNEL__ */
#endif /* _NF_CONNTRACK_H */
