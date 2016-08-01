//无线基本设置
var WIFI_NORMAL_SET_TIME = 9;//9+3
var WIFI_SET_CHANNEL_TIME = 5;
var WIFI_CHANNEL_CHANGE_TIME = WIFI_NORMAL_SET_TIME + WIFI_SET_CHANNEL_TIME;
var ck_ssid = {};
var compare_2_4_obj = {};
var compare_5_obj = {};

var wirelessTabData = {
	parent:"wireless_type_layer",
	child:[
		 {name:"wireless_2_4_layer",func:"init_wireless_base_2_4"},
		 {name:"wireless_5_layer",func:"init_wireless_base_5"}
	]
};

function init_wireless_base(){
	if(!ROUTE_INFO.is_5G){
		$("#wireless_type_layer").addClass("section_hide");
		$(".form-border-shadow").removeClass("has-tab");
		$("#warning_count_center").removeClass("section_hide");
		$("#same_layer").addClass("section_hide");
		$("#lbl_2_4_wireless_status").html(L.wifi_status);
		init_wireless_base_2_4();
	}
	else{
		$("#wireless_type_layer").removeClass("section_hide");
		$(".form-border-shadow").addClass("has-tab");
		$("#warning_count_center").addClass("section_hide");
		$("#same_layer").removeClass("section_hide");
		$("#lbl_2_4_wireless_status").html(L.wifi_2_4_status);
		var tab = new igd.ui.Tab(wirelessTabData);
		tab.init();
	}
}



var wireless_param = {};


function init_wireless_base_2_4() {
	compare_2_4_obj = {};
    init_text_event();
    ajaxAsync(false);
	init_wireless_base_show("2_4");
    init_wireless_sec_show("2_4");
	if(ROUTE_INFO.is_5G){
		init_wireless_base_show("5");
    	init_wireless_sec_show("5");
	}
	ajaxAsync(true);
	check_ssid_pwd();
//    ========= 逻辑冲突！所以单独把click的函数独立出来。
    wireless_2_4_enable_func();
}
function wireless_2_4_enable_func(){
    $("#wireless_2_4_enable").unbind("click").bind("click",function(){
        radio_toggle(this,function(){
            var val = $("#wireless_2_4_enable_hidden").val();
            wireless_state_change(val,"2_4");
        });
    });
}

function check_ssid_pwd(){
	if((wireless_param.ssid_2_4 == wireless_param.ssid_5) && (wireless_param.wpa_key_2_4 == wireless_param.wpa_key_5)){
		$("#same").prop("checked",true);
	}
	else{
		$("#same").prop("checked",false);
	}
}

function init_wireless_base_show(type) {
    var dom_str = "";
	var obj1 = {};
    obj1.ap_id = 0;
    obj1.network_mode = 999;
	if(type == "2_4"){
    	obj1.port_id = "WIFI1";
		dom_str = "2_4";
	}
	else{
		obj1.port_id = "WIFI2";
		dom_str = "5";
	}
    $.post("/router/wireless_base_show.cgi", obj1, function (data1) {
        var data1 = dataDeal(data1);
		if(type == "2_4")
			$.extend(compare_2_4_obj,data1);
		else
			$.extend(compare_5_obj,data1);
		if (data1.AP_SSID != "") {
            $("#wire_" + dom_str + "_ssid").removeClass().addClass("input-text").val(data1.AP_SSID);
            ck_ssid.ssid = {};
            ck_ssid.ssid = data1.AP_SSID;
			if(type == "2_4")
				wireless_param.ssid_2_4 = data1.AP_SSID;
			else
				wireless_param.ssid_5 = data1.AP_SSID;
        }

        $("#wire_" + dom_str + "_mac_hidden").val(data1.wire_mac);

		if(type == "2_4"){
			$("#wireless_base_" + dom_str +"_channel_sel").val(data1.channel_num);
			$("#wlb_" + dom_str + "_channel_width_sel").val(data1.channel_width);
		}
		else{
			channel_sel_change(data1.channel_width);
			channel_width_change(data1.channel_num);
		}
        //radio_sele_set("side_band", data1.channel_band);
        wlb_side_band_change(data1.channel_band,dom_str);
		
		set_ssid_broadcast(data1.SSID_broadcast,dom_str);
		
		radio_set(data1.wire_enable,"wireless_"+ dom_str +"_enable");
		wireless_state_change(data1.wire_enable,dom_str);
		
    });
}

