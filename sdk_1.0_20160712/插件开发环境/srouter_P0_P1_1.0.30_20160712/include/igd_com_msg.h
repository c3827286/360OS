#ifndef _IGD_NEWHTML_MSG_H_
#define _IGD_NEWHTML_MSG_H_

#ifdef __cplusplus 
extern "C" {
#endif
enum {
  /*0 */  C_SUCCESS,
  /*1 */  C_DATAERR  ,//("数据发生错误")
  /*2 */  C_ERR_NULL  ,//("数据输入不完整")
  /*3 */  C_ERR_IP  ,//("IP地址有错")
  /*4 */  C_ERR_MASK  ,//("掩码地址有错")
  /*5 */  C_ERR_GW  ,//("网关地址有错")
  /*6 */  C_ERR_IP_MASK  ,//("IP地址与掩码不匹配")
  /*7 */  C_ERR_IP_NUM  ,//("起始IP大于结束IP")
  /*8 */  C_ERR_MEM  ,//("设置时分配内存失败")
  /*9 */  C_ERR_MAC  ,//("MAC地址有错")
  /*10*/  C_ERR_PORT  ,//("端口范围应设为1-65535")
  /*11*/  C_ERR_SET  ,//("设置失败")
  /*12*/  C_ERR_MAX  ,//("输入的数据超过最大值")
  /*13*/  C_ERR_NUM_ERR, //数字错误
  /*14*/  C_ERR_LIST  ,//("条目已添加满")
  /*15*/  C_ERR_PASSWD  ,//("两次输入的密码不匹配")
  /*16*/  C_ERR_LENGTH  ,//("输入的数据长度过长")
  /*17*/  C_ERR_DNS  ,//("DNS地址有错")
  /*18*/  C_ERR_TIME  ,//("时间设置有错")
  /*19*/  C_ERR_ENTRY_NOT_EXIST,//条目不存在
  /*20*/  C_ERR_SERVERIP  ,//("服务器IP地址有错")
  /*21*/  C_ERR_EMAIL, //邮箱地址有误
  /*22*/  C_ERR_ENTRY_EXIST,//条目已存在
  /*23*/  C_ERR_DHCP_IP_NOT_IN_POOL,//IP不在地址池内
  /*24*/  C_ERR_WAN_MTU,	 			//WAN MTU 值错误
  /*25*/  C_ERR_NAME_EXIST,  //名称已存在
  /*26*/  C_ERR_PORT_EXIST,	//("端口范围在已存在列表内")
  /*27*/  C_ERR_EXIST_IN_BLACK,  //("该条目在黑名单中已存在")
  /*28*/  C_ERR_EXIST_IN_WHITE,  //("该条目在白名单中已存在")
  /*29*/  C_ERR_KEY,			//key错误
  /*30*/  C_WIFI_PIN_ERROR,		//PIN码有错
  /*31*/  C_WIFI_PSK_ERROR,				/* Preshare key 太短或太长 */
  /*32*/  C_WIFI_WEP_WPA_CAN_NOT_COEX,		/* WEP和WPA,WPA2不能共存 */
  /*33*/  C_WIFI_WEP_CURRENT_KEY_TOO_BIG,	/* WEP current key index大于等于4, 合法值为0-3 */
  /*34*/  C_WIFI_SAME_BSSID,	/* 在配置AP_BASIC时，新配置的BSSIC(MAC_ADDR)与已经存在的BSSID相同 */
  /*35 */ C_ERR_CHARGE, /*  账户到期 */
  /*36 */ C_ERR_USER_PASSWD, /* 用户名或密码错误 */
  /*37 */  C_ERR_IP_POOL,
  /*38 */  C_ERR_FILE_NO_EXIST,  /**/
  /*39 */  C_ERR_USER_NAME, //用户名包含无效字符
  /*40 */  C_ERR_PASSWORD, //密码包含无效字符
  /*41 */  C_ERR_IFC_EXIST_BIND, //接口已经绑定
  /*42 */ C_ERR_PROHIBIT, /*  操作被禁止 */
  /*43 */  C_ERR_UGRP_RULE_EXIST,/*  该用户组的规则已经设置 */
  /*44 */  C_ERR_WITHOUT_PERMISSION,/*  无权限 */
  /*45 */  C_ERR_FILE,/*文件类型错误 */
  /*46 */  C_ERR_OLD_NEW_PASSWD_SAME,/* 新旧密码一样 */
  /*47 */  C_ERR_OLD_PASSWD,/* 原密码错误 */
  /*48 */  C_ERR_SESSION,/* 创建会话失败 */
  /*49 */  C_ERR_SESSION_FULL,/* 已到最大会话数 */
  /*50 */  C_ERR_TOKEN, /* 生成token失败 */
  /*51 */  C_ERR_USER_MAX,/* 登录用户过多数 */
  /*52 */  C_ERR_LOGIN_MAX_COUNT,/* 登录次数过多 */
  /*53 */  C_ERR_NOT_CGI,/* CGI不存在 */
  /*54 */  C_ERR_FREQUENTLY,/* 操作太频繁 */
  /*55 */  C_ERR_FILE_TOO_BIG,/* 文件太大*/
  /*56 */  C_ERR_PROG_ALREADY_RUNNING,/* 程序已经在运行*/

  /*----storage manange common code begin-----*/
  /*57 */  C_ERR_OPERATEFAILED, 	  // 操作失败
  /*58 */  C_ERR_ACTION,			  // action错误
  /*59 */  C_ERR_DATA,				  // 数据错误
  /*60 */  C_ERR_UNKOWN,			  // 未知错误
  /*61 */  C_ERR_PATHNULL,			  // path为空
  /*62 */  C_ERR_PARAMNULL, 		  // 参数为空
  /*63 */  C_ERR_SPACENOTENOUGH,	  // 空间不足
  /*64 */  C_ERR_FILENOTEXIST,		  // 文件不存在
  /*65 */  C_ERR_DIRNOTEXIST,		  // 目录不存在
  /*66 */  C_ERR_TARGETNOTEXIST,	  // 目标不存在
  /*67 */  C_ERR_TARGETEXIST,		  // 目标已存在
  /*68 */  C_ERR_SAMBANOTSUPPORT,	  // samba未支持
  /*69 */  C_ERR_FILESIZENULL,		  // 上传文件大小为空
  /*70 */  C_ERR_FILETYPEERR,		  // 文件类型错误 
  /*71 */  C_ERR_FILECREATETIMENULL,  // 文件创建时间为空
  /*72 */  C_ERR_DISKNOTEXIST,		  // 外设不存在
  /*73 */  C_ERR_DISKAVAILABLE,		  // 外设不可用
  /*74 */  C_ERR_GETUSERDIR,		  // 获取用户对应路径失败
  /*75 */  C_ERR_GETBACKUPSDIR,		  // 获取云盘备份路径失败
  /*76 */  C_ERR_USERNOTBINDPHONE,	  // 未绑定手机
  /*77 */  C_ERR_USERNOAUTH,	      // 用户未认证
  /*78 */  C_ERR_USERINAUTH,		  // 用户认证中
  /*79 */  C_ERR_USERAUTHFAILED,	  // 用户认证失败
  /*remain 80~99 for storage manange*/
  /*----storage manange common code end-----*/

  /*100*/  C_ERR_RULE_CONFLICT = 100,		// 规则冲突

 /*------plug-in installation common code begin------*/
  /*201 - 300*/
  /*300-44*/ C_ERR_IS_NO_SPACE = 256,		//���̿ռ䲻��
  /*300-43*/ C_ERR_IS_INSTALL_MOUNT_FAIL, 	//�����װmountʧ��			
  /*300-42*/ C_ERR_IS_UMOUNT_OLD_FAIL,		//֮ǰ���ڲ��umountʧ��				
  /*300-41*/ C_ERR_IS_TASK_SIGNATURE_ERROR,	//����ǩ������
  /*300-40*/ C_ERR_IS_SAVE_PATH_FAIL,		//����·������ʧ��
  /*300-29*/ C_ERR_IS_NO_PART = 271,		//û�пɰ�װ����
  /*300-9*/  C_ERR_IS_GET_BUFF_FAIL = 291,	//��װ�ڲ�buffer��ȡʧ��
  /*300-8*/  C_ERR_IS_GET_JSON_FAIL,		//app.json����ʧ��
  /*300-7*/  C_ERR_IS_INSTALLING,			//����install���������Ѵ���һ����װ����
  /*300-5*/  C_ERR_IS_WGET_FAIL = 295,		//WGET���س���
  /*300-4*/  C_ERR_IS_GET_MSG_MOUNT_FAIL , 	//�����Ϣ��ȡmountʧ��
  /*300-3*/  C_ERR_IS_LOOP_AND_ACCES_FAIL ,	//loop�ڵ���ļ�����ʧ��
  /*300*/ 	 C_ERR_IS_MAX = 300,				//�����װ���������ֵ
  /*------plug-in installation common code end------*/

  /*------plug-in uninstall common code begin------*/
  /*301 - 400*/
  /*400-29*/ C_ERR_UIS_NO_PART = 371,    	//û�пɰ�װ����
  /*400-4*/ C_ERR_UIS_DEL_FAIL = 396,		//���ɾ��ʧ��
  /*400-3*/ C_ERR_UIS_STOP_OR_UMOUNT_FAIL, 	//���ͣ�û�umountʧ��
  /*400-2*/ C_ERR_UIS_DO_NOT_UNINSTALL,  	//�������ж��
  /*400-1*/ C_ERR_UIS_NO_INSTALLED , 		//���δ��װ
  /*400*/ 	C_ERR_UIS_MAX,					//���ж�ش��������ֵ
  /*------plug-in uninstall common code end------*/

  /**/  C_ERR_END
};

#define C_ERRIP_IP C_ERR_IP
#define C_ERR_OVERFLOW  C_ERR_MAX
#define C_ERR_NUM C_ERR_NUM_ERR
#define C_ERR_NONTIME C_ERR_TIME
#define C_ERR_PASSWORD C_ERR_PASSWD


enum{
	CGI_MSG_INIT=0,
	//系统状态
	CGI_INTERFACE_MSG_CONNECT,
	CGI_INTERFACE_MSG_DISCONNECT,
	CGI_MISC_SYS_STATUS_DUMP,
	CGI_INTERFACE_CONN_MSG_DUMP,
	CGI_INTERFACE_CONN_SPEED_MSG_DUMP,
	CGI_INTERFACE_LINE_MSG_DUMP,
	CGI_INTERFACE_MAP_DUMP,
	CGI_FILTER_MSG_HOSTS_DUMP,
	CGI_FILTER_MSG_CONNS_DUMP,
	CGI_FILTER_MSG_MODULE_DUMP,
	CGI_LOG_CLEAN,
	CGI_LOG_DUMPT,
	CGI_CB_LOG_DUMP,
	CGI_CB_LOG_CLEAN,
	CGI_LOG_REMOTE_SET,
	CGI_LOG_REMOTE_GET,

	//网络配置
	CGI_MSG_WAN_CONFIG_STATIC,
	CGI_MSG_WAN_CONFIG_DHCP,
	CGI_MSG_WAN_CONFIG_PPPOE,
	CGI_MSG_WAN_CONFIG_SPEED_PPPOE,
	CGI_MSG_WAN_CONFIG_CNCGROUP_PPPOE,
	CGI_MSG_WAN_CONFIG_BROADCASE_STATIC,
	CGI_MSG_WAN_CONFIG_HLJ_STATIC,
	CGI_MSG_WAN_CONFIG_HN_DHCP,
	CGI_MSG_WAN_CONFIG_HN_PPPOE,
	CGI_MSG_WAN_CONFIG_SHOW,
	CGI_MSG_WAN_NUM_SHOW,
	CGI_MSG_WAN_NUM_SET,
	CGI_MSG_NS_MODE_SHOW,
	CGI_MSG_NS_MODE_SET,

	CGI_ISP_ROUTE_POLICY_SET,
	CGI_ISP_ROUTE_POLICY_DEL,
	CGI_ISP_ROUTE_POLICY_LIST_SHOW,

	CGI_MSG_LAN_MAC_DUMP,
	CGI_MSG_INTERFACE_LAN_IP_ALL_DUMP,
	CGI_MSG_INTERFACE_LAN_ADD_ADDR,
	CGI_MSG_INTERFACE_LAN_CHANGE_ADDR,
	CGI_MSG_INTERFACE_LAN_DEL_ADDR,
	CGI_MSG_INTERFACE_LAN_CLEAN_ADDR,
	CGI_MSG_INTERFACE_LAN_MAC_CHAN,
	CGI_MSG_INTERFACE_LAN_CHNAGE_ADDR,
	CGI_MSG_INTERFACE_WAN_MAC_SET,
	CGI_MSG_INTERFACE_DNS_SET,
	CGI_MSG_INTERFACE_WAN_SET,
	CGI_MSG_INTERFACE_DUMP,
	CGI_MSG_DHCP_CONFIG_DUMP,
	CGI_MSG_DHCP_CONFIG_SET,
	CGI_MSG_DHCP_STATICIP_DUMP,
	CGI_MSG_DHCP_DYNAMIC_IP_DUMP,
	CGI_MSG_DHCP_DEL_HOST,
	CGI_MSG_DHCP_CLEAN_HOST,
	CGI_MSG_DHCP_ADD_HOST,
	CGI_MSG_DHCP_MOD_HOST,
	CGI_MSG_DHCP_AP_SET,
	CGI_MSG_IFSTATE_ISP_SET,
	CGI_MSG_INTERFACE_WORK_MODE_SET,
	CGI_MSG_QOS_INTERFACE_BANDWIDTH_SET,
	CGI_MSG_PORT_CONFIG_DUMP,
	CGI_MSG_PORT_CONFIG_SET,
	CGI_MSG_WAN_POLICY_DUMP,
	CGI_MSG_WAN_POLICY_SET,
	//上网行为管理
	CGI_FILTER_MSG_L7_TIME_GRP,
	CGI_FILTER_MSG_L7_APP_EXP,
	CGI_FILTER_MSG_L7_TIME_GRP_DUMP_ALL,
	CGI_FILTER_MSG_L7_GROUP,
	CGI_FILTER_MSG_L7_GROUP_DUMP_ALL,
	CGI_FILTER_MSG_L7_OFF,
	CGI_FILTER_MSG_L7_OFF_DUMP,
	CGI_FILTER_MSG_L7_EMAIL,
	CGI_FILTER_MSG_L7_URL_KEY_DUMP,
	CGI_FILTER_MSG_L7_URL_KEY,
	CGI_FILTER_MSG_L7_GROUP_DUMP,
	CGI_FILTER_MSG_L7_APP_DUMP,
	CGI_FILTER_MSG_L7_APP_TIME_DUMP,
	CGI_FILTER_MSG_L7_ADV_DUMP,
	CGI_FILTER_MSG_L7_ADV,
	CGI_FILTER_MSG_L7_APP,
	CGI_FILTER_MSG_L7_QQ,
	CGI_FILTER_MSG_L7_MSN,
	CGI_FILTER_MSG_L7_URL_CLEAN,
	CGI_FILTER_MSG_L7_QQ_CLEAN,
	CGI_FILTER_MSG_L7_MSN_CLEAN,
	CGI_FILTER_MSG_L7_MSN_DUMP,
	CGI_FILTER_MSG_L7_QQ_DUMP,
	CGI_FILTER_MSG_L7_EMAIL_DUMP,
	CGI_FILTER_MSG_L7_LOG_DUMP,
	CGI_FILTER_MSG_L7_LOG_DEL,
	CGI_FILTER_MSG_L7_QQ_DETAIL_DUMP,
	CGI_FILTER_MSG_L7_CALLBOARD_TEXT_GET,
	CGI_FILTER_MSG_L7_CALLBOARD_TEXT_SET,
	CGI_FILTER_MSG_L7_CALLBOARD_USER_GET,
	CGI_FILTER_MSG_L7_CALLBOARD_USER_SET,
	CGI_FILTER_MSG_L7_WEB_AUTH_PARA_SET,
	CGI_FILTER_MSG_L7_WEB_AUTH_PARA_GET,
	CGI_FILTER_MSG_L7_WEB_AUTH_USER_SET,
	CGI_FILTER_MSG_L7_WEB_AUTH_USER_GET,
	CGI_FILTER_MSG_L7_WEB_AUTH_HOST_GET,
	CGI_FILTER_MSG_L7_WEB_AUTH_HTM_SET,
	CGI_FILTER_MSG_L7_URL_REDIRECT_SET,
	CGI_FILTER_MSG_L7_URL_REDIRECT_DUMP,
	CGI_FILTER_MSG_L7_CALLBOARD_LOG_DEL,
	CGI_FILTER_MSG_L7_CALLBOARD_LOG_GET,
	//网络安全
	CGI_CALL_MANAGE_CLEAN,
	CGI_CALL_MANAGE_DEL,
	CGI_CALL_MANAGE_DUMP,
	CGI_CALL_MANAGE_SET,
	CGI_CALL_MANAGE_MODIFY,
	CGI_CALL_CONTROL_ARGS_DUMP,
	CGI_CALL_CONTROL_ARGS_SET,
	CGI_FILTER_MSG_DNS_ARGS_SET,
	CGI_FILTER_MSG_DNS_ARGS_DUMP,
	CGI_FILTER_MSG_DNS_DUMP,
	CGI_FILTER_MSG_DNS_DEL,
	CGI_FILTER_MSG_DNS_CLEAN,
	CGI_NAT_ATTACK_LOG_CLEAN,
	CGI_NAT_ATTACK_SCOUT_DUMP,
	CGI_HOST_CONN_DEFAULT_LIMIT_SET,
	CGI_HOST_CONN_DEFAULT_LIMIT_DUMP,
	CGI_HOST_CONN_LIMIT_ADD,
	CGI_HOST_CONN_LIMIT_MOD,
	CGI_HOST_CONN_LIMIT_DEL,
	CGI_HOST_CONN_LIMIT_DEL_ALL,
	CGI_HOST_CONN_LIMIT_DUMP,
	CGI_ARP_MODE_DUMP,
	CGI_ARP_BIND_DEF,
	CGI_ARP_DEFENCE,
	CGI_ARP_DEFENCE_SHOW,
	CGI_ARP_ALL_BIND,
	CGI_ARP_ALL_DEL,
	CGI_ARP_LIST_ALL_DEL,
	CGI_ARP_HAND_BIND,
	CGI_ARP_MODIFY,
	CGI_ARP_DEL,
	CGI_ARP_AUTO_BIND,
	CGI_ARP_UNDO_AUTO_BIND,
	CGI_ARP_FILE_OUT_DUMP,
	CGI_ARP_FILE_IN_BIND,
	CGI_ARP_BIND_DUMP_ALL,
	CGI_FILTER_MSG_DDOS_LOG_CLEAN,
	CGI_FILTER_MSG_DDOS_LOG_DUMP,
	CGI_NTOOLS_STOP_SET,
	CGI_NTOOLS_START_SET,
	CGI_NTOOLS_INFO_DUMP,
//FLAG20111208 start
    CGI_NTOOLS_TCPDUMP_START_SET,
	CGI_NTOOLS_TCPDUMP_STOP_SET,
	CGI_NTOOLS_TCPDUMP_INFO_DUMP,
//FLAG20111208 end

	//应用服务
	CGI_VIRTUAL_SERVICE_DEL_SET,
	CGI_VIRTUAL_SERVICE_ADD_SET,
	CGI_VIRTUAL_SERVICE_CLEAN_SET,
	CGI_VIRTUAL_SERVICE_MODIFY_SET,
	CGI_VIRTUAL_SERVICE_LIST_DUMP,
//FLAG20120321 start
	CGI_STATIC_NAT_DEL_SET,
	CGI_STATIC_NAT_ADD_SET,
	CGI_STATIC_NAT_CLEAN_SET,
	CGI_STATIC_NAT_MODIFY_SET,
	CGI_STATIC_NAT_LIST_DUMP,
//FLAG20120321 end
	CGI_DMZ_PARAM_DEL_SET,
	CGI_DMZ_PARAM_ADD_SET,
	CGI_DMZ_ADD_SET,
	CGI_DMZ_LIST_DUMP,
	CGI_DMZ_SHOW_DUMP,
	CGI_MISC_UPNP_CLEAN_SET,
	CGI_MISC_UPNP_MODIFY_SET,
	CGI_MISC_UPNP_DEL_SET,
	CGI_MISC_UPNP_ADD_SET,
	CGI_MISC_UPNP_SET,
	CGI_UPNP_LIST_DUMP,
	CGI_UPNP_SWITCH_DUMP,
	CGI_MISC_UPNP_INFO_DEL,
	CGI_MISC_UPNP_INFO_DUMP,
	CGI_ALG_DUMP,
	CGI_ALG_SET,
	CGI_FTP_LIST_ADD_SET,
	CGI_FTP_LIST_MODIFY_SET,
	CGI_FTP_LIST_DEL_SET,
	CGI_FTP_LIST_CLEAN_SET,
	CGI_FTP_LIST_DUMP,
	//QOS
	CGI_QOS_BASIC_SETUP_SET,
	CGI_QOS_BASIC_SETUP_DUMP,
	CGI_FILTER_HTBQOS_RULE_ADD,
	CGI_FILTER_HTBQOS_RULE_CHANGE,
	CGI_FILTER_HTBQOS_RULE_DUMP,
	CGI_FILTER_HTBQOS_RULE_CLEAN,
	CGI_FILTER_HTBQOS_RULE_DEL,
	CGI_FIREWALL_MODULE_DUMP,
	CGI_QOS_XIANZ_DUMP,
	CGI_QOS_XIANZ_CLEAN,
	CGI_QOS_XIANZ_DEL,
	CGI_QOS_XIANZ_ADD,
	CGI_QOS_XIANZ_MODIFY,
	CGI_QOS_XIANZ_OK,
	CGI_QOS_XIANZ_DEF_SET,
	CGI_QOS_XIANZ_DEF_SHOW,
	CGI_QOS_XIANZ_OK_DUMP,
	CGI_MSG_QOS_APP_DUMP,
	CGI_MSG_QOS_APP_ADD,
	CGI_MSG_QOS_APP_MODIFY,
	CGI_MSG_QOS_APP_DEL,
	CGI_MSG_QOS_APP_CLEAN,
	CGI_MSG_QOS_APP_SMALL_PACKET_PRIOR_SET,
	CGI_MSG_QOS_APP_SMALL_PACKET_PRIOR_GET,
	CGI_QOS_BAOZ_DUMP,
	CGI_QOS_BAOZ_CLEAN,
	CGI_QOS_BAOZ_DEL,
	CGI_QOS_BAOZ_ADD,
	CGI_QOS_BAOZ_MODIFY,
	//高级设置
	CGI_ROUTE_TYPE_SHOW,
	CGI_ROUTE_TYPE_SELECT,
	CGI_DDNS_RESET,
	CGI_DDNS_DUMP,
	CGI_DDNS_3322_RESET,
	CGI_DDNS_MEIBU_RESET,
	CGI_DDNS_ORAY_RESET,
	CGI_ROUTE_DUMP,
	CGI_ROUTE_ALL_DUMP,
	CGI_ROUTE_DEL,
	CGI_ROUTE_CLEAN,
	CGI_ROUTE_ADD,
	CGI_ROUTE_MODIFY,
	CGI_MISC_LAN2LAN_SHOW,
	CGI_FILTER_MSG_DUMP,
	CGI_FILTER_MSG_PROUTE_CLEAN,
	CGI_FILTER_MSG_PROUTE_DUMP,
	CGI_FILTER_MSG_APPR_DUMP,
	CGI_FILTER_MSG_SROUTE_DUMP,
	CGI_FILTER_MSG_PROUTE_DEFAULT_ADD,
	CGI_FILTER_MSG_PROUTE_DEFAULT_DUMP,
	CGI_FILTER_MSG_PROUTE_RULE_ADD,
	CGI_FILTER_MSG_PROUTE_RULE_MOD,
	CGI_FILTER_MSG_RULE_ADD,
	CGI_FILTER_MSG_PROUTE_DEL,
	CGI_MSG_DNSMASQ_DUMP,
	CGI_MSG_DNSMASQ_ADDHOST,
	CGI_MSG_DNSMASQ_MODIFY,
	CGI_MSG_DNSMASQ_DELHOST,
	CGI_MSG_DNSMASQ_CLEANHOST,
	//CGI_MISC_PORTMIRROR_DUMP,
	//CGI_MISC_PORTMIRROR,
	CGI_MSG_VLAN_DUMP,
	CGI_MSG_VLAN_SETPARAM,
	CGI_MISC_SYSTIME_DUMP,
	CGI_MISC_SYSTIME,
	CGI_IGMP_SET,
	CGI_IGMP_DUMP,
	//FLAG20120203 start
	CGI_WAKE_UP_SET,
	//FLAG20120203 end
	//VPN
	CGI_PPTPD_PARAM_SET,
	CGI_PPTPD_CONFIG_SHOW,
	CGI_PPTPD_DELUSER_SET,
	CGI_PPTPD_ADDUSER_SET,
	CGI_PPTPD_CLEANUSER_SET,
	CGI_PPTPD_MODIFYUSER_SET,
	CGI_PPTPD_USER_DUMP,
	CGI_PPTPD_CLIENT_DUMP,
	CGI_PPTP_CLIENT_LINK,
	CGI_PPTP_CLIENT_DOWN,
	CGI_PPTP_CLIENT_SET,
	CGI_PPTP_CLIENT_DEL,
	CGI_PPTP_CLIENT_CLEAN,
	CGI_CLIENT_PPTP_PARAM_SET,
	CGI_CLIENT_PPTP_CONFIG_SHOW,
	CGI_CLIENT_PPTP_CONN_STATUS,
	CGI_CLIENT_PPTP_CONN,
	CGI_CLIENT_PPTP_DISCONN,
	CGI_CLIENT_L2TP_PARAM_SET,
	CGI_CLIENT_L2TP_CONFIG_SHOW,
	CGI_CLIENT_L2TP_CONN_STATUS,
	CGI_CLIENT_L2TP_CONN,
	CGI_CLIENT_L2TP_DISCONN,
	//系统工具
	CGI_WEBS_PASSWORD_SET,
	CGI_WEB_PORT_SET,
	CGI_WEB_PORT_DUMP,
	CGI_WEB_REMOTE_PORT_SET,
	CGI_WEB_REMOTE_PORT_DUMP,
	CGI_MISC_PARAM_RESTOREDEFAULT,
	CGI_MISC_REBOOT,
	CGI_WAN_ISP_PROUTE_SET,
	CGI_WAN_ISP_PROUTE_DUMP,
	CGI_WAN_LOAD_SET,
	CGI_WAN_LOAD_SHOW,
	//无线
	CGI_WIRE_BASE_AP_SET,
	CGI_WIRE_SECOND_AP_SET,
	CGI_WIRE_ADV_SET,
	CGI_WIRELESS_BASE_SHOW,
	CGI_WIRELESS_AP_SCAN_DUMP,
	CGI_WIRELESS_SEC_AP_SHOW,
	CGI_WIRELESS_SEC_AP_QS_SHOW,
	CGI_WIRELESS_SEC_REPEATER_SHOW,
	//CGI_WIRELESS_SEC_WDS_SHOW,
	CGI_WIRELESS_FILTER_MAC_STATUS_SHOW,
	CGI_WIRELESS_FILTER_MAC_LIST_DUMP,
	CGI_WIRE_WDS_ST_DUMP,
	CGI_WIRELESS_WDS_LIST_DUMP,
	CGI_WIRELESS_ADVANCE_SHOW,
	CGI_WIRE_WDS_SET,
//	CGI_WIRE_WDS_MAC_DEL,
	CGI_WIRELESS_FILTER_MAC_SET,
	CGI_WIRE_SEC_AP_SET,
	//CGI_WIRE_SEC_WDS_SET,
	CGI_WIRE_FILTER_MAC_ADD,
	CGI_WIRE_FILTER_MAC_AUTO_ADD,
	CGI_WIRE_FILTER_MAC_DEL,
	CGI_WIRELESS_CONNECT_SHOW,
	CGI_WPS_STATUS_SET,
	CGI_WIRE_WPS_DUMP,
	/*  ip pool */
	CGI_MSG_IP_POOL,
	CGI_MSG_IP_POOL_DUMP_ALL,
	CGI_MSG_IP_POOL_DUMP,
	/*  ip forward mode*/
	CGI_MSG_ACCESS_MODE,
	CGI_MSG_ACCESS_MODE_DUMP,
	CGI_MSG_END
};

extern char *parame_file_flag_str;

#ifdef __cplusplus 
}
#endif

#endif
