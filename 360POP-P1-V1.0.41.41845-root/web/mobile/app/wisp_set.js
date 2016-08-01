/**
 * Created by Administrator on 2015/3/30.
 */
var wisp={
    appCurrentHtml:null,
    pageToggle:function(name){
        var me = this;
        me.appCurrentHtml=name;
        if(name=="wisp-set"){
            $(".appSave").show();mobile_host_control.M_Swiper.subSlideTo(0);
        }
        else{
            $(".appSave").hide();mobile_host_control.M_Swiper.subSlideTo(1);
        }
        $(".appTitle").html(appHtml[name]);
    },
    changeTip:function(type,data){
        $(".wisp-tip p").hide().eq(type).show();
    },
    radioSelectConfig:function(){
        Tools.radio.config.switch.wisp_status={};
        Tools.radio.config.switch.wisp_status.oEvent="wisp_set.wisp_enable_set";
    },
    addEventList:function(){
        var me =this;
        $(".wisp-set").undelegate("#ap-search","click").delegate("#ap-search","click",function(){
            get_ap_data();
        });
        $("#wisp-ap-list").undelegate("dd","click").delegate("dd","click",function(){
            wireless_ap_connect($(this).index());
            connect_ap();
            me.pageToggle("wisp-set");
            //me.apCallBack("wisp-set");
            mobile_host_control.app.returnBackCallBackFn();
        });
    },
    apCallBack:function(name){
        var me =this;
        mobile_host_control.app.addReturnBackCallBackFns(function(){
            me.pageToggle(name);
        });
    },
    apSearchSuccess:function(data){
        var me =this;
        var signalNum = function(num){
            return Math.ceil((num*1)/25);
        };
        var createApList = function(data){
            var htmlStr="";
            var node = $("#wisp-ap-list");
            var noList = common_M_html.noTableListDataTip;
            if(!data.length){ node.addClass("noTableListDataTip").html(noList);return;}
            for(var i in data){
                var className ="signal-"+Math.ceil((data[i].rssi*1)/25)+ ((wireless_ap_data[i].auth==0)?"":" signalMY");
                htmlStr+="<dd class='"+className+"'><label>"+data[i].ssid+"</label><span>"+data[i].auth+"</span></dd>";
            }
            node.removeClass("noTableListDataTip").html(htmlStr);
        };
        createApList(data);
        me.pageToggle("wisp-ap-list");
        show_message("success",appHtml.getApSuccess);
        me.apCallBack("wisp-set");
    },
    init:function(){
        appHtml=appL.igd_wisp.js;
        reg_app_map={
            wisp_frm:[
                {id:"ssid_flag",type:"string"},
                {id:"psd",type:"password eq8_64 noneed"}
            ]
        };
        ck_wisp_set_data = {
            ssid : null,
            pwd : null,
            tip :null
        };
        $.extend(true,appHtml,MobileHtml[current_html]["js"]);
//        window.clearInterval(wisp_set_timer);
        this.radioSelectConfig();
        this.addEventList();
        wisp_set.init();
    }
};
define(function(){
    return wisp;
});


var appHtml;
//验证地图
var reg_app_map;
var ck_wisp_set_data;

// wisp set

