#ifndef _IGD_FILTER_TYPES_H_
#define _IGD_FILTER_TYPES_H_
#include <linux/in.h>
#include <linux/netfilter_ipv4/igd_filter/igd_diff.h>
#include <linux/netfilter_ipv4/igd_filter/product.h>
#include <linux/netfilter_ipv4/igd_filter/nc_types.h>

typedef unsigned long user_group_mask_t[BITS_TO_LONGS(UGRP_MX)];
typedef unsigned long time_group_mask_t[BITS_TO_LONGS(TGRP_MX)];
typedef unsigned long url_group_mask_t[BITS_TO_LONGS(URLGRP_MX)];
typedef unsigned long web_auth_mask_t[BITS_TO_LONGS(WEB_AUTH_MX)];
typedef unsigned long pppoe_mask_t[BITS_TO_LONGS(PPPOE_MX)];

enum {
	TXT_TYPE_ALL,
	TXT_TYPE_TXT,
	TXT_TYPE_URL,
	TXT_TYPE_URL_LOCAL,
	TXT_TYPE_MAX,
};

#ifdef __KERNEL__
	typedef u_int32_t t_ipaddr;
	typedef u_int16_t t_port;		//端口
	typedef u_int8_t t_proto;		//协议tcp,udp,icmp
#else
	//typedef u_int8_t t_u8;
	//typedef u_int32_t t_u32;
	//typedef u_int16_t t_u16;

#define PORT_MIN 0
#define PORT_MAX 0xFFFF

#define IP_MIN	0
#define IP_MAX	0xFFFFFFFF

#endif /* __KERNEL__ */

#define IGD_BASE_BIT 0
#define IGD_GID_BIT 1
#define IGD_BASE_SET(mask) ((mask) |= (1 << IGD_BASE_BIT))
#define IGD_GID_SET(mask) ((mask) |= (1 << IGD_GID_BIT))
#define IGD_BASE_IS_SET(mask) (mask & (1 << IGD_BASE_BIT))
#define IGD_GID_IS_SET(mask) (mask & (1 << IGD_GID_BIT))
#define IGD_GID_UNSET(mask) (mask &= ~(1 << IGD_GID_BIT))
#define IGD_BASE_UNSET(mask) (mask &= ~(1 << IGD_BASE_BIT))

#define IGD_IP_TYPE_IPMASK		1	//IP+MASK方式
#define IGD_IP_TYPE_STARTEND		2	//ip段方式(单个主机也包括在内)

enum {
	IGD_ADV_TYPE_NONE = 0,
	IGD_ADV_TYPE_LOGIN,
	IGD_ADV_TYPE_EMERG,
	IGD_ADV_TYPE_MX,
};
enum {
	IGD_CHARGE_NONE = 0,
	IGD_CHARGE_MONTHLY,
	IGD_CHARGE_HOURLY,
	IGD_CHARGE_FLOW,
	IGD_CHARGE_MX,
};
enum {
	IGD_MID_PPPOE_SERVER = 1,
	IGD_MID_L7,
	IGD_MID_LOG,
	IGD_MID_360,
};

struct igd_nlk_comm {
	int key;
	int action;
	int gid;
	int mid;
	int id;
	int obj_nr;
	int obj_len;
	int prio;
	int index;
};

struct igd_nlk_ip {
	int mask;
	user_group_mask_t grp;
	t_ipaddr start;
	t_ipaddr end;
};

struct igd_arp_entry {
	struct list_head list;
	__be32 ip;
	char mac[6];
	struct net_device *dev;
};

struct igd_nlk_host_msg {
	struct igd_nlk_comm comm;
	uint32_t ip;
	unsigned long alive_time;
	uint64_t up_byte_all;
	uint64_t down_byte_all;
	uint64_t up_byte_now;
	uint64_t down_byte_now;
};

struct igd_rule_comm {
	uint8_t flags;
	uint16_t id;
	uint16_t kid; /* kernel rule id */
};

