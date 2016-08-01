/********************************网络设置菜单********************************************************/
//内网设置
var lanTabData = {
	parent:"lan_set_layer",
	child:[
		 {name:"lan_setup",func:"init_lan"},
		 {name:"dhcp_addr",func:"init_dhcp_addr"}
	]
};
function init_lan_setup() {
    init_text_event();
	var tab = new igd.ui.Tab(lanTabData);
	tab.init();
}

var ck_dhcp_pool_obj = {};
function init_lan() {
    ck_dhcp_pool_obj.start = "";
    ck_dhcp_pool_obj.end = "";
	ck_dhcp_pool_obj.dhcp_enable = "";
	ck_dhcp_pool_obj.is_router_as_dns = "";
	get_wan_ip();
    $.post("/router/lan_show.cgi", {noneed: "noneed"}, function (data) {
        var data = dataDeal(data);
		var lan_ip = data.lan_ip;
		var lan_mask = data.lan_mask;
        $("#old_lan_ip").val(lan_ip);
        $("#old_lan_mask").val(lan_mask);
        $("#lan_ip_address").val(lan_ip);
        $("#lan_sub_mask").val(lan_mask);
		radio_set(data.is_router_as_dns,"dns_proxy");
		dhcp_pool_calculator.formatDhcpPool(lan_ip,lan_mask);
        radio_set(data.dhcp_enable,"dhcp_enable");
		dhcp_state_change(data.dhcp_enable);
        $("#dhcp_pool_start").val(data.dhcp_start);
        $("#dhcp_pool_end").val(data.dhcp_end);
        ck_dhcp_pool_obj.start = data.dhcp_start;
        ck_dhcp_pool_obj.end = data.dhcp_end;
		ck_dhcp_pool_obj.dhcp_enable = data.dhcp_enable;
		ck_dhcp_pool_obj.is_router_as_dns = data.is_router_as_dns;
    });
    (function () {
        $("#lan_ip_address").unbind("keyup paste").bind("keyup paste",function(){
			var _val = $(this).val();
			var obj = dhcp_pool_calculator.calculateIPCIDR($(this).val());
			if(!!obj){
				$("#dhcp_pool_start").val(obj["dhcpStart"]);
				$("#dhcp_pool_end").val(obj["dhcpEnd"]);
			}
		});
        $("#lan_sub_mask").unbind("keyup paste").bind("keyup paste",function(){
			var _val = $(this).val();
			var obj = dhcp_pool_calculator.calculateSubnet(_val);
			if(!!obj){
				$("#dhcp_pool_start").val(obj["dhcpStart"]);
				$("#dhcp_pool_end").val(obj["dhcpEnd"]);
			}
		});
    })();
}

function caculateIPNum(ip1,ip2,ip3){
	//用于缩小dhcp范围
	for(var i in ip1){
		ip1[i] =  parseInt(ip1[i]);
	}
	for(var i in ip2){
		ip2[i] =  parseInt(ip2[i]);
	}
	for(var i in ip3){
		ip3[i] =  parseInt(ip3[i]);
	}
	var arr = [];
	//排序
	arr.push(dhcp_pool_calculator.octet2dec(ip1));
	arr.push(dhcp_pool_calculator.octet2dec(ip2));
	arr.push(dhcp_pool_calculator.octet2dec(ip3));
	arr.sort();
	var a,b;
	if((arr[1] - arr[0]) > (arr[2] - arr[1])){
		a = dhcp_pool_calculator.dec2octet(arr[0]);
		b = dhcp_pool_calculator.dec2octet(arr[1]);
	}
	else if((arr[2] - arr[1]) > (arr[1] - arr[0])){
		a = dhcp_pool_calculator.dec2octet(arr[1]);
		b = dhcp_pool_calculator.dec2octet(arr[2]);
	}
	$("#dhcp_pool_start").val(a[0]+"."+a[1]+"."+a[2]+"."+a[3]);
	$("#dhcp_pool_end").val(b[0]+"."+b[1]+"."+b[2]+"."+b[3]);
}

function lan_compare(){
	if($("#lan_ip_address").val() == $("#old_lan_ip").val() && $("#lan_sub_mask").val() == $("#old_lan_mask").val() && $("#dhcp_pool_start").val() == ck_dhcp_pool_obj.start && $("#dhcp_pool_end").val() == ck_dhcp_pool_obj.end && ck_dhcp_pool_obj.dhcp_enable == $("#dhcp_enable_hidden").val() && $("#dns_proxy_hidden").val() == ck_dhcp_pool_obj.is_router_as_dns)
		return true;
	else
		return false;
}

