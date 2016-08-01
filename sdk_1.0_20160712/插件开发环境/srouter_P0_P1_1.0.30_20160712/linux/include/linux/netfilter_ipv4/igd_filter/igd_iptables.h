#ifndef _IGD_IPTABLES_H_
#define _IGD_IPTABLES_H_
#include <linux/netfilter_ipv4/ip_tables.h>
//2 Iptables netfilter
#define IGD_IPTABLES_NETFILTER	1
#define IGD_IPTABLES_DEBUG_ENABLE 	0

#define IGD_IPTABLES_MANGLE	0
#define IGD_IPTABLES_NAT	0
#define IGD_IPTABLES_FILTER	1


struct igd_iptables_entrys
{
	struct list_head list;
	struct ipt_entry e;	
};

enum IGD_IPTABLES_HOOKS
{
	IGD_IPTABLES_MANGLE_MIN, 				//2 0
	IGD_IPTABLES_MANGLE_PREROUTING,			//2 1
	IGD_IPTABLES_MANGLE_INPUT, 				//2 2
	IGD_IPTABLES_MANGLE_FORWARD,			//2 3
	IGD_IPTABLES_MANGLE_OUTPUT,				//2 4
	IGD_IPTABLES_MANGLE_POSTROUTING,		//2 5
	IGD_IPTABLES_MANGLE_MAX, 				//2 6
	
	IGD_IPTABLES_NAT_MIN, 					//2 7
	IGD_IPTABLES_NAT_PREROUTING,			//2 8
	IGD_IPTABLES_NAT_LOCALIN,			//2 11
	IGD_IPTABLES_NAT_OUTPUT,				//2 9
	IGD_IPTABLES_NAT_POSTROUTING,			//2 10
	IGD_IPTABLES_NAT_MAX, 					//2 11

	IGD_IPTABLES_FILTER_MIN,				//2  12
	IGD_IPTABLES_FILTER_INPUT,				//2 13
	IGD_IPTABLES_FILTER_FORWARD,			//2 14
	IGD_IPTABLES_FILTER_OUTPUT,				//2 15
	IGD_IPTABLES_FILTER_MAX,				//2 16
	
	IGD_IPTABLES_HOOKS_MAX 					//2 17
};

extern int igd_iptables_dev_match(const struct net_device *dev, char *name);

int igd_iptables_add(struct ipt_replace tmp,void* loc_cpu_entry);
int igd_nat_match_table(struct sk_buff *skb,
		const struct net_device *in, const struct net_device *out,
		int (*okfn)(struct sk_buff *),unsigned int hooknum);
int igd_iptables_init(void);

int igd_iptable_nat(int enable);
int igd_iptable_mangle(int enable);
int igd_iptable_filter(int enable);
#endif
