#ifndef IGD_ERR_MSG
#define IGD_ERR_MSG


extern int igd_cgi_err;
#define IGD_CGI_ERR_SET(err_no) do{igd_cgi_err = (err_no);\
	console_printf("%s : line_number = %d error nr = %d \n", __FUNCTION__, __LINE__, (err_no));\
   goto error;\
}while(0)

#define IGD_CGI_ERR_GET() (igd_cgi_err)
#define IGD_CGI_CHECK_NR_VALID_ERR(nr, min, max, err_no) \
	do{\
		if((nr) < (min) || (nr) >= (max))\
		{\
			console_printf("number is %d, but min = %d, max = %d\n", (nr), (min), (max));\
			IGD_CGI_ERR_SET(err_no);\
		}\
	}while(0)

#define IGD_CGI_CHECK_NR_VALID(nr, min, max ) \
	do {\
		if ((nr) < (min) || (nr) >= (max)) {\
			console_printf("[%s]%d:number is %d, but min = %d, max = %d\n",\
					__FUNCTION__, __LINE__,(nr), (min), (max));\
			goto error;\
		}\
	}while(0)

enum {
    IGD_RULE_NAME_EXIST = 300,
    IGD_RULE_EXIST,
    IGD_RULE_NONEXIST,
    IGD_RULE_INVALID,
    IGD_IP_ERR,
    IGD_MASK_ERR,
    IGD_DNS_ERR,
    IGD_GW_ERR,
    IGD_MAC_ERR,
    IGD_IPMASK_MISMATCH,
    IGD_IP_OVERLAP,
    IGD_RULE_FULL,
    IGD_IP_POOL_INVALID,
    IGD_NR_INVALID,
    IGD_ERR_PROHIBIT,
    IGD_CHARGE_ERR,
    IGD_PASSWD_ERR,
    IGD_GRP_ERR,
    IGD_ERR_UGRP_RULE_EXIST,
};

extern char * IGD_INTERFACES_LAN_NUM;
extern char * IGD_INTERFACES_LAN_ADD_IPADDR;
extern char *FIREWALL_MAX_NUM;
extern char *VIRTUAL_PORT_EXISTS;
//FLAG20120321 start
extern char *STATIC_NAT_LAN_IP_EXISTS;
//FLAG20120321 end
extern char *PARAME_ERROR;
extern char *DATA_EXISTS;
extern char *IGD_TABLE_MAX;
extern char * IGD_SUCCESS;
extern char * IGD_INTERFACES_PPPOE_KILL_FALSE;
extern char * IGD_INTERFACES_PPPOE_UP_FALSE;
extern char * IGD_IFSTATE_IF_STATE_FALSE;
extern char * IGD_IFSTATE_IF_TYPE_FALSE;
extern char *IP_IS_INET_ADDR;
extern char *IP_IS_BROAD_ADDR;
extern char *ALREADY_HAVE_PRIO;
void igd_err_set( const char * args, ...);
extern char * igd_err_get(void);


#endif