var lan_jump_timer;
function lan_setup_submit() {
	var ret = lan_compare();
	if(ret){
		show_message("success");
		return;
	}
    if (check_input("lan_setup_frm")) {
		var lan_ip = $("#lan_ip_address").val();

        var ip1 = $("#dhcp_pool_start").val();
        var ip2 = $("#dhcp_pool_end").val();
		
		
		var start_arr = ip1.split(".");
		var end_arr = ip2.split(".");
		for(var j = 0; j < 4; j++){
			start_arr[j] = parseInt(start_arr[j],10);
			end_arr[j] = parseInt(end_arr[j],10);
		}
		var start_ip = dhcp_pool_calculator.octet2dec(start_arr);
		var end_ip = dhcp_pool_calculator.octet2dec(end_arr);
		
		var ip_1 = dhcp_pool_calculator.octet2dec(dhcp_pool_calculator.nAddr);
		var ip_2 = dhcp_pool_calculator.octet2dec(dhcp_pool_calculator.ndhcpStart);
		var ip_3 = dhcp_pool_calculator.octet2dec(dhcp_pool_calculator.ndhcpEnd);
		if($("#dhcp_enable_hidden").val() == "1"){
			if(start_ip < ip_2 || start_ip > ip_3){
				show_differ_tip(L.dhcp_pool_err, "dhcp_pool_start");
				return false;
			}
			if(end_ip < ip_2 || end_ip > ip_3){
				show_differ_tip(L.dhcp_pool_err, "dhcp_pool_end");
				return false;
			}
			
			
			if(ip_1 == ip_2){
				show_differ_tip(L.dhcp_pool_err, "dhcp_pool_start");
				return false;
			}
			else if(ip_1 == ip_3){
				show_differ_tip(L.dhcp_pool_err, "dhcp_pool_end");
				return false;
			}
		}
		
        var lanSubMask = $("#lan_sub_mask").val();
		//IP和掩码组合校验，确定IP是不是网络地址或者广播地址
        var return_val0 = check_ip_mask(lan_ip, lanSubMask);
        if (return_val0 != true) {
            show_differ_tip(return_val0, "lan_ip_address");
            return false;
        }
		//IP和掩码组合校验，确定和上端是不是在同一个网段
		var result = check_lan_wan_ip(lan_ip,lanSubMask);
		if (result != true) {
            show_differ_tip(result, "lan_ip_address");
            return false;
        }
        var return_val = check_start_end_ip(ip1, ip2);
        if (return_val != true) {
            show_differ_tip(return_val, "dhcp_pool_start");
            return false;
        }
		
        //防止跳转时候图片加载不出来,延时处理
        show_message("save");
        var ck_flag = 0;
        var lan_jump_Fn = function () {
			if(lan_jump_timer)
				window.clearTimeout(lan_jump_timer);
            lan_jump_timer = setTimeout(function () {
				if(ck_flag == 3)
					return;
				show_message("success");
                if (ck_flag == 0) {
                    if (ROUTE_INFO.g_port != "80")
                        window.open("http://" + lan_obj.lan_ip + ":" + ROUTE_INFO.g_port + "/login.htm" , "_self");
                    else
                        window.open("http://" + lan_obj.lan_ip + "/login.htm", "_self");
                }
                else if (ck_flag == 1) {
                    init_lan_setup();
                }
            }, 12 * 1000);
        };
        var lan_obj = igd.ui.form.collect("lan_setup_frm");
        var SubMitCallBack =arguments[0];//修改成功后所要执行的函数
        $.post("/router/lan_set.cgi", lan_obj, function (data) {
            var data = dataDeal(data);
            if (data == "SUCCESS") {
				 if(typeof  SubMitCallBack == "function"){
                    SubMitCallBack();
                }
                ROUTE_INFO.lan_ip = lan_obj.lan_ip;
                ROUTE_INFO.lan_mask = lan_obj.lan_mask;
                if (lan_obj.lan_ip == $("#old_lan_ip").val()) {
                    ck_flag = 1;
                }
                else {
                    ck_flag = 0;
                }
            }
            else {
				ck_flag = 3;
                show_message("error", igd.make_err_msg(data));
				init_lan_setup();
            }
        });
        lan_jump_Fn();
    }
}


function dhcp_state_change(str) {
    reg_map["lan_setup_frm"][2] = {};
    reg_map["lan_setup_frm"][3] = {};
    if (str == "1") {
        section_disable("dhcp_layer", false);
        reg_map["lan_setup_frm"][2].id = "dhcp_pool_start";
        reg_map["lan_setup_frm"][2].type = "lan_ip";
        reg_map["lan_setup_frm"][3].id = "dhcp_pool_end";
        reg_map["lan_setup_frm"][3].type = "lan_ip";
    }
    else {
        $("#dhcp_pool_start").val(ck_dhcp_pool_obj.start);
        $("#dhcp_pool_end").val(ck_dhcp_pool_obj.end);
        hide_msgbox();
        $("#dhcp_pool_start,#dhcp_pool_end").removeClass().addClass("input-text input-biger");
        section_disable("dhcp_layer", true);
    }
}

//外网设置
var wan_setup_data = {};
var forms = [
    "wan_pppoe_form",
    "wan_dhcp_form",
    "wan_static_form",
    "wan_xingkong_form",
    "wan_wangtong_form",
    "wan_guangd_form",
    "wan_henan_dhcp_form",
    "wan_henan_pppoe_form",
    "wan_hlj_static_form",
    "wan_pptp_sip_form",
    "wan_pptp_dhcp_form",
    "wan_l2tp_sip_form",
    "wan_l2tp_dhcp_form"
];

