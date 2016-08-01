#ifndef _IGD_DDOS_H_
#define _IGD_DDOS_H_

#ifndef ETH_ALEN
#define ETH_ALEN	6
#endif

/*-----------------------------------------------------------------------------
 *  s_node
 *-----------------------------------------------------------------------------*/
enum s_node_type{
	S_NODE_TYPE_COUNTER,
	S_NODE_TYPE_RATELIMIT,
	S_NODE_TYPE_COUNTLIMIT,
};

struct s_node{
	struct list_head list;
	struct list_head list_s;

	int type;
	void * data;
};

/*-----------------------------------------------------------------------------
 *  s_counter
 *-----------------------------------------------------------------------------*/
//
struct s_counter{	//single counter
	unsigned long last;

	struct {
		unsigned long c;
	}old, new, speed;
};

struct c_list{	//list with counter
	struct list_head list;

	//counter
	struct s_counter counter;

	//lock
	rwlock_t lock;
};

/*-----------------------------------------------------------------------------
 *  s_log
 *-----------------------------------------------------------------------------*/
enum S_LOG_FLAG{
	S_LOG_FLAG_MIN,
	S_LOG_FLAG_TODEL,	//标记为将要删除，用在log清除函数中
	S_LOG_FLAG_KEY_IP,
	S_LOG_FLAG_KEY_MAC,
	S_LOG_FLAG_MAX
};

#define S_LOG_DES_LEN	64	

struct s_log{
	struct list_head list;

	//flag
	unsigned long flag;

	char des[S_LOG_DES_LEN];	//日志描述

	//key
	struct{
		t_proto proto;
		struct igd_ifindex_map_entry * ifc;
		t_ipaddr ip;
		unsigned char mac[ETH_ALEN];
	}key;

	//ref
	atomic_t ref;

	struct timeval time_start;				//记录事件第一次发生的时间
	struct timeval time_end;				//记录事件最后一次发生的时间

	unsigned long timeout;				//超时时间

	//counter
	struct s_counter packet;
	struct s_counter size;
	struct s_counter connect;
};

/*-----------------------------------------------------------------------------
 *  s_log2
 *-----------------------------------------------------------------------------*/

struct s_log2_key{
	//level 2
	struct{
		unsigned char src[ETH_ALEN];
		unsigned char dst[ETH_ALEN];
	}mac;

	union{
		struct{
			t_proto proto;
			struct{
				t_ipaddr ip;
				t_port port;
			}src, dst;
		}ip;
		struct{
			struct{
				unsigned char mac[ETH_ALEN];
				t_ipaddr ip;
			}src, dst;
		}arp;
	}u;
};
#define S_LOG_RECORD 0
struct s_log2{
	struct list_head list;

	struct timeval time;					//记录发生时间

	struct igd_ifindex_map_entry * ifc;		//接口
	__be16 type;							//ETH_P_IP, ETH_P_ARP
	char * reason;							//原因

	struct s_log2_key key;
	struct s_counter packet;				//counter
	unsigned long flags;
};

#define USE_LOG2	1


/*-----------------------------------------------------------------------------
 *  limit
 *-----------------------------------------------------------------------------*/
enum LIMIT_TYPE{
	LIMIT_TYPE_PKTNUM,	//包个数
	LIMIT_TYPE_PKTSIZE,	//包大小
	LIMIT_TYPE_CONNUM,	//连接数
};
//TODO:zjx 合并这两种结构
struct rate_limit_data{
	struct list_head list;

	int type;

	atomic_t ref;

	unsigned long last;		//时间戳
	int size;				//桶当前大小

	//fix value
	int speed;				//限速值
 	int max;				//令牌桶上限
	int interval;			//令牌桶增加间隔
	int inc;				//每次增加数量

#if !USE_LOG2
	struct s_log * log;
#endif
};

struct count_limit_data{
	struct list_head list;

	int type;

	atomic_t ref;
	
	int count;				//当前值

	int max;				//最大值

#if !USE_LOG2
	struct s_log * log;
#endif
};

/*-----------------------------------------------------------------------------
 * s_port 
 *-----------------------------------------------------------------------------*/
struct s_port{
	struct list_head list;

	atomic_t ref;

	t_proto proto;
	t_ipaddr ip;
	t_port port;

	struct s_counter connect[IP_CT_DIR_MAX];
};

/*-----------------------------------------------------------------------------
 *  s_connect
 *-----------------------------------------------------------------------------*/
//用来记录连接
//连接标记
enum S_CONNECT_FLAG{
	S_CONNECT_FLAG_CT = 0,
	S_CONNECT_FLAG_DDOS,		//ddos连接
	S_CONNECT_FLAG_NORMAL,			//正常连接
	S_CONNECT_FLAG_REPLY,			// see reply pkt
	S_CONNECT_FLAG_CONFIRMED,		// is confirmed
	
	S_CONNECT_FLAG_ORIGINHASH,
	S_CONNECT_FLAG_REPLYINHASH,

	S_CONNECT_FLAG_DSTIFC,			//connect dst is interface ip
	S_CONNECT_FLAG_DSTSPEC,			//connect dst is special entry
	S_CONNECT_FLAG_DSTNET,			//connect dst is to interface sub net
	S_CONNECT_FLAG_SRCIFC,			//connect src is from interface sub net
	S_CONNECT_FLAG_SRCNET,			//connect src is from net of main net table
	S_CONNECT_FLAG_DIE,

