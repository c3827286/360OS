#ifndef _IGD_NETLINK_H_
#define _IGD_NETLINK_H_
#include <linux/netlink.h>

struct igd_netlink_handler{
	struct sockaddr_nl src_addr;
	struct sockaddr_nl dst_addr;
	int sock_fd;
	t_u32 seq;
};

enum IGD_FILTER_NETLINK_JUMP_FLAG{
	IGD_FILTER_NETLINK_JUMP_IP = 8,
	IGD_FILTER_NETLINK_JUMP_PROTO,	
	IGD_FILTER_NETLINK_JUMP_SPORT,
	IGD_FILTER_NETLINK_JUMP_DPORT	
};

extern int get_socket_rcvbufsiz(int sk);
extern int set_socket_rcvbufsiz(int sk, int size);
extern int get_socket_sndbufsiz(int sk);
extern int set_socket_sndbufsiz(int sk, int size);
extern struct nlmsghdr *msg_init_flags(struct igd_netlink_handler * h,short type, char * buf, int len);
extern struct nlmsghdr *msg_init(struct igd_netlink_handler * h,short type, void * buf, int len);
extern int msg_push_data(struct nlmsghdr * msg, int *offset, void * data, int len);
extern int msg_send(const struct igd_netlink_handler *h,struct nlmsghdr * msg);
extern int msg_recv(const struct igd_netlink_handler *h, void *buf, int buf_len);
extern int msg_send_once(int msg, void *buf, int buf_len);
extern void *handler_init(struct igd_netlink_handler * h);
extern int handler_fini(struct igd_netlink_handler *h);
extern int msg_pop_data(struct nlmsghdr * msg, int *offset, void * data, int len);
extern int l7_msg_send_once(int msg, void *header, int h_len, void * buf, int buf_len);
extern int nlk_igdmsg_init(struct igd_netlink_handler * h);
extern int igd_msg_send_rcv(int msg, void *header, int h_len, void * buf, int buf_len, void *rcv, int rcv_len);

extern int __nlk_msg_init(struct igd_netlink_handler * h, __u32 src_grp, __u32 dst_grp, pid_t pid);
extern int nlk_sw_msg_send(int grp, pid_t pid, int msg, void *buf, int buf_len);
extern int nlk_msg_recv(const struct igd_netlink_handler *h, void *buf, int len);
extern int nlk_msg_pop_data(struct nlmsghdr * msg, int *offset, void * data, int len);
extern int nlk_msg_send(int grp, pid_t pid, int msg, void *buf, int buf_len);
extern int nlk_msg_is_end(struct nlmsghdr *nlh);
#define nlk_msg_init(h,grp) __nlk_msg_init(h,grp,0,0)
extern int nlk_msg_send_once_by_pid(pid_t pid, void *header, int hlen, void *buf, int blen);
extern int nlk_msg_send_rcv_by_pid(pid_t pid, void *header, int hlen, void *buf, int blen, void *rcv, int rlen);

#endif /*_IGD_NETLINK_H_*/
