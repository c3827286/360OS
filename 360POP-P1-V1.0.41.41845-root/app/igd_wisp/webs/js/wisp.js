var appHtml=appL.igd_wisp.js,current_tab_name = [
	{tab_title:"Wisp",tab_id:"wisp_set_tab"}
];
var language_type = igd.global_param.language_type;
var L = parentEmt.language[language_type]["JS"];
$(document).ready(function(){
	initTab();
	$("body").mousedown(function(event){
		hide_msgbox();
	});
});
//验证地图
var reg_app_map={
	wisp_frm:[
		{id:"ssid_flag",type:"string"}//,
		//{id:"psd",type:"password eq8_64 noneed"}
	]
}
var ck_wisp_set_data = {
	ssid : null,
	pwd : null,
	encrypt:null,
	originVal:null,
	encryptVal:null,
	tip :null
};

////////////////////////////////wisp设置
//无线基本设置初始化
function init_wisp_set(){
	init_app_language(appL.igd_wisp);
	get_wisp_set_data();
	bind_ssid_event();
}

var wisp_base_data = null;
function get_wisp_set_data(){
	$.post('/app/igd_wisp/wireless_sta_mode.cgi', "action=get", init_wisp_set_callback);
}

// wisp设置初始化成功回调函数
function init_wisp_set_callback(result){
	var result = parentEmt.dataDeal(result);
	wisp_base_data = result;
	wisp_base_data.key = parentEmt.getDAesString(result.key, parentEmt.get_rand_key(0,result.key,true).rand_key);
	radio_set(result.enable,"wisp_status");
	radio_set(result.auto,"wisp_switch");
	init_wisp_data(result);
	set_encrypt(result.encrypt);
	wisp_enable_set();
	get_wisp_link_status();
}
//wisp刷新状态
function get_wisp_link_info(){
	$.post('/app/igd_wisp/wireless_sta_mode.cgi', "action=get", function(data){
		var data = parentEmt.dataDeal(data);
		init_wisp_data(data);
	});
}
var wisp_set_timer;
function get_wisp_link_status(){
	if(wisp_set_timer)
		window.clearInterval(wisp_set_timer);
	wisp_set_timer = window.setInterval(function(){
		if(wisp_base_data.enable == "0")
			return;
		//当前在wisp页面 wisp打开 wisp检测中
		if(current_html == "wisp_set"){
			if(wisp_base_data.enable == "1"&&parseInt(wisp_base_data.status)>2){
				get_wisp_link_info();
			}
			else{
				//wisp检测出结果后，只要不离开这个页面，就一直动态刷新检测结果状态
				get_wisp_link_info();
			}
		}
		else
			window.clearInterval(wisp_set_timer);
	},5000)
}

function bind_ssid_event(){
	var _this = $("#ssid_flag");
	//debug 考虑到用户可能直接在输入ssid的时候就敲回车提交，此时不会触发blur事件，所以只有绑在keyup事件上了
	_this.unbind("keyup paste").bind("keyup paste",function(){
		var currentVal = $(this).val();
		if(ck_wisp_set_data.originVal != currentVal) {
			$("#type").val("1");
			$("#encrypt_flag").val("0");
			set_encrypt("0",true);
		}
		else{
			$("#encrypt_flag").val(ck_wisp_set_data.encryptVal);
			set_encrypt(ck_wisp_set_data.encryptVal);
		}
	});

}

//wisp 状态点击事件
function wisp_enable_set(){
	var wisp_status = $("#wisp_status_hidden").val();
	var auto_status = $("#wisp_switch_hidden").val();
	var auto_ctrl = $("#wisp_switch");
	if(wisp_status !="0"){
		$("#apSearch").attr("disabled",false).removeClass("btn_gray");
		auto_ctrl.unbind("click").bind("click",function(){
			radio_toggle(this);
		});
		if(auto_status == "1"){
			auto_ctrl.removeClass("radio_on_disable");
		}
	}
	else{
		$("#apSearch").attr("disabled",true).addClass("btn_gray");
		auto_ctrl.unbind("click");
		if(auto_status == "1"){
			auto_ctrl.addClass("radio_on_disable");
		}
	}
	nos.app.resizePage();
}

