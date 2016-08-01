var appHtml=appL.igd_ap.js,current_tab_name = [
    {tab_title:appHtml.apTitle[0],tab_id:"ap_tab"},
	{tab_title:appHtml.apTitle[1],tab_id:"ap_list_tab"}
];
$(document).ready(function(){
    initTab();
    $("body").mousedown(function(event){
        hide_msgbox();
    });

});

//验证地图
var reg_app_map={
    ap_set_frm:[
		//添加表情需要注释掉以下一行
        {id:"ap_ssid",type:"string"}
    ],
    speed_limit_frm:[
        {id:"upside",type:"decimal"},
        {id:"downside",type:"decimal"},
        {id:"access_number",type:"int"}
    ]
}
///////////////////////////////// 副ap无线设置

var ck_ap_data = {};
ck_ap_data.auth = "";
ck_ap_data.pwd = "";
ck_ap_data.answer = "";
ck_ap_data.upside = "";
ck_ap_data.downside = "";
ck_ap_data.access_number = "";
var MAX_FILE_NAME = 63 - 21;//21为路径长度 

//无线状态click设置
function ap_enable_set()
{
	var val = $("#ap_hidden").val();
    if(val=="0"){
        $("#ap_set_tab").addClass("off");
    }else{
        $("#ap_set_tab").removeClass("off");
    }
	select_chose_set("wls_mode_sel",ck_ap_data.auth,wireless_safe_mode_change);
    nos.app.resizePage();
}

function ap_auto_close_set(str){
	$("#ap_auto_close_hidden").val(str);
	if(str == "0"){
		$("#ap_auto_close").attr("checked",false);
	}
	else{
		$("#ap_auto_close").attr("checked",true);
	}
}

function set_ap_auto_close(obj){
	if($(obj).attr("checked"))
		$("#ap_auto_close_hidden").val("1");
	else
		$("#ap_auto_close_hidden").val("0");
}
//初始化副ap
function init_ap(){
	$("#span_view").html(appHtml.view);
	bind_limit_num();
	if(apIntervalId)
		clearInterval(apIntervalId);
    init_app_language(appL.igd_ap.ap);
    $.when(get_image()).done(function(){
		nos.app.net('wireless_ap_base.cgi', "action=get",init_ap_set_callback);
	});
	var token_id = parentEmt.TOOLS.Url.getQueryString()["token_id"];
    $("#upload_img_form").attr("action", "./put_file.cgi?token_id=" + token_id);
	$("#put_file").unbind("change").bind("change", function () {
	   upload_image();
    });
}

function bind_limit_num(){
	$("#access_number").unbind("keyup focus").bind("keyup focus",function(){
		var ret = parentEmt.check_int($(this).val());
		if(ret == true){
			if($(this).val() > 10){
				$("#limit_hosts_tip").html(appHtml.tooLargeHost);
			}
		}
		else{
			$("#limit_hosts_tip").html(ret);
		}
	});
	$("#access_number").unbind("blur").bind("blur",function(){
		$("#limit_hosts_tip").html("");
	});
}

//副ap无线设置初始化成功执行函数
function init_ap_set_callback(result){
	
	$("#ap_ssid").val(result.ssid);
	radio_set(result.enable,"ap");
	radio_set(result.host_isolation,"waln_partition");

	radio_set(result.limit_enable,"speed_limit");
	radio_sele_set("broadcast_ssid",result.broadcast_ssid);
    speed_limit_set();
	$("#upside").val(result.limit_up_speed);
	$("#downside").val(result.limit_down_speed);
	$("#access_number").val(result.limit_hosts_num);

	
	ap_auto_close_set(result.auto_close_enable);
	
	ck_ap_data.auth = result.auth_mode;
	var lengthKeyObj0 = parentEmt.get_rand_key(0,result.answer,true);
	ck_ap_data.answer = parentEmt.getDAesString(result.answer,lengthKeyObj0.rand_key);
	ck_ap_data.pwd = parentEmt.getDAesString(result.wpa_key,lengthKeyObj0.rand_key);
	ck_ap_data.upside = result.limit_up_speed;
	ck_ap_data.downside = result.limit_down_speed;
	ck_ap_data.access_number = result.limit_hosts_num;
	select_chose_set("wls_mode_sel",result.auth_mode,wireless_safe_mode_change);
	ap_enable_set();
}

