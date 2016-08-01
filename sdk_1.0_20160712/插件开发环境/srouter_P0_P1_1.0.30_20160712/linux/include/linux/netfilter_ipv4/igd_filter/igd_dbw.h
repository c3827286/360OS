#ifndef __NETCORETEC_IGD_BANDWIDTH_H__2009_11_18_14_02_34____
#define __NETCORETEC_IGD_BANDWIDTH_H__2009_11_18_14_02_34____

#include <linux/version.h>

//#define IGD_DBW_EXACTITUDE_STATISTICALLY /*是否精确统计*/

#if defined(IGD_DBW_EXACTITUDE_STATISTICALLY)
#define IGD_DBW_STATISTICALLY_PRECISION (HZ)
#else
#define IGD_DBW_STATISTICALLY_PRECISION 10
#endif

#define IGD_DBW_STATIST_INTERVAL	(HZ / IGD_DBW_STATISTICALLY_PRECISION)


#define IGD_DBW_WAN_MAX				2
#define IGD_DBW_OLD_INTERVAL		(300 * HZ)

#define IGD_DBW_TIME_IS_UP			0

#define IGD_DBW_IF_FLAGS_IS_WAN 	0

typedef struct igd_dbw_counter
{
    u32 all_pkts;
    u32 udp_pkts;

    u32 all_bytes;
    u32 udp_bytes;
} igd_dbw_counter_t;

typedef struct igd_dbw_counter_s
{
    spinlock_t lock;
    igd_dbw_counter_t counter;
} igd_dbw_counter_st;

typedef struct igd_dbw_speed_counter_s
{
    rwlock_t rwlock;
    igd_dbw_counter_t interval_counters[IGD_DBW_STATISTICALLY_PRECISION];
    igd_dbw_counter_t speed_counter;
} igd_dbw_speed_counter_st;

static inline
void igd_dbw_init_speed_counter_s(igd_dbw_speed_counter_st * counter)
{
    rwlock_init(&counter->rwlock);
}

typedef struct igd_dbw_statist_counter
{
    /*数据包个数*/
    u64 all_pkts;
    u64 udp_pkts;
    /*流量*/
    u64 all_bytes;
    u64 udp_bytes;
} igd_dbw_statist_counter_t;

typedef struct igd_dbw_statist_counter_s
{
    spinlock_t lock;
    igd_dbw_statist_counter_t counter;
    igd_dbw_counter_t tmp_counter;
} igd_dbw_statist_counter_st;

static inline
void igd_dbw_init_statist_counter_s(igd_dbw_statist_counter_st * counter)
{
    spin_lock_init(&counter->lock);
}

typedef struct igd_dbw_counters
{
    u64 last_jiffies;
    igd_dbw_statist_counter_st statist_counter;
    igd_dbw_speed_counter_st speed_counter;
} igd_dbw_counters_t;

static inline
void igd_dbw_init_counters(igd_dbw_counters_t * counters)
{
    counters->last_jiffies = get_jiffies_64();
    igd_dbw_init_statist_counter_s(&counters->statist_counter);
    igd_dbw_init_speed_counter_s(&counters->speed_counter);
}


typedef struct igd_dbw_flux
{
    igd_dbw_counters_t out;
    igd_dbw_counters_t in;
} igd_dbw_flux_t;

static inline
void igd_dbw_init_flux(igd_dbw_flux_t * flux)
{
    igd_dbw_init_counters(&flux->in);
    igd_dbw_init_counters(&flux->out);
}

#define IGD_DBW_HOST_FLAGS_IS_USING 0
typedef struct igd_dbw_host
{
    /******************************
    	*连接到unuse或者hash链表
    	*******************************/
    struct list_head link;
    igd_dbw_flux_t flux;
    /****************************
    	*标记该主机是否可用
    	*****************************/
    unsigned long flags;

    spinlock_t host_lock;
    u64 last_jiffies;
    __be32 saddr;
} igd_dbw_host_t;

typedef struct igd_dbw_interface
{
    igd_dbw_flux_t flux;
} igd_dbw_interface_t;

static inline
igd_dbw_interface_t * igd_dbw_alloc_interface(void)
{
    igd_dbw_interface_t * ifdev = NULL;

    ifdev = kzalloc(sizeof(igd_dbw_interface_t), GFP_KERNEL);
    if (!ifdev)
    {
        return NULL;
    }

    igd_dbw_init_flux(&ifdev->flux);

    return ifdev;
}

static inline
void igd_dbw_free_interface(igd_dbw_interface_t * ifdev)
{
    kfree(ifdev);
}

//兼容函数
//获取skb ip头
static inline
struct iphdr * igd_get_iphdr(const struct sk_buff * skb)
{
    struct iphdr * iph = NULL;
#if LINUX_VERSION_CODE >= KERNEL_VERSION(2,6,27)
    iph = ip_hdr(skb);
#else
    iph = skb->nh.iph;
#endif

    return iph;
}

igd_dbw_host_t * igd_dbw_get_host_on_wan_by_prio(
    __be32 addr,
    int wan_idx,
    int prio_idx);

void igd_dbw_get_host_speed(
    igd_dbw_host_t * host,
    igd_dbw_counter_t * counter,
    int is_out);


int igd_dbw_get_wan_speed(
    int wan_idx,
    igd_dbw_counter_t * counter,
    int is_out);

#define IGD_DBW_SKB_FLAGS_IS_OUT 0

#endif