function recover_input_form(){
	getParentElemId("ssid_flag").val(ck_wisp_set_data.ssid);
	getParentElemId("psd").val(ck_wisp_set_data.pwd);
	$("#status_tips").html(ck_wisp_set_data.tip);
	$("#encrypt_flag").val(ck_wisp_set_data.encrypt);
}
function recover_input_data(){
	recover_input_form();
	if($("#apList").html() != ""){
		close_ap_list();
	}
}

//连接状态  ssid 密码 初始化
function init_wisp_data(result){
	var statusTipStr = get_status(result.status);
	var internet = result.internet * 1 , internet_str = "";
	switch(internet){
		case 0:
			internet_str = L.success;
			break;
		case 1:
			internet_str = L.failure;
			break;
		case 2:
			internet_str = L.failure;
			break;
		case 3:
			internet_str = L.failure;
			break;
		case 4:
			internet_str = L.checking;
			break;
	}
	if(result.status == "1"){
		if(internet >= 0)
			statusTipStr += "&nbsp;&nbsp" + result.ip + "&nbsp;&nbsp" +  L.link_status + "：" + internet_str;
		else
			statusTipStr += "&nbsp;&nbsp" + result.ip;
	}
	else{
		if(result.status == "0"){
			if(internet >= 0){
				statusTipStr += "&nbsp;&nbsp" + "<a href=\"javascript:void(0);\" onclick=\"modify_pwd();\">"+ appHtml.edit_pwd +"</a>" + "&nbsp;&nbsp;"+ L.link_status + "："  + internet_str;
			}
			if(result.enable==0){
				statusTipStr += "&nbsp;&nbsp";
			}
			else
				statusTipStr += "&nbsp;&nbsp" + "<a href=\"javascript:void(0);\" onclick=\"modify_pwd();\">"+ appHtml.edit_pwd +"</a>";
		}
	}
	$("#ssid_str").html(result.ssid);
	if(result.ssid == "")
		$("#status_tips").html("");
	else
		$("#status_tips").html(statusTipStr);
	if(result.run_time == "0")
		$("#link_time").html("");
	else{
		var time_str = convert_time(result.run_time);
		//格式化时间，不是显示秒
		if(time_str.indexOf(L.second) != -1){
			if(time_str.indexOf(L.day) != -1 || time_str.indexOf(L.s_min) != -1 || time_str.indexOf(L.hour) != -1){//含有天小时分钟中任何一个
				//判断第三位是不是数字
				var format_str = "";
				if(!isNaN(time_str.substring((time_str.length-3),time_str.length-2))){
					format_str = time_str.substring(0,time_str.length-3);
				}
				else{
					format_str = time_str.substring(0,time_str.length-2);
				}

				$("#link_time").html(format_str);
			}
			else{
				$("#link_time").html(L.one_minute);
			}
		}
		else
			$("#link_time").html(time_str);
	}

}

