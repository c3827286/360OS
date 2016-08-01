#include "cgi.h"
#include "webauth_app.h"
#include "ParamModule2.h"
#include "stddef.h"
#include <srouter.h>

const char *key = "12345678";

#if 0
#define AUTH_DEBUG(fmt,args...) do{}while(0) 
#else
#define AUTH_DEBUG(fmt,args...) do{console_printf("AUTH_DEBUG:[%s:%d] "fmt, __FUNCTION__, __LINE__, ##args);}while(0) 
#endif

struct list_head auth_param_head;
auth_set_struct auth_set_data;
auth_info_struct auth_info_data;
char auth_param_path[512] = {0};

static int auth_info_check(auth_check_struct *data)
{
	unsigned char md5_buf[AUTH_CHECK_BUF_SIZE + 1];
	unsigned char md5_str[AUTH_MD5_STR_SIZE];
	unsigned char md5_data[AUTH_MD5_SIZE];
	int i = 0;
	int ret = 0;

	memset(md5_buf, 0x00, sizeof(md5_buf));	
	memset(md5_data, 0x00, sizeof(md5_data));
	memset(md5_str, 0x00, sizeof(md5_str));
	
	/*copy info:user + passwd + ip + magic + key*/
	strcat(md5_buf, data->check_info);
	strcat(md5_buf, key);
	
	/*get md5 data*/
	get_md5_numbers(md5_buf, md5_data, strlen(md5_buf));
	
	/*change md5 data to string*/
	for(i = 0; i < AUTH_MD5_SIZE; i++){
		sprintf(&md5_str[i*2], "%02x",md5_data[i]);
	}

	/*check md5*/
	if(memcmp(md5_str, data->cgi_md5, AUTH_MD5_STR_SIZE)) {	
		AUTH_DEBUG("auth info check error!\n");
		return NRET_FALSE;
	}

	ret = http_ctrl_action(data->in, auth_info_data.auth_kid, IGD_ACTION_ADD);
	if(ret >= 0) {
		AUTH_DEBUG("user can connect internet!\n");
		return NRET_TRUE;
	} 
	else {
		AUTH_DEBUG("http ctrl action error!\n");
		return NRET_FALSE;
	}
	
}

static int auth_info_set(auth_set_struct *data, int load)
{
	struct redirect_url rd;
	user_group_mask_t ugrp;
	unsigned char url_tmp[AUTH_URL_SIZE] = {0};
	char *ptmp = NULL;

	if(data->set_state == WEB_AUTH_START) {
		if ((load == WEB_AUTH_UNLOAD) && !memcmp(auth_set_data.url, data->url, sizeof(auth_set_data.url)))
			return NRET_TRUE;

		if (auth_info_data.auth_kid > 0) {
			unregister_http_ctrl(auth_info_data.auth_kid);
			auth_info_data.auth_kid = -1;
		}

		if (auth_info_data.vip_kid > 0) {
			unregister_url_filter(auth_info_data.vip_kid);
			auth_info_data.vip_kid = -1;
		}

		if (auth_info_data.no_cgi_kid > 0) {
			unregister_noauth_url(auth_info_data.no_cgi_kid);
			auth_info_data.no_cgi_kid = -1;
		}

		if (auth_info_data.no_kid > 0) {
			unregister_noauth_url(auth_info_data.no_kid);
			auth_info_data.no_kid = -1;
		}
		
		memset(&rd, 0x00, sizeof(struct redirect_url));
		memset(&ugrp, 0x00, sizeof(user_group_mask_t));

		NOS_STRUCT_INIT(&rd);
		igd_set_bit(UGRP_ALL, ugrp);
		igd_set_bit(URL_ARGS_PCIP,rd.flags);  
		igd_set_bit(URL_ARGS_MAGIC,rd.flags);
		igd_set_bit(URL_ARGS_URL,rd.flags);

		ptmp = strstr(data->url, "/app");
		if (ptmp)
			rd.islocal = 1;
			
		/*register web auth, add redirect url*/
		auth_info_data.auth_kid = register_http_ctrl(ugrp, HTTP_CTRL_TYPE_WEBAUTH, NULL, data->url, &rd);
		if(auth_info_data.auth_kid <= 0) {
			AUTH_DEBUG("register web auth error!\n");
			return NRET_FALSE;
		}

		if (!ptmp) {
			strcpy(url_tmp, data->url);
			char *str = strchr(url_tmp, '/');
			if(str != NULL) {
				*str = '\0';
			}
					
			/*register vip url, pass redirect url*/
			auth_info_data.vip_kid = register_url_filter(ugrp, URL_TYPE_VIP, url_tmp);
			if(auth_info_data.vip_kid <= 0) {
				AUTH_DEBUG("register white list error!\n");
				unregister_http_ctrl(auth_info_data.auth_kid);
				return NRET_FALSE;
			}
		}

		/*register cgi no auth, cgi post can pass*/
		auth_info_data.no_cgi_kid = register_noauth_url("auth_info_check.cgi");
		if(auth_info_data.no_cgi_kid <= 0) {
			AUTH_DEBUG("register no cgi auth error!\n");
			unregister_http_ctrl(auth_info_data.auth_kid);
			unregister_url_filter(auth_info_data.vip_kid);
			return NRET_FALSE;
		}

		/*register app web dir no auth*/
		auth_info_data.no_kid = register_noauth_url(NULL);
		if(auth_info_data.no_kid <= 0) {
			AUTH_DEBUG("register no auth error!\n");
			unregister_noauth_url(auth_info_data.no_cgi_kid);
			unregister_http_ctrl(auth_info_data.auth_kid);
			unregister_url_filter(auth_info_data.vip_kid);
			return NRET_FALSE;
		}
	}
	else if(data->set_state == WEB_AUTH_STOP) {
		if (auth_info_data.auth_kid > 0) {
			unregister_http_ctrl(auth_info_data.auth_kid);
			auth_info_data.auth_kid = -1;
		}

		if (auth_info_data.vip_kid > 0) {
			unregister_url_filter(auth_info_data.vip_kid);
			auth_info_data.vip_kid = -1;
		}

		if (auth_info_data.no_cgi_kid > 0) {
			unregister_noauth_url(auth_info_data.no_cgi_kid);
			auth_info_data.no_cgi_kid = -1;
		}

		if (auth_info_data.no_kid > 0) {
			unregister_noauth_url(auth_info_data.no_kid);
			auth_info_data.no_kid = -1;
		}
	}

	if (load == WEB_AUTH_UNLOAD) {
		memset(auth_set_data.url, 0x00, sizeof(auth_set_data.url));
		strcpy(auth_set_data.url, data->url);
		auth_set_data.set_state = data->set_state;
	}
	
	return NRET_TRUE;
}

