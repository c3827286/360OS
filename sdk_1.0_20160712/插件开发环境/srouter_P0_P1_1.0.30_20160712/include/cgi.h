
#ifndef __APP__CGI_H__
#define __APP__CGI_H__
/*-------------------include files--------------------*/
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <stdint.h>
#include <string.h>
#include <linux/types.h>

#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include "igd_com_msg.h"
#include "cgi_json.h"
#include "igd/igd_err.h"
#include "igd/igd_types.h"
#include "igd/igd_project.h"
#include "igd/igd_lib.h"
#include "cJSON.h"


#ifdef __cplusplus 
extern "C" {
#endif

#ifndef IFNAMSIZ
#define IFNAMSIZ 16
#endif

#define NRET_ENABLE						0		//	使能
#define NRET_DISABLE					1		// 禁止
#define IGD_WEB_USER_TYPE_GUEST  0x00
#define IGD_WEB_USER_TYPE_ADMIN  0x01
#define IGD_WEB_USER_TYPE_SUPER  0x02

#define PERM_GUEST  (1<<(IGD_WEB_USER_TYPE_GUEST))
#define PERM_LE_ADMIN (1<<(IGD_WEB_USER_TYPE_ADMIN) | 1<<(IGD_WEB_USER_TYPE_SUPER))
#define PERM_SUPER  (1<<(IGD_WEB_USER_TYPE_SUPER))

#define PERM_ALL 0xff
extern char *html_mime_type_text;
extern char *filetext;
enum {
	C_L7_CGI_ADD = 0,
	C_L7_CGI_MOD,
	C_L7_CGI_DEL,
	C_L7_CGI_CLEAN,
	C_L7_CGI_LINKDOWN,
	C_L7_CGI_DEL_BYDATA,
};

struct cur_user_struct
{
	char cur_user[32];
	int user_type;
	int cgi_check_type;
};

extern struct cur_user_struct cgi_cur_user;

typedef struct {
  char *name;
  char *value;
} entrytype;

typedef struct _node {
  entrytype entry;
  struct _node* next;
} node;

typedef struct {
  node* head;
  cJSON *json;
} llist;


struct httpform {
	node* head;
	cJSON *json;
	struct in_addr user_ip;
};

struct httpd
{
    long sock ;
} ;

typedef int (*IGD_CGI_HANDLER)(struct httpd * hp, struct httpform * form, char ** filetext);

struct IGD_CGIMAP_ENTRY {
	char *name;
	IGD_CGI_HANDLER handler;
	int user_perm_flag;
};
typedef unsigned long ip_addr_cgi;

#define MAX_HTM_FILENAME_LEN 255

#define FP_ERR      0x00    /* Internal (code) error - must be by itself */
#define FP_OK       0x01    /* form processing was OK if set, else system error */
#define FP_FILE     0x02    /* textfile points to a file reply */
#define FP_TEXT     0x04    /* textfile points to error/status text */
#define FP_ERRHD    0x08    /* insert error header line in reply page */
#define FP_OKHD     0x10    /* insert an "OK" header line in reply page */
#define FP_DONE     0x20    /* CGI routine did everything, just clean up */
#define FP_RESET    0x40/* Soft reset the router */

#define CGI_MAC_BUF_LEN             20

struct cgi_err_struct {
	int id;
	char msg[64];
};
extern struct cgi_err_struct cgi_err[];
#define CGI_FD 31
#define cgi_write(a) write(CGI_FD, a, strlen(a))

#define CGI_REQUEST_SUCCESS_RETURN()        do{\
	*filetext = "noneed.htm";\
	cgi_write(html_mime_type_text);\
	cgi_write("[\"SUCCESS\"]"); \
    fprintf(stderr, "%s:%d CGI_SUCCESS_RETURN\n", __FUNCTION__, __LINE__);\
    return (FP_OK|FP_OKHD|FP_FILE);\
}while(0)

#define CGI_REQUEST_SUCCESS_NO_SAVE_RETURN()        do{\
	*filetext = "noneed.htm";\
	cgi_write(html_mime_type_text);\
	cgi_write("[\"SUCCESS\"]"); \
    fprintf(stderr, "%s:%d CGI_SUCCESS_RETURN\n", __FUNCTION__, __LINE__);\
    return (FP_OK|FP_OKHD|FP_FILE);\
}while(0)

#define CGI_GETDATA_RETURN_BUF()        do{ \
    *filetext = "noneed.htm";\
    cgi_write(html_mime_type_text);\
	cgi_write(cgi_buf);\
    return (FP_OK|FP_OKHD|FP_FILE);\
}while(0)

#define CGI_SEND_DATA(buf)        do{ \
	cgi_write(buf);\
}while(0)

#define CGI_SEND_DATA_BUF()        do{ \
	cgi_write(cgi_buf);\
}while(0)
#define CGI_SEND_MIME_AND_DATA_BUF() do {\
	*filetext = "noneed.htm";\
	cgi_write(html_mime_type_text);\
	cgi_write(cgi_buf);\
	json_buf_set(ptr);\
}while(0)