var conf_speed_value;
var wanTabData = {
	parent:"wan_mode_layer",
	child:[]
};
function init_wan_setup(index) {
    var tab = new igd.ui.Tab(wanTabData,"set_wan_link_work_mode");
	tab.init();
    $("#common_uiname").val("WAN1");
    var uiname = $("#common_uiname").val();
	var d = new Date();
    $.post("/router/wan_config_show.cgi", {uiname: uiname,b64:d.getTime()}, function (data) {
        var data = dataDeal(data);
        wan_setup_data = data;
        if (data && data.COMMON && data.COMMON.connect_type && data.PPPOE) {
            wan_setup_data.PPPOE.pass = getDAesString(wan_setup_data.PPPOE.pass);
        }
        //接口设置
        conf_speed_value = "";
        set_wan_link_work_mode(index);
    });
}
function init_interface_mode() {

    $.post("/router/wanport_real_show.cgi", {noneed: "noneed"}, function (ret) {
        var ret = dataDeal(ret);
        conf_speed_value = ret[0].conf_speed_state;
        select_chose_set("wan1_select", conf_speed_value);
    });
}

function set_wan_link_work_mode(index, isMobile) {
    var name = [
        "wan_pppoe",
        "wan_dhcp",
        "wan_static",
        "wan_xingkong",
        "wan_wangtong",
        "wan_guangd",
        "wan_henan_dhcp",
        "wan_henan_pppoe",
        "wan_hlj_static",
        "wan_pptp_sip",
        "wan_pptp_dhcp",
        "wan_l2tp_sip",
        "wan_l2tp_dhcp"
    ];
    var connect_types = [
        "PPPOE",
        "DHCP",
        "STATIC",
        "XINGKONG",
        "WANGTONG_PPPOE",
        "GUANGDIAN_STATIC",
        "HN_DHCP",
        "HN_PPPOE",
        "HLJ_STATIC",
        "PPTP_STATIC",
        "PPTP_DHCP",
        "L2TP_STATIC",
        "L2TP_DHCP"
    ];
    var len = name.length;
    if (!wan_setup_data.COMMON) {
        return;
    }
    var common = wan_setup_data.COMMON;
    var connecttype = 0;
    connecttype = get_connect_type(common.connect_type);
    if (index) {
        connecttype = parseInt(index, 10);
    }
    var html_name = name[connecttype - 1];
    var loadCallBackFn = function (ret) {
        $("#wan_setup_pass0").unbind("focus").bind("focus", function () {
            $(this).val("");
        });
        $("#wan_setup_pass0").unbind("blur").bind("blur", function () {
            var _val = $(this).val();
            if (_val == "") {
                $(this).val(igd.global_param.pwd_string.substring(0, wan_setup_data.PPPOE.pass.length));
            }
        });
        init_text_event();
        init_language(html_name);
        if (connecttype)
            $("#wan_mode_layer div").eq(connecttype - 1).addClass("on");
        //$("#wan_mode").val(connecttype);
        $("#common_connect_type").val(connect_types[connecttype - 1]);
        wan_init_data(wan_setup_data,isMobile);
        init_interface_mode();
    };
    if (isMobile) {
        loadCallBackFn();
        return;
    }
    $("#wan_setup_load").load("./" + html_name + ".htm", loadCallBackFn);
}

function get_connect_type(type) {
    var connecttype = 0;
    switch (type) {
        case "PPPOE":
            connecttype = 1;
            break;
        case "DHCP":
            connecttype = 2;
            break;
        case "STATIC":
            connecttype = 3;
            break;
        case  "XINGKONG":
            connecttype = 4;
            break;
        case  "WANGTONG_PPPOE":
            connecttype = 5;
            break;
        case  "GUANGDIAN_STATIC":
            connecttype = 6;
            break;
        case  "HN_DHCP":
            connecttype = 7;
            break;
        case  "HN_PPPOE":
            connecttype = 8;
            break;
        case  "HLJ_STATIC":
            connecttype = 9;
            break;
        case  "PPTP_STATIC":
            connecttype = 10;
            break;
        case  "PPTP_DHCP":
            connecttype = 11;
            break;
        case  "L2TP_STATIC":
            connecttype = 12;
            break;
        case  "L2TP_DHCP":
            connecttype = 13;
            break;
        default:
            connecttype = 2;
    }
    return connecttype;
}