var ck_wireless_key = [];
function init_wireless_sec_show(type) {
    ck_wireless_key.wpa_key = "";
    ck_wireless_key.mode = "";
	var obj2 = {};
    obj2.ap_id = 0;
    obj2.ap_mode = 0;
	if(type == "2_4"){
    	obj2.port_id = "WIFI1";
	}
	else{
		obj2.port_id = "WIFI2";
	}
    $.post("/router/wireless_sec_show.cgi", obj2, function (data2) {
        var data2 = dataDeal(data2);
		if(type == "2_4")
			$.extend(compare_2_4_obj,data2);
		else
			$.extend(compare_5_obj,data2);
        var lengthKeyObj=get_rand_key(0,data2.wep_key,true);
        data2.wep_key = getDAesString(data2.wep_key,lengthKeyObj.rand_key);
        data2.wpa_key = getDAesString(data2.wpa_key,lengthKeyObj.rand_key);
		
		if(type == "2_4"){
			wireless_param.wpa_key_2_4 = data2.wpa_key;
			compare_2_4_obj.wpa_key = data2.wpa_key;
		}
		else{
			wireless_param.wpa_key_5 = data2.wpa_key;
			compare_5_obj.wpa_key = data2.wpa_key;
		}
        $("#wls_"+ type +"_ap_mode_sel").val(data2.ap_mode);
        ck_wireless_key.mode = data2.ap_mode;
        wireless_security_ap_change(data2.ap_mode,type);
        if (data2.wpa_key != "") {
            $("#wireless_"+ type +"_key_val").removeClass().addClass("input-text").val(data2.wpa_key);
            ck_wireless_key.wpa_key = data2.wpa_key;
        }
    });
    wireless_pwd_limit(type);
}

function wireless_pwd_limit(type){
	//限速输入框输入判定
    $("#wireless_"+ type +"_key_val").unbind("keyup").bind("keyup", function () {
        var value = $(this).val();
        var reg = /[\u00FF-\uFFFF]+/;
        reg.test(value)&&$(this).val(value.replace(reg, ""));
        return false;
    });
}

function wireless_state_change(str,type) {
    $("#wire_"+ type +"_ssid").removeClass().addClass("input-text");
    $("#wire_"+ type +"_ssid").val(ck_ssid.ssid);
    $("#wls_"+ type +"_ap_mode_sel").val(ck_wireless_key.mode);
    wireless_security_ap_change(ck_wireless_key.mode,type);

    $("#wireless_"+ type +"_enable_hidden").val(str);
    if (str == "1") {
        section_disable("wireless_base_"+ type +"_layer", false);
		init_channel_choose("enable",type);
    }
    else {
		$("#wifi_" + type + "_tip").addClass("section_hide");
        section_disable("wireless_base_"+ type +"_layer", true);
		init_channel_choose("disable",type);
    }
	//添加wisp判断
	$.post("/app/igd_wisp/wireless_sta_mode.cgi",{action:"get"},function(data){
		data = dataDeal(data);
		if(data.enable == "1" && data.status == "1" && str == "1"){
			if($("#wisp_channel_width_tip").length > 0){
				$("#wisp_channel_width_tip").remove();
			}
			if($("#wisp_channel_tip").length > 0){
				$("#wisp_channel_tip").remove();
			}
			$("#wlb_2_4_channel_width_sel").attr("disabled",true).parent().append("<span id=\"wisp_channel_width_tip\"></span>");
			$("#wireless_base_2_4_channel_sel").attr("disabled",true).parent().append("<span id=\"wisp_channel_tip\"></span>");
			$("#wire_2_4_channel_choose").css({
				"color":"#999",
				"cursor":"default"
			}).unbind("click");
			$("#wisp_channel_tip").html(L.wisp_channel_tip);
			$("#wisp_channel_width_tip").html(L.wisp_channel_width_tip);
		}
	});
}