//副ap无线设置提交函数
function wire_bas_ap_set(){
	var ap_hidden = $("#ap_hidden").val();
    var ap_model = $("#wls_mode_sel").val();
    var speed_hidden = $("#speed_limit_hidden").val();
    if(ap_hidden=="1"){
		if(!check_app_input("ap_set_frm")){
			return;
		}
		
		if($("#wls_mode_sel").val() != "2"){
			var ret = checkBlankSpace($("#ap_wpa_key").val());
			if (ret) {
				show_message("error",appHtml.pwdNotBlank);
				return false;
			}
		}
		
		if(speed_hidden != "0"){
			if(!check_app_input("speed_limit_frm")){
                return;
            }
		}
    }
    show_message("save");
	format_speed();
    nos.app.net('wireless_ap_base.cgi', 'ap_frm', function(result){
        if(result=="SUCCESS"){
			/*if(ap_model == "1" && $("#put_file").val() != "")
				upload_image();
			else{*/
				show_message("success",appCommonJS.controlMessage.s_suc);
			//}
        }else{
            show_message("error",igd.make_err_msg(result));
			
        }
		init_ap();
    });
}


function checkBlankSpace(str){
	while(str.lastIndexOf(" ")>=0){
		str = str.replace(" ","");
	}
	if(str.length == 0){
		return true;
	}
	return false;
}

var UPLOAD;
function upload_image(){
	var _val = window.top.getFileName($("#put_file").val());
	var arr = _val.split(".");
	var ex = arr[arr.length-1];
	if(_val != ""){
		var sum = 0;
		for(var i = 0; i < _val.length; i++){
			if ((_val.charCodeAt(i) >= 0) && (_val.charCodeAt(i) <= 255))
				sum = sum + 1;
			else
				sum = sum + 3;
		}
		if(sum > MAX_FILE_NAME){
			show_message("error",appHtml.nameTooLange);
			return;
		}
		if(ex != "jpg" && ex != "jpeg" && ex != "bmp" && ex != "png"){
			show_dialog(appHtml.imageFormatErr,function(){
				recove_file_msg();
				$("#put_file").click();
			},function(){
				recove_file_msg();
				window.top.hide_dialog();
			},"igd_ap");
			return;
		}
	}
	show_message("file_uploading");
	if(UPLOAD)
		window.clearInterval(UPLOAD);
	UPLOAD = window.setInterval(upload_iframe_check,3000);
	$("#upload_img_form").unbind("submit").bind("submit");
	$("#upload_img_form").submit();
}

function upload_iframe_check(){
	try{
		if (!document.getElementById("iframe_hidden") ||  !document.getElementById("iframe_hidden").contentWindow
				|| !document.getElementById("iframe_hidden").contentWindow.document.body 
				|| !document.getElementById("iframe_hidden").contentWindow.document.body.innerHTML)
			return;
		var n = document.getElementById("iframe_hidden").contentWindow.document.body.innerHTML;
		if (n==false)
			return;
		var flag = n.toLowerCase();
		if(flag.indexOf("<pre") != -1){
			flag = flag.split("</pre>")[0];
			flag = flag.split(">")[1];
		}
		flag = window.top.dataDeal(flag);
		if(flag == false){
			show_message("exception");
			return false;
		}
		else if(flag != 'success'){
			upload_iframe_check_msg();
			show_dialog(igd.make_err_msg(flag),function(){
				window.top.hide_pop_layer("message_layer");
				window.top.hide_pop_layer("lock_div");
				recove_file_msg();
				$("#put_file").click();
			},function(){
				recove_file_msg();
				window.top.hide_dialog();
				window.top.hide_pop_layer("message_layer");
				window.top.hide_pop_layer("lock_div");
			},"igd_ap");
			
		}
		
		else{
			window.clearInterval(UPLOAD);
			show_message("success");
			recove_file_msg();
			get_image(true);
		}
		
	}
	catch(err){
		//show_message("exception");
		upload_iframe_check_msg();
		var key = {};
		key.err_no = "55";
		show_dialog(igd.make_err_msg(key),function(){
			window.top.hide_pop_layer("message_layer");
			window.top.hide_pop_layer("lock_div");
			recove_file_msg();
			$("#put_file").click();
		},function(){
			recove_file_msg();
			window.top.hide_dialog();
			window.top.hide_pop_layer("message_layer");
			window.top.hide_pop_layer("lock_div");
		},"igd_ap");
	}
}

function upload_iframe_check_msg() {
    window.clearInterval(UPLOAD);
	recove_file_msg();
}

