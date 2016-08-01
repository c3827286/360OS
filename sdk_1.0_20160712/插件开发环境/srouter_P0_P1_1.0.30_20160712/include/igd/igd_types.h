#ifndef _IGD_TYPES_H_
#define _IGD_TYPES_H_
#include <netinet/in.h>

typedef u_int8_t t_u8;
typedef u_int32_t t_u32;
typedef u_int16_t t_u16;

typedef u_int32_t t_ipaddr;
typedef u_int16_t t_port;		//端口
typedef u_int8_t t_proto;		//协议tcp,udp,icmp
typedef unsigned long t_portid;

#define PORT_MIN 0x0000
#define PORT_MAX 0xFFFF

#define IP_MIN	0x00000000
#define IP_MAX	0xFFFFFFFF

struct ipaddrmsk{
	struct in_addr ip;
	struct in_addr mask;
	int flag;
};
struct ipmskgw {
	struct in_addr ip;
	struct in_addr mask;
	struct in_addr gw;
};

struct igd_time_comm{
	uint8_t day_flags;
	uint8_t start_hour;
	uint8_t start_min;
	uint8_t end_hour;
	uint8_t end_min;
};

struct igd_ip_comm {
	struct in_addr ip;
	struct in_addr mask;
};

struct igd_ip_comm2 {
	uint8_t type;
	struct in_addr ip;
	struct in_addr mask;
};

struct igd_dst_ip {
	uint8_t type;
	struct in_addr ip;
	struct in_addr mask;
	uint16_t dns_gid;
	uint16_t dst_gid; /*  reserved for ip group, NOT SUPPORT NOW */
	char dns[32];
};

#define IGD_FILTER_IP_TYPE_IPMASK		1	//IP+MASK方式
#define IGD_FILTER_IP_TYPE_STARTEND		2	//ip段方式(单个主机也包括在内)
#define IGD_FILTER_IP_TYPE_DNS			3
#define IGD_FILTER_IP_TYPE_DNS_GROUP		4
#define IGD_FILTER_IP_TYPE_IP_GROUP		5
#define IGD_FILTER_IP_TYPE_MX			6

#define IGD_ENABLE	1
#define IGD_DISABLE	0

#define IGD_PROCESS_UP 	1
#define IGD_PROCESS_DOWN 	0
#define SIOCGVPORT      0x895A

#endif /*_IGD_TYPES_H_*/