function wlb_side_band_change(str,type) {
    $("#wire_" + type + "_side_band_hidden").val(str);
}

function ssid_broadcast_change(type){
	var val = $("#ck_"+ type +"_ssid_broadcast").prop("checked");
	if(val)
		$("#wire_"+ type +"_ssid_broadcast_hidden").val(0);
	else
		$("#wire_"+ type +"_ssid_broadcast_hidden").val(1);
}

function set_ssid_broadcast(str,type){
	 $("#wire_"+ type +"_ssid_broadcast_hidden").val(str);
	if(str == "0")
		$("#ck_"+ type +"_ssid_broadcast").prop("checked",true);
	else
		$("#ck_"+ type +"_ssid_broadcast").prop("checked",false);
}

function wireless_security_ap_change(val,type) {
    reg_map["wireless_base_"+ type +"_frm"][6] = {};
    hide_msgbox();
    $("#wireless_"+ type +"_key_val").removeClass().addClass("input-text");
    $("#wireless_"+ type +"_key_val").val(ck_wireless_key.wpa_key);
    if (val == "0") {
        $("#wireless_"+ type +"_key_layer").removeClass().addClass("item_line section_hide");
    }
    else if (val == "3" || val == "4") {
        $("#wireless_" + type + "_key_layer").removeClass().addClass("item_line section_show");
        reg_map["wireless_base_"+ type +"_frm"][6].id = "wireless_"+ type +"_key_val";
        reg_map["wireless_base_"+ type +"_frm"][6].type = "password eq8_30";
    }
}

function wireless_base_2_4_set(){
	if($("#same").prop("checked")){
		if((wireless_param.ssid_2_4 == wireless_param.ssid_5) && (wireless_param.wpa_key_2_4 == wireless_param.wpa_key_5)){
			wireless_base_set("2_4");
		}
		else{
			ajaxAsync(false);
			wireless_base_set("2_4");
			ajaxAsync(true);
			wireless_base_set("5");
		}
	}
	else{
		wireless_base_set("2_4");
	}
}