function recove_file_msg(){
	$("#span_view").html(appHtml.view);
	var file_ctrl = $("#put_file");
	var clone_node = file_ctrl.clone();
	file_ctrl.after(clone_node.val("")); 
	file_ctrl.remove(); 
	clone_node.unbind("change").bind("change",function(){
		upload_image();
	});
}

function format_speed(){
	$("#upside").val(decimal(parseFloat($("#upside").val()),1));
	$("#downside").val(decimal(parseFloat($("#downside").val()),1));
	if(parseFloat($("#upside").val()) >= 100)
		$("#upside").val(100.0);
	if(parseFloat($("#downside").val()) >= 100)
		$("#downside").val(100.0);
}

function decimal(num,v) {  
    var vv = Math.pow(10,v);  
    return Math.round(num*vv)/vv;  
}  

//副ap无线连接列表
var apIntervalId;
function init_ap_list(){
    init_app_language(appL.igd_ap.ap_list);
	init_ap_list_callback();
    if(apIntervalId)
        clearInterval(apIntervalId);
    apIntervalId = window.setInterval('init_ap_list_callback()', 2000);
}
function init_ap_list_callback(){
    nos.app.net("wireless_connect_list_show.cgi",'action=get', paint_tab_list)
}

var paint_tab_list_data = {}
function paint_tab_list(data){

    var data_new=new Array();
    var index = 1;
    for(var i in data){
        var tempobj={};
        tempobj.id = parseInt(i,10) + 1;               //序列号id
		tempobj.host_name= parentEmt.removeHTMLTag(parentEmt.GetDeviceNameStr(data[i].host_name));//name
        tempobj.mac= data[i].mac.toUpperCase();                      //mac
        tempobj.mode = get_bgn(data[i].mode);          //模式
        tempobj.tx_rate= data[i].tx_rate+ "M";          //发送速率
        tempobj.rx_rate = data[i].rx_rate + "M";          //接收速率
        tempobj.elapsed = format_time(data[i].elapsed);        //连接时间

        data_new.push(tempobj);
        paint_tab_list_data[index]=data[i];
        index++;
    }

    var fun_arr = null;
    var tab = new libTable(appHtml.apListHead,data_new,1,10);
    print_table("ap_wireless_list",tab,fun_arr,false);
    nos.app.resizePage();
}

//安全模式onchange
function wireless_safe_mode_change(val)
{
	reg_app_map["ap_set_frm"][1] = {};
	if($("#ap_hidden").val() == "0"){
		$("#upload_file_layer").addClass("off");
		$("#re_pos_layer,.opt").css("top","0px");
	}
	else{
		if(val == "0") {
			$("#ap_wpa_key").val(ck_ap_data.pwd);
			$("#upload_file_layer").addClass("off");
			$("#set_psd").removeClass("off");
			$("#re_pos_layer,.opt").css("top","0px");
			$("#app_page").css("marginBottom","0px");
			$("#ap_wpa_key").attr("name","wpa_key");
			reg_app_map["ap_set_frm"][1].id = "ap_wpa_key";
			reg_app_map["ap_set_frm"][1].type = "password eq8_30";
		}
		else if(val == "1"){//网页认证
			$("#ap_wpa_key").val(ck_ap_data.answer);
			$("#upload_file_layer").removeClass("off");
			$("#set_psd").removeClass("off");
			if(has_name){
				$("#re_pos_layer").css("top","90px");
				$(".opt").css("top","70px");
				$("#app_page").css("marginBottom","40px");
			}
			else{//无图片名称
				$("#re_pos_layer,.opt").css("top","52px");
				$("#app_page").css("marginBottom","0px");
			}
			$("#ap_wpa_key").attr("name","answer");
			reg_app_map["ap_set_frm"][1].id = "ap_wpa_key";
			reg_app_map["ap_set_frm"][1].type = "string";
		}
		else if(val == "2"){//无密码认证
			$("#upload_file_layer").addClass("off");
			$("#set_psd").addClass("off");
			$("#re_pos_layer,.opt").css("top","0px");
			$("#app_page").css("marginBottom","0px");
			$("#ap_wpa_key").attr("name","wpa_key");
		}
	}
    nos.app.resizePage();
}