function modify_pwd(){
	var pop_layerHtml=getParentElemId("wisp_pop_layer").html();
	if(pop_layerHtml!=null || pop_layerHtml!=" "){
		pop_layer_obj.init();
	}
	parentEmt.show_pop_layer("wisp_pop_layer");
	getParentElemId("ssid_flag").val(wisp_base_data.ssid);
	getParentElemId("psd").val("").focus();
	getParentElemId("ssid_flag").attr("disabled",true);
	getParentElemId("wisp_con_btn,#wisp_del_btn").removeClass("section_inline").addClass("section_hide");
	getParentElemId("wisp_mod_btn").removeClass("section_hide").addClass("section_inline").off("click").on("click",function(){
		var param = {};
		param.action = "mod";
		param.ssid = wisp_base_data.ssid;
		param.key = parentEmt.getAesString(getParentElemId("psd").val());
		param.bssid = wisp_base_data.bssid;
		$.post('/app/igd_wisp/wireless_sta_connect.cgi', param, function(data){
			data = parentEmt.dataDeal(data);
			if(data == "SUCCESS"){
				show_message("success");
				parentEmt.hide_pop_layer("wisp_pop_layer");
				get_wisp_set_data();
			}else{
				show_message("error",igd.make_err_msg(data));
			}
		});
	});
}
function get_status(status){
	var str = "",statusStr=appHtml.status;
	switch(status){
		case "0":str = statusStr[0];break;
		case "1":str = statusStr[1];break;
		case "2":str = statusStr[2];break;
		default :str = statusStr[3]+"<em class='connect_wait'></em>";break;
	}
	return str;
}

function save_wisp(){
	var wisp_status_hidden = $("#wisp_status_hidden").val();
	var auth_flag = getParentElemId("auth_flag").val();
	if(wisp_status_hidden=="1"){
		if(!check_app_input("wisp_frm",true))
			return;
		wisp_submit();
	}
	else
		wisp_submit();
}

function wisp_submit(type){
	show_message("save");
	var obj = {};
	obj.action = "set";
	if(type == 1){//通过顶部提交
		if(wisp_base_data.ssid == "" && $("#wisp_status_hidden").val() == "1"){
			get_ap_data();
			return;
		}
		else{
			obj.enable = $("#wisp_status_hidden").val();
			obj.ssid = wisp_base_data.ssid;
			obj.bssid = wisp_base_data.bssid;
			obj.key = parentEmt.getAesString(wisp_base_data.key);
			obj.auth = wisp_base_data.auth;
			obj.channel = wisp_base_data.channel;
			obj.bandwidth = wisp_base_data.bandwidth;
			obj.encrypt = wisp_base_data.encrypt;
			obj.auto = $("#wisp_switch_hidden").val();
		}
	}
	else{//通过弹出层提交
		obj = parentEmt.igd.ui.form.collect("wisp_frm",true);
		obj.enable = "1";
		obj.auto = wisp_base_data.auto;
		if(wisp_base_data.ssid == ""){
			obj.auto = $("#wisp_switch_hidden").val();
		}
	}
	$.post('/app/igd_wisp/wireless_sta_mode.cgi', obj, function(result){
		var result = parentEmt.dataDeal(result);
		if(result=="SUCCESS"){
			show_message("success");
			close_ap_list();
		}else{
			show_message("error",igd.make_err_msg(result));
		}
		init_wisp_set();
		if(!type){
			//hide_pop_layer("wisp_pop_layer");
			parentEmt.hide_pop_layer('wisp_pop_layer',"slow");
			close_ap_list();
		}
	});
}

function refreshPage(){
	// window.location.href = "./index.html";
	load_app_page(current_html,"init_"+current_html);
}