function wireless_base_set(type,wirelessSetCallback) {
   if (check_input("wireless_base_"+ type +"_frm")) {
        var obj = {};
        obj.wire_enable = $("#wireless_"+ type +"_enable_hidden").val();
		obj.AP_SSID = $("#wire_"+ type +"_ssid").val();
        obj.channel_band = $("#wire_"+ type +"_side_band_hidden").val();
        obj.channel_width = $("#wlb_" + type + "_channel_width_sel").val();
        obj.channel_num = $("#wireless_base_"+ type +"_channel_sel").val();
        obj.wire_mac = $("#wire_"+ type +"_mac_hidden").val();
        obj.network_mode = 0;
        obj.radio_criterion = "10";
        obj.SSID_broadcast = $("#wire_"+ type +"_ssid_broadcast_hidden").val();
        obj.ap_id = "0";
		if(type == "2_4")
        	obj.port_id = "WIFI1";
		else
			obj.port_id = "WIFI2";
        obj.region = "3";//back ="1"
        obj.need_reboot = 0;
        obj.waln_partition = 0;

        var obj2 = {};
        var mode_sel = $("#wls_"+ type +"_ap_mode_sel").val();
        obj2.ap_id = 0;
		if(type == "2_4")
        	obj2.port_id = "WIFI1";
		else
			obj2.port_id = "WIFI2";
        obj2.ap_mode = mode_sel;
        if (mode_sel == "3" || mode_sel == "4") {
            obj2.wpa_key = getAesString($("#wireless_"+ type +"_key_val").val());
            obj2.wpa_keytime = 3600;
            obj2.wpa_mode = 0;
            obj2.wpa_tkaes_flag = 0;
        }


		//对比一下是不是只改了信道
		var obj3 = {};
		$.extend(obj3, obj);
		$.extend(obj3,obj2);
		//tmp add
		obj3.wpa_key = $("#wireless_"+ type +"_key_val").val();
		if(type == "2_4")
			var change = wireless_compare(obj3,compare_2_4_obj);
		else
			var change = wireless_compare(obj3,compare_5_obj);
		if(change){
			//发送原来的cgi
			show_message("save");
			$.post("/router/wire_bas_ap_set.cgi", obj, function (data) {
            	var data = dataDeal(data);
            	if (data == "SUCCESS") {
                	$.post("/router/wireless_sec_set.cgi", obj2, function (data2) {
                    	var data2 = dataDeal(data2);
                    	if (data2 == "SUCCESS") {
							//自动 如果是再加3s
							show_message("setup_ing");
							var timer;
							if(obj.channel_num == "0"){
								timer = WIFI_CHANNEL_CHANGE_TIME * 1000;
							}
							else{
								timer = WIFI_NORMAL_SET_TIME * 1000;
							}
                        	window.setTimeout(function () {
                                var wifiInfo=[obj.AP_SSID,obj3.wpa_key];
                                if(!!wirelessSetCallback&&typeof wirelessSetCallback == "function"){
                                    wirelessSetCallback.apply(null,wifiInfo);
                                    show_message("success");
                                    return;
                                }
					
								hide_pop_layer("message_layer");
								hide_lock_div();
								show_message("success");
								eval("init_wireless_base_"+ type +"();");
                        	}, timer);
                    	}
                    	else {
                        	show_message("error", igd.make_err_msg(data2));
                        	eval("init_wireless_base_"+ type +"();");
                    	}
                	});
            	}
            	else {
                	show_message("error", igd.make_err_msg(data));
                	eval("init_wireless_base_"+ type +"();");
            	}
        	});
		}
		else{
			//对比broadcast,如发生改变则发送新cgi
			var tmp = "";
			if(type == "2_4")
				tmp = compare_2_4_obj["SSID_broadcast"];
			else
				tmp = compare_5_obj["SSID_broadcast"]
			if(obj3["SSID_broadcast"] == tmp){
				show_message("success");
			}
			else{
				show_message("save");
				var obj = {};
				obj.ap_id = 0;
				obj.SSID_broadcast = obj3["SSID_broadcast"];
				obj.port_id = "WIFI1";
				$.post("/router/wireless_broadcast_set.cgi", obj, function (data2) {
                    	var data2 = dataDeal(data2);
                    	if (data2 == "SUCCESS") {
							show_message("success");
							eval("init_wireless_base_"+ type +"();");
						}
						else{
							show_message("error", igd.make_err_msg(data));
						}
				});
			}
		}
    }
}

function wireless_compare(des_obj,src_obj){
	var result_flag = false;
	//由于接口不规范，没办法写通用函数了。只有硬比较了
	var compare_arr = ["AP_SSID","channel_band","channel_num","channel_width","network_mode","radio_criterion","waln_partition","wire_enable","wire_mac","ap_mode"];
	var compare_wpa = ["wpa_key","wpa_keytime","wpa_mode","wpa_tkaes_flag"];
	
	for(var i in compare_arr){
		var _val = compare_arr[i];
		if(des_obj[_val] != src_obj[_val]){
			result_flag = true;
			return result_flag;
		}
	}
	
	if(src_obj["ap_mode"] == "3" || src_obj["ap_mode"] == "4"){
		for(var i in compare_wpa){
			var _val = compare_wpa[i];
			if(des_obj[_val] != src_obj[_val]){
				result_flag = true;
				return result_flag;
			}
		}
	}
	
	return result_flag;
}