#define CGI_REQUEST_ERROR_RETURN(err_no)        do{ \
	char err[128];\
	sprintf(err, "{\"err_no\":\"%d\",\"err_msg\":\"%s\"}", err_no, cgi_err[err_no].msg);\
    	*filetext = "noneed.htm";\
	cgi_write(html_mime_type_text);\
	cgi_write(err);\
	console_printf("%s:line number %d \n", __FUNCTION__, __LINE__);\
    return (FP_OK|FP_OKHD|FP_FILE);\
}while(0)

#define CGI_GETDATA_RETURN()        do{ \
    *filetext = "noneed.htm";\
    fprintf(stderr, "%s:%d CGI_SUCCESS_RETURN\n", __FUNCTION__, __LINE__);\
    return (FP_OK|FP_OKHD|FP_FILE);\
}while(0)

#define CGI_ERROR_RETURN(error_htm_name)        { \
    fprintf(stderr, "%s:%d CGI_ERROR_RETURN:%s\n", __FUNCTION__, __LINE__, #error_htm_name);\
	*filetext = #error_htm_name;\
	return (FP_OK|FP_OKHD|FP_FILE);\
}

#ifndef CGI_360_RETURN_CODE
#define CGI_360_RETURN_CODE( err_no, desc) do{\
    char err[256];\
    sprintf(err, "{\"err_no\":\"%d\",\"err_des\":\"%s\"}", err_no, desc);\
    *filetext = "noneed.htm";\
    cgi_write(html_mime_type_text);\
    cgi_write(err);\
    return (FP_OK|FP_OKHD|FP_FILE);\
}while(0)
#endif

#ifndef CGI_360_RETURN_DATA
#define CGI_360_RETURN_DATA( data) do{\
    char _ret_buf[2048];\
    sprintf(_ret_buf, "{\"err_no\":\"0\",\"err_des\":\"success\",\"data\":[{%s}]}", data);\
    *filetext = "noneed.htm";\
    cgi_write(html_mime_type_text);\
    cgi_write(_ret_buf);\
    return (FP_OK|FP_OKHD|FP_FILE);\
}while(0)
#endif
typedef uint32_t cgi_ip_t;

#define CGI_GET_BATCH_NUM 		20
#define IGD_NAME_LEN                32
#define IGD_NAME_LEN                32
#define IGD_NAME_LEN_DB             64
#define IGD_NAME_LEN_4				128
#define IGD_NAME_LEN_8				256
#define IGD_NAME_LEN_HA             16

#define CGI_END_INDEX		((unsigned long)-1)
#define IGD_FLAG_TRUE               1
#define IGD_FLAG_FALSE              0
#define CGI_IGD_BIG_BUFSZ              (1024 * 16)
#define CGI_IGD_MAX_BUFSZ              (1024 * 256)
#define CGI_DBG(fmt, args...)  
#define CGI_ERR(fmt, args...) 	
//将两数值互换(不用第三变量而用异或实现,可以适用于多类型变量)
#define CGI_INTERCHANGE_VALUE(x, y)  do{ (x) = (x) ^ (y); (y) = (x) ^ (y); (x) = (x) ^ (y); }while(0)
#ifndef CGI_STRNCPY
#define CGI_STRNCPY(dst,src) 	strncpy(dst,src,sizeof(dst)-1)
#endif

#ifndef get_next_substr
#define get_next_substr(buf, sub_buf, offset, sep) {\
		int start = offset;\
		index_next_char((buf),(sep),&(offset));\
		strncpy((sub_buf), (buf + start), (offset-start));\
		offset += 1;\
		while(*(buf+offset) == (sep)){\
			offset++;\
		}\
	}while(0)
#endif

#ifndef cgi_set_ret_value_and_return
#define cgi_set_ret_value_and_return(cgi,igd_ret) do{\
	int cgi_ret = 0;\
	cgi_ret = igd_err_2_cgi_err(igd_ret);\
	if(cgi->value != (unsigned long)NULL)\
		*(int *)(cgi)->value = (cgi_ret);\
	return (cgi_ret);\
}while(0)
#endif

typedef enum {
/*需要传入一个INT类型的数据,比如设置端口速度，我们需要传入端口号就使用这个*/
	PRM_TYPE_IN_INT=1,
/*需要传入一个指针，可以是一个结构或者一个字符串。比如传入vlan的名字等,*/	
	PRM_TYPE_IN_PTR,
/*当需要从模块返回信息的时候使用。比如返回某个vlan的成员等*/	
	PRM_TYPE_OUT_PTR,
	PRM_TYPE_VALUE,		//value type
	PRM_TYPE_POINTER,	//point type
/*以下两个暂时没有使用*/	
	PRM_TYPE_INOUT,
	PRM_TYPE_RETURN_VALUE,
	PRM_TYPE_MAX,/*last one for program use,do not use this*/
}PRM_TYPE;