var PPPOE_PASS = "";
function wan_init_data(data,isMobile) {
    if (!data || !data.COMMON || !data.COMMON.connect_type)
        return;
    var common = data.COMMON;
    var pppoe = data.PPPOE;
    var dhcp = data.DHCP;
    var _static = data.STATIC;
    var xingkong = data.XINGKONG;
    var wangtong = data.WANGTONG_PPPOE;
    var guangdian = data.GUANGDIAN_STATIC;
    var hn_dhcp = data.HN_DHCP;
    var hn_pppoe = data.HN_PPPOE;
    var hlj_static = data.HLJ_STATIC;

    var connecttype = 1;
    connecttype = get_connect_type(common.connect_type);

    $("#common_clone_mac").val(common.mac_clone);
    $("#common_default_mac").val(common.mac_default);
    for (var i = 0; i < forms.length; i++) {
        set_value(forms[i], "mac", common.mac_current);
        set_value(forms[i], "up_bandwidth", common.up_bandwidth);
        set_value(forms[i], "down_bandwidth", common.down_bandwidth);
        if (i != 4) {
            set_isp_value(common.isp, i);
            form_radio_sele_set(forms[i], "isp_radio", common.isp);
        }
        set_work_mode_value(i, common.work_mode);
        form_radio_sele_set(forms[i], "work_mode_radio", common.work_mode);
        form_radio_sele_set(forms[i], "line_detect", common.line_detect);
    }

    //mtu
    set_value(forms[connecttype - 1], "mtu", common.mtu);

    //pppoe
    set_value(forms[0], "user", utf8to16(base64decode(pppoe.user)));
	
	/*set_value(forms[0], "pass", pppoe.pass);
    if($("#wan_setup_pass0").length != 0 && !isMobile){
		PPPOE_PASS = $("#wan_setup_pass0").PwdFadeIn()[0];
	}*/
    if (pppoe.pass.length != 0) {
        var pass_str = igd.global_param.pwd_string.substring(0, pppoe.pass.length);
        set_value(forms[0], "pass", pass_str);
    }
    else
        set_value(forms[0], "pass", pppoe.pass);

	//server_name&ac_name
    set_value(forms[0], "server_name", pppoe.server_name);
    set_value(forms[0], "ac_name", pppoe.ac_name);

    set_value(forms[0], "dns1", handle_ip(pppoe.dns[0]));
    set_value(forms[0], "dns2", handle_ip(pppoe.dns[1]));

    if (pppoe.out_time > 0) {
        set_value(forms[0], "out_time", pppoe.out_time);
        set_value(forms[0], "out_time_dr", pppoe.out_time);
    }
    form_radio_sele_set(forms[0], "pppoe_conf_radio", check_pppoe_conf(pppoe.pppoe_conf));
    set_pppoe_connect_mode(0, check_pppoe_conf(pppoe.pppoe_conf));
    //dhcp
    set_value(forms[1], "dns1", handle_ip(dhcp.dns[0]));
    set_value(forms[1], "dns2", handle_ip(dhcp.dns[1]));

    set_value(forms[1], "dns1_dr", handle_ip(dhcp.dns[0]));
    set_value(forms[1], "dns2_dr", handle_ip(dhcp.dns[1]));
    //静态
    set_value(forms[2], "ip", handle_ip(_static.ip));
    set_value(forms[2], "mask", handle_ip(_static.mask));
    set_value(forms[2], "gw", handle_ip(_static.gw));
    set_value(forms[2], "dns1", handle_ip(_static.dns[0]));
    set_value(forms[2], "dns2", handle_ip(_static.dns[1]));

    //断网时间
    set_wan_cut_down_time(common);
}


function submit_wan_config_check(index,callback) {//提交前检查
	var keys = [
        "wan_pppoe_form",
        "wan_dhcp_form",
        "wan_static_form"
    ];
    var real_key = keys[index];
	/*if(real_key == "wan_pppoe_form" && callback == undefined){
		reg_map[real_key][1] = {};
		if(!get_msgbox("wan_setup_pass0","password_blank",PPPOE_PASS.real_pass))
			return;
	}*/
	
    if (!check_input(real_key)) {
        return false;
    }
    if (real_key == "wan_static_form") {
        var tmp_ip = "", tmp_mask = "", tmp_gw = "";
        tmp_ip = $("#wan_setup_ip2").val();
        tmp_mask = $("#wan_setup_mask2").val();
        tmp_gw = $("#wan_setup_gw2").val();
        var return_val = check_ip_mask(tmp_ip, tmp_mask);
        if (return_val != true) {
            show_differ_tip(return_val, "wan_setup_ip2");
            return false;
        }
        var return_val1 = check_getway_mask(tmp_gw, tmp_mask);
        if (return_val1 != true) {
            show_differ_tip(return_val1, "wan_setup_gw2");
            return false;
        }
        var return_val2 = check_wan_lan_ip(tmp_ip, tmp_gw, tmp_mask);
        if (return_val2 != true) {
            show_differ_tip(return_val2, "wan_setup_ip2");
            return false;
        }
    }

    /*if("288" == version||"safe" == version){//检查断网时间
     if(!cheK_ip_day("cut_time_hidden","wan_day","wan_day")){
     return;
     }*/
    return true;
}

function submit_wan_config(index,callback) {
/*    var ret = submit_wan_config_check(index,callback);*/
    var ret = submit_wan_config_check(index);
    if (ret) {
        show_message("save");
        var obj = igd.ui.form.collect(forms[index]);

        obj.uiname = $("#common_uiname").val();
        obj.connect_type = $("#common_connect_type").val();
       /*
	   if(callback == undefined){
			obj.pass = getAesString(PPPOE_PASS.real_pass);
	   }
	   else{
			obj.pass = getAesString($("#wan_setup_pass0").val());
		}*/
        //校验密码
        var old_pwd = wan_setup_data.PPPOE.pass;
        var pass_str = igd.global_param.pwd_string.substring(0, old_pwd.length);
        var new_pwd = $("#wan_setup_pass0").val();
        if (new_pwd == pass_str) {//说明用户根本没点密码字段
            obj.pass = getAesString(old_pwd);
        }
        else {
            obj.pass = getAesString(new_pwd);
        }
        /*if("WANGTONG_PPPOE" == obj.connect_type){
         obj.isp = "CNCGROUP";
         var d = new Date();
         obj.wangt_date = d.getYear()+"/"+d.getMonth()+"/"+d.getDate()+"/"+d.getHours()+"/"+d.getMinutes()+"/"+d.getSeconds();
         }*/
		var d = new Date();
		obj.b64 = d.getTime();
        var user = $("#wan_setup_user0").val();
		if(user != undefined)
			obj.user = base64encode(utf16to8(user));
        $.post("/router/wan_config_set.cgi", obj, function (res) {
            var data = dataDeal(res);
            if (data == "SUCCESS") {
                if(!!callback){
                    callback();
                }
                if ($("#wan1_select").val() == conf_speed_value) {
                    show_message("success");
                    init_wan_setup();
                }
                else {
                    set_interface_mode();
                }
            }
            else {
                show_message("error", igd.make_err_msg(data));
                init_wan_setup();
            }
        });
    }
}