var wireless_ap_data = {};
var AP_choosed = new Object;
var list_wait_timer;
//ap探测
function get_ap_data(flag){
	if(wisp_set_timer)
		window.clearInterval(wisp_set_timer);
	if(flag){//从列表中直接连接不需要提示信息
		if(list_wait_timer)
			window.clearTimeout(list_wait_timer);
		list_wait_timer = window.setTimeout(function(){
			show_message("wait",appHtml.wait);
		},2000);
	}
	else{
		show_message("wait",appHtml.wait);
	}
	nos.app.resizePage();
	$.post('/app/igd_wisp/wireless_sta_scan_show.cgi', 'action=get&b64=1', get_ap_data_callback);
}
function  get_ap_data_callback(result){
	var result = parentEmt.dataDeal(result);
	if(result.length>0){
		show_message("success",appHtml.getApSuccess);
		$("#ap_list_tab").fadeIn("slow");
		paint_tab_ap_list(result);
		$("#hide_list").removeClass("section_hide").addClass("section_inline");
	}else{
		show_message("error",appHtml.getApFailure);
	}
	nos.app.resizePage();
}
function get_auth(auth)
{
	var str = '';
	switch(auth){
		case '0' : str = '关闭';break;
		case '1' : str = 'SHARE';break;
		case '2' : str = 'WEP';break;
		case '3' : str = 'WPA';break;
		case '4' : str = 'WPA2';break;
		case '5' : str = 'WPA/WPA2';break;
		case '6' : str = 'WPA-PSK';break;
		case '7' : str = 'WPA2-PSK';break;
		case '8' : str = 'WPA/WPA2-PSK';break;
		case '9' : str = 'WAI_CERT';break;
		case '10' : str = 'WAI_PSK';break;
	}
	return str;
}
function paint_tab_ap_list(data){
	var data_new=new Array();
	var index = 1;
	var data = get_sorted_data(data);
	for(var i in data){
		var tempobj={};
		tempobj.id = parseInt(i,10) + 1;                   //序号
		tempobj.ssid=data[i].ssid ?utf8to16(base64decode(data[i].ssid)).replace(/[\\]/g, "\\").replace(/[\"]/g, "\"").replace(/[\']/g, "\'"): appHtml.hiddenSSID;  //网络名称;
		tempobj.bssid = data[i].bssid; //bssid
		tempobj.channel = data[i].channel;   //  频道
		tempobj.auth = get_auth(data[i].auth);               //安全模式
		tempobj.rssi = data[i].rssi;                     //信号
		//tempobj.link = '<input type="radio" name="scan_r" onclick="wireless_ap_connect('+tempobj.id +')"/>'  //连接
		if(data[i].save == "0"){//未保存
			tempobj.link = "<a href=\"javascript:void(0);\" onclick=\"connect_ap(" + tempobj.id + ");\">"+ appHtml.s_link +"</a>";//连接
			tempobj.op = "";
			tempobj.status = "";
		}
		else if(data[i].save == "1"){//已保存
			tempobj.link = "<a href=\"javascript:void(0);\" onclick=\"ap_connect_fast(" + tempobj.id + ");\">"+ appHtml.s_link +"</a>";//连接
			tempobj.op = "<a href=\"javascript:void(0);\" onclick=\"modify_ssid(" + tempobj.id + ");\">"+ appHtml.edit +"</a>";
			tempobj.status = appHtml.saved;
		}
		else if(data[i].save == "2"){//当前连接
			tempobj.link = appHtml.s_link  //连接
			tempobj.op = "";
			tempobj.status = appHtml.s_linked;
		}
		data_new.push(tempobj);
		wireless_ap_data[index] = {};
		wireless_ap_data[index]=data[i];
		index++;
	}
	var tab = new Table("apList",appHtml.wispListHead,data_new);
	tab.initTable();
}
//排序
function get_sorted_data(data)
{
	var cur = [],saved = [],other = [],tmp = [];
	for(var i in data){
		var save = data[i].save;
		if(save == "0"){
			other.push(data[i]);
		}
		else if(save == "1"){
			saved.push(data[i]);
		}
		else if(save == "2"){
			cur.push(data[i]);
		}
	}
	saved.sort(by_sin);
	//saved.sort(by_string);
	other.sort(by_sin);
	//other.sort(by_string);
	if(cur.length != 0){
		tmp = cur.concat(saved,other);
	}
	else{
		tmp = saved.concat(other);
	}
	return tmp;
}
function by_sin(a, b)
{
	var i = parseInt(a.rssi,10);
	var j = parseInt(b.rssi,10);
	if(i < j)
		return 1;
	else
		return -1;
}

//刷新
function refresh_ap_list(){
	get_ap_data();
}
//关闭
function close_ap_list(){
	$("#ap_list_tab").fadeOut("slow",function(){
		$("#apList").empty();
		$("#hide_list").removeClass("section_inline").addClass("section_hide");
		nos.app.resizePage();
	});
}
function set_encrypt(encrypt){
	reg_app_map["wisp_frm"][1] = {};
	reg_app_map["wisp_frm"][1].id = "psd";
	if(encrypt == "0"){
		reg_app_map["wisp_frm"][1].type = "noneed";
		getParentElemId("psd").attr("disabled",true).addClass("txt_disable");
	}
	else{
		reg_app_map["wisp_frm"][1].type = "password eq8_64";
		getParentElemId("psd").attr("disabled",false).removeClass("txt_disable");
	}
}

function isContain(array,num){
	var flag = false;
	if (array.length <= 0) {
		return flag;
	}
	for (var i = 0; i < array.length; i++) {
		if (array[i] == num) {
			flag = true;
			break;
		}
	}
	return flag;
}
var b64_ssid=new Array();
function connect_ap(id){
	pop_layer_obj.init();
	parentEmt.show_pop_layer("wisp_pop_layer");
	getParentElemId("wisp_con_btn").removeClass("section_hide").addClass("section_inline");
	getParentElemId("wisp_del_btn").removeClass("section_inline").addClass("section_hide");
	getParentElemId("wisp_mod_btn").removeClass("section_inline").addClass("section_hide");
	AP_choosed = wireless_ap_data[parseInt(id,10)];
	var flag=isContain(b64_ssid,AP_choosed.ssid);
	if(!flag){
		AP_choosed.ssid = utf8to16(base64decode(AP_choosed.ssid)).replace(/[\\]/g, "\\").replace(/[\"]/g, "\"").replace(/[\']/g, "\'");
		b64_ssid.push(AP_choosed.ssid);
	}
	if(wisp_set_timer)
		clearInterval(wisp_set_timer);
	var ssid_str = AP_choosed.ssid.replace(/&nbsp;/g," ");
	if(ssid_str != appHtml.hiddenSSID){
		getParentElemId("ssid_flag").val(ssid_str).attr("disabled",false).removeClass("txt_disable");
		getParentElemId("ssid_flag").focus();
	}
	if(ssid_str != "" && ssid_str != appHtml.hiddenSSID){
		getParentElemId("ssid_flag").attr("disabled",true).addClass("txt_disable");
		getParentElemId("psd").focus();
	}
	getParentElemId("auth_flag").val(AP_choosed.auth);
	getParentElemId("channel_flag").val(AP_choosed.channel);
	getParentElemId("bandwidth_flag").val(AP_choosed.bandwidth);
	getParentElemId("rssi_flag").val(AP_choosed.rssi);
	getParentElemId("bssid_flag").val(AP_choosed.bssid);
	getParentElemId("encrypt_flag").val(AP_choosed.encrypt);
	set_encrypt(AP_choosed.encrypt);
}
function modify_ssid(index){
	var pop_layerHtml=getParentElemId("wisp_pop_layer").html();
	if(pop_layerHtml!=null || pop_layerHtml!=" "){
		pop_layer_obj.init();
	}
	parentEmt.show_pop_layer("wisp_pop_layer");
	var ssid = utf8to16(base64decode(wireless_ap_data[parseInt(index,10)].ssid.replace(/[\\]/g, "\\").replace(/[\"]/g, "\"").replace(/[\']/g, "\'").replace(/&nbsp;/g," ")));
	getParentElemId("ssid_flag").val(ssid);
	if(ssid == "")
		getParentElemId("ssid_flag").attr("disabled",false);
	else
		getParentElemId("ssid_flag").attr("disabled",true);
	getParentElemId("psd").focus();
	getParentElemId("wisp_con_btn").removeClass("section_inline").addClass("section_hide");
	getParentElemId("wisp_del_btn,#wisp_mod_btn").removeClass("section_hide").addClass("section_inline");
	getParentElemId("wisp_del_btn").off("click").on("click",function(){
		edit_ssid(index,"del");
	});
	getParentElemId("wisp_mod_btn").off("click").on("click",function(){
		edit_ssid(index,"mod");
	});
}
//弹框修改及删除操作
function edit_ssid(index,type){
	var param = {};
	param.action = type;
	if(type == "del"){
		param.ssid = wireless_ap_data[index].ssid;
		param.bssid = wireless_ap_data[index].bssid;
	}
	else{
		param.ssid = getParentElemId("ssid_flag").val();
		param.key = parentEmt.getAesString(getParentElemId("psd").val());
		param.bssid = wireless_ap_data[index].bssid;
	}
	$.post('/app/igd_wisp/wireless_sta_connect.cgi', param, function(data){
		data = parentEmt.dataDeal(data);
		if(data == "SUCCESS"){
			parentEmt.hide_pop_layer("wisp_pop_layer");
			show_message("success");
			if(type == "mod"){
				get_wisp_set_data();
				close_ap_list();
			}
			else{
				window.setTimeout(function(){
					get_ap_data(true);
				},1000);
			}
		}else{
			parentEmt.hide_pop_layer("wisp_pop_layer");
			show_message("error",igd.make_err_msg(data));
		}
	});
}

function ap_connect_fast(index){
	var param = {};
	param.action = "con";
	param.ssid = wireless_ap_data[index].ssid;
	param.bssid = wireless_ap_data[index].bssid;
	show_message("save");
	$.post('/app/igd_wisp/wireless_sta_connect.cgi', param, function(data){
		data = parentEmt.dataDeal(data);
		if(data == "SUCCESS"){
			show_message("success")
			close_ap_list();
			get_wisp_set_data();
		}else{
			show_message("error",igd.make_err_msg(data));
		}
	});
}
// table radio 连接
function wireless_ap_connect(id)
{
	AP_choosed = wireless_ap_data[parseInt(id,10)];
	AP_choosed.ssid = AP_choosed.ssid.replace(/[\\]/g, "\\")
		.replace(/[\"]/g, "\"")
		.replace(/[\']/g, "\'");
}
//比较是否是新的连接
function check_connect(){
	$("#status_tips").html(appHtml.noLink);
	if(AP_choosed.encrypt!="0"){//加密
		$("#wisp_wrap input[type='password']").attr("disabled",false);
	}else{
		$("#wisp_wrap input[type='password']").attr("disabled",true);
	}
}
//wisp设置 弹框
var pop_layer_obj={
	appHtml:appL.igd_wisp.html,
	bind_event: function () {
		getParentElemId("wisp_con_btn").unbind("click").bind("click",function(){save_wisp()});
		getParentElemId("psd").unbind("focus").bind("focus",function(){hide_msgbox()});
		getParentElemId("wisp_pop_tip+.modal_close").unbind("click").bind("click",function(){
			parentEmt.hide_pop_layer("wisp_pop_layer")
		});
	},
	init:function(){
		var temp=this;
		temp.create();
		temp.bind_event();
	},
	create:function(){
		var temp=this,app=temp.appHtml,wisp_pop_layer;
		if(getParentElemId("wisp_pop_layer").length>0) {
			getParentElemId("wisp_pop_layer").remove();
		}
		wisp_pop_layer="<div id='wisp_pop_layer' style='z-index: 4000' class='pop_layer'></div>";
		parentEmt.$("body").append(wisp_pop_layer);
		var compiled= _.template($("#pop_layer").html()),
			popHtml=compiled(app);
		parentEmt.$("#wisp_pop_layer").css("width","530px").html(popHtml);
	}
};

//获取父页面id元素
function getParentElemId(id){
	return parentEmt.$("#"+id);
}