///////////////others
function format_time(time)
{
    time = parseInt(time,10);
    var hour = Math.floor(time / 3600);
    var tmp = time % 3600;
    var minute = Math.floor(tmp / 60);
    var sec = tmp % 60;
    if(hour < 9)
        hour = '0' + hour;
    if(minute < 9)
        minute = '0' + minute;
    if(sec < 9)
        sec = '0' + sec;
    return hour + ":" + minute + ":" + sec;
}
function get_bgn(v)
{
    var str = '';
    switch(v){
        case '0' : str = ' ';break;
        case '1' : str = ' (a)';break;
        case '2' : str = ' (b)';break;
        case '3' : str = ' (a+b)';break;
        case '4' : str = ' (g)';break;
        case '5' : str = ' (a+g)';break;
        case '6' : str = ' (b+g)';break;
        case '7' : str = ' (a+b+g)';break;
        case '8' : str = ' (n)';break;
        case '9' : str = ' (a+n)';break;
        case '10' : str = ' (b+n)';break;
        case '11' : str = ' (a+b+n)';break;
        case '12' : str = ' (g+n)';break;
        case '13' : str = ' (a+g+n)';break;
        case '14' : str = ' (b+g+n)';break;
        case '15' : str = ' (a+b+g+n)';break;
    }
    return str;
}

//访客网络限速开关

function speed_limit_set(){
    var val = $("#speed_limit_hidden").val();
    if(val=="0"){
        $("#speed_limit_tab").addClass("off");
		$("#upside").val(ck_ap_data.upside);
		$("#downside").val(ck_ap_data.downside);
		$("#access_number").val(ck_ap_data.access_number);
    }else{
        $("#speed_limit_tab").removeClass("off");
    }
    nos.app.resizePage();
}

var has_name = false;
function get_image(flag){
	var dfd = $.Deferred();
	nos.app.net("./custom_file_path_get.cgi","noneed=noneed",function(data){
		var path_arr = data.file_path.split("/");
		var path = path_arr[path_arr.length-1];
		if(path != ""){
			has_name = true;
			$("#file_name").html(path);
			$("#file_name_layer").removeClass("off");
			if(flag){
				$("#re_pos_layer").css("top","90px");
				$(".opt").css("top","70px");
				$("#app_page").css("marginBottom","40px");
				nos.app.resizePage();
			}
		}
		else{
			$("#file_name_layer").addClass("off");
		}
		dfd.resolve();
	});
	return dfd.promise();
}

function view(){
	if(window.top.$("#image_pop").length != 0)
		window.top.$("#image_pop").remove();
	image_view_pop.init();
	window.top.show_pop_layer("image_pop");
}

function advance_toggle(){
	$("#advance_layer").toggle();
	nos.app.resizePage();
}


//image view pop
var image_view_pop = {
	width:"328px",
	height:"528px",
	id:"image_pop",
	closeImageView:function(){
		window.top.hide_pop_layer("image_pop");
		$("#" + this.id).remove();
	},
	init:function(){
		var _this = this;
		var wrap_div = $("<div/>");
		wrap_div.attr({"id":this.id,"class":"pop_layer"});
		wrap_div.css("width",this.width);
		var header = $("<div/>");
		header.attr({"class":"pop_layer_header"});
		header.css("marginBottom","0");
		var h2 = $("<h2/>");
		header.append(h2);
		var a = $("<a/>");
		a.attr({
			"id":"img_view_shut_a",
			"href":"javascript:void(0);",
			"class":"modal_close",
			"onclick":"$(\"#config_page\").get(0).contentWindow.image_view_pop.closeImageView()"
		});
		a.html("×");
/*		a.unbind("click").bind("click",function(){
			_this.closeImageView();
		});*/
		header.append(a);
		wrap_div.append(header);
		var $cnt = $("<div/>");
		$cnt.attr({
			"id":"cnt",
			"position":"relative",
			"zIndex":"-1"
		});
		var $overlayer = $("<div/>");
		$overlayer.attr({
			"id":"overlayer",
			"zIndex":"200"
		});
		$overlayer.css({
			"position":"absolute",
			"left":0,
			"top":"48px",
			"background":"#FFF",
			"filter": "Alpha(opacity=0)",
			"-moz-opacity": "0",
			"-khtml-opacity": "0",
			"opacity": "0",
			"width":this.width,
			"height":this.height
		});
		var $frm = $("<iframe/>");
        $frm.attr({
			"src":"/app/igd_ap/webs/tmp/safety_redirection.html?noparam=true",
			"frameborder":0,
			"scrolling":"no",
			"width":this.width,
			"height":this.height
		});
		$cnt.append($frm);
		wrap_div.append($cnt);
		wrap_div.append($overlayer);
		//window.top.$("body")直接在ie7不能append jquery创建的在iframe中的节点
		$("body").append(wrap_div);
		var str = $("#" + this.id).prop("outerHTML");
		$("#" + this.id).remove();
		window.top.$("body").append(str);
	}
};