#define IGD_ARP_MAC_HASH_MX 256
#define IGD_NAME_LEN 32
#define IGD_NAME_LEN_64 64

#define IGD_DIE_BIT 0
#define IGD_BIT_MX 1
struct igd_ref {
	atomic_t ref;
	unsigned long flags;
	void (*destory)(void *);
};

struct igd_name_comm_k {
	char name[IGD_NAME_LEN];
	int len;
};

struct igd_name_dns_k {
	char name[IGD_NAME_LEN_64];
	int len;
};

struct ipaddrmsk{
	struct in_addr ip;
	struct in_addr mask;
	int flag;
};
struct igd_ip_comm_k {
	int mask;
	t_ipaddr start;
	t_ipaddr end;
	user_group_mask_t grp;
};

struct igd_port_comm_k {
	int mask;
	int gid;
	t_port start;
	t_port end;
};

struct igd_txt_k {
	int type;
	int txt_id;
	int len;
	char txt[URL_NAME_LEN];
};

struct igd_head {
	struct list_head head; 
	atomic_t cnt;
};

struct igd_head2 {
	struct list_head head; 
	atomic_t cnt;
	spinlock_t lock;
};

#define SET_WIFI_ID(apid, idx) (((apid) << 6) | ((idx) & 0xf))
#define GET_WIFI_ID(id) ((id) & 0xf)
#define GET_APID(id) (((id) >> 6) & 0xf)
#define VPORT_WIRE(vport) ((1 << 30) | ((vport) & 0xf))
/*apid: 0 and 1 valid */
#define VPORT_WIFI(apid, id) ((apid << 28 ) | ((id) & 0xf))
#define VPORT_IS_WIFI(vport) ((vport) & (3 << 28))
#define VPORT_WIRE_ID(vport) (vport & 0xf)
#define VPORT_WIFI_ID(vport) (vport & 0xf)
#define VPORT_APID(vport) ((vport >> 28) & 0xf)

static inline void igd_head_add(struct list_head *list, struct igd_head *head)
{
	list_add(list, &head->head);
	atomic_inc(&head->cnt);
	return ;
}
static inline void igd_head_del(struct list_head *list, struct igd_head *head)
{
	list_del(list);
	atomic_dec(&head->cnt);
	return ;
}

inline static int igd_rule_bit_test(int bit, void *data)
{
	struct igd_ref *ref = data;

	return test_bit(bit, &ref->flags);
}

inline static void igd_rule_bit_set(int bit, void *data)
{
	struct igd_ref *ref = data;

	set_bit(bit, &ref->flags);
	return ;
}

inline static void igd_rule_bit_clear(int bit, void *data)
{
	struct igd_ref *ref = data;

	clear_bit(bit, &ref->flags);
	return ;
}

inline static void igd_die(void *data)
{
	struct igd_ref *ref = data;

	set_bit(IGD_DIE_BIT, &ref->flags);
	return ;
}

inline static int igd_dieing(void *data)
{
	struct igd_ref *ref = data;

	if (!ref)
		return 1;
	return test_bit(IGD_DIE_BIT, &ref->flags);
}

inline static void *igd_hold(void *data)
{
	struct igd_ref *ref = data;

	if (ref)
		atomic_inc(&ref->ref);
	return data;
}

inline static void igd_put(void *data)
{
	struct igd_ref *ref = data;

	if (ref && atomic_dec_and_test(&ref->ref)) {
		if (ref->destory) 
			ref->destory(data);
		kfree(ref);
	}
	return ;
}

struct sk_buff;
extern int igd_send_msg_2_user(pid_t pid, void *data, int len);
extern void igd_send_arp(__be32 ip, int op);
extern int igd_neigh_event(void *ptr);
extern void igd_nf_reset(struct sk_buff *skb);
extern void igd_nf_copy(struct sk_buff *dst, const struct sk_buff *src);

#endif /*_IGD_FILTER_TYPES_H_*/