typedef struct {
	int type;
	unsigned long len;
	unsigned long value;/*may be a value or a pointer*/
}scall_param;
typedef struct {
	int len;
	int msg;
	int param_num; 
}nt_ipc_ctrl_header;

#define PRM_IN_PTR(p,v,l) \
	((p).type=PRM_TYPE_IN_PTR,(p).value=(unsigned long)(v),(p).len=(l),&(p))

/*不需要长度，因为我们知道长度是4*/
#define PRM_IN_INT(p,v)		\
	((p).type=PRM_TYPE_IN_INT,(p).value=(v),(p).len=sizeof(int),&(p))
#define PRM_OUT_PTR(p,v,l)   \
	((p).type=PRM_TYPE_OUT_PTR,(p).value=(v),(p).len=(l),&(p))

#define PRM_VALUE(p,v)	\
	((p).type=PRM_TYPE_VALUE,(p).value=(unsigned long)(v),(p).len=sizeof(unsigned long),&(p))

#define PRM_POINTER(p,v,l)	\
	((p).type=PRM_TYPE_POINTER,(p).value= (unsigned long)(v),(p).len=(l),&(p))

#define PRM_VALUE_NULL(p)	\
	((p).type=PRM_TYPE_VALUE,(p).value=(unsigned long)(NULL),(p).len=sizeof(unsigned long),&(p))

int ipc_clientcall(int module,int msg,int param_len,...);
typedef int nt_ipc_proc_type (int msgid,unsigned long pa,unsigned long pb,unsigned long pv);
extern int nt_ipcserver_init2(char *path,void *proc_ptr);
extern int ipc_server_accept2(void);
extern int g_ipcserver_sock;


#if 0
#define IPC_DEBUG(fmt,args...) do{fprintf(stderr,"[%s:%d]"fmt,__FUNCTION__,__LINE__, ## args);}while(0)
#define IPC_ERROR(fmt,args...) do{fprintf(stderr,"[%s:%d]"fmt,__FUNCTION__,__LINE__, ## args);}while(0)
#else
#define IPC_DEBUG(fmt,args...) do{}while(0) 
#define IPC_ERROR(fmt,args...) do{}while(0) 
#endif
#define IPC_RAND_NUM		(0x7324)
/*keep the previos client_SwichCall definition*/

#define IPC_MOD_SWITCH 		1
#define client_SwitchCall(msg,pa,pb,pc) ipc_clientcall(IPC_MOD_SWITCH,msg,3,pa,pb,pc)
extern int cgi_msgid_2_swcall_msgid(int cgi_id);


extern char *html_mime_type_text ;
extern char cgi_buf[];

extern char *get_form_value(struct httpform * form, char * name);
extern int  get_form_long(struct httpform * form, char * name, long * longvar);
extern char * get_form_ipaddr(struct httpform *form, char * name, ip_addr_cgi *ipptr);
extern int get_form_bool(struct httpform * form, char * name);
extern char *get_cgi_env(const char *varname);;
extern char *print_ipad(cgi_ip_t ipaddr);
extern int parse_ipad(cgi_ip_t *ipout, unsigned *sbits, char* stringin);
extern char * cgi_bool2str(unsigned char b);
extern unsigned char cgi_str2bool(char * str);
extern unsigned long cgi_IsDigitStr(char * cpStr);
extern int cgi_NameCheck(char *strname);
extern int cgi_PassCheck(char *strname);
extern int cgi_IsMaskStr(char * maskStr);
extern int cgi_IsIpStr(char * ipStr);
extern int cgi_MaskCheck(cgi_ip_t mask);
extern int cgi_get_multi_value(struct httpform *form, char *cgi_pnr, char *cgi_key, int max_nr, int *result);
extern int igd_err_2_cgi_err(int ret);
extern char *mactomac(char *mac);
extern inline void  MacToStr(char *str,unsigned char* mac);
extern int cgi_print_charge_cgi(struct igd_charge *charge, char **ptr, char *p);
extern int cgi_change_charge_cgi(struct httpd * hp, struct httpform * form,
					char **filetext, struct igd_charge *charge);
extern int cgi_get_charge_cgi(struct httpd * hp, struct httpform * form,
				char **filetext, struct igd_charge *charge);
extern void cgi_print_time_union(char **ptr, struct igd_time_union *time);
extern void cgi_print_ip_union(char **ptr, struct igd_ip_union *ip);
extern int cgi_action_2_igd_action(int action);

#if 0
#define CGI_DEBUG(fmt,args...) do{console_printf("%s:%d "fmt, __FUNCTION__, __LINE__, ##args);}while(0)
#else
#define CGI_DEBUG(fmt,args...) do{}while(0)
#endif
#ifdef __cplusplus 
}
#endif

#endif


