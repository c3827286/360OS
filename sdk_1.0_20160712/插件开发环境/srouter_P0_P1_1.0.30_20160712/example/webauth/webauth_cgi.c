#include "cgi.h"
#include "webauth_app.h"

int auth_info_check_cgi(struct httpd * hp, struct httpform * form, char ** filetext)
{	
	scall_param pa = {0},pb = {0},pc = {0};
	auth_check_struct data;	
	int ret = 0;	

	char *user = get_form_value(form,"user");
	char *passwd = get_form_value(form,"passwd");
	char *ip = get_form_value(form,"ip");
	char *magic =get_form_value(form,"magic");
	char *md5 = get_form_value(form,"md5");
	
	if(user==NULL || passwd==NULL || ip==NULL || magic==NULL || md5==NULL) {
		CGI_REQUEST_ERROR_RETURN(C_ERR_NULL);
	}

	if(strlen(user) > AUTH_USER_SIZE || strlen(passwd) > AUTH_PASSWD_SIZE || 
		strlen(ip) > AUTH_IP_SIZE || strlen(magic) > AUTH_MAGIC_SIZE || strlen(md5) != AUTH_MD5_STR_SIZE) {
		CGI_REQUEST_ERROR_RETURN(C_DATAERR);
	}

	memset(&data, 0x00, sizeof(auth_check_struct));

	strcat(data.check_info, user);
	strcat(data.check_info, passwd);
	strcat(data.check_info, ip);
	strcat(data.check_info, magic);

	memcpy(data.cgi_md5, md5, strlen(md5));
	inet_aton(ip,&data.in);

	ret = auth_SwitchCall(MSG_AUTH_INFO_CHECK, PRM_POINTER(pa, &data, sizeof(data)), PRM_VALUE_NULL(pb), PRM_VALUE_NULL(pc));
	if (ret != NRET_TRUE)
		CGI_REQUEST_ERROR_RETURN(C_DATAERR);
	
 	CGI_REQUEST_SUCCESS_RETURN();

}

int auth_info_set_cgi(struct httpd * hp, struct httpform * form, char ** filetext)
{	
	scall_param pa = {0},pb = {0},pc = {0};
	auth_set_struct data;
	int ret = 0;

	char *url = get_form_value(form,"url");
	char *state = get_form_value(form,"state");

	if(state==NULL) {
		CGI_REQUEST_ERROR_RETURN(C_ERR_NULL);
	}
	
	if((atoi(state) == WEB_AUTH_START) && (url == NULL)) {
		CGI_REQUEST_ERROR_RETURN(C_ERR_NULL);
	}

	if(strlen(url) >= AUTH_URL_SIZE) {
		CGI_REQUEST_ERROR_RETURN(C_DATAERR);
	}

	memset(&data, 0x00, sizeof(auth_set_struct));

	strcpy(data.url, url);
	data.set_state = atoi(state);

	ret = auth_SwitchCall(MSG_AUTH_INFO_SET, PRM_POINTER(pa, &data, sizeof(data)), PRM_VALUE_NULL(pb), PRM_VALUE_NULL(pc));
	if (ret != NRET_TRUE)
		CGI_REQUEST_ERROR_RETURN(C_DATAERR);
	
 	CGI_REQUEST_SUCCESS_RETURN();

}

int auth_info_get_cgi(struct httpd * hp, struct httpform * form, char ** filetext)
{
	char buf[IGD_MIN_BUFSZ]={0};
	auth_set_struct data = {0};
	scall_param pa,pb,pc;
	char *tmp = NULL;
	
	tmp = &buf[0];
	auth_SwitchCall(MSG_AUTH_INFO_GET,PRM_POINTER(pa,&data,sizeof(data)),PRM_VALUE_NULL(pb),PRM_VALUE_NULL(pc));
	CGI_SEND_DATA(html_mime_type_text);
	json_object_start(tmp);
	json_value(tmp,"url","%s",data.url);
	json_value(tmp,"state","%d",data.set_state);
	json_object_begin_end(tmp);
	CGI_SEND_DATA_BUF();
	CGI_GETDATA_RETURN();
}

struct IGD_CGIMAP_ENTRY IGD_CGI_FUN_MAP[]= {
	{"auth_info_check.cgi", auth_info_check_cgi, PERM_ALL},
	{"auth_info_set.cgi", auth_info_set_cgi, PERM_LE_ADMIN},
	{"auth_info_get.cgi", auth_info_get_cgi, PERM_ALL},
	{NULL,},
};