function set_interface_mode() {
    var interface_obj = {};
    interface_obj.port = "WAN1";
    interface_obj.speed_state = $("#wan1_select").val();
    $.post("/router/port_config_setup.cgi", interface_obj, function (ret) {
        var ret = dataDeal(ret);
        if (ret == "SUCCESS") {
            show_message("success");
            init_wan_setup();
        }
        else {
            show_message("error", igd.make_err_msg(data));
            init_wan_setup();
        }
    });
}

function wan_advance_check(index) {//高级部分检查
    var keys = [
        "wan_pppoe_form_advance",
        "wan_dhcp_form_advance",
        "wan_static_form_advance"
    ];
    var real_key = keys[index];

    if (!check_input(real_key)) {
        return false;
    }
    return true;
}

function wan_advance_toggle(index) {
    if (wan_advance_check(index)) {
        section_toggle();
    }
}

function lan_advance_toggle() {
   section_toggle();
}

function resume_mac(form_index) {
    hide_msgbox();
    $("#" + forms[form_index] + " input[name='mac']").removeClass().addClass("input-text input-biger");
    $("#" + forms[form_index] + " input[name='mac']").val($("#common_default_mac").val());
}
function set_mac_clone(form_index) {
    hide_msgbox();
    $("#" + forms[form_index] + " input[name='mac']").removeClass().addClass("input-text input-biger");
    $("#" + forms[form_index] + " input[name='mac']").val($("#common_clone_mac").val());
}

function set_work_mode_value(index, value) {
    $("#work_mode" + index).val(value);
}
function set_isp_value(value, index) {
    $("#isp" + index).val(value);
}
function set_detect_value(value) {
    $('#line_detect').val(value);
}
function cut_timer_change(value) {
    $("#cut_time_hidden").val(value);
    if (value == "0") {
        $("#cut_time_set_body").hide();
    }
    else {
        $("#cut_time_set_body").show();
    }
}

function set_value(form_id, field_name, data) {
    $("#" + form_id + " input[name='" + field_name + "']").val(data);
}

function form_radio_sele_set(form_name, radio_name, hide_name_value) {
    var collection = $("#" + form_name + " input[name='" + radio_name + "']");
    for (i = 0; i < collection.length; i++) {
        collection[i].checked = (collection[i].value == hide_name_value) ? true : false;
    }
}

function check_pppoe_conf(conf) {
    if (conf != "AUTO" && conf != "IDLE" && conf != "MANU") {
        conf = "AUTO";
    }
    return conf;
}

function set_wan_cut_down_time(obj) {
    if (obj.timer_enable == "0") {
        $("#cut_time_set_body").removeClass("section_show").addClass("section_hide");
    }
    else {
        $("#cut_time_set_body").removeClass("section_hide").addClass("section_show");
        var day_data = obj.timer_day.split(" ");
        for (var i = 0; i < day_data.length; i++) {
            if ("" == day_data[i])
                continue;
            $("#wan_day" + (day_data[i] - 1)).attr("checked", true);
        }
        $("#wan_start_hour").val(obj.start_hour);
        $("#wan_start_min").val(obj.start_minute);
        $("#wan_end_hour").val(obj.end_hour);
        $("#wan_end_min").val(obj.end_minute);
    }
    $("#cut_time_hidden").val(obj.timer_enable);
    radio_sele_set("time", obj.timer_enable);
}

function set_pppoe_connect_mode(form_index, value) {
    var form = forms[form_index];
    hide_msgbox();
    $("#" + form + " input[name='out_time']").removeClass().addClass("input-text");
    $("#" + form + " input[name='out_time']").val($("#" + form + " input[name='out_time_dr']").val());

    if (value == "IDLE") {
        $("#" + form + " input[name='out_time']").attr("disabled", false);
    }
    else {
        $("#" + form + " input[name='out_time']").attr("disabled", true);
    }
    $("#pppoe_conf" + form_index).val(value);
}

//保留地址
var dhcp_addr_static_data = new Array();//已绑定数据
var dhcp_addr_dynamic_data = new Array();//待绑定数据
var lan_ip,lanIpPre,cur_mac,is_wifi;
function no_device_tab(id){
    var no_data=[];
    var temp={};
    if(id=="dhcpAddrTab"){
        temp.name=temp.mac=temp.ip=temp.source=temp.op=null;
        no_data.push(temp);
        var static_tab = new Table(id, [L.device,L.mac,L.ip, L.source,L.op],no_data);
        static_tab.initTable();
        $("#no_device").show();
        $("#dhcpAddrTab th").css('text-align','center');
    }else{
        temp.name=temp.mac=temp.ip=temp.op=null;
        no_data.push(temp);
        var dynamic_tab = new Table(id, [L.device,L.ip,L.mac,L.op],no_data);
        dynamic_tab.initTable();
        $("#"+id).css("border-bottom","1px solid transparent");
    }
}