//5G频道带宽改变
function channel_width_change(str){
	var sel_val = language[language_type].SELECT.wlb_5_channel_width_sel;
	var selected_val = $("#wlb_5_channel_width_sel").val();
	$("#wlb_5_channel_width_sel").empty();
	if(str == "165"){
		$("#wlb_5_channel_width_sel").append("<option value=\""+ sel_val[0].value +"\">"+ sel_val[0].txt +"</option>");
	}
	else{
		for(var i in sel_val){
			$("#wlb_5_channel_width_sel").append("<option value=\""+ sel_val[i].value +"\">"+ sel_val[i].txt +"</option>");
		}
		var des_dom = $("#wlb_5_channel_width_sel option[value="+ selected_val +"]");
		if(des_dom.length == 0){
			$("#wlb_5_channel_width_sel option").eq(0).attr("selected",true);
		}
		else{
			des_dom.attr("selected",true);
		}
	}
}

function channel_sel_change(str){
	var sel_val = language[language_type].SELECT.wireless_base_5_channel_sel;
	var selected_val = $("#wireless_base_5_channel_sel").val();
	$("#wireless_base_5_channel_sel").empty();
	for(var i in sel_val){
		$("#wireless_base_5_channel_sel").append("<option value=\""+ sel_val[i].value +"\">"+ sel_val[i].txt +"</option>");
	}
	if(str != "2"){
		$("#wireless_base_5_channel_sel option[value=165]").remove();
	}
	var des_dom = $("#wireless_base_5_channel_sel option[value="+ selected_val +"]");
	if(des_dom.length == 0){
		$("#wireless_base_5_channel_sel option").eq(0).attr("selected",true);
	}
	else{
		des_dom.attr("selected",true);
	}
}


//信道选择
function init_channel_choose(status,type){
	var me = $("#wire_" + type + "_channel_choose");
	if(status == "enable"){
		me.css({
			"color":"#428BEF",
			"cursor":"pointer"
		}).unbind("click").bind("click",function(){
			get_better_channel(type);
		});
	}
	else{
		me.css({
			"color":"#999",
			"cursor":"default"
		}).unbind("click");
	}
}

//信道选择
function get_better_channel(type){
	show_message("channel_choosing");
	var channel_width = $("#wlb_"+ type +"_channel_width_sel").val();
	var port_id = "";
	if(type == "2_4")
		port_id = "WIFI1";
	else
		port_id = "WIFI2";
	$.post("/router/wireless_get_best_channel.cgi", {port_id:port_id,channel_width:channel_width}, function (data) {
		var data = dataDeal(data);
		window.setTimeout(function(){
			var c_m;
			if(type == "2_4"){
                c_m = compare_2_4_obj["channel_num"];
                compare_2_4_obj["channel_num"]=data.best_channel;
            }
			else{
                c_m = compare_5_obj["channel_num"];
                compare_5_obj["channel_num"]=data.best_channel;
            }
			if(c_m == "0"){//如果用户设置的是自动则不回显
				$("#wireless_base_"+ type +"_channel_sel").val("0");
				show_message("success");
				return;
			}
		
			var cur_val = $("#wireless_base_"+ type +"_channel_sel").val();
			if(cur_val != data.best_channel){
				hide_pop_layer("message_layer");
				hide_pop_layer("lock_div");
				
				$("#wireless_base_"+ type +"_channel_sel").val(data.best_channel);
				
				$("#wire_"+ type +"_channel_sel_layer").css("background","#FBF6AF");
				$("#wire_"+ type +"_channel_sel_layer").animate({"background-color": '#fff'}, 1000);
			}
			else
				show_message("channel_best");
		},WIFI_SET_CHANNEL_TIME*1000);
	});
}

