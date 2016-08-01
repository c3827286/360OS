#ifndef __IGD__AUTH__H__
#define __IGD__AUTH__H__

#define AUTH_USER_SIZE   	32
#define AUTH_PASSWD_SIZE 	32
#define AUTH_IP_SIZE     	16
#define AUTH_MAGIC_SIZE  	16
#define AUTH_MD5_STR_SIZE  	32
#define AUTH_MD5_SIZE  		16
#define AUTH_KEY_SIZE       8

#define AUTH_URL_SIZE		128

#define AUTH_CHECK_INFO_SIZE	(AUTH_USER_SIZE + AUTH_PASSWD_SIZE + AUTH_IP_SIZE + AUTH_MAGIC_SIZE)
#define AUTH_CHECK_BUF_SIZE  	(AUTH_CHECK_INFO_SIZE + AUTH_KEY_SIZE)

#ifndef NRET_TRUE
#define NRET_TRUE	0
#endif
#ifndef NRET_FALSE
#define NRET_FALSE	-1
#endif

typedef struct _auth_check_struct{
	unsigned char check_info[AUTH_CHECK_INFO_SIZE];
	unsigned char cgi_md5[AUTH_MD5_STR_SIZE];	
	struct in_addr in;
}auth_check_struct;

typedef struct _auth_set_struct{
	unsigned char url[AUTH_URL_SIZE];
	int set_state;
}auth_set_struct;

typedef struct _auth_info_struct{
	int auth_kid;
	int vip_kid;
	int no_cgi_kid;
	int no_kid;
}auth_info_struct;

enum {
	MSG_AUTH_INFO_CHECK,
	MSG_AUTH_INFO_SET,
	MSG_AUTH_INFO_GET,
};

enum {
	WEB_AUTH_STOP = 0,
	WEB_AUTH_START,
};

enum {
	WEB_AUTH_LOAD = 0,
	WEB_AUTH_UNLOAD,
};

#define IPC_PATH_AUTH "/tmp/auth_example_ipc"
#define auth_SwitchCall(msg,pa,pb,pc) nc_ipc(IPC_PATH_AUTH,msg,3,pa,pb,pc)

#endif