function get_lan_ipPre(){
    $.post("/router/lan_show.cgi", {noneed: "noneed"}, function (data) {
        var data=dataDeal(data);
        lan_Ip=data.lan_ip;
        lanIpPre = lan_Ip.substring(0,lan_Ip.lastIndexOf('.')+1);
    });
}

function get_cur_user(){
    //获取 当前正在管理路由器的这台客户端的MAC 和 是否通过无线连入
    $.post("/router/get_cur_user.cgi", {noneed: "noneed"}, function (data) {
        data=dataDeal(data)
        cur_mac=data.mac;
        is_wifi=data.is_wifi;
    });
}

function init_dhcp_addr(){
    var dtd= $.Deferred();
    $.post("/app/arp_oversee/arp_bind_list_show.cgi",{local_net:"1"},function(data){
        var  result = dataDeal(data);
        dhcp_addr_dynamic_data=[];
        var new_data = [];
        var staIndex = 0;
        var len = result.length;
        if (len == 0) {
            no_device_tab("dhcpAddrTab");
        }
        else{
            for(var i = 0; i < len; i++){
                if(result[i].type=="static"){
                    var tmp = {};
                    var host_name=result[i].host_name?result[i].host_name:L.unnamed_device;
                    tmp.name ="<a href='javascript:void(0);' class='checkbox'></a>"+"<span id='host_name'>"+host_name+"</span>";
                    tmp.ip = result[i].ip;
                    tmp.mac = result[i].mac;
                    if(result[i].bind_mode=="auto")
                        tmp.source=L.auto_input;
                    else
                        tmp.source= L.manual_input;
                    tmp.op = '<a onclick="dhcp_addr_remove('+ staIndex +')" title="'+ L.unbind +'"  href="javascript:void(0);">'+ L.unbind +'</a>';
                    new_data.push(tmp);
                    dhcp_addr_static_data[staIndex] = result[i];
                    staIndex++;
                }
            }
            if(dhcp_addr_static_data.length==0){
                no_device_tab("dhcpAddrTab");
            }else{
                var tab = new Table("dhcpAddrTab",[L.device,L.ip,L.mac, L.source,L.op],new_data);
                tab.initTable();
                $("#no_device").hide();
                if($("#dhcpAddrTab .TabFooter").length!=0){
                    $("#dhcpAddrTab").css("border-bottom","1px solid transparent");
                }
            }
        }
        get_lan_ipPre();
        get_cur_user();
        add_dhcp_addr(result);
        checkbox_bind_event("dhcpAddrTab",dhcp_addr_remove);
        bind_reg_map();
        dtd.resolve();
    });
    return dtd.promise();
}
//待添加dhcp地址表格
function add_dhcp_addr(data){
    var len = data.length;
    var index = 0;
    var new_data = [];
    if (len <= 0) {
        manualAddDhcp();
    }
    else{
        for(var i = 0; i < len; i++){
            if(data[i].type=="dynamic"){
                var temp = {};
                var ip = data[i].ip;
                var inPrefix = ip.substring(0,ip.lastIndexOf('.')+1);
                var ipLastOne = ip.substring(ip.lastIndexOf('.') + 1);
                data[i].host_name=data[i].host_name?data[i].host_name:L.unnamed_device;
                temp.name = "<input type='text'  name='host_name' id='device_name"+(index+1)+"' maxlength='31' value='" +data[i].host_name + "'/>";
                temp.ip = "<span>"+inPrefix +"</span>" + "<input type='text' id='ip_last_one"+(index+1)+"' style='width: 36px' name='ip' maxlength='3' size='3' value='" + ipLastOne + "'/>";
                temp.mac = "<input type='text' id='dhcp_addr_mac"+(index+1)+"' maxlength='17' size='17' name='mac' value='" + data[i].mac + "'/>";
                temp.op = '<a title="' + L.remove + '" onclick="bind_addr_remove('+index+')"  href="javascript:void(0);">' + L.remove + '</a>';
                new_data.push(temp);
                dhcp_addr_dynamic_data[index] = data[i];
                index++;
            }
        }
        if(dhcp_addr_dynamic_data.length==0){
            manualAddDhcp();
        }else if(isNaN(dhcp_addr_dynamic_data[0].ip.substring(dhcp_addr_dynamic_data[0].ip.length - 1))){
            dhcp_addr_dynamic_data=[];
            manualAddDhcp();
        }else{
            var tab = new Table("dhcpBindTab",[L.device,L.ip,L.mac,L.op],new_data,{size:255});
            tab.initTable();
            $("#oneKey_bind").show();
        }
    }

}
//绑定验证地图
function bind_reg_map(){
    var len=dhcp_addr_dynamic_data.length,index;
    for(var i=0;i<len;i++){
        index=i+1;
        reg_map["dhcpBindTab"][3*index-3]={};
        reg_map["dhcpBindTab"][3*index-3].id="device_name"+index;
        reg_map["dhcpBindTab"][3*index-3].type="string noneed";
        reg_map["dhcpBindTab"][3*index-2]={};
        reg_map["dhcpBindTab"][3*index-2].id="ip_last_one"+index;
        reg_map["dhcpBindTab"][3*index-2].type="ip_fourth";
        reg_map["dhcpBindTab"][3*index-1]={};
        reg_map["dhcpBindTab"][3*index-1].id="dhcp_addr_mac"+index;
        reg_map["dhcpBindTab"][3*index-1].type="mac";
    }
}

