#ifndef NETCORE_FASTPATH_H
#define NETCORE_FASTPATH_H

extern __u32 fp_rematch;
extern int fastpath_process_vlan(struct sk_buff *skb);
extern int fastpath_process_localout(struct sk_buff *skb);
extern int fastpath_confirm (unsigned int hooknum,struct sk_buff *skb);
int print_dug_count_baa(int i,unsigned char *baa_buf);
extern int ip_rcv_test;
extern int ip_rcv_test1;
	/* defined in nf_conntrack_core.c */
int fastpath_before_ct_destroy (struct nf_conntrack *nfct);
struct nf_conn;
extern void nf_ct_del(struct nf_conn *nfct);

int ip_fastpath_output(struct sk_buff *skb);
unsigned int fastpath_get_tcp_timeout (int idx);
unsigned int fastpath_get_udp_timeout(int idx);
void fastpath_close(void);
void fastpath_on(void);
extern int fastpath_output(struct sk_buff *skb, struct net_device *in);
#ifdef CONFIG_NETCORE_FASTPATH
static inline void fp_need_rematch(void)
{
	fp_rematch++;
}
#else
static inline void fp_need_rematch(void) { }
#endif

#endif