static int auth_info_get(auth_set_struct *data)
{
	*data = auth_set_data;
	return NRET_TRUE;
}

static void auth_load_default(void)
{
	memset(&auth_set_data,0,sizeof(auth_set_data));	
	memset(&auth_info_data,0,sizeof(auth_info_data));
	auth_info_data.auth_kid = -1;
	auth_info_data.vip_kid = -1;
	auth_info_data.no_cgi_kid = -1;
	auth_info_data.no_kid = -1;
}

static void auth_param_init(void)
{
	auth_set_struct *data = &auth_set_data; 
	struct txt_list_head *set_data;
	
	INIT_LIST_HEAD(&auth_param_head);
	set_data = txt_head_add(&auth_param_head, &auth_set_data, "auth_set_data", 1, sizeof(auth_set_struct)); 
	if(set_data == NULL) {
		free_txt_list_head(&auth_param_head);
		return;
	}

	txt_add(&set_data->member, "url" , sizeof(data->url) , PARAM_STRING, offsetof(auth_set_struct, url));
	txt_add(&set_data->member, "state", sizeof(data->set_state), PARAM_INT, offsetof(auth_set_struct, set_state));
	
	auth_load_default();
}

static int auth_loadpara(void)
{
	igd_generic_load_param(auth_param_path, &auth_param_head, auth_load_default);	
	return NRET_TRUE;
}

static void auth_savepara(void)
{
	igd_generic_save_param(auth_param_path, &auth_param_head);
	save_param();
	return;
}

int auth_call(unsigned long msgid, unsigned long ulpa,unsigned long  ulpb, void *pv)
{	
	int ret = NRET_TRUE;

	switch(msgid) {
		case MSG_AUTH_INFO_CHECK:
			ret = auth_info_check((auth_check_struct *)ulpa);
			if(ret == NRET_TRUE)
				auth_savepara();
			return ret;
		case MSG_AUTH_INFO_SET:
			ret = auth_info_set((auth_set_struct *)ulpa, WEB_AUTH_UNLOAD);
			if(ret == NRET_TRUE)
				auth_savepara();
			return ret;	
		case MSG_AUTH_INFO_GET:
			return auth_info_get((auth_set_struct *)ulpa);
		default:
			break;
	}
	
	return NRET_TRUE;
}

void sig_func(int signum)
{	
	if (auth_info_data.auth_kid > 0) {
		unregister_http_ctrl(auth_info_data.auth_kid);
		auth_info_data.auth_kid = -1;
	}

	if (auth_info_data.vip_kid > 0) {
		unregister_url_filter(auth_info_data.vip_kid);
		auth_info_data.vip_kid = -1;
	}

	if (auth_info_data.no_cgi_kid > 0) {
		unregister_noauth_url(auth_info_data.no_cgi_kid);
		auth_info_data.no_cgi_kid = -1;
	}

	if (auth_info_data.no_kid > 0) {
		unregister_noauth_url(auth_info_data.no_kid);
		auth_info_data.no_kid = -1;
	}
	
	console_printf("webauth app stop\n");
	_exit(1);
}

int main(int argc, const char *argv[])
{
	int max_fd;	
	int fd;
	fd_set fds;
	int ret = -1;	
	char cfgpath[256] = {0};

	ret = get_config_path(256, cfgpath);
	if(ret != 0)
		return -1;
	
	memset(auth_param_path, 0x00, sizeof(auth_param_path));
	snprintf(auth_param_path, sizeof(auth_param_path)-1, "%s/config", cfgpath);

	auth_param_init();
	auth_loadpara();
	
	ret = auth_info_set(&auth_set_data, WEB_AUTH_LOAD);
	if(ret != NRET_TRUE) {
		return -1;
	}
	
    fd = nt_ipcserver_init2(IPC_PATH_AUTH, auth_call);

	signal(SIGTERM, sig_func);
	signal(SIGINT, sig_func);

	while (1) {
		FD_ZERO(&fds);
		IGD_FD_SET(fd, &fds);
		if (select(max_fd + 1, &fds, NULL, NULL, NULL) < 0) {
			if (errno == EINTR || errno == EAGAIN)
			    continue;
		}
		if (FD_ISSET(fd, &fds))
			ipc_server_accept2();
	}
	return 0;
}


