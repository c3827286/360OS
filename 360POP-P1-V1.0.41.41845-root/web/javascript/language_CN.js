﻿var language = {};
language.CN = {
	TITLE:"360安全路由",
	//按钮
	BUTTON:{
		down_app_btn:"立即体验",
		btn_login:"登录",
		btn_confirm:"确定",
		btn_cancel:"取消",
		btn_refresh:"刷新",
		btn_delete:"删除",
		btn_default:"恢复出厂设置",
		btn_version_check:"版本检测",
		btn_update:"立刻升级",
		btn_reboot:"立即重启",
		btn_cancel_download:"取消下载",
		btn_clone_mac:"MAC地址克隆",
		btn_recover_mac:"恢复缺省MAC",
		btn_connect:"连接",
		btn_finish_guide:"完成向导",
		btn_exit_guide:"退出向导",
		btn_set_wireless:"配置无线",
		btn_set_bind:"配置绑定",
		btn_continue_set:"继续配置",
		btn_recheck:"重新检测",
		btn_akey_refresh_check:"重新测试",
		btn_continue_wait:"继续等待",
		btn_now_bind:"立即绑定",
        btn_re_diagnosis:"重新诊断",
        btn_callback:"返回",
        btn_shutDown:"关闭",
        btn_scan_device:"扫描智能设备",
        btn_scan_again:"重新扫描",
        btn_a_key_connect:"一键连接",
        btn_repair:"立即修复",
        btn_akey_repair:"一键修复",
        btn_akey_set:"一键设置",
        btn_resolved:"已经解决",
        btn_unresolved:"还没有解决",
        btn_finish_check:"完成检测",
		btn_immediately_set:"立即设置",
		btn_not_show_again:"不再显示"
	},
	//下拉框
	SELECT:{
		wan_mode: [
			{value:1, 	txt:"宽带拨号 "},//PPPoE 用户 (ADSL)
			{value:2, 	txt:"动态地址上网 "},//动态IP 用户 (Cable Modem)
			{value:3, 	txt:"静态地址上网 "}//静态IP 用户
		],
		wan1_select:[
			{value:"auto", 	txt:"自动模式"},
			{value:"10f", 	txt:"10M全双工"},
			{value:"10h", 	txt:"10M半双工"},
			{value:"100f", 	txt:"100M全双工"},
			{value:"100h", 	txt:"100M半双工"}
		],
		quick_wan_mode:[
			{value:1, 	txt:" 宽带拨号 "},
			{value:2, 	txt:"动态地址上网 "},
			{value:3, 	txt:"静态地址上网 "}
		],
		wireless_base_2_4_channel_sel:[
			{value:0, 	txt:"自动"},
			{value:1, 	txt:"信道 1"},
			{value:2, 	txt:"信道 2"},
			{value:3, 	txt:"信道 3"},
			{value:4, 	txt:"信道 4"},
			{value:5, 	txt:"信道 5"},
			{value:6, 	txt:"信道 6"},
			{value:7, 	txt:"信道 7"},
			{value:8, 	txt:"信道 8"},
			{value:9, 	txt:"信道 9"},
			{value:10, 	txt:"信道 10"},
			{value:11, 	txt:"信道 11"},
			{value:12, 	txt:"信道 12"},
			{value:13, 	txt:"信道 13"}
		],
		wireless_base_5_channel_sel:[
			{value:0, 	txt:"自动"},
			{value:36, 	txt:"信道 36"},
			{value:40, 	txt:"信道 40"},
			{value:44, 	txt:"信道 44"},
			{value:48, 	txt:"信道 48"},
			{value:52, 	txt:"信道 52"},
			{value:56, 	txt:"信道 56"},
			{value:60, 	txt:"信道 60"},
			{value:64, 	txt:"信道 64"},
			{value:149, 	txt:"信道 149"},
			{value:153, 	txt:"信道 153"},
			{value:157, 	txt:"信道 157"},
			{value:161, 	txt:"信道 161"},
			{value:165, 	txt:"信道 165"}
		],
		wls_2_4_ap_mode_sel:[
			{value:0, 	txt:"无"},
			{value:3, 	txt:"WPA2-PSK AES"},
			{value:4, 	txt:"WPA/WPA2-PSK AES"}			 
		],
		wls_5_ap_mode_sel:[
			{value:0, 	txt:"无"},
			{value:3, 	txt:"WPA2-PSK AES"},
			{value:4, 	txt:"WPA/WPA2-PSK AES"}
		],
		timezone_sel:[
			{value:12, 	txt:"(GMT-12:00)埃尼威托克,夸贾林岛"},
			{value:11, 	txt:"(GMT-11:00)中途岛,萨摩亚群岛"},
			{value:10, 	txt:"(GMT-10:00)夏威夷"},
			{value:9, 	txt:"(GMT-09:00)阿拉斯加"},
			{value:8, 	txt:"(GMT-08:00)太平洋时间(美国和加拿大);蒂华"},
			{value:7, 	txt:"(GMT-07:00)山地时间(美国和加拿大);亚利桑那"},
			{value:6, 	txt:"(GMT-06:00)中部时间(美国和加拿大);中美洲"},
			{value:5, 	txt:"(GMT-05:00)东部时间(美国和加拿大);波哥达"},
			{value:4, 	txt:"(GMT-04:00)大西洋时间(加拿大);加拉加斯"},
			{value:3, 	txt:"(GMT-03:00)巴西利亚,布宜诺斯艾利斯,乔治敦,格陵兰"},
			{value:2, 	txt:"(GMT-02:00)中大西洋"},
			{value:1, 	txt:"(GMT-01:00)佛得角群岛,亚速尔群岛"},
			{value:0, 	txt:"(GMT)格林威治平时;都柏林,爱丁堡,伦敦,里斯本"},
			{value:-1, 	txt:"(GMT+01:00)阿姆斯特丹,柏林,罗马,斯得哥尔摩,巴黎"},
			{value:-2, 	txt:"(GMT+02:00)开罗,雅典,伊斯坦布尔,明斯克,耶路撒冷"},
			{value:-3, 	txt:"(GMT+03:00)巴格达,科威特,利雅得,莫斯科,圣彼得堡"},
			{value:-4, 	txt:"(GMT+04:00)阿布扎比,马斯喀特,巴库,第比利斯,埃里温"},
			{value:-5, 	txt:"(GMT+05:00)叶卡捷林堡,伊斯兰堡,卡拉奇,塔什干"},
			{value:-6, 	txt:"(GMT+06:00)阿拉木图,新西伯利亚,阿斯塔纳,达卡"},
			{value:-7, 	txt:"(GMT+07:00)曼谷,雅加达,河内"},
			{value:-8, 	txt:"(GMT+08:00)北京,重庆,乌鲁木齐,香港特别行政区,台北"},
			{value:-9, 	txt:"(GMT+09:00)东京,大坂,札幌,汉城,雅库茨克"},
			{value:-10, txt:"(GMT+10:00)布里斯班,关岛,堪培拉,墨尔本,悉尼"},
			{value:-11, txt:"(GMT+11:00)马加丹,索罗门群岛,新喀里多尼亚"},
			{value:-12, txt:"(GMT+12:00)富士,勘察加半岛,马绍尔群岛,惠灵顿"},
			{value:-13, txt:"(GMT+13:00)努库阿洛法"}
		],
		reboot_mode:[
			{value:0, txt:"每天"},
			{value:1, txt:"每周"},
			{value:2, txt:"一次"}
		],
		wlb_2_4_channel_width_sel:[
			{value:4, txt:"自动"},
			{value:2, txt:"20M(抗干扰能力强)"},
			{value:3, txt:"40M(速度快)"}
		],
		wlb_5_channel_width_sel:[
			{value:6, txt:"自动"},
			{value:2, txt:"20M"},
			{value:4, txt:"40M"},
			{value:5, txt:"80M"}
		],
		wireless_base_band_sel:[
			{value:2, txt:"802.11b"},
			{value:4, txt:"802.11g"},
			{value:8, txt:"802.11n"},
			{value:6, txt:"802.11b+g"},
			{value:12, txt:"802.11g+n"},
			{value:14, txt:"802.11b+g+n"}
		],
        ldpc_enable_sel:[
            {value:0, txt:"发送接收关闭"},
            {value:1, txt:"发送接收开启"},
            {value:2, txt:"发送开启/接收关闭"}
        ],
		wireless_preamble_sel:[
			{value:0, txt:"长帧"},
			{value:1, txt:"短帧"}
		],
        vendor_sel:[
            /*{value:"Qihoo_360", txt:"奇虎360智能硬件"},*/
            {value:"Haier", txt:"海尔智能家电"}/*,*/
            /*{value:"Broadlink_DNA", txt:"博联智能硬件"}*/
        ]
	},
	//页面中呈现的部分
	HTML:{
		//快速配置pc端
		pc_index:{
			btn_pppoe_data_type:"设置完宽带账号后，您的手机、电脑就可以上网了",
			btn_dhcp_data_type:"自动获取IP地址等上网信息",
			btn_static_data_type:"设置完成后，您的手机、电脑就可以上网了",
			"wifi-password_placeholder":"WiFi和管理密码(8位以上)",
			"admin-password_placeholder":"8-30位管理密码",
			steps_txt:"只需两步，新路由器就能畅快上网啦",
			start_btn:"立即开启",
			wan_detecting:"正在检测您家宽带的上网方式",
			detect_need:"检测大约需要",
			wait_time1:"秒，请稍候...",
			start_title:"开始上网",
			btn_pppoe:"宽带PPPoE",
			btn_dhcp:"动态IP上网",
			btn_static:"静态IP上网",
			lbl_pppoe:"宽带账号",
			lbl_pppoe_pwd:"宽带密码",
			lbl_ip:"IP地址",
			lbl_mask:"子网掩码",
			lbl_gateway:"默认网关",
			lbl_dns1:"首选DNS",
			lbl_dns2:"备用DNS",
			wan_tips:" 动态IP一般适用于企业或公司内部网络，<br/>连上路由器后就可以直接上网了",
			a_skip:"跳过，直接设置WiFi密码",
			a_pwd:"忘记宽带账号密码？",
			btn_start_net:"立即开始上网",
			router_assitant:"路由器小助手提醒您:",
			router_assitant_tip:"路由器支持电信、网通、小区宽带等各种宽带上网。请输入办宽带时给的上网账号和密码让路由器连接上宽带，如果您忘记了宽带账号密码请通过运营商的客服电话找回。",
			detect_link:"正在检测是否联网",
			detect_last:"检测大约需要",
			wait_time2:"秒，请稍候...",
			net_err_title:"请检查您的网线是否插好",
			btn_link_ok:"已经插好网线，再试一次",
			a_jump:"跳过，直接设置WiFi密码",
			linkout_title:"网络连接超时",
			btn_return:"返回重试",
			a_jumpto_wifi:"跳过，直接设置WiFi密码",
			forget_title:"忘记宽带账号密码怎么办？",
			get_user_pass:"通过下面两种方法找回您的宽带账号、密码",
			method1:"方法一：通过业务受理单找回",
			method1_txt:"通过宽带运营商办理的宽带业务受理单找到账号、密码",
			method2:"方法二：通过客服电话找回",
			method2_txt:"拨打您的宽带运营商电话人工服务找回账号、密码",
			telnum:"<div class=\"l\">中国联通 10010<br>网通宽带 10010<br>中国电信 10000<br>中国移动 10086<br>铁通宽带 10050<br>歌华有线 96196</div><div class=\"r\">艾普宽带 952155<br>长城宽带 96090090<br>蓝波宽带 010-65885277<br>中电飞华 010-51961096<br>方正宽带 010-82529990<br>宽带通&nbsp;&nbsp; 010-84603993</div>",
			linkok_title:"已经可以上网了",
			countiue_set_wifi:"继续设置WiFi，让手机可以无线上网",
			btn_set_wifi:"设置我的WiFi&nbsp;&nbsp;",
			wifi_title:"开始设置您的WiFi名称和密码",
			wifi_pwd_tip:"为了您的安全，建议选择数字和字母混合的密码",
			lbl_wifi:"WiFi名称",
			lbl_wifi_pwd:"WiFi密码",
			strength_title:"密码强度：",
			strength_high:"强",
			strength_medium:"中",
			strength_low:"弱",
			lbl_admin:"管理密码",
			strength_title2:"密码强度：",
			strength_high2:"强",
			strength_medium2:"中",
			strength_low2:"弱",
			same_password:"将WiFi密码同时设为路由器管理密码",
			wifi_focus:"WiFi密码",
			admin_focus:"管理密码",
			word1:"与路由器",
			word2:"相同，无需记忆多个密码",
			pass_tips:"设置完成后请用此密码登录路由器管理页面，此密码非常重要，请把此密码记在小本子上以防遗忘",
			btn_next:"下一步",
			wifi_fin_title:"WiFi设置完成",
			wifi_restart:"正在等待WiFi重启，请稍候",
			seconds:"秒",
			fin_title:"WiFi设置成功，开始畅快上网吧",
			relink:"请重新连接你的无线网络"
		},
		//快速配置mobile端
		mobile_index:{
			telnum:["中国联通","10010","长城宽带","96090090","网通宽带","10010","宽&nbsp;&nbsp;带&nbsp;&nbsp;通","010-84603993","中国电信","10000","艾谱宽带","952155","中国移动","10086","方正宽带","010-82529990","歌华宽带","96196","蓝波宽带","010-65885227","铁通宽带","10050","中电飞华","010-51961096"],
			btn_pppoe_data_type:"设置完宽带账号后，您的手机、电脑就可以上网了",
			btn_dhcp_data_type:"自动获取IP地址等上网信息",
			btn_static_data_type:"设置完成后，您的手机、电脑就可以上网了",
			"wifi-ssid_placeholder":"WiFi名称",
			"wifi-password_placeholder":"WiFi和管理密码(8位以上)",
			"admin-password_placeholder":"8-30位管理密码",
			thanks:"感谢使用",
			router:"360安全路由",
			btn_link_ok:"已经插好网线，再试一次",
			steps:"只需两步，新路由器就能畅快上网啦",
			start_install:"开始配置，两步上网",
			wan_detecting:"正在检测您家宽带的上网方式",
			detect_need:"大约需要",
			wait_time1:"秒时间，请稍候...",
			start_title:"开始上网",
			btn_pppoe:"宽带PPPoE",
			btn_dhcp:"动态IP上网",
			btn_static:"静态IP上网",
			lbl_pppoe:"宽带账号",
			lbl_pppoe_pwd:"宽带密码",
			a_skip1:"直接设置WiFi密码",
			a_pwd:"忘记宽带账号密码？",
			btn_start_net:"立即开始上网",
			wan_tips:"动态IP一般适用于企业或公司内部网络，连上路由器后就可以直接上网了",
			a_skip2:"直接设置WiFi密码",
			btn_start_net2:"立即开始上网",
			lbl_ip:"IP地址",
			lbl_mask:"子网掩码",
			lbl_gateway:"默认网关",
			lbl_dns1:"首选DNS",
			lbl_dns2:"备用DNS",
			a_skip3:"直接设置WiFi密码",
			btn_start_net3:"立即开始上网",
			detect_link:"正在检测宽带是否联网",
			detect_need:"检测大约需要",
			wait_time2:"秒，请稍候...",
			net_err_title:"请检查您的网线是否插好",
			a_skip:"跳过，直接设置WiFi密码",
			linkout_title:"网络连接超时",
			linkok_title:"已经可以上网了",
			continue_wifi:"继续设置WiFi无线网，让手机无线上网",
			btn_return:"返回重试",
			forget_title:"忘记账号和密码怎么办",
			get_user_pass:"通过以下两种方法找回您的宽带账号和密码",
			method1:"方法一：通过查找办理的宽带业务受理单",
			method2:"方法二：拨打宽带运营商电话人工查询",
			btn_close:"关闭",
			wifi_title:"开始设置您的WiFi名称和密码",
			lbl_wifi:"WiFi名称",
			lbl_wifi_pwd:"WiFi密码",
			lbl_admin:"管理密码",
			strength_title:"密码强度：",
			strength_high:"强",
			strength_medium:"中",
			strength_low:"弱",
			same_password:"将WiFi密码同时设为路由器管理密码",
			btn_next:"下一步",
			btn_set_wifi:"设置我的WiFi",
			wifi_fin:"WiFi设置完成",
			wifi_restart:"正在等待WiFi重启，请稍候...",
			wifi_fin_title:"WiFi设置成功，开始畅快上网吧",
			mobile_link:"请用手机连接以下WiFi无线网",
			seconds:"秒",
			fin_title:"路由器已设置成功",
			relink:"等待手机连接新的无线网WiFi："
		},
		//登录
		login:{
			official_website:"去官网",
			bbs:"论坛",
			micro_blog:"微博",
			slogan:"欢迎使用360安全路由",
			lbl_login_pwd:"管理密码",
			logo_img:"360安全路由",
			login_info:"<p>默认情况下，路由器的管理密码就是您的WiFi密码</p><p>忘记密码请按一下RESET键复位，重新配置路由器</p>",
            computerIndex:"电脑版"
		},
        //菜单项
        common:{
            down_app_tip:"下载路由器卫士，用手机管理路由器",
            download_later_span:"稍后体验",
            index_page_b:"我的安全路由",
            nav_addon_b:"功能扩展",
            nav_setting_b:"路由设置",
            nav_mobile_app_b:"用手机管理路由",
			service_zone:"客服专区",
            official_website:"去官网",
            logo_img:"360安全路由",
            i_login_out:"退出管理",
            dialog_head:"确认操作",
            footer:"Copyright©2005-2016 360.CN All Rights Reserved 360安全中心"
        },
		//主页
		index_page:{
			has_work:"路由器已工作",
			cur_speed:"当前网速",
			nav_device_list_txt:"谁在上网",
			nav_device_list_count:"上网人数",
			nav_protection_txt:"上网安全保护",
			wireless_base_txt:"WiFi设置",
			wan_setup_txt:"上网设置",
			touch_link_txt:"访客摩擦上网",
			smart_home_txt:"智能家居管理",
			pop_wired_tip:"外网设置",
			lbl_wan_mode:"上网方式",
			lbl_wan_setup_user:"PPPoE 帐户",
			lbl_wan_setup_pass:"PPPoE 密码",
			lbl_wan_setup_ip:"IP地址",
			lbl_wan_setup_mask:"子网掩码",
			lbl_wan_setup_gw:"默认网关",
			lbl_wan_setup_dns1:"主DNS",
			span_dns1_choose:"",
			lbl_wan_setup_dns2:"从DNS",
			span_dns2_choose:"(可选)",
			span_update:"你已成功升级到",
			span_version:"版本",

//            lwj 测速
            akey_speed_pop_tip:"一键测速",
            akey_speed_count_tip:"准备测速，清稍候......",
            akey_speed_result_tip:"您的网络最大带宽为<span id=\"akey_result_speed\"></span>，相当于<span id=\"akey_result_qos\"></span>的<label id=\"akey_result_spe\" class=\"akey_result_spe\">专线</label>网络哦！",
            has_akey_speed:"检测到可能有其他测速工具正在工作，请关闭后再次进行测速",
            akey_speed_result_fail_tip:"测速失败，请检查网络是否正常！",
            "down-speed-logo":"下行",
            "up-speed-logo":"上行",
            "down-speed-result":"最大带宽<span class='maxSpeedResult'></span>",
            "down-net-result":"相当于<span class='maxNetResult'></span>网络",
            "up-speed-result":"最大带宽<span class='maxSpeedResult'></span>",
            "up-net-result":"相当于<span class='maxNetResult'></span>网络",
//            lwj 故障诊断
			link_help_tip:"故障诊断",
            hitchDiagnosisTip:"正在诊断您的路由器，请稍等......",
            check_wan_status:"<span>&bull;</span>检查外网连接状态",
            check_connect_type:"<span>&bull;</span>检测当前的上网方式是否正确",
            check_wan_ip:"<span>&bull;</span>检查外网是否获取到IP地址信息",
            check_dns_info:"<span>&bull;</span>检测DNS服务器状态",
            check_web_status:"<span>&bull;</span>检测网页访问状态",
            "line-abnormal-line":"<span>&bull;</span>请更换网线后再试",
            "upper-equipment-isNoraml":"<span>&bull;</span>请确认上端设备已上电正常运行",
            "link-line-picture":"<span>&bull;</span>请参考缆线连接示意图,确认缆线已正确连接<a href='javascript:void(0)' id='link_help_introduce' class='hd-underline'>连线指南</a>",
            "wisp-auth-error":"<span>&bull;</span>请确认wisp将要连接的无线网络密码是否正确",
            "wisp-reconnet":"<span>&bull;</span>请尝试重新设置您的wisp功能<a href='#indexitem/igd_wisp/app' class='hd-underline  hitch-diagnosisi-skipSet'>无线万能中继（wisp）</a>",
            "product-connect":"<span>&bull;</span>您可以联系厂家客服:400-6822-360",
            "change-route":"<span>&bull;</span>您可以尝试一键换机<span class='hd-comment'>(可复制路由配置信息到新路由器)</span><a href='#indexitem/igd_sw/app' class='hd-underline hitch-diagnosisi-skipSet'>一键换机</a>",
            re_set_wan:"<span>&bull;</span>当前配置的上网方式为<label class='connectTypeErrorTip'></label>,请重新配置<a href='#indexitem/wan_setup/normal' class='hd-underline hitch-diagnosisi-skipSet'>上网设置</a>",
            "refresh-pppoe":"<span>&bull;</span>您可以等待5-10分钟后重新拨号",
            "mac-lan":"<span>&bull;</span>请将电脑使用有线连接到路由器LAN口上,然后重新诊断",
            "internet-server-tip":"<span>&bull;</span>您可以和运营商联系处理<span class='hd-comment' id='sever-info-fault-tip'></span>",
            dnsUpdateTip:"<span>提示</span>：DNS服务器已更新为360 DNS服务器",
            isEnableTempDnsTxt:"临时使用360的DNS服务器,重启后恢复DNS设置"
		},
		nav_addon:{
			add_app_tip:"添加插件",
			span_view:"浏览",
			lbl_app_content:"上传插件"
		},
		//外网设置
		wan_setup:{
			wan_type1:"宽带PPPoE",
			wan_type2:"动态IP上网",
			wan_type3:"静态IP上网"
		},
		wan_dhcp:{
			lbl_wan_setup_mac1:"MAC地址",
			lbl_wan_setup_up_bandwidth1:"线路带宽",
			span_up_bandwidth1:"上行",
			span_down_bandwidth1:"下行",
			lbl_isp_type:"网络服务商",
			lbl_isp_radio1:"电信",
			lbl_isp_radio2:"联通",
			lbl_isp_radio3:"自动识别",
			lbl_detect:"线路通断检测",
			lbl_detect_on:"开启",
			lbl_detect_off:"关闭",
			lbl_cut_time:"线路断线时间",
			lbl_fmac_time0:"无",
			lbl_fmac_time1:"时间段",
			span_week:"星期",
			lbl_wan_day0:"星期一",
			lbl_wan_day1:"星期二",
			lbl_wan_day2:"星期三",
			lbl_wan_day3:"星期四",
			lbl_wan_day4:"星期五",
			lbl_wan_day5:"星期六",
			lbl_wan_day6:"星期日",
			span_time_set:"时间",
			lbl_wan_start_hour:"时",
			lbl_wan_start_min:"分",
			lbl_wan_end_hour:"时",
			lbl_wan_end_min:"分",
			wan_advance_link:"高级设置>>",
			lbl_work_mode:"工作模式",
			lbl_work_mode_radio1:"启用NAT模式",
			lbl_work_mode_radio2:"启用非NAT模式",
			lbl_wan1_select:"WAN口配置",
			lbl_wan_setup_dns11:"主DNS",
			span_dns11_choose:"(可选)",
			lbl_wan_setup_dns12:"从DNS",
			span_dns12_choose:"(可选)"
		},
		wan_pppoe:{
			lbl_wan_setup_user0:"PPPoE 帐户",
			lbl_wan_setup_pass0:"PPPoE 密码",
			lbl_wan_setup_mac0:"MAC地址",
			lbl_wan_setup_up_bandwidth0:"线路带宽",
			span_up_bandwidth0:"上行",
			span_down_bandwidth0:"下行",
			lbl_isp_type:"网络服务商",
			lbl_isp_radio1:"电信",
			lbl_isp_radio2:"联通",
			lbl_isp_radio3:"自动识别",
			lbl_detect:"线路通断检测",
			lbl_detect_on:"开启",
			lbl_detect_off:"关闭",
			lbl_cut_time:"线路断线时间",
			lbl_fmac_time0:"无",
			lbl_fmac_time1:"时间段",
			span_week:"星期",
			lbl_wan_day0:"星期一",
			lbl_wan_day1:"星期二",
			lbl_wan_day2:"星期三",
			lbl_wan_day3:"星期四",
			lbl_wan_day4:"星期五",
			lbl_wan_day5:"星期六",
			lbl_wan_day6:"星期日",
			span_time_set:"时间",
			lbl_wan_start_hour:"时",
			lbl_wan_start_min:"分",
			lbl_wan_end_hour:"时",
			lbl_wan_end_min:"分",
			wan_advance_link:"高级设置>>",
			lbl_work_mode:"工作模式",
			lbl_work_mode_radio1:"启用NAT模式",
			lbl_work_mode_radio2:"启用非NAT模式",
			lbl_wan1_select:"WAN口配置",
			lbl_server_name:"服务器名",
			span_server_tip:"(仅供特殊地区用户填写)",
			lbl_ac_name:"AC名",
			span_ac_tip:"(仅供特殊地区用户填写)",
			lbl_wan_setup_dns01:"主DNS",
			span_dns01_choose:"(可选)",
			lbl_wan_setup_dns02:"从DNS",
			span_dns02_choose:"(可选)"
		},
		wan_static:{
			lbl_wan_setup_ip2:"IP地址",
			lbl_wan_setup_mask2:"子网掩码",
			lbl_wan_setup_gw2:"默认网关",
			lbl_wan_setup_mac2:"MAC地址",
			lbl_wan_setup_dns21:"主DNS",
			lbl_wan_setup_dns22:"从DNS",
			span_dns22_choose:"(可选)",
			lbl_wan_setup_up_bandwidth2:"线路带宽",
			span_up_bandwidth2:"上行",
			span_down_bandwidth2:"下行",
			lbl_isp_type:"网络服务商",
			lbl_isp_radio1:"电信",
			lbl_isp_radio2:"联通",
			lbl_isp_radio3:"自动识别",
			lbl_detect:"线路通断检测",
			lbl_detect_on:"开启",
			lbl_detect_off:"关闭",
			lbl_cut_time:"线路断线时间",
			lbl_fmac_time0:"无",
			lbl_fmac_time1:"时间段",
			span_week:"星期",
			lbl_wan_day0:"星期一",
			lbl_wan_day1:"星期二",
			lbl_wan_day2:"星期三",
			lbl_wan_day3:"星期四",
			lbl_wan_day4:"星期五",
			lbl_wan_day5:"星期六",
			lbl_wan_day6:"星期日",
			span_time_set:"时间",
			lbl_wan_start_hour:"时",
			lbl_wan_start_min:"分",
			lbl_wan_end_hour:"时",
			lbl_wan_end_min:"分",
			wan_advance_link:"高级设置>>",
			lbl_work_mode:"工作模式",
			lbl_work_mode_radio1:"启用NAT模式",
			lbl_work_mode_radio2:"启用非NAT模式",
			lbl_wan1_select:"WAN口配置"
		},
		//内网设置
		lan_setup:{
			lan_setup_tip:"本页面可以对您的家庭网络进行管理，在这里可以修改路由器的地址和网段，防止网络冲突。",
			lbl_lan_ip_address:"IP地址",
			lbl_lan_sub_mask:"子网掩码",
			lbl_dhcp_status:"DHCP服务器",
			lbl_dhcp_enable:"开启",
			lbl_dhcp_disable:"关闭",
			lbl_dhcp_pool_start:"地址池开始",
			lbl_dhcp_pool_end:"地址池结束",
			lbl_dns_proxy:"DNS代理",
			lan_advance_link:"高级设置>>",
			lbl_mac:"MAC地址",
			lbl_ip:"IP地址",
			lan_type1:"路由器地址",
			lan_type2:"DHCP地址保留",
			no_device:"暂无其他设备...",
			dhcp_pop_tip:"绑定设备",
			new_increase:"新增",
			btn_unbind:"一键解绑",
			manual_add:"手动添加",
			oneKey_bind:"一键绑定"
		},
		//无线设置
		wireless_base:{
			div_wireless_2_4_title:"WiFi设置",
			div_wireless_5_title:"5G WiFi设置",
			wireless_base_tip:"本页面可以对您的无线网络进行配置，您可以在这里修改无线网络的名称、密码等信息。",
			lbl_wireless_status:"WiFi状态",
			lbl_2_4_ssid:"WiFi名称(SSID) ",
			lbl_wlb_2_4_channel_width:"频道带宽",
			lbl_wireless_base_2_4_channel_sel:"无线信道",
			wire_2_4_channel_choose:"智能优化信道",
			lbl_wls_2_4_ap_mode_sel:"加密方式",
			lbl_wireless_2_4_key_val:"WiFi密码",
			lbl_2_4_ssid_broadcast:"隐藏网络名称",
			lbl_2_4_ssid_broadcast_tip:"(SSID隐藏后，电脑和手机将搜索不到无线信号，需要手动添加无线网络)",
			lbl_same:"漫游WiFi(适用于经常移动的无线设备)",
			wifi_2_4_tip:"开启WiFi的时间在WiFi定时关闭时间内，您可以在<a href=\"javascript:void(0);\">WiFi定时关闭</a>页面修改WiFi关闭时间",
			//5G
			lbl_wireless_5_status:"5G WiFi状态",
			lbl_5_ssid:"WiFi名称(SSID)",
			lbl_5_ssid_broadcast:"隐藏网络名称",
			lbl_wls_5_ap_mode_sel:"加密方式",
			lbl_wireless_5_key_val:"WiFi密码",
			lbl_wlb_5_channel_width:"频道带宽",
			lbl_wireless_base_5_channel_sel:"无线信道",
			wire_5_channel_choose:"智能优化信道",
			wifi_5_tip:"开启WiFi的时间在WiFi定时关闭时间内，您可以在<a href=\"javascript:void(0);\">WiFi定时关闭</a>页面修改WiFi关闭时间"
		},
		//登录密码
		password : {
			password_tip:"修改路由器管理密码，管理密码非常重要，修改完成后请把管理密码记在小本子上以防遗忘。",
			password_wireless_differ:"温馨提示：管理密码和WiFi密码可以分别设置，修改管理密码不会影响到WiFi的连接密码。",
			lbl_old_password:"原密码",
			lbl_password1:"新密码",
			lbl_password2:"确认密码"
		},
		//恢复默认
		rally_default:{
			div_manual_update_tip:"若未保存配置信息，恢复出厂设置后，需重新设置后才能正常上网！",
			lbl_param_save:"保存配置信息",
			network_param_lbl:"保存网络配置信息",
			network_param_tip:"包括宽带信息,wifi配置,管理密码",
			host_name_lbl:"保存自定义主机名信息",
			host_name_tip:"包括谁在上网页自定义的主机信息",
			plugin_info_lbl:"保存第三方插件信息",
			plugin_info_tip:"包括插件中心下载安装以及手动安装的所有插件",
			span_reset_tip:"路由器正在重启，请勿断电，请稍候……&nbsp;"
		},
		//软件升级
		update:{
			lbl_auto_update:"自动升级",
			auto_update_checkbox_label:"开启",
			lbl_version_info:"版本信息",
            updateLog:"升级日志",
			update_status:"未检测版本状态",
			div_manual_update_title:"手动升级",
			div_manual_update_tip:"升级软件需要花费几分钟的时间，请不要关闭电源或按重置按钮!",
			span_cur_ver:"当前版本",
			span_view:"选择升级文件",
			div_auto_update_title:"在线升级",
			div_auto_update_info:"版本信息",
			span_cur_version:"当前版本",
			span_new_version:"最新版本",
			span_status:"状态",
			span_pro:"固件下载进度",
			span_reset_tip:"路由器正在重启，请勿断电，请稍候……&nbsp;",
            logTxtTitle:"升级日志"
		},
		//时间设置
		system_time:{
			system_time_tip:"设置路由器的系统时间，您可以选择互联网上获取或者手动设置路由器时间。<br/>注意：关闭路由器电源后，时间信息会丢失。如果您选择从互联网上获取时间，路由器将在连接Internet后自动获取当前时间。只有成功通过互联网获取或手动设置路由器时间后，其他功能（如定时关机、儿童保护）中的时间限定才会生效。",
			span_cur_time:"当前系统时间",
			lbl_get_time:"系统时间获取方式",
			lbl_get_time_mode0:"NTP(网上获取)",
			lbl_get_time_mode1:"手动配置",
			lbl_system_date:"日期",
			lbl_system_year:"年",
			lbl_system_month:"月",
			lbl_system_day:"日",
			lbl_system_time:"时间",
			lbl_system_hour:"时",
			lbl_system_minute:"分",
			lbl_system_second:"秒",
			lbl_timezone:"时区"
		},
		//重新启动
		misc_reboot:{
			div_reboot_now_title:"立即重启",
			div_reboot_now_tip:"路由器系统将立即重新启动",
			div_reboot_timed_title:"定时重启",
			div_reboot_timed_tip:"路由器系统将在设定时间点重新启动",
			lbl_reboot_status:"定时重启状态",
			lbl_reboot_on:"开启",
			lbl_reboot_off:"关闭",
			lbl_reboot_mode:"定时重启方式",
			lbl_reboot_time:"路由器重启时间",
			lbl_week_day0:"星期一",
			lbl_week_day1:"星期二",
			lbl_week_day2:"星期三",
			lbl_week_day3:"星期四",
			lbl_week_day4:"星期五",
			lbl_week_day5:"星期六",
			lbl_week_day6:"星期日",
			span_hour:"时",
			span_minute:"分",
			span_reset_tip:"路由器正在重启，请勿断电，请稍候……&nbsp;"
		},
		//智能家居
		smart_home:{
			stay_tuned:"更多功能，敬请期待！",
            nav_app_name:"智能家居",
            nav_app_version:"版本:1.0.1",
            nav_app_author:"发行者:360",
            app_detail_area:"<p>应用说明：让您家新添的智能设备快速连入我们的无线WIFI网络中。</p>",
            find_smart_devices:"发现新智能设备",
            my_smart_devices:"已有智能设备列表",
            choose_vendor:"选择设备品牌",
            scanning:"正在扫描中，请稍后...",
            second:"秒",
            not_scan_device:"刚刚未扫描到您的智能设备，请重新扫描",
            device_txt1:"扫描到您有",
            device_txt2:"台智能设备未添加",
            not_device_connect:"当前没有智能设备连接上来",
            my_device_txt1:"我的智能设备",
            my_device_txt2:"( 当前0台设备在线 )"
		},
		//摩擦上网 tmp
		touch_link:{
			stay_tuned:"摩擦上网功能，敬请期待！"
		},
		//用手机管理路由器
		nav_mobile_app:{
			down_img:"手机app"
		},
		//nav device list
		nav_device_list:{
			nav_app_name:"谁在上网",
			nav_app_version:"版本:1.0.1",
			nav_app_author:"发行者:360",
			app_detail_area:"<p>应用说明：看看谁在上网，看看谁在占您的网速</p>",
			host_list:"上网主机列表",
			black_list:"上网黑名单",
			device_list_txt:"我家的电脑和手机",
			touch_link_list_txt:"访客摩擦上网",
			igd_ap_txt:"访客网络",
            repeater_list_txt:"360WiFi扩展器",
			black_list_txt:"上网黑名单",
			device_list_count:"（<strong class=\"device-count\"></strong>台在线）",
			touch_link_count:"（<strong class=\"device-count\"></strong>台在线）",
			igd_ap_count:"（<strong class=\"device-count\"></strong>台在线）",
            repeater_list_count:"（<strong class=\"device-count\"></strong>台在线）",
			black_list_count:"（<strong class=\"device-count\"></strong>台）"

		},
		//开发者模式
		developer:{
			wireless_advance_tip:"开发者模式提供研发级WiFi调试功能。",
			lbl_radio_criterion:"网络模式",
			lbl_wireless_fragment:"分片阈值",
			lbl_wireless_RTSThreshold:"RTS阈值",
			lbl_wireless_preamble:"帧前导",
			lbl_wireless_protection:"保护模式",
			lbl_wireless_ampdu:"帧聚合模式",
			lbl_wireless_tx_2_path:"双通道发射",
            lbl_power_detect:"能量侦测",
			lbl_enable_upnp:"启用upnp",
			lbl_boa_deny_switch:"安全访问开关",
			lbl_deny_ip:"指定IP登陆管理界面",
            lbl_ldpc_enable:"LDPC 开关",
			lbl_plugins_enable:"第三方插件调试开关"
		},
        //我的路由信息
        router_info:{
            routerInfo_header:"我的路由信息",
            routerInfo:"路由器信息",
            router_name_info:"路由器名称：360安全路由",
            router_model:"处理器型号：RTL8196D",
            router_logo:"处理器品牌：REALTEK",
            router_hz:"处理器主频：620MHz",
            router_bone:"处理器架构：MIPS",
            router_wifi_speed:"无线传输速率：300Mbps",
            router_save_in:"内存：64MB",
            router_save_onoff:"闪存：8MB",
			online_info:"上网信息",
            wanIp:"外网IP地址：",
            wanMask:"子网掩码：",
            wanGm:"默认网关：",
            wanDns_a:"首选DNS地址：",
            wanDns_b:"备选DNS地址：",
            wanMac:"MAC地址：",
			home_net_info:"家庭网络信息",
            lanIp:"路由器IP地址：",
            lanMask:"子网掩码：",
            dhcp_status:"DHCP服务器状态：",
			dhcp_range:"DHCP地址池范围："
        },
        //客服专区
        service_zone:{
            nav_title:"客服专区&nbsp;&gt;",
            nav_info:"常见问题&nbsp;",
            no_internet_txt:"不能上网",
            no_internet_info:"路由器接入到网络里面后,手机或电脑不能正常上网。",
            network_dropped_txt:"网络掉线",
            network_dropped_info:"上网过程中,手机或电脑遇到突然不能上网。",
            no_wifi_txt:"搜索不到无线信号",
            no_wifi_info:"路由器启动以后,手机或笔记本电脑搜索不到路由器发射的无线名称。<br /><strong style=\"color: red\">(该功能仅针对主SSID)</strong>",
            no_connect_wifi_txt:"连接不上无线",
            no_connect_wifi_info:"手机或笔记本电脑开启无线后,能搜索到路由器的无线名称，但连接不上。",
            page_slow_txt:"网速慢",
            page_slow_info:"手机或笔记本电脑连接路由器后,打开网页慢,下载速度慢。",
            connect_another_route_txt:"路由器如何串联（二级路由）",
            connect_another_route_info:"已经有一个路由器,需要将360安全路由串联到原路由器网络里面。",

            weibo_title:"微博互动",
            weibo_sub_title:"微博@360安全路由",
            weibo_time:"周一至周日 10:00到19:00",
            weixin_title:"微信关注",
            weixin_sub_title:"关注微信:360安全路由",
            weixin_time:"周一至周日 10:00到19:00"
        },
        //不能上网
        no_internet:{
            sochange_title:"问题现象示意图",
            symptoms:"症状表现:",
            symptoms_1:"不能打开网页",
            symptoms_2:"不能登录QQ等软件",
            symptoms_3:"任何需要联网的应用均不能使用",
            why:"可能原因:",
            why_1:"线缆未正常连接",
            why_2:"运营商服务器异常",
            why_3:"上网配置异常:",
            others:"其他问题:",
            others_1:"网络掉线",
            others_2:"打开网页慢，下载速度慢",
            detection:"正在为你检测<span class=\"detection-title\">不能上网</span>的问题",
            detection_end:"检测完成，请按以下提示信息操作:",
            advice_repair:"建议修复项",
            is_resolved:"您的问题是否已经解决?",
            suggest_tip:"请按以下提示信息操作",
            recommand:"建议检查项",
            fail_help_tip:"您的网络已经断网，将运行“故障诊断”",
            waiting:"请稍后...",
            contact_us:"客服电话:400-6822-360"
        },
        //网络掉线
        network_dropped:{
            sochange_title:"问题现象示意图",
            symptoms:"症状表现:",
            symptoms_1:"游戏掉线",
            symptoms_2:"QQ掉线",
            symptoms_3:"掉线后时常能自动恢复正常",
            why:"可能原因:",
            why_1:"无线信号弱",
            why_2:"运营商线路不稳定",
            why_3:"&nbsp;",
            others:"其他问题:",
            others_1:"不能上网",
            others_2:"打开网页慢，下载速度慢",
            detection:"正在为你检测<span class=\"detection-title\">网络掉线</span>的问题",
            detection_end:"检测完成，请按以下提示信息操作:",
            advice_repair:"建议修复项",
            is_resolved:"您的问题是否已经解决?",
            suggest_tip:"请按以下提示信息操作",
            recommand:"建议检查项",
            fail_help_tip:"您的网络已经断网，将运行“故障诊断”",
            waiting:"请稍后...",
            contact_us:"客服电话:400-6822-360"
        },
        //搜索不到无线信号
        no_wifi:{
            sochange_title:"问题现象示意图",
            symptoms:"症状表现:",
            symptoms_1:"搜索不到路由器无线信号",
            symptoms_2:"&nbsp;",
            symptoms_3:"&nbsp;",
            why:"可能原因:",
            why_1:"路由器未开启无线开关",
            why_2:"无线名称包含了不能识别的特殊字符",
            why_3:"路由器设置了WiFi定时开关",
            others:"其他问题:",
            others_1:"连接不上无线",
            others_2:"不能上网",
            detection:"正在为你检测<span class=\"detection-title\">搜索不到无线信号</span>的问题",
            detection_end:"检测完成，请按以下提示信息操作:",
            advice_repair:"建议修复项",
            is_resolved:"您的问题是否已经解决?",
            suggest_tip:"请按以下提示信息操作",
            recommand:"建议检查项",
            fail_help_tip:"您的网络已经断网，将运行“故障诊断”",
            waiting:"请稍后...",
            contact_us:"客服电话:400-6822-360"
        },
        //连接不上无线
        no_connect_wifi:{
            sochange_title:"问题现象示意图",
            symptoms:"症状表现:",
            symptoms_1:"手机、笔记本能搜索到无线，输入密码后不能连接",
            symptoms_2:"&nbsp;",
            symptoms_3:"&nbsp;",
            why:"可能原因:",
            why_1:"距离路由器太远，信号过弱导致",
            why_2:"无线名称包含了不能识别的特殊字符",
            why_3:"信道设置为了12，13信道，部分设备不兼容",
            others:"其他问题:",
            others_1:"搜索不到无线信号",
            others_2:"不能上网",
            detection:"正在为你检测<span class=\"detection-title\">连接不上无线信号</span>的问题",
            detection_end:"检测完成，请按以下提示信息操作:",
            advice_repair:"建议修复项",
            is_resolved:"您的问题是否已经解决?",
            suggest_tip:"请按以下提示信息操作",
            recommand:"建议检查项",
            fail_help_tip:"您的网络已经断网，将运行“故障诊断”",
            waiting:"请稍后...",
            contact_us:"客服电话:400-6822-360"
        },
        //网速慢
        page_slow:{
            sochange_title:"问题现象示意图",
            symptoms:"症状表现:",
            symptoms_1:"手机、笔记本开网页慢，一直提示加载中",
            symptoms_2:"手机、笔记本下载速度慢，只有几十KB/S的速度",
            symptoms_3:"&nbsp;",
            why:"可能原因:",
            why_1:"距离路由器太远，信号弱导致体验不好",
            why_2:"下载资源不好，导致下载速度慢",
            why_3:"无线接入手机或笔记本过多",
            others:"其他问题:",
            others_1:"搜索不到无线信号",
            others_2:"不能上网",
            detection:"正在为你检测<span class=\"detection-title\">网速慢</span>的问题",
            detection_end:"检测完成，请按以下提示信息操作:",
            advice_repair:"建议修复项",
            is_resolved:"您的问题是否已经解决?",
            suggest_tip:"请按以下提示信息操作",
            recommand:"建议检查项",
            fail_help_tip:"您的网络已经断网，将运行“故障诊断”",
            waiting:"请稍后...",
            contact_us:"客服电话:400-6822-360"
        },
        //二级路由
        connect_another_route:{
            sochange_title:"路由器连接方式",
            symptoms:"需求说明:",
            symptoms_1:"家里已经有使用一个路由器",
            symptoms_2:"需要将安全路由串联到网络中使用",
            symptoms_3:"&nbsp;",
            why:"注意事项:",
            why_1:"请确保安全路由WAN口已连接至主路由LAN口",
            why_2:"请确认手机或电脑连接主路由器可以正常上网",
            why_3:"&nbsp;",
            others:"&nbsp;:",
            others_1:"&nbsp;",
            others_2:"&nbsp;",
            detection:"正在为您将安全路由器设置为串联上网",
            detection_end:"检测完成，请按以下提示信息操作:",
            connect_ok:"一键设置为串联上网完成！",
            advice_repair:"建议修复项",
            is_resolved:"您的问题是否已经解决?",
            suggest_tip:"请按以下提示信息操作",
            recommand:"建议检查项",
            fail_help_tip:"您的网络已经断网，将运行“故障诊断”",
            waiting:"请稍后...",
            contact_us:"客服电话:400-6822-360"
        }
	},
	//输入框中预填充的值
	VALUE:{
		index_page:{
			ssid:"给你的网络起个名字",
			wirel_key:"密码一般由8-30位的数字和字母组成",
			ppp_user:"请输入你的宽带拨号用户名",
			wan_ip:"请输入你的固定地址",
			wan_mask:"请输入你的子网掩码",
			wan_gw:"请输入你的网关地址",
			wan_dns1:"请输入你的首选DNS服务器",
			wan_dns2:"请输入你的备用DNS服务器",
			wire_ssid:"给你的网络起个名字",
			q_wpa_key:"密码一般由8-30位的数字和字母组成"
		},
		wireless_2_4:{
			ssid:"给你的网络起个名字",
			wireless_key_val:"密码一般由8-30位的数字和字母组成"
		},
		wireless_5:{
			ssid_2_4:"给你的网络起个名字",
			ssid_5:"给你的网络起个名字",
			wireless_key_val:"密码一般由8-30位的数字和字母组成"
		}
		
	},
	//js文件中打印出来的文字 错误提示 菜单
	JS:{
		//菜单
		my_router:"我的安全路由",
		who_is_on_line:"谁在上网",
		internet_security:"上网安全保护",
		function_extend:"功能扩展",
		route_set:"路由器设置",
		quick_set:"快捷设置",
		advance_set:"高级设置",
		wan_setup_menu_title:"上网设置",
		lan_setup_menu_title:"修改路由器地址",
		wireless_menu_title:"WiFi设置",
		password_menu_title:"修改管理密码",
		system_time_menu_title:"时间设置",
		update_menu_title:"系统升级",
		rally_default_menu_title:"恢复出厂设置",
		misc_reboot_menu_title:"重启路由器",
		my_router_menu_title:"我的路由信息",
		log_menu_title:"拨号日志",
		developer_menu_title:"开发者模式",
		use_mobile:"用手机管理路由器",
		smart_home:"智能家居",
		touch_link:"摩擦上网",
        store_manage:"存储管理",

        service_zone:"客服专区",
        question:"常见问题",
        no_internet_menu_title:"不能上网",
        network_dropped_menu_title:"网络掉线",
        no_wifi_menu_title:"搜索不到无线信号",
        no_connect_wifi_menu_title:"连接不上无线",
        page_slow_menu_title:"网速慢",
        connect_another_route_menu_title:"路由器如何串联（二级路由）",

        service_zone_errMsg:{
            "no_internet":{
                "id-1":{
                    title:"",
                    info:"当前上网模式异常，非NAT模式可能将导致电脑和手机不能上网",
                    action:""
                },
                "id-2":{
                    title:"",
                    info:"当前信道配置异常，部分设备可能不支持<span class='chan'></span>信道",
                    action:""
                },
                "id-3":{
                    title:"MTU设置异常",
                    info:"修改MTU为1400",
                    action:""
                },
                "id-4":{
                    title:"防蹭网防火墙已经启用",
                    info:"当前网络已经启用网络防蹭网功能，需要打开网页认证才能上网",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="nav_addon" data-target_sub="safety_wireless">防蹭网防火墙</span></div>'
                },
                "id-5":{
                    title:"儿童保护模式已经启用",
                    info:"主机名<span class='host_name'></span>被设置了儿童保护模式，在时间段<span class='start_time'></span>到<span class='end_time'></span>是禁止上网的",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="nav_addon" data-target_sub="baby_mode">儿童保护</span></div>'
                },
                "id-6":{
                    title:"家庭网络防火墙已经启用",
                    info:"当前网络已经启用家庭网络防火墙，并勾选防止IP/MAC，不在IP/MAC绑定列表的设备将不能上网",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="nav_addon" data-target_sub="arp_oversee">家庭网络防火墙 </span></div>'
                },
                "id-7":{
                    title:"上网黑名单有被拉黑用户",
                    info:"<span class='info_arr'></span>被拉入黑名单，在黑名单的设备将不能接入网络上网",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="index_page" data-target_sub="nav_device_list">上网黑名单 </span></div>'
                },
                "id-8":{
                    title:"电脑IP地址配置错误",
                    info:"<span class='info_arr'></span>的IP地址为非DHCP动态获取，不能保证配置信息的正确性，该终端能接入网络但可能不能正常上网",
                    action:'<div class="action-txt">操作步骤:<span class="default-txt default-color slide">展开</span>' +
                        '<div class="slide-icon down"></div>' +
                        '</div>' +
                        '<div class="action-item">' +
                        '<p>win7系统电脑为例:网络-右键属性-网络和共享中心(xp操作为右键网络邻居后点击属性)-更改适配器配置-右键本地连接/无线网络连接-属性-Internet协议版本4-将IP和DNS获取方式改为自动</p>' +
                        '<div class="err_ip_img"></div>' +
                        '</div>'
                },
                "id-9":{
                    title:"建议更新网卡驱动后再试",
                    info:"建议使用360驱动大师更新电脑网卡驱动后，再重新接入网络验证",
                    action:'<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                },
                "id-10":{
                    title:"检查宽带是否已经欠费",
                    info:"建议和运营商联系确认宽带是否已经欠费，如已欠费则会导致路由器能链接，联网状态显示正常，但不能上网",
                    action:'<div class="action-txt">运营商电话:<span class="default-txt default-color slide detail">详细</span>' +
                        '<div class="slide-icon down slide-1"></div>' +
                        '</div>' +
                        '<div class="action-item">' +
                        '<div class="clearfix"><p class="left">中国联通:10010</p><p class="right">方正宽带:010-82529990</p></div>' +
                        '<div class="clearfix"><p class="left">网通宽带:10010</p><p class="right">宽&ensp;带&ensp;通:010-84603993</p></div>' +
                        '<div class="clearfix"><p class="left">中国电信:10000</p><p class="right">艾普宽带:952155</p></div>' +
                        '<div class="clearfix"><p class="left">长城宽带:96090090</p><p class="right">中国移动:10086</p></div>' +
                        '<div class="clearfix"><p class="left">铁通宽带:10050</p><p class="right"></p>蓝波宽带:010-65885227</div>' +
                        '<div class="clearfix"><p class="left">歌华宽带:96196</p><p class="right">中电飞华:010-51961096</p></div>' +
                        '</div>'

                }
            },
            "network_dropped":{
                "id-9":{
                    title:"是否单机故障问题",
                    info:"请确认是否所有设备都不稳定，如果只是单一设备存在不稳定现象，请先尝试更新驱动验证",
                    action:'<div class="action-txt">操作步骤:<span class="default-txt default-color">建议将路由器放置于更容易覆盖的位置，如靠近房屋中心的位置，尽量减少需要穿透的障碍物</span></div>' +
                        '<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                },
                "id-11":{
                    title:"",
                    info:"建议设置当前WAN口接口为10M全双工，提高稳定性",
                    action:''
                },
                "id-12":{
                    title:"更换WAN口网线再试",
                    info:"请将WAN口网线更换为确认完好的网线后再试",
                    action:''
                },
                "id-13":{
                    title:"电脑直连网络测试",
                    info:"不使用路由，电脑直接连接网络测试，观察是否依然存在掉线问题，如依然存在掉线问题，请联系运营商处理",
                    action:''
                },
                "id-14":{
                    title:"",
                    info:"当前无线模式为非穿墙模式，建议设置为穿墙模式",
                    action:''
                },
                "id-15":{
                    title:"",
                    info:"当前无线信道带宽为40Mhz，传输速度快，但容易受干扰，建议设置为更稳定的20Mhz",
                    action:''
                },
                "id-16":{
                    title:"",
                    info:"当前信道干扰源较多，建议进行信道优化重新选择干扰源较少的信道",
                    action:''
                },
                "id-17":{
                    title:"接入设备无线信号强度",
                    info:"A信号弱B信号强C信号良，A设备信号弱请检查A设备是否距离路由器过远或中间障碍物过多",
                    action:'<div class="action-txt">操作步骤:<span class="default-txt default-color">建议将路由器放置于更利于覆盖的位置，如靠近房屋中心的位置，' +
                        '尽量减少需要穿透的障碍物，并远离大功率设备，如微波炉，液晶电视，空调，冰箱等设备 </span></div>'
                },
                "id-18":{
                    title:"保证路由器天线竖直",
                    info:"请保证路由器的天线处于竖直摆放，如将天线叠放于路由器下方将导致无线信号减弱覆盖范围变小",
                    action:''
                },
                "id-37":{
                    title:"链路质量未达标",
                    info:"请将360安全路由器靠近主设备或信道更新为干扰更小的信道后再试",
                    action:''
                }
            },
            "no_wifi":{
                "id-2":{
                    title:"",
                    info:"当前设置信道为<span class='chan'></span>信道，部分设备可能出现不兼容问题，导致搜索不到无线信号",
                    action:""
                },
                "id-9":{
                    title:"建议更新网卡驱动后再试",
                    info:"建议使用360驱动大师更新电脑网卡驱动后，再重新接入网络验证",
                    action:'<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                },
                "id-19":{
                    title:"",
                    info:"无线开关未打开，无线功能未正常启动",
                    action:''
                },
                "id-20":{
                    title:"",
                    info:"当前时间段为设置的WiFi定时关闭时间，是否临时禁用规则",
                    action:''
                },
                "id-21":{
                    title:"",
                    info:"已启用SSID隐藏功能，隐藏后手机和笔记本将不能搜索到无线信号",
                    action:''
                },
                "id-22":{
                    title:"",
                    info:"当前设置的SSID包含中文或特殊字符，部分设备搜索不到，建议修改为默认SSID(<span class='default_ssid'></span>)再试",
                    action:''
                },
                "id-23":{
                    title:"请将手机或笔记本靠近路由器再试",
                    info:"如手机和笔记本距离路由器过远或中间障碍物过多，将导致信号过弱而搜索不到无线信号，请靠近路由器再试",
                    action:''
                },
                "id-24":{
                    title:"请检查手机或笔记本无线功能是否完好",
                    info:"请确认手机或笔记本是否能够搜索到其他无线信号，如不能搜索到可能设备本身设置或驱动异常",
                    action:'<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                },
                "id-35":{
                    title:"XP系统提示windows无法配置处理办法",
                    info:"XP系统提示windows无法配置此无线连接，请启动windows零配置(WZC)服务，需要启用对应服务",
                    action:'<div class="action-txt">操作步骤:<span class="default-txt default-color">我的电脑-管理-服务和应用程序-服务-找到"Wireless Zero Conguration"-打开"属性"-启动类型里面选择"自动"-再按"启动"-再按"应用"并点击"确定" </span></div>'
                }
            },
            "no_connect_wifi":{
                "id-5":{
                    title:"儿童保护模式已经启用",
                    info:"主机名<span class='host_name'></span>被设置了儿童保护模式，在时间段<span class='start_time'></span>到<span class='end_time'></span>是禁止上网的",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="nav_addon" data-target_sub="baby_mode">儿童保护</span></div>'
                },
                "id-6":{
                    title:"家庭网络防火墙已经启用",
                    info:"当前网络已经启用家庭网络防火墙，并勾选防止IP/MAC，不在IP/MAC绑定列表的设备将不能上网",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="nav_addon" data-target_sub="arp_oversee">家庭网络防火墙 </span></div>'
                },
                "id-7":{
                    title:"上网黑名单",
                    info:"<span class='info_arr'></span>被拉入黑名单，在黑名单的设备将不能接入网络上网",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="index_page" data-target_sub="nav_device_list">上网黑名单 </span></div>'
                },
                "id-8":{
                    title:"电脑IP地址配置错误",
                    info:"<span class='info_arr'></span>的IP地址为非DHCP动态获取，不能保证配置信息的正确性，该终端能接入网络但可能不能正常上网",
                    action:'<div class="action-txt">操作步骤:<span class="default-txt default-color slide">展开</span>' +
                        '<div class="slide-icon down"></div>' +
                        '</div>' +
                        '<div class="action-item">' +
                        '<p>win7系统电脑为例:网络-右键属性-网络和共享中心(xp操作为右键网络邻居后点击属性)-更改适配器配置-右键本地连接/无线网络连接-属性-Internet协议版本4-将IP和DNS获取方式改为自动</p>' +
                        '<div class="err_ip_img"></div>' +
                        '</div>'
                },
                "id-9":{
                    title:"建议更新网卡驱动后再试",
                    info:"建议使用360驱动大师更新电脑网卡驱动后，再重新接入网络验证",
                    action:'<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                },
                "id-14":{
                    title:"",
                    info:"当前无线为非穿墙模式，将导致远处信号弱，建议设置为穿墙模式",
                    action:''
                },
                "id-23":{
                    title:"请将手机或笔记本靠近路由器再试",
                    info:"如手机和笔记本距离路由器过远或中间障碍物过多，将导致信号过弱而搜索不到无线信号，请靠近路由器再试",
                    action:''
                },
                "id-25":{
                    title:"",
                    info:"DHCP服务器未启用，手机或笔记本将连接不上无线",
                    action:''
                },
                "id-26":{
                    title:"访客模式数量限制已经启用",
                    info:"当前网络已经启用访客模式的接入用户数，仅允许最多<span class='limit_hosts_num'></span>个访客接入，更多的用户将不能接入到访客网络中",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="nav_addon" data-target_sub="igd_ap">访客模式</span></div>'
                },
                "id-27":{
                    title:"删除无线配置文件再试",
                    info:"保存的无线配置文件可能未与当前配置信息一致，建议删除所有无线的配置文件再试（手机则忽略网络后再试）",
                    action:'<div class="action-txt">操作步骤:<span class="default-txt default-color">以win7为例:网络和共享中心-管理无线网络-选中WiFi-点击删除</span></div>'
                },
                "id-28":{
                    title:"检查能否连接到其他WiFi信号",
                    info:"如果所有WiFi信号都无法连接，很有可能是单个电脑问题，建议分步排查，如果可以，更新网卡驱动",
                    action:'<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                }
            },
            "page_slow":{
                "id-9":{
                    title:"建议更新网卡驱动后再试",
                    info:"建议使用360驱动大师更新电脑网卡驱动后，再重新接入网络验证",
                    action:'<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                },
                "id-14":{
                    title:"",
                    info:"当前无线为非穿墙模式，将导致远处信号弱，建议设置为穿墙模式",
                    action:''
                },
                "id-16":{
                    title:"",
                    info:"当前信道干扰严重，建议运行一次信道优化",
                    action:''
                },
                "id-17":{
                    title:"部分设备信号较弱",
                    info:"C信号弱，速度慢",
                    action:'<div class="action-txt">操作步骤:<span class="default-txt default-color">请将路由器放置于更利于覆盖的位置如房屋中心，减少信号需要穿透的障碍物</span></div>'
                },
                "id-29":{
                    title:"",
                    info:"Qos已经启用，建议将规则恢复为默认配置",
                    action:''
                },
                "id-30":{
                    title:"疑似被蹭网",
                    info:"当前路由器接入主机超过10台，请确认当前无线网络是否有被蹭网，建议将陌生设备拉黑",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="index_page" data-target_sub="nav_device_list">上网主机列表</span></div>'
                },
                "id-31":{
                    title:"网络应用占用带宽较多",
                    info:"当前网络接入的设备运行较多应用，请检查是否有后台程序在运行P2P应用如迅雷下载类的高带宽占用程序",
                    action:''
                },
                "id-32":{
                    title:"当前限速设置规则异常",
                    info:"当前<span class='host_name'></span>主机被限速，限制速度过低将严重影响上网体验",
                    action:'<div class="action-txt">设置链接:<span class="default-txt setLink" data-target_parent="index_page" data-target_sub="nav_device_list">上网主机列表</span></div>'
                },
                "id-36":{
                    title:"网络环境差",
                    info:"当前网络环境差，请更换网线后再试，或联系运营商处理",
                    action:''
                },
                "id-37":{
                    title:"信号强度不达标",
                    info:"360安全路由距离主路由距离较远，信号太弱致体验不好，请将距离减小后或更换无线信道后再试",
                    action:''
                },
                "id-38":{
                    title:"宽带测速不达标",
                    info:"目前宽带测速不达标，请检查主路由带宽接入是否稳定或更换无线信道后再试",
                    action:''
                }
            },
            "connect_another_route":{
                "id-1":{
                    title:"",
                    info:"当前上网模式异常，非NAT模式可能将导致电脑和手机不能上网",
                    action:""
                },
                "id-9":{
                    title:"建议更新网卡驱动后再试",
                    info:"建议使用360驱动大师更新电脑网卡驱动后，再重新接入网络验证",
                    action:'<div class="action-txt">下载链接:<span class="default-txt downLink" data-new_url="http://www.360.cn/qudongdashi/">360驱动大师 </span></div>'
                },
                "id-33":{
                    title:"WAN口线缆未连接",
                    info:"WAN口线缆未连接，请将路由器的WAN口用网络连接主路由的LAN口",
                    action:""
                },
                "id-34":{
                    title:"主路由器未启用DHCP服务器",
                    info:"安全路由未从主路由动态DHCP获取到IP地址信息，请开启主路由器的DHCP服务",
                    action:''
                },
                "id-39":{
                    title:"未检测出异常情况",
                    info:"未检测出异常情况，请联系客服处理，客服电话:400-6822-360",
                    action:''
                }
            },
            "temp":{
                "arrow_down":"展开",
                "arrow_up":"折叠",
                "detail_txt":"详细:",
                "host_name":"主机名",
                "seted_child_mode":"被设置了儿童保护模式，",
                "range":"在时间段",
                "to":"到",
                "forbidden_internet":"是禁止上网的",
                "black_info":"被拉入黑名单，在黑名单的设备将不能接入网络上网"
            }
        },


		s_return:"返回",
		edit:"编辑",
		modify:"修改",
		s_delete:"删除",
		delete_list:"是否确认删除该条目？",
		unbind_list:"是否确认解绑该条目？",
		unbind_checked_list:"是否确认解绑选中条目？",
		delete_checked_list:"是否确认删除选中条目？",
		index:"序列号",
		device:"设备",
		mac_addr:"MAC地址",
		ip_addr:"IP地址",
		op:"操作",
		source:"来源",
		manual_input:"手动输入",
		auto_input:"自动输入",
		remove:"移除",
		unbind:"解绑",
		s_time:"时间",
		s_event:"事件描述",
		service_not_open:"该项服务未开启",
		add_app:"添加插件",
		version:"版本",
		issuer:"发行者",
		close_app:"关闭插件",
		open_app:"开启插件",
		recover_setting:"恢复设置",
		uninstall:"卸 载",
		apply_setting:"插件配置",
		app_intro:"插件介绍",
		app_info:"插件信息",
		app_website:"官方网站",
		maintainer:"维护者",
		rom_use:"占用存储",
		ram_use:"占用RAM",
		confirm_upload_app:"你确定要上传该APP吗？",
		app_uploading:"APP上传中！",
		comfirm_default:"你真的想把系统参数恢复成出厂默认值吗？",
		recover_param:"页面正在恢复参数中！",
		comfirm_update:"你确定要升级文件系统吗？",
		uploading:"页面正在升级中！",
		checking:"检测中",
		version_check:"版本检测",
		download_update_package:"升级包暂未下载,点击“立即升级”按钮即可马上下载并升级",
		left:"剩余",
		cur_speed:"当前网速",
		update_now:"最新升级包下载完成，点击“立即升级”按钮即可进行升级",
		no_bind_user:"当前无绑定用户",
		delete_btn:"删  除",
		comfirm_reboot:"确定立即重启系统吗？",
		rebooting:"页面正在重启中！",
		cur_access_mode:"当前接入方式",
		wireless_access_point:"无线接入点",
		wireless_unencrypted:"您的无线设置未加密！",
		wireless_not_set:"当前无线接入模式无法配置相关参数，请到高级设置页面进行相关配置！",
		wds:"无线万能中继",
		ap_wds:"桥接/接入点",
		client:"无线网卡",
		repeater:"无线中继",
		wireless_close:"您的无线未开启！",
		wait:"请稍候",
		recheck:"秒后路由器将自动重新检测",
		check_failed:"上网自动检测失败!<br>点击“继续等待”,一分钟后系统将重新进行上网检测,<br>点击“继续配置”,进行上网配置.",
		detecting:"正在检测",
		success:"成功",
		failure:"失败",
		waiting:"等待中",
		set_success:"路由器设置成功",
		http_failure:"HTTP检测失败",
		network_connect_failure:"网络连接失败",
		get_ip_failure:"IP地址获取失败",
		less_than:"小于",
		router_version:"路由器型号",
		router_run_time:"路由器已运行",
		year:"年",
		month:"月",
		s_day:"日",
		day:"天",
		hour:"小时",
		minute:"分钟",
		s_hour:"时",
		s_min:"分",
		second:"秒",
		wifi_tip:"请设置无线开关开启和关闭的时间",
		time:"WiFi定时关闭",
		wifi_time:'关闭时间',
		start_time:'开启时间',
		time_group:"时间组",
		time_segment:"开启",
		not_connect:"未连接",
		wan_ip:"外网IP",
		lan_ip:"内网IP",
		set_lan_param:"点此设置LAN口参数",
		set_wan_param:"点此设置WAN口参数",
		unknown_device:"未知设备",
		unnamed_device:"未命名设备",
		enable:"开启",
		closed:"关闭",
		is_risk:"有风险",
		safe:"安全",
		unprotect:"未开启保护",
		protecting:"保护中",
		low:"低",
		medium:"中",
		high:"高",
		is_open:"已开启",
		is_close:"已关闭",
		network_status:"您的网络安全状态",
		view_protect_detail:"查看保护详情",
		no_need_modify:"无需修改",
		modify_pwd:"修改密码",
		name_map0:"恶意网址、",
		name_map1:"上网劫持、",
		name_map2:"家庭网络、",
		name_map3:"WiFi密码、",
		name_map4:"",
		name_map5:"管理密码、",
		yours:"您的",
		fire_wall_not_open:"防火墙未开启。",
		easy_guess:"太简单，容易被猜出来。",
		great_and_safe:"您的路由器没有发现风险，赞一个！",
		find_new_version:"发现新版本",
		confirm_down:"确认下载新版本",
		pwd_same:"新密码不能与旧密码相同，请重新输入！",
		not_link:"未连接外网",
		within:"内",
		re_enter:"请重新输入！",
		first_page:"首页",
		last_page:"尾页",
		ssid_not_null:"SSID不能为空",
		ssid_lt_32:"SSID的长度需小于32位",
		check_new_version:"发现",
		update_new_version:"版本，是否升级到新版本",
		one_minute:"1分钟",
		work_correct:"路由器正常工作",
		to_black_time:"拉黑时间",
		remove_from_black:"解除拉黑",
		upstream_network_speed:"上行网速",
		not_cur_device_to_black:"不能拉黑当前使用设备到黑名单！",
		log_null:"当前无任何日志条目",
		confirm_del_log:"是否确定清空日志信息？",
		camera:"360智能摄像机",
		router:"360安全路由器",
		link_str:"正在重连<span class=\"ani_dot\">...</span>",
		relink:"断网重连",
		wifi_status:"WiFi状态",
		wifi_2_4_status:"WiFi状态",
		wisp_channel_width_tip:"(目前处于WISP模式，无法修改频道带宽)",
		wisp_channel_tip:"(目前处于WISP模式，无法修改信道)",
		wireless_tip:"设置当前规则，可能会导致当前设备无法正常上网，请插拔网线重新获取新的上网地址。",
		wired_tip:"设置当前规则，可能会导致当前设备无法正常上网，请插拔网线重新获取新的上网地址。",
		wired_error_tip:"设置当前规则，会导致当前设备不能上网, 是否继续设置",
		plugin_enable_tip:"由于关闭了第三方插件功能，第三方插件安装功能暂不可用，如需安装插件请开启。",
		plugins_enable_tip:"<p class='tip' >安装未经过官方审核的第三方插件可能会导致用户信息泄露，甚至可能出现路由器基本功能不稳定的现象，在安装过非官方审核的第三方插件后，本公司将不再对路由器进行保修。</p>",

        //index page ==== lwj ==== start 故障诊断
		hitchDiagnosis_txt:{
            watting_check:"待检测",
            checkProgressTip:{
                common:[
                    "正在诊断您的路由器，请稍等...","您的路由器出现异常，正在为您诊断...","正在努力修复您的路由器...","故障已修复,恭喜您可以畅游网络世界了","已尝试自动修复，正诊断修复结果..."
                ],
                wanIp:"您的路由器宽带异常，正在为您诊断...",
                dnsFault:"您的路由器DNS服务器异常，正在为您诊断...",
                webStatus:"外网网页访问异常，正在为您诊断..."
            },
            abnormal:{
                lineLink:"无法自动修复缆线异常，请尝试手动修复",
                "wisp-link-down":"发现您开启了无线万能中继（wisp），但连接失败",
                "pppoe-server":"宽带服务器无响应，请尝试手动修复",
                "pppoe-userInfo":"宽带账号密码错误，请尝试手动修复",
                "mac-clone":"MAC地址克隆失败",
                "wanIp-fault":"WAN口未获取到IP地址，请尝试手动修复",
                wanNolink:"WAN口网关不通，请尝试手动修复",
                dns:"DNS服务器异常，请尝试手动修复",
                "web-fault":"网页访问异常，请尝试手动修复",
                connectTypeError:"上网方式配置不正确，请尝试手动修复"
            },
            wan_setup:["宽带PPPoE","动态IP","静态IP"]
        },
        server_internet:{
            left:[
                "中国联通:10010",
                "网通宽带:10010",
                "中国电信:10000",
                "长城宽带:96090090",
                "铁通宽带:10050",
                "歌华宽带:96196"
            ],
            right:[
                "方正宽带:010-82529990",
                "宽&ensp;带&ensp;通:010-84603993",
                "艾普宽带:952155",
                "中国移动:10086",
                "蓝波宽带:010-65885227",
                "中电飞华:010-51961096"
            ],
            tip:{
                pppoeUserInfo:"（请和运营商确认您的宽度账号和密码）",
                pppoe:"（运营商服务器异常,路由器拨号无响应）",
                dns:"（当前线路DNS服务器解析异常）",
                connectTypeConfig:"（请和运营商确认正确的上网方式及配置信息）"// wan ip
            }
        },
        //index page ==== lwj ====  end  故障诊断
		//模版
		has_work:"路由器已工作",
		link_status:"联网状态",
		akey_speed:"一键测速",
		fail_help:"故障诊断",
        hitch_diagnosis:"故障检测",
		link_help:"连线指南",
		modify_name:"修改名称",
		limited_speed:"已限速",
		waitting_auth:"未认证",
		online_time:"在线时长",
		ip:"IP",
		mac:"MAC",
		down_speed:"下行网速",
		up_speed:"上行网速",
		limit_speed:"限速",
		into_black:"拉黑",
		no_limite_speed:"(数值0为不限速)",
		cancel_speed:"取消限速",
		do_confirm:"确定",
        rssi_txt:"信号质量",
        rssi_manage:"进入管理页面",
		akey_speed_warning_txt:["准备测速，请稍候......","正在进行下行带宽测速，请稍候......","正在进行上行带宽测速，请稍候......"],
		akey_result_spel_line:"专线",

		//快速配置
		initialized:"已经初始化",
		pppoe_not_null:"请输入宽带账号",
		pppoe_not_correct:"不能含有非法字符\'\"<>和空格",
		pppoe_len_not_correct:"PPPoE用户名长度不正确",
		pppoe_pwd_not_null:"请输入宽带密码",
		pppoe_pwd_not_correct:"不能含有非法字符\\\'\"<>空格和中文",
		pppoe_pwd_len_not_correct:"PPPoE密码长度不正确",
		ip_not_blank:"请输入IP",
		ip_incorrect:"请输入正确的IP",
		mask_not_blank:"请输入掩码",
		mask_incorrect:"请输入正确的掩码",
		getway_not_blank:"请输入网关",
		getway_incorrect:"请输入正确的网关",
		dns_not_blank:"请输入DNS",
		dns_incorrect:"请输入正确的DNS",
		wifi_admin_pass:"WiFi和管理密码(8位以上)",
		wifi_pass:"8-30位WiFi密码",
		wifi_name_not_null:"名称不能为空",
		wifi_name_lt_32:"名称长度不能超过32位",
		pwd_not_chinese:"密码不能设置中文",
		ssid_pwd_incorrect:"不能含有非法字符\\\'\"<>",
		pwd_8_30:"密码长度范围为8-30位",
		
		
		//验证函数中的错误提示
		deny_ip_in_same:"(管理地址IP应该保持和内网地址在同一个网段)",
		deny_ip_tips:"设置管理地址后，路由卫士的本地管理功能将失效<br/>客官，你忍心吗？",
		deny_not_same_ip:"您配置的指定管理地址和本机地址不同，会导致您无法管理页面<br/>是否继续？",
		range:"范围",
		need_data:"请输入数据",
		exceed_max:"超出最大长度,已自动截短",
		comfirm_pwd:"请输入确认密码",
		pwd_differ:"两次输入的密码不同",
		non_null_integer:"请重新输入一个非空整数",
		non_numeric_char:"不能含有非数字字符",
		non_null_decimal:"请重新输入一个非空小数",
		non_decimal_char:"不能含有除数字和小数点外的其它字符",
		digital_format_incorrect:"数字格式不正确",
		non_null_string:"请重新输入一个非空字符串",
		not_illegal_char:"不能含有非法字符",
		illegal_char:"非法字符",
		and:"和",
		blank:"空格",
		non_alphanumeric_char:"不能含有字母数字以外的字符",
		pwd_not_empty:"密码不能为空",
		not_chinese:"不能含有中文字符",
		server_addr_not_null:"服务器地址不能为空",
		discover:"发现",
		piece:"个",
		section:"段",
		the:"第",
		s_in:"在",
		not_in:"不在",
		two:"二",
		three:"三",
		four:"四",
        ip_not_null:"IP地址不能为空",
        ip_val_not_null:"IP值不能为空",
        ip_range:"IP值只能在0-255之间",
        ip_num:"IP地址只接受数字",
        ip_broadcast_addr:"IP地址不能为广播地址",
        ip_network_addr:"IP地址不能为网段地址",
        start_end_ip_err:"起始IP大于结束IP",
		ip_incorrect_len:"IP长度不正确", 
        ip_reserve_addr:"IP地址为保留地址",
		not_loopback_addr:"IP不能为回环地址",
		not_multicast_addr:"IP不能为组播地址",
        not_lan_ip_addr:"IP地址不能与路由器地址相同",
        not_lan_mask_addr:"IP地址不能为掩码地址",
		firsr_section_not_zero:"IP第一位不能为0",
        four_section_not_zero:"IP第四位不能为0",
		four_section_not_null:"IP第四位不能为空",
		ip_getway_not_same:"IP地址与默认网关不能相同",
		ip_default_getway_in_same_segment:"IP地址与默认网关应在同一网段",
		out_ip_in_ip_same_segment:"外网IP不能和内网IP在同一网段",
		in_ip_out_ip_same_segment:"内网IP不能和外网IP在同一网段",
		ip_has_been_used:"此IP地址已使用",
		mac_is_binding:"此MAC设备已绑定",

        getway_not_null:"默认网关不能为空",
        getway_val_not_null:"默认网关不能为空",
        getway_range:"默认网关只能在0-255之间",
        getway_num:"默认网关只接受数字",
        getway_broadcast_addr:"默认网关不能为广播地址",
        getway_network_addr:"默认网关不能为网段地址",
        getway_incorrect_len:"默认网关长度不正确",
        getway_reserve_addr:"默认网关为保留地址",
        getway_not_loopback_addr:"默认网关不能为回环地址",
        getway_not_multicast_addr:"默认网关不能为组播地址",
        not_lan_getway_addr:"默认网关不能与路由器地址相同",
        getway_not_lan_mask_addr:"默认网关不能为掩码地址",
        getway_firsr_section_not_zero:"默认网关第一位不能为0",
        getway_four_section_not_zero:"默认网关第四位不能为0",
		dhcp_pool_err:"地址池设置错误",

		dns_not_null:"DNS不能为空",
		dns_format_incorrect:"DNS格式不正确",
		port_not_null:"端口不能为空",
		port_non_numeric_char:"端口不能含有非数字字符",
		port_range:"端口不能大于65535或小于1",
		mask_err:"子网掩码输入错误",
		mask_format_err:"子网掩码不符合规范",
		mask_first_not_zero:"子网掩码第一位不能为0",
		mac_err:"MAC地址错误",
		mac_not:"MAC地址不能为全",
        mac_broadcast_addr:"MAC地址不能为组播地址",
		mtu_1500_576:"MTU值不能大于1500或小于576",
		mtu_1492_576:"MTU值不能大于1492或小于576",
		mtu_1440_576:"MTU值不能大于1440或小于576",
		pppoe_out_time_range:"超时时间应该在1到30之间",
		fragment_out_range:"分片阈值范围在256到2346之间",
		RTSThreshold_out_range:"RTS阈值范围在256到2347之间",
		year_lt_2008:"年份不能小于2008",
		month_range:"月份范围为1-12",
		day_range:"日期范围为1-",
		hour_range:"小时范围为0-23",
		minute_range:"分钟范围为0-59",
		second_range:"秒范围为0-59",
		calendar_not_null:"日期不能为空",
		calendar_format_err:"日期格式不正确",
		year_err:"年份输入不正确",
		month_err:"月份输入不正确",
		day_err:"日期输入不正确",
		url_not_null:"请重新输入一个非空网址",
		url_err:"网址不正确",
		eq_5:"请输入5个字符",
		eq4_20:"请输入(4-20)个字符",
		eq6_20:"请输入(6-20)个字符",
		eq8_63:"请输入(8-63)个字符",
		eq8_30:"请输入(8-30)个字符",
		eq8_31:"请输入(8-31)个字符",
		pwd_low:"弱",
		pwd_medium:"中",
		pwd_strong:"强",
		whole_day:"关闭",
		week:"星期",
		day0:"星期一",
		day1:"星期二",
		day2:"星期三",
		day3:"星期四",
		day4:"星期五",
		day5:"星期六",
		day6:"星期日",
        smart_device:{
            light:"智能灯泡",
            socket:"智能插座",
            controller:"智能控制器",
            wifi_extender:"无线中继器",
            camera:"摄像头",
            curtain:"窗窜",
            tvset:"电视机",
            player:"播放器",
            remote:"遥控器",
            airbox:"空气盒子",

            audio:"音响",
            home_cabinet_aircon:"家用柜机空调",
            home_split_aircon:"家用分体空调",
            commercial_aircon:"商业空调",
            air_purifier:"空气净化器",
            air_purify_cube: "净化魔方",
            desktop_purifier:"桌面净化器",
            air_cube: "空气魔方",
            air_manager: "空气管家",
            aldehyde_detector: "醛知道",

            tourniquet:"血压计",
            fatty_meter:"体脂仪",
            blood_glucose_meter:"血糖仪",
            thermometer:"体温计",
            bracelet:"智能手环",
            oximeter:"血氧仪",
            sleep_meter:"睡眠仪",
            elec_heater:"电热水器",
            gas_heater:"燃气热水器",
            pulsator_washer:"波轮洗衣机",

            drum_washer:"滚筒洗衣机",
            fridge:"冰箱",

            offline:"离线",
            online:"在线",
            unknown_ssid:"未命名设备",
            unknown_vendor:"未知品牌",
            ssid:"设备名称",
            vendor:"品牌",
            type:"类型",
            model:"型号",
            mac:"MAC地址",
            status:"连接状态",
            txt1:"即将",
            txt2:"正在",
            txt3:"为您添加",
            txt4:"个类型",
            txt5:"台",
            txt6:"智能设备",
            txt7:"成功",
            txt8:"失败",
            txt9:"请稍后...",
            txt10:"连接中",
            txt11:"添加新设备失败,请重试",
            txt12:"添加此类设备",
            txt13:"剩余",
            second:"秒",
            current:"当前",
            device:"设备",
            Qihoo_360:"奇虎360",
            Haier:"海尔",
            Broadlink_DNA:"博联"
        }
	}
};

var dialog_text = {
	"default":["确认操作","确定","取消"],
	"boa_deny_ip":["确认操作","放弃设置","继续设置"],
	"igd_ap":["确认操作","重新上传","果断放弃"],
	"update":["升级版本","确定","取消"],
	"format":["格式化","确定","取消"],
	"unstall":["卸载","确定","取消"],
    "quicken_tip":["加速后可能会有以下风险","知道了"],
	"dhcp_tip":["友情提示","继续设置","果断放弃"],
	"dhcp_error_tip":["友情提示","继续设置","果断放弃"],
	"plugins_enable_tip":["请慎用，第三方插件调试功能为插件开发者专属功能","继续设置","放弃设置"]
};

//other
//auto_fade参数：提示框是否自动消失
var message_panel =message_panel|| new Object();
message_panel = {
	save:{
		type:"wait",
		auto_fade:false,
		message:"正在保存参数，请稍候……"
	},
	refreshing:{
		type:"wait",
		auto_fade:false,
		message:"刷新中，请稍候……"
	},
	deleteing:{
		type:"wait",
		auto_fade:false,
		message:"正在删除，请稍候……"
	},
	delete_err:{
		type:"error",
		auto_fade:true,
		message:"删除失败"
	},
	success:{
		type:"success",
		auto_fade:true,
		message:"设置成功"
	},add_success:{
        type:"success",
        auto_fade:true,
        message:"添加成功！"
    },del_success:{
        type:"success",
        auto_fade:true,
        message:"删除成功！"
    },
	quick_success:{
		type:"success",
		auto_fade:false,
		message:"设置成功"
	},
	pppoe_ok:{
		type:"success",
		auto_fade:false,
		message:"拨号成功."
	},
	pppoe_ing:{
		type:"wait",
		auto_fade:false,
		message:"正在拨号..."
	},
	pppoe_fail:{
		type:"error",
		auto_fade:false,
		message:"拨号失败."
	},
	pppoe_error:{
		type:"error",
		auto_fade:false,
		message:"用户名或密码错误."
	},
	dhcp_ok:{
		type:"success",
		auto_fade:false,
		message:"获取IP地址成功"
	},
	dhcp_fail:{
		type:"error",
		auto_fade:false,
		message:"获取IP地址失败"
	},
	dhcp_ing:{
		type:"wait",
		auto_fade:false,
		message:"正在获取IP地址..."
	},
	dns_ing:{
		type:"wait",
		auto_fade:false,
		message:"检查DNS服务器工作状态..."
	},
	dns_fail:{//没获取到IP或者获取到IP但是dns解析失败
		type:"error",
		auto_fade:false,
		message:"DHCP方式不能上网，将尝试PPPOE拨号"
	},
	setup_ing:{
		type:"wait",
		auto_fade:false,
		message:"请稍候,即将完成您的配置..."
	},
	check_ing:{
		type:"wait",
		auto_fade:false,
		message:"正在检测上网方式..."
	},
	check_fail:{
		type:"error",
		auto_fade:false,
		message:"上网方式检测失败"
	},
	check_ok_dhcp:{
		type:"success",
		auto_fade:false,
		message:"检测到当前上网方式为动态地址上网(DHCP)"
	},
	check_ok_pppoe:{
		type:"success",
		auto_fade:false,
		message:"检测到当前上网方式为宽带拨号(PPPOE)"
	},
	wait_one_min:{
		type:"wait",
		auto_fade:false,
		message:"请稍候"
	},
	wait:{
		type:"wait",
		auto_fade:false,
		message:"请稍候"
	},
	need_file_name:{
		type:"error",
		auto_fade:true,
		message:"请选择升级文件"
	},
	need_plugin_file:{
		type:"error",
		auto_fade:true,
		message:"请选择插件文件"
	},
	file_uploading:{
		type:"wait",
		auto_fade:false,
		message:"文件上传中"
	},
	app_loading:{
		type:"wait",
		auto_fade:false,
		message:"APP加载中,请稍候"
	},
	bind_user_timeout:{
		type:"error",
		auto_fade:true,
		message:"绑定ID获取失败，请检查互联网连接"
	},
	bind_user_getting:{
		type:"wait",
		auto_fade:true,
		message:"绑定ID获取中"
	},
	exception:{
		type:"error",
		auto_fade:true,
		message:"异常错误"
	},
	error:{
		type:"error",
		auto_fade:true,
		message:"设置失败"
	},
	check_time_at_least:{
		type:"error",
		auto_fade:true,
		message:"请勾选至少一个时间！"
	},
	check_week_at_least:{
		type:"error",
		auto_fade:true,
		message:"请至少勾选一个星期选项！"
	},
	check_time_group_at_least:{
		type:"error",
		auto_fade:true,
		message:"请至少勾选一个时间组！"
	},
	login_failure:{
		type:"error",
		auto_fade:true,
		message:"登录失败！"
	},
    login_failure48:{
        type:"error",
        auto_fade:true,
        message:"登录次数过多，请稍候登录！"/* 创建会话失败 */
    },
    login_failure49:{
        type:"error",
        auto_fade:true,
        message:"已到达最大会话数！"/* 创建会话已满 */
    },
	uninstall_success:{
        type:"success",
		auto_fade:true,
        message:"卸载成功"
    },
    migration_success:{
       	type:"success",
		auto_fade:true,
        message:"迁移成功"
    },
    format_success:{
       	type:"success",
		auto_fade:true,
        message:"格式化成功"
    },
	channel_choosing:{
		type:"wait",
		auto_fade:false,
        message:"最佳信道搜索中……"
	},
	channel_best:{
		type:"success",
		auto_fade:true,
        message:"当前已是最优信道"
	},
    msg_info:{
        type:"msg-info",
        auto_fade:true,
        message:"消息提示"
    },
	login_out_wait:{
		type:"wait",
        auto_fade:false,
        message:"正在退出，请稍候…"
	},
    file_type_error:{
        type:"error",
        auto_fade:true,
        message:"文件格式异常，请上传后缀带BIN的文件！"
    },
	add_app_type_error:{
		type:"error",
		auto_fade:true,
		message:"文件格式异常，请上传后缀带OPK的文件！"
	},
    repair_ing:{
        type:"wait",
        auto_fade:false,
        message:"正在修复中,请稍后……"
    },
    repair_success:{
        type:"success",
        auto_fade:true,
        message:"修复成功"
    },
    check_repair_at_least:{
        type:"error",
        auto_fade:true,
        message:"请至少勾选一个修复选项！"
    },
    detecting:{
        type:"wait",
        auto_fade:false,
        message:"正在为您检测中,请稍后……"
    },
    detecting_over:{
        type:"success",
        auto_fade:true,
        message:"检测完成"
    }
};

igd.update_info = {
	1:{
		info:"无法连接服务器"
	},
	10:{
		info:"暂未检测到新版本"
	},
	11:{
		info:"正在连接服务器，检测最新版本"
	},
	12:{
		info:"您的路由器已是最新版本"
	},
	13:{
		info:"您已忽略此版本"
	},
	14:{
		info:"获取最新版本信息失败，请稍后重试"
	},
    20:{
        info:"有最新版本可升级"
    },
    21:{
        info:"有最新版本可升级, 将自动升级"
    },
	30:{
		info:"正在获取最新版本固件"
	},
	31:{
		info:"下载最新固件失败"
	},
	32:{
		info:"一段时间后重试下载"
	},
	40:{
        info:"正在校验最新版本固件"
	},
	41:{
		info:"开始升级路由器"
	},
	42:{
		info:"最新升级固件错误"
	}
};

igd.device_label_arr = ["","苹果","三星","诺基亚","联想","华为","HTC","索尼","小米","酷派","魅族","OPPO","LG","中兴","vivo","摩托罗拉","金立","天语","TCL","飞利浦","戴尔","惠普","华硕","神舟","东芝","宏基","海信","磊科无线网卡"];

var wan_tip_str = {
	1:{
		info:"断网"
//        info:"网线未连通"
	},
	2:{
		info:"断网"//back当前未获取到IP
	},
	3:{
		info:"断网"//当前获取到IP,无法联网
	},
    4:{
        info:"检测中..."
    },
	0:{
		info:"正常"
	} 
};
var language_type = igd.global_param.language_type;
var L = language[language_type]["JS"];
