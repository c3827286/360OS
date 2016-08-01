#include <stdio.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/select.h>
#include <srouter.h>
#include <signal.h>
#include <hello.h>
#include <cgicomm.h>

int idx = 0;
int nid = 0;

/* process CGI message */
int comm_proc (int so)
{
	struct hello_comm hc;
	struct sockaddr addr;
	int len,n,r;
	int read_sock=accept(so, &addr,&len);

	if(read_sock<0)
		return -1;

	n=read(read_sock,&hc,sizeof(hc));
	if (n>0) {
		console_printf ("hello,read,ret:%d\n",n);
		switch (hc.command) {
			case HELLO_ADD_STATION:
				console_printf ("IP:%s\n",inet_ntoa(hc.in));
				r=http_ctrl_action(hc.in,idx,IGD_ACTION_ADD);
				console_printf ("hello,set action,ret:%d\n",r);				
				break;
			}
		}
	close (read_sock);
}

void sig_func(int signum)
{	
	if (idx > 0)
		unregister_http_ctrl(idx);
	if (nid > 0)
		unregister_noauth_url(nid);

	console_printf("Stop app\n");
	_exit(1);
}


int main (void)
{
	int r,so,max_fd=0;
	user_group_mask_t ug;
	char redir_url[128];
	fd_set fds;
	struct timeval tv;	
	struct redirect_url ru={0};
	struct nc_if *ifc;

	/* get LAN information */
	ifc = nc_get_if(IF_TYPE_LAN);
	if (!ifc)  return -1;
	sprintf (redir_url,"%s/app/helloworld/webs/auth.cgi",inet_ntoa(ifc->ip[0].ip));
	
	/* register resource */
	igd_init_bit(UGRP_MX,ug);
	igd_set_bit(UGRP_ALL,ug);
	
	NOS_STRUCT_INIT(&ru);
	igd_init_bit(URL_ARGS_MX,ru.flags);	
	igd_set_bit(URL_ARGS_PCIP,ru.flags);
	igd_set_bit(URL_ARGS_PCMAC,ru.flags);
	igd_set_bit(URL_ARGS_URL,ru.flags);

	idx = register_http_ctrl (ug,HTTP_CTRL_TYPE_REDIRECT,NULL,redir_url,&ru);
	console_printf ("register_http_ctrl ret:%d\n",idx);

	nid = register_noauth_url("auth.cgi");
	console_printf ("Cancel Web auth. Ret:%d\n",nid);
	
	so=cgi_comm_server_init(IPC_PATH_HELLOWORLD);
	console_printf ("create server socket:%d\n",so);

	signal(SIGTERM, sig_func);
	signal(SIGINT, sig_func);
	
	sleep(1);

	while(1) {
		FD_ZERO(&fds);
		IGD_FD_SET(so, &fds);
		tv.tv_sec = 10;
		tv.tv_usec = 0;

		if ((r = select(max_fd+1, &fds, NULL, NULL, &tv)) < 0) {
			if (errno == EINTR || errno == EAGAIN)
			    continue;
		}

		if (FD_ISSET(so, &fds)) {
			/* CGI message */
			comm_proc(so);
		}
	}

	return 0;

}
