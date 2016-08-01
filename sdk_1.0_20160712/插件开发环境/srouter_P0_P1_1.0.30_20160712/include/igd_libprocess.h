#ifndef _IGD_PROCESS_H_
#define _IGD_PROCESS_H_


#define IGD_PROCESS_CMDLINE_SIZE 1024

//3 attributes
#define IGD_PROCESS_ATTR_INIT			0x00
#define IGD_PROCESS_ATTR_FLAG			0x01
#define IGD_PROCESS_ATTR_EXEOPCACHE		0x02
#define IGD_PROCESS_ATTR_KILLOPCACHE	0x04


//3 status
#define IGD_PROCESS_STATUS_INVALID	0x00
#define IGD_PROCESS_STATUS_INIT		0x01
#define IGD_PROCESS_STATUS_RUN		0x02
#define IGD_PROCESS_STATUS_STOP		0x04
#define IGD_PROCESS_STATUS_WAITSTOP	0x08

//3 flag
#define IGD_PROCESS_FLAG_AUTORESTART	0x01	//flag process as services
#define IGD_PROCESS_FLAG_PERSIST		0x02

//3 op
#define IGD_PROCESS_OP_INIT		0x00
#define IGD_PROCESS_OP_START	0x01
#define IGD_PROCESS_OP_STOP		0x02
#define IGD_PROCESS_OP_MAX		0x03

//3 type
#define IGD_PROCESS_TYPE_COMMAND	0x01
#define IGD_PROCESS_TYPE_SERVICE	0x02


#define IGD_PROCESS_OP_QUEUE_MAX 32

#define ENV_COUNT_MAX            10

int exe_default(void * cmdline);
int kill_default(void *op);

extern int igd_process_create(int * id, int(*exe)(void *),void *start_msg,int(*kill)(void *), void *exit_msg);
int igd_process_attr_set(int id, int type, unsigned long value);
int igd_process_attr_clear(int id, int type, unsigned long value);
int igd_process_start(int id, int len , void * context);
int igd_process_stop(int id, int len, void * context);
int igd_process_nextop(int id, int op, int len, void * context);
int igd_process_getstatus(int id);
int igd_process_is_run(int id);
extern int close_parent_fd(void);
pid_t igd_process_getpid(int id);

int igd_exec(const char * fmt,...);
extern int igd_exec_delay(int seconds, const char * fmt,...);

#endif