//已绑定数据移除
function dhcp_addr_remove(id){
    if(!$.isArray(id)){
        var url='dev='+dhcp_addr_static_data[id]['dev']+'&ip='+dhcp_addr_static_data[id]['ip'];
        show_dialog(L.unbind_list,function(){
            show_message("deleteing");
            $.post("/app/arp_oversee/arp_del_bind.cgi",url,function(data){
                data = dataDeal(data);
                if(data == "SUCCESS"){
                    dhcp_addr_static_data.splice(parseInt(id,10),1);
                    show_message("del_success");
                }
                else{
                    show_message("error",igd.make_err_msg(data));
                }
                init_dhcp_addr();
            });
        });
    }else{
        show_dialog(L.unbind_checked_list,function(){
            show_message("deleteing");
            for(var i=0;i<id.length;i++){
                var foot=$("#dhcpAddrTab .TabFooter"),index;
                index=parseInt(id[i],10);
                if(foot.length!=0){
                    var current=$("#dhcpAddrTab .TabFooter .current"),num;
                    num=current.html();
                    index=(parseInt(num)-1)*10+id[i];
                }
                url='dev='+dhcp_addr_static_data[index]['dev']+'&ip='+dhcp_addr_static_data[index]['ip'];
                $.post("/app/arp_oversee/arp_del_bind.cgi",url,function(data){
                    data = dataDeal(data);
                    if(data == "SUCCESS"){
                        dhcp_addr_static_data.splice("",1);
                    }
                    else{
                        show_message("error",igd.make_err_msg(data));
                    }
                    init_dhcp_addr();
                });
                if(i==id.length-1){
                    setTimeout(function(){
                        show_message("del_success")
                    },1000);
                }
            }
        });
    }
}


//待绑定数据移除
function bind_addr_remove(id){
    dhcp_addr_dynamic_data.splice(parseInt(id,10),1);
    $("#dhcpBindTab .TabBody tr").eq(id).remove();
    var len=dhcp_addr_dynamic_data.length;
    var dataList=[];
    if(dhcp_addr_dynamic_data.length==0){
        no_device_tab("dhcpBindTab");
        dhcp_addr_dynamic_data=[];
        $("#oneKey_bind").fadeOut();
    }else {
        initDhcpTab(dataList,len);
        var tab = new Table("dhcpBindTab", [L.device, L.ip, L.mac, L.op], dataList, {size: 255});
        tab.initTable();
    }
}

function new_increase(){
    $.when(init_dhcp_addr()).done(function(){
        show_pop_layer("dhcp_pop_layer");
        if($("#dhcp_pop_layer").height()>document.documentElement.clientHeight){
            $("#dhcp_pop_layer").css("top","100px");
        }
    })

}


