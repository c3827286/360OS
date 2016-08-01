#ifndef HELLO_WORLD_H
#define HELLO_WORLD_H

enum {
	HELLO_ADD_STATION,
};

struct hello_comm {
	unsigned short command;
	unsigned short len;
	struct in_addr in;
};


#define IPC_PATH_HELLOWORLD "/tmp/.helloworld.ipc"


#endif