function init_wireless_base_5(){
	compare_5_obj = {};
    init_text_event();
    init_wireless_base_show("5");
    init_wireless_sec_show("5");
	$("#wireless_5_enable").unbind("click").bind("click",function(){
		radio_toggle(this,function(){
			var val = $("#wireless_5_enable_hidden").val();
			wireless_state_change(val,"5");
		});
	});
}

//开发者模式
function init_developer(){
	//开发者模式其实就是无线高级模式
	init_power_detect();
    init_wireless_advance_show();
	init_boa_deny_ip();

}


var init_power_detect = function(){
  $("#wireless_advance_layer").undelegate("#power_detect","click").delegate("#power_detect","click",function(){
      var curDom = $(this);
      var setVal ;
      curDom.toggleClass("radio_off radio_on");
      setVal = curDom.hasClass("radio_off")?0:2;
      $("#power_detect_hidden").val(setVal);
  }) ;
};

function init_wireless_advance_show(){
	$.post("/router/wireless_ap_adv_op.cgi", {action: "0"}, function (res) {
		var data = dataDeal(res);
		$("#wireless_base_band_sel").val(data.radio_criterion);
		$("#wireless_fragment").val(data.fragThreshold);
		$("#wireless_RTSThreshold").val(data.rtsThreshold);
		$("#wireless_preamble_sel").val(data.preamble);
		$("#power_detect_hidden").val(data.adaptivity_enable>>>0);
        $("#ldpc_enable_sel").val(data.ldpc_enable);
		radio_set(data.protection,"wireless_protection");
		radio_set(data.ampdu,"wireless_ampdu");
		radio_set(data.tx_2_path,"wireless_tx_2_path");
        $("#power_detect").removeClass("radio_off radio_on").addClass(!!(data.adaptivity_enable>>>0)===true?"radio_on":"radio_off");
	});
	upnp_switch_show();
	get_plugins_status();
}

function wireless_advance_set(){
	if (check_input("wireless_advance_frm")) {
		show_message("save");
		var obj = igd.ui.form.collect("wireless_advance_frm");
		$.post("/router/wireless_ap_adv_op.cgi", obj, function (data) {
            var data = dataDeal(data);
            if (data == "SUCCESS") {
                show_message("success");
            }
            else {
                show_message("error", igd.make_err_msg(data));
            }
            init_developer();
        });
		upnp_set();
		set_plugins_status();
	}
}
function init_boa_deny_ip(){
	$("#ip_not_same_segment_tip").html("");
	$("#deny_ip").unbind("focus").bind("focus",function(){
		if($(this).val() != $("#deny_ip_old").val()){
			$("#ip_not_same_segment_tip").html("");
		}
	});
	$.post("/app/universal_app/boa_deny_get.cgi", {noneed: "noneed"}, function (data) {
		//data = '{"enable":"1","ip":"192.168.0.5","user_ip":"192.168.0.22"}';
		var data = dataDeal(data);
		$("#deny_ip,#deny_ip_old").val(data.ip);
		radio_set(data.enable,"boa_deny_switch");
		$("#deny_switch_old").val(data.enable);
		$("#user_ip").val(data.user_ip);
		var lan_ip = data.lan_ip;
		var lan_mask = data.lan_mask;
		dhcp_pool_calculator.formatDhcpPool(lan_ip,lan_mask);
		deny_switch_set();
	});
}

function developer_set(){
	boa_deny_ip_set();
}

