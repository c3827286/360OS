#ifndef ParameterSave_H_5A0F4627_9D5B_43b4_8A1D_01202D24DD38
#define ParameterSave_H_5A0F4627_9D5B_43b4_8A1D_01202D24DD38

//#include "ParameterSaveConstant3.h"
//#include "space_specification.h"
#include<stdio.h>
#include <fcntl.h>
#include <linux/types.h>
#include <stdarg.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <signal.h>
#include <sys/types.h>
#include <unistd.h>
#include <dirent.h>
#include "igd/igd_types.h"
#include "linux_list.h"

#ifdef  __cplusplus
extern "C" {
#endif

typedef enum
{
	PARAM_READ=1,//读取一个参数
	PARAM_WRITE,//写入一个参数
	PARAM_DELETE,//删除一个参数
	PARAM_CLEAR,//清空参数区
	PARAM_SAVE,//保存参数区到FLASH
	PARAM_LOAD,//从FLASH重新装载参数区
	TAR_ADD,
	TAR_DEL,
}PARAM_FUN_TYPE;

typedef enum
{
	PARAM_STRING,
	PARAM_RAW,
	PARAM_INT,
	PARAM_ARRAY_INT,
	PARAM_LONG,
	PARAM_LONG_LONG,
	PARAM_SHORT,
	PARAM_CHAR,
	PARAM_STRUCT_IN_ADDR,
}TXT_TYPE;


#define CHILD_ARRAY_START "child_array_start\n"
#define CHILD_ARRAY_END "child_array_end\n"



//初始化参数模块
void ParamModuleInit(void);

//参数模块功能调用。
//pbRet[out]：功能调用返回值。
//函数执行失败PARAM_RET_FAILED
//函数执行成功PARAM_RET_SUCCESS
//缓冲区长度太小PARAM_RET_SMALL_LENGTH
//函数执行成功，但是没有参数可以读取PARAM_RET_NO_PARAM
//内部错误PARAM_RET_INTERNAL_ERROR
//
//ulFunc：功能号
//PARAM_READ：
//ulVer无意义，pulRetVer[out]接收参数版本号，name[in]参数名称，
//pVal[out]缓冲区地址，lLen[in]缓冲区字节长度(PARAM_INFINITE_LENGTH表示缓冲区一定有足够的长度)，
//plRetLen[out]返回数据字节长度(PARAM_READ_ERROR：错误。其他负整数：绝对值表示需要的缓冲区长度。)
//
//PARAM_WRITE：
//ulVer参数版本号，pulRetVer无意义，name[in]参数名称，
//pVal[in]缓冲区地址，lLen[in]缓冲区字节长度，plRetLen无意义
//
//PARAM_DELETE：
//ulVer、pulRetVer无意义，name[in]参数名称，pVal、lLen、plRetLen无意义
//
//PARAM_CLEAR、PARAM_SAVE、PARAM_LOAD：
//ulVer、pulRetVer、name、pVal、lLen、plRetLen无意义
//
//对于所有的[out]参数，如果地址为NULL，不返回数值。
void ParamModuleFun(unsigned char*pbRet,PARAM_FUN_TYPE ulFunc,unsigned long ulVer,
	unsigned long*pulRetVer,char const*name,void*pVal,long lLen,long*plRetLen);

int tar_flag(char *tar,char *flag,PARAM_FUN_TYPE type);

struct list_head *  txt_add(struct list_head *txt_head,char *name,unsigned int len,char type,unsigned long offset) ;
char * txt_name(const char *fmt, ...);
extern struct txt_list * init_txt_node(struct list_head * txt_head,char *name,unsigned long offset,struct txt_list **n);
extern struct txt_list_head *txt_head_add(struct list_head *head, void *addr, char *title, int mx_nr, int size);
extern int txt_value_add_buf(char *write_buf, void *data,int len,int type,char *name);
char * iptostr(unsigned int  ip);
extern void  free_txt_list_head(struct list_head *head);
extern int txt_write_parame(int fd,struct list_head *head);;
extern int txt_read_parame(FILE *fd,struct list_head *head);
int save_openparamefile(char *file);
FILE * load_openparamefile(char *file);
int start_write(int fd ,char *paramename) ;
int end_write(int fd);
void txt_to_struct(struct txt_list_head * head, void *dst, void* src, int index);

#ifdef  __cplusplus
}
#endif

#endif