function form_collect(id,index) {
    var c = new Object(),
        isHand=false,
        tr=document.getElementById(id).getElementsByTagName("tr"),
        obj = dhcp_addr_dynamic_data[index],
        input=tr[index+1].getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        if (input[i].name != "") {
            if(input[i].name=="ip"){
                var ip = obj.ip;
                if (!isNaN(ip.substring(ip.length - 1))){
                    var inPrefix = ip.substring(0, ip.lastIndexOf('.') + 1);
                    c[input[i].name] = inPrefix+input[i].value;
                }else{
                    c[input[i].name] = lanIpPre+input[i].value;
                }
                if(c[input[i].name] != ip){
                    isHand=true;
                }
            }else{
                c[input[i].name] = input[i].value;
                if((input[i].name=="host_name"&&input[i].value!=obj.host_name)||(input[i].name=="mac"&&input[i].value!=obj.mac)){
                    isHand=true;
                }
            }
        }
    }
    if(isHand)
        c["bind_mode"]="hand";
    else
        c["bind_mode"]="auto";
    c["dev"]="LAN";
    c["deal"]="add";
    return c;
}
function oneKeyBind(){
    if(check_input("dhcpBindTab")){
        if($("#dhcpBindTab input").length!=0){
            var dyaLen=dhcp_addr_dynamic_data.length;
            var staLen=dhcp_addr_static_data.length;
            var mac_list=[],datalist=[];
            var end = dhcp_pool_calculator.octet2dec(dhcp_pool_calculator.ndhcpEnd);
            var start = dhcp_pool_calculator.octet2dec(dhcp_pool_calculator.ndhcpStart);
            for(var i=0;i<dyaLen;i++){
                var obj=form_collect("dhcpBindTab",i);
                mac_list.push(obj.mac);
                datalist.push(obj);
            }
            var bind=function() {
                for (var i = 0; i < dyaLen; i++) {
                    var obj = form_collect("dhcpBindTab", i);
                    for (var j = 0; j < staLen; j++) {
                        //判断输入的ip mac是否已经存在
                        var _input, point_xy, msgbox;
                        if (obj.ip == dhcp_addr_static_data[j].ip) {
                            _input = document.getElementById("ip_last_one" + (i + 1));
                            point_xy = getPosition(_input);
                            point_xy.x += _input.clientWidth + 10;
                            point_xy.y -= _input.clientHeight;
                            msgbox = new MessageBox(L.ip_has_been_used, point_xy);
                            msgbox.Show();
                            return false;
                        }
                        if (obj.mac == dhcp_addr_static_data[j].mac) {
                            _input = document.getElementById("dhcp_addr_mac" + (i + 1));
                            point_xy = getPosition(_input);
                            point_xy.x += _input.clientWidth + 10;
                            point_xy.y -= _input.clientHeight;
                            msgbox = new MessageBox(L.mac_is_binding, point_xy);
                            msgbox.Show();
                            return false;
                        }
                    }
                    var ip_arr = obj.ip.split(".");
                    for(var k in ip_arr)
                        ip_arr[k] = ip_arr[k]*1;
                    var ip = dhcp_pool_calculator.octet2dec(ip_arr);
                    if(ip < start || ip > end){
                        _input = document.getElementById("ip_last_one" + (i + 1));
                        point_xy = getPosition(_input);
                        point_xy.x += _input.clientWidth + 10;
                        point_xy.y -= _input.clientHeight;
                        msgbox = new MessageBox(igd.err[23], point_xy);
                        msgbox.Show();
                        return false;
                    }
                    $.post('/app/arp_oversee/arp_bind_settings.cgi', obj, function (data) {
                        data = dataDeal(data);
                        if (data == "SUCCESS") {
                            dhcp_addr_dynamic_data.splice("", 1);
                            init_dhcp_addr();
                            if (dhcp_addr_dynamic_data.length == 0) {
                                hide_pop_layer("dhcp_pop_layer");
                                show_message("success", "绑定成功");
                            }
                        } else {
                            if (dhcp_addr_dynamic_data.length == 1) {
                                show_message("error", igd.make_err_msg(data));
                            }
                            else {
                                show_message("error", "部分数据" + igd.make_err_msg(data));
                            }
                        }
                    });
                }
            }
            if(isContain(mac_list,cur_mac)){
                //判断ip是否在地址池范围内
                var index=mac_list.indexOf(cur_mac);
                var ip_arr = datalist[index].ip.split(".");
                for(var k in ip_arr)
                    ip_arr[k] = ip_arr[k]*1;
                var ip = dhcp_pool_calculator.octet2dec(ip_arr);
                if(ip >= start && ip <= end){
                    show_dialog(is_wifi=="0"?L.wired_tip:L.wireless_tip, bind, null, "dhcp_tip");
                }else{
                    show_dialog(L.wired_error_tip, bind, null, "dhcp_tip");
                }
            }else{
                bind();
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function initDhcpTab(listArray,index){
    for (var i = 0; i < index; i++) {
        var temp = {};
        var obj=form_collect("dhcpBindTab",i);
        var ip = obj.ip;
        var ipLastOne = ip.substring(ip.lastIndexOf('.') + 1);
        temp.name = "<input type='text'  name='host_name' maxlength='31' id='device_name"+(i+1)+"' value='" + obj.host_name + "'/>";
        temp.ip = "<span>"+lanIpPre +"</span>" + "<input type='text' id='ip_last_one"+(i+1)+"' style='width: 36px' name='ip' maxlength='3' size='3' value='" + ipLastOne + "'/>";
        temp.mac = "<input type='text' id='dhcp_addr_mac"+(i+1)+"' maxlength='17' size='17' name='mac' value='" + obj.mac + "'/>";
        temp.op = '<a  title="' + L.remove + '" onclick="bind_addr_remove('+i+')" href="javascript:void(0);">' + L.remove + '</a>';
        listArray.push(temp);
        }
}

//手动添加
function manualAddDhcp(){
    var listLen=dhcp_addr_dynamic_data.length;
    if(listLen>=10){
        show_message("error",igd.err[49]+",请先绑定再添加");
        return;
    }
    var new_device={};
    var dyaIndex;
    var device_list=[];
    if(listLen==0){
        dyaIndex=0;
        $("#dhcpBindTab").css("border-bottom","1px solid #E4E4E4");
    }else{
        dyaIndex=listLen;
        initDhcpTab(device_list,dyaIndex);
    }
    new_device.name = "<input type='text' name='host_name' maxlength='31' id='device_name"+(dyaIndex+1)+"' maxlength='32'/>";
    new_device.ip = "<span>"+lanIpPre +"</span>" + "<input type='text' name='ip' id='ip_last_one"+(dyaIndex+1)+"' style='width: 36px' maxlength='3'/>";
    new_device.mac = "<input type='text' id='dhcp_addr_mac"+(dyaIndex+1)+"' maxlength='17' size='17' name='mac'/>";
    new_device.op = '<a title="' + L.remove + '"  onclick="bind_addr_remove('+dyaIndex+')" href="javascript:void(0);">' + L.remove + '</a>';
    device_list.push(new_device);
    dhcp_addr_dynamic_data[dyaIndex]=new_device;
    var new_tab = new Table("dhcpBindTab", [L.device, L.ip, L.mac, L.op], device_list);
    new_tab.initTable();
    bind_reg_map();
    $("#oneKey_bind").show();
}

//判断元素是否已存在数组方法
function isContain(array,elem){
    var flag = false;
    if (array.length <= 0) {
        return flag;
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] == elem) {
            flag = true;
            break;
        }
    }
    return flag;
}




