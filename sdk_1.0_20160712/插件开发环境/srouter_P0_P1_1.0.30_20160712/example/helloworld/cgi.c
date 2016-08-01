#include <stdio.h>
#include <sys/types.h>  
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <hello.h>
#include <cgicomm.h>
#include <cgi.h>


int auth_cgi(struct httpd * hp, struct httpform * form, char ** filetext) 
{
	int r,so;
	char *arg;
	struct hello_comm hc;
	char buf[64];

	CGI_SEND_DATA("Content-Type: text/html; charset=UTF-8\r\n");
	sprintf (cgi_buf,"<HTML><TITLE>plugin Demo</TITLE><BODY><font size='20'>Hello,World!</font><br>");

	/* get orig. URL */
	arg=get_form_value(form,"url");
	sprintf (&cgi_buf[strlen(cgi_buf)],"<a href='%s'>Continue visit...</a></BODY></HTML>",arg);
	sprintf(buf, "Content-Length: %d\r\n\r\n", strlen(cgi_buf));
	CGI_SEND_DATA(buf);
	CGI_SEND_DATA(cgi_buf);

	/* get client device IP address */
	arg=get_form_value(form,"pcip");
	inet_aton(arg,&hc.in);

	hc.command=HELLO_ADD_STATION;
	hc.len=sizeof(struct in_addr);
	so=cgi_comm_connect (IPC_PATH_HELLOWORLD);
	if (so>=0) {
		write (so,&hc,sizeof(hc));
		close(so);
		}
	
	return FP_OK;

}

struct  IGD_CGIMAP_ENTRY   IGD_CGI_FUN_MAP[]= {
	{"auth.cgi",  auth_cgi,  PERM_ALL},
	{NULL},
	};



