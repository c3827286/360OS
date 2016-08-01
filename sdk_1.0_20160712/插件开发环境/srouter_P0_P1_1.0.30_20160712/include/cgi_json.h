#ifndef _CGI_JSON_H_
#define _CGI_JSON_H_

#ifdef __cplusplus 
extern "C" {
#endif


extern int cgi_len,snprintf_len, copy_len;
extern char cgi_buf[];
#define CGI_JSON_COPY_LEN (12 * 1024)

#define ARRAY_START "["
#define ARRAY_END "]"
#define OBJECT_START "{"
#define OBJECT_END "}"

#define json_buf_set(ptr)		do{\
			ptr=cgi_buf;\
			cgi_len=CGI_IGD_BIG_BUFSZ;\
			memset(cgi_buf,0,CGI_IGD_BIG_BUFSZ);\
		}while(0)

#define json_object_start(buf)	do{ \
			buf=cgi_buf;\
			cgi_len=CGI_IGD_BIG_BUFSZ;\
			memset(cgi_buf,0,CGI_IGD_BIG_BUFSZ);\
			buf[0] = '{';\
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_object_start_mid(buf)	do{ \
			buf[0] = '{';\
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)		
#define json_object_end(buf) do{ \
			if(*(buf-1) == ',') \
				(buf)--; \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len, "},"); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)

#define json_object_begin_start(buf,index)	do{ \
			buf=cgi_buf;\
			cgi_len=CGI_IGD_BIG_BUFSZ;\
			memset(cgi_buf,0,CGI_IGD_BIG_BUFSZ);\
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			if(index == 0)\
				snprintf((buf),copy_len,"{"); \
				else \
			snprintf((buf),copy_len,",{"); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_object_begin_end(buf) do{ \
			if(*(buf-1) == ',') \
				(buf)--; \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,"}"); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
		
#define json_array_start(buf)  do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf), copy_len,"["); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_array_end(buf) do{ \
			if(*(buf-1) == ',') \
				(buf)--; \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf), copy_len,"],"); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)

#define json_name(buf,name) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,"\"%s\":", name); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_more_value(buf,value,index) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			if(index == 0)\
				snprintf((buf),copy_len,"\"%s\"", value); \
			else {\
				buf[-1] = ',';\
				snprintf((buf),copy_len,"%s\"", value);\
				}\
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_value_bkl(buf,key,fmt,args...) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,"\""key"\":"fmt",", ##args); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_value(buf,key,fmt,args...) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf), copy_len,"\""key"\":\""fmt"\",", ##args); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_value_raw(buf,key,fmt,args...) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf), copy_len,"\""key"\":"fmt",", ##args); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_value_llu json_value
#define json_value_l7_name(buf,name) do{\
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf), copy_len,"\"%s\":", name);\
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_number_l7(buf, number) do{\
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,"\"%d\",",number);\
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_value_var(buf,key,fmt,args...) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf), copy_len,"\"%s\":\""fmt"\",",key,##args); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)

#define json_string(buf,str) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf), copy_len,"\"%s\",",str); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)

#define json_number(buf,num) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,"%d,",num); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)

#define json_number_lu(buf,num) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,"%lu,",num); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)
#define json_number_llu(buf,num) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,"%llu,",num); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)

#define json_attach_comma(buf) do{ \
			if(cgi_len > CGI_JSON_COPY_LEN)\
				copy_len = CGI_JSON_COPY_LEN;\
			else\
				copy_len = cgi_len;\
			snprintf((buf),copy_len,","); \
			snprintf_len=strlen(buf);\
			cgi_len-=snprintf_len;\
			(buf) += snprintf_len; \
		}while(0)

#define json_eat_tail(buf) do{ \
			if(*(buf-1) == ',') \
				(buf)--; \
			*(buf)='\0'; \
		}while(0)

#ifdef __cplusplus 
}
#endif


#endif /*_CGI_JSON_H_*/