(function(){
    var wisp_base_data = null;
    var wisp_set_timer;
    var wisp_set={
        get_wisp_set_data:function(func){
            nos.app.net('/app/igd_wisp/webs/wireless_sta_mode.cgi', "action=get", func);
        },
         bind_ssid_event:function(){
            var _this = $("#ssid_flag");
            //debug 考虑到用户可能直接在输入ssid的时候就敲回车提交，此时不会触发blur事件，所以只有绑在keyup事件上了
            var originVal = _this.val();
            _this.unbind("keyup paste").bind("keyup paste",function(){
                var currentVal = $(this).val();
                if(originVal != currentVal) {
                    $("#type").val("1");
                }
            });
        },
        // wisp设置初始化成功回调函数
         init_wisp_set_callback:function(result){
             var me =wisp_set;
            wisp_base_data = result;
            radio_set(result.enable,"wisp_status");
            me.init_wisp_data(result);
        },
        get_wisp_link_status:function(){
            var me = this;
            if(wisp_set_timer)
                window.clearTimeout(wisp_set_timer);
            (function(){
                var call_Me=arguments.callee;
                nos.app.net('/app/igd_wisp/webs/wireless_sta_mode.cgi', "action=get", function(data){
                    wisp_base_data=data;
                    if(current_html == "wisp_set"&&wisp_base_data.enable=="1"&&parseInt(wisp_base_data.status)>2){
                        wisp_set_timer=setTimeout(call_Me,5000);
                    }
                    else{
                        window.clearTimeout(wisp_set_timer);
                        me.init_wisp_data(data);
                        switch (parseInt(wisp_base_data.status,10)){
                            case 0:show_message("msg_info",appHtml.no_link_get);break;
                            case 1:show_message("success",appHtml.link_suc+wisp_base_data.ip);break;
                            default :show_message("error",appHtml.link_failure);break;
                        }
                    }
                });
            })();
        },
        //wisp 状态点击事件
        wisp_enable_set:function(){
            var val = $("#wisp_status_hidden").val();
            if(val == "0"){
                $(".wisp-item").hide();
                $("#ssid_flag").val(ck_wisp_set_data.ssid);
                $("#psd").val(ck_wisp_set_data.pwd);
                $("#status_tips").html(ck_wisp_set_data.tip);
            }
            else{
                $(".wisp-item").show();
            }
        },
        tip_status_change:function(obj){
            var me=this;
            var statusTipStr = me.get_status(obj.status);
            if(obj.status == "1"){
                statusTipStr += "<br/>"+appHtml.getIp + obj.ip;
            }
            ck_wisp_set_data.tip = statusTipStr;
            $("#wisp-success-tip").html(statusTipStr);
        },
        //连接状态  ssid 密码 初始化
        init_wisp_data:function(result){
            var me = this;
            nos.app.setForm("wisp_frm",result);
            me.tip_status_change(result);
            if(!!(result.enable*1)){wisp.changeTip(1);}
            ck_wisp_set_data.ssid = result.ssid;
            ck_wisp_set_data.pwd = $("#psd").val();
            $("#old_ssid").val(result.ssid);

        },
        get_status:function(status){
            var str = "",statusStr=appHtml.status;
            switch(status){
                case "0":str = statusStr[0];break;
                case "1":str = statusStr[1];break;
                default :str = statusStr[2];break;
            }
            return str;
        },
        save_wisp:function(){
            var me =this;
            var wisp_status_hidden = $("#wisp_status_hidden").val();
            var auth_flag = $("#auth_flag").val();
            if(wisp_status_hidden=="1"){
                if(!check_app_input("wisp_frm"))
                    return;
                me.wisp_submit();
            }
            else
                me.wisp_submit();
        },
        wisp_submit:function(){
            //判断是否加密
            var me = this;
            var is_encrypt = $("#encrypt_flag").val();
            if(is_encrypt != "0"){
                if (!get_msgbox("psd", "password eq8_64")) {
                    return false;
                }
            }
            show_message("save");
            nos.app.net('/app/igd_wisp/webs/wireless_sta_mode.cgi', 'wisp_frm', function(result){
                if(result=="SUCCESS"){
                    Tools.form.subCurrentHtml_init_formData();
                    if($("#wisp_status_hidden").val()=="0"){
                        wisp.changeTip(0);show_message("success",appCommonJS.controlMessage.s_suc);return;
                    }else{
//                        show_message("wait",appHtml.get_linking);
                        show_message("success",appCommonJS.controlMessage.s_suc);
                        app_compatible.show_cut_net_tip();
                    }
                }else{
                    show_message("error",igd.make_err_msg(result));
                }
//                me.get_wisp_link_status();
            });
        },
        init:function(){
            var me =this;
            me.get_wisp_set_data(me.init_wisp_set_callback);
            me.bind_ssid_event();
        }
    };
    window.wisp_set=wisp_set;
})();

// wisp set end
var wireless_ap_data;
var AP_choosed = new Object;
//ap探测
function get_ap_data(){
//    if(wisp_set_timer)
//        window.clearInterval(wisp_set_timer);
    show_message("wait",appHtml.wait);
    nos.app.net('/app/igd_wisp/webs/wireless_sta_scan_show.cgi', 'action=get', get_ap_data_callback);
}
function  get_ap_data_callback(result){
    if(result.length>0){
        wisp.apSearchSuccess(paint_tab_ap_list(result));
    }else{
        show_message("error",appHtml.getApFailure);
    }

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
function paint_tab_ap_list(datav){
    wireless_ap_data=[];
    var data_new=new Array();
    var data = get_sorted_data(datav);
    for(var i in data){
        var tempobj={};
        var _name = tempobj.ssid=parentEmt.TOOLS.Crypto.textencode(data[i].ssid.replace(/[ ]/g,"&nbsp;"));
        tempobj.id = parseInt(i,10) + 1;                   //序号
        tempobj.ssid = _name===""?"隐藏网络":_name; //网络名称;
        tempobj.channel = data[i].channel;   //  频道
        tempobj.auth = get_auth(data[i].auth);               //安全模式
        tempobj.rssi = data[i].rssi;                     //信号
        tempobj.link = '<input type="radio" name="scan_r" onclick="wireless_ap_connect('+tempobj.id +')"/>';  //连接
        data_new.push(tempobj);
        wireless_ap_data[i] = {};
        wireless_ap_data[i]=data[i];
    }
    return data_new;
}
//排序
function get_sorted_data(data)
{
    return data.sort(by_sin);
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
//选择网络
function connect_ap(){
//    if(wisp_set_timer)
//        clearInterval(wisp_set_timer);
    var ssid_str = AP_choosed.ssid.replace(/&nbsp;/g," ");
    $("#ssid_flag").val(ssid_str);
    $("#auth_flag").val(AP_choosed.auth);
    $("#channel_flag").val(AP_choosed.channel);
    $("#bandwidth_flag").val(AP_choosed.bandwidth);
    $("#rssi_flag").val(AP_choosed.rssi);
    $("#bssid_flag").val(AP_choosed.bssid);
    $("#encrypt_flag").val(AP_choosed.encrypt);
    $("#psd").val("");
    $("#psd").attr("disabled",AP_choosed.auth=="0");
    check_connect();
    $("#type").val("0");//自动
    if(ssid_str == appHtml.hiddenSSID){
        $("#lbl_ssid").html(appHtml.inputSSID);
        $("#ssid_layer").addClass("off");
        $("#bssid_layer").removeClass("off");
    }
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