	S_CONNECT_FLAG_TMPDROP,			//临时丢弃这个连接上的包
};

//连接状态
enum S_CONNECT_STATE{
	S_CONNECT_STATE_INIT,
	S_CONNECT_STATE_HALF,		//半连接，未确认
	S_CONNECT_STATE_CONFIRMED,	//半连接，已确认
	S_CONNECT_STATE_FULL,		//全连接
	S_CONNECT_STATE_MAX,
};

struct s_tuple {
	struct list_head list;		//挂在hashtable上
	t_proto proto;
	struct{
		t_ipaddr ip;
		t_port port;
	}src, dst;
	enum ip_conntrack_dir dir;	//当在hashtable里搜索到此tuple时需要这个字段来确定dir
	struct s_counter packet;
};


struct s_connect{
	//list
	struct list_head list;			//list in s_connect_all
	struct list_head age_list; /*  used when no conntrack connect to s_conn */
	struct s_host *host;

	//flag
	unsigned long flag;

	//ref
	atomic_t ref;

	//timeout
	unsigned long timeout;				//超时时间
	struct s_special_entry_k *spec;//特殊端口连接限制
	//tuple
	struct s_tuple tuple[IP_CT_DIR_MAX];
	struct rate_limit_data rd_pkt;
	struct count_limit_data cd_pkt;
	//log
#if !USE_LOG2
	struct s_log * log;			//指向用来记录统计信息的log
#endif

};

/*-----------------------------------------------------------------------------
 *  s_host
 *-----------------------------------------------------------------------------*/
//用来记录主机
enum S_HOST_FLAG{
	S_HOST_FLAG_DDOS = 1,		//ddos主机
	S_HOST_FLAG_ARPBIND,		//TODO:zjx			NEED_TEST
	S_HOST_FLAG_STATIC,			//TODO:zjx 静态主机	NEED_TEST

	S_HOST_FLAG_FULL,			//TODO:zjx

	S_HOST_FLAG_LO,				//ip为路由器ip
	S_HOST_FLAG_LOCAL,			//ip为接口子网
	S_HOST_FLAG_REMOTE,			//ip为远程主机

	S_HOST_FLAG_INIPHTABLE,		//在ip hash表中
	S_HOST_FLAG_INMACHTABLE,	//在mac hash表中

	S_HOST_FLAG_KEYIP,			//有ip
	S_HOST_FLAG_KEYMAC,			//有mac
	S_HOST_FLAG_KEYIFC,			//有ifc
};

enum S_MAC_FLAG{
	S_MAC_FLAG_INVALID = 1,
	
	S_MAC_FLAG_HALF,	//TODO:zjx
	S_MAC_FLAG_FULL,	//TODO:zjx

	S_MAC_FLAG_RATE,
	S_MAC_FLAG_NORATE,
	S_MAC_FLAG_ARPBIND,

	S_MAC_FLAG_LO,		//TODO:zjx 路由器接口mac NEED_TEST
};
struct s_host_key{
	char mac[ETH_ALEN];
	t_ipaddr ipaddr;
	struct igd_ifindex_map_entry * ifc;	//这个主机出现在那个接口上
};

struct s_host{
	//list
	struct list_head list;				//list in s_host_all
	struct list_head list_iphtable;		//list in s_host_htable 
	struct list_head list_machtable;

	//key
	struct s_host_key key;

	//flag
	unsigned long flag;

	//ref
	atomic_t ref;

	//timeout
	unsigned long timeout;				//超时时间

	//ddos timeout
	unsigned long ddos_timeout;			//记录为ddos主机的时间

	//connect
	struct c_list connect[IP_CT_DIR_MAX];

	struct count_limit_data conn_cd;
	struct count_limit_data sp_cd; /* special count */
	struct count_limit_data conn_unreplay; /* un replay conn count */
	//connect create rate limit
	struct rate_limit_data conn_rd;
	struct rate_limit_data pkt_rd;
	struct rate_limit_data frag_rd;

	//port
	int port_num;					//用来记录主机打开的端口数目

	//counter;
	//struct s_counter packet[IP_CT_DIR_MAX];	//包数
	//struct s_counter size[IP_CT_DIR_MAX];	//包大小
	//struct s_counter conn[IP_CT_DIR_MAX];	//连接数
};


#ifdef CONFIG_IP_NF_IGD_DDOS
static inline struct s_connect * s_connect_get(struct s_connect * connect)
{
	atomic_inc(&connect->ref);
	return connect;
}

extern void c_list_put_head(struct c_list * c_list, struct list_head * list);
extern spinlock_t igd_ddos_lock;
extern struct list_head s_connect_age_list;

static inline void ddos_lock(void)
{
	spin_lock_bh(&igd_ddos_lock);
	return ;
}
static inline void ddos_unlock(void)
{
	spin_unlock_bh(&igd_ddos_lock);
	return ;
}

static void inline s_connect_put(struct s_connect *c)
{
	atomic_dec(&c->ref);
	return ;
}
extern int ddos_special_add(int proto, uint16_t port_start, uint16_t port_end);
extern int ddos_special_del(int id);
#endif

extern void igd_ddos_init(void);
#endif