function boa_deny_ip_set(){
	var obj = {};
	obj.enable = $("#boa_deny_switch_hidden").val();
	obj.ip = $("#deny_ip").val();
	if(obj.ip == $("#deny_ip_old").val() && obj.enable == $("#deny_switch_old").val()){//未发生数据改变
		wireless_advance_set();
	}
	else{
		if(obj.enable == "0"){//关闭情况下
			obj.ip = "";
			boa_deny_ip_set_callback(obj);
		}
		else{//开启
			if (check_input("boa_deny_ip_frm")) {
				show_dialog("<div class=\"boa_deny_ip\"><div class=\"boa_deny_ip_icon\"></div><div class=\"boa_deny_ip_txt\">" + L.deny_ip_tips + "</div></div>",function(){
					wireless_advance_set();
				},function(){
					hide_dialog();
					//判断用户设置的IP是否落在地址池范围内
					var ip_arr = obj.ip.split(".");
					for(var j = 0; j < 4; j++){
						ip_arr[j] = parseInt(ip_arr[j],10);
					}
					if(!(dhcp_pool_calculator.octet2dec(ip_arr) >= dhcp_pool_calculator.octet2dec(dhcp_pool_calculator.ndhcpStart) && dhcp_pool_calculator.octet2dec(ip_arr) <= dhcp_pool_calculator.octet2dec(dhcp_pool_calculator.ndhcpEnd))){
                        var no_Same_tip = $("#ip_not_same_segment_tip");
                        var errorMsg;
                        !!no_Same_tip.length?no_Same_tip.html(L.deny_ip_in_same):(errorMsg = new MessageBox(L.deny_ip_in_same.replace(/\(|\)/g,""),null,"deny_ip"),
                        errorMsg.showErrMsg());
					}
					else{//是同一范围
						if(obj.ip != $("#user_ip").val()){//用户设置的IP和当前路由器的IP是否相同
							show_dialog(L.deny_not_same_ip ,function(){
								boa_deny_ip_set_callback(obj);
								wireless_advance_set();
							});
						}
						else{
							boa_deny_ip_set_callback(obj);
							wireless_advance_set();
						}	
					}	
				},"boa_deny_ip");
			}
		}
	}
}

function boa_deny_ip_set_callback(obj){
	show_message("save");		
	$.post("/app/universal_app/boa_deny_set.cgi", obj, function (data) {
		var data = dataDeal(data);
		if (data == "SUCCESS") {
		   wireless_advance_set();
		}
		else {
			show_message("error", igd.make_err_msg(data));
		}
	});
}

function deny_switch_set(){
	var str = $("#boa_deny_switch_hidden").val();
	if(str == "0"){
		$("#deny_ip_layer").addClass("section_hide");
	}
	else{
		$("#deny_ip_layer").removeClass("section_hide");
	}
}
//返回upnp设置
function upnp_switch_show(){
	$.post("/router/upnp_switch_show.cgi",{},function(data){
		var data=dataDeal(data);
		radio_set(data.enable_upnp,"enable_upnp");
	});
}
//设置upnp
function upnp_set(){
	var obj={};
	obj.enable=$("#enable_upnp_hidden").val();
	obj.time=$("#time_upnp").val();
	$.post("/router/misc_upnp_set.cgi",{"enable_upnp":obj.enable,"time_upnp":obj.time},function(data){
		var data=dataDeal(data);
		if (data != "SUCCESS") {
			show_message("error", igd.make_err_msg(data));
		}
	});
}


//第三方插件开关
var plugin_enable=0;
function get_plugins_status(){
	$.post("/router/plugin_statu_get.cgi", function (data) {
		var data=dataDeal(data);
		plugin_enable=data.enable;
		radio_set(data.enable,"plugins_enable");
	})
}
function set_plugins_status(){
	var obj={};
	obj.enable=$("#plugins_enable_hidden").val();
	$.post("/router/plugin_statu_set.cgi",obj,function(data){
		var data=dataDeal(data);
		if (data != "SUCCESS") {
			show_message("error", igd.make_err_msg(data));
		}else{
			if(obj.enable==0){
				$.cookie("noShowPluginTip",null);
			}
		}
	});
}
function set_plugins_dialog(obj){
	var $plugin_enble=$("#plugins_enable_hidden").val();
	if(plugin_enable==0&&$plugin_enble==0){
		show_dialog(L.plugins_enable_tip, function () {
			radio_toggle(obj);
			hide_dialog();
		}, hide_dialog,"plugins_enable_tip")
	}else{
		radio_toggle(obj);
	}
}
