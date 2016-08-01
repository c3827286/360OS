var appHtml = appL.vpn.js, current_tab_name = [
    {tab_title: appHtml.tabTitle[0], tab_id: "vpn_client_tab"},
    {tab_title: appHtml.tabTitle[1], tab_id: "client_list_tab"}
];
var reg_app_map = {
    client_set_frm:[
        {id:"server",type:"nin_ip_url"},
        {id: "pptp_client_server_port", type: "port"},
        {id: "user", type: "pptp_l2tp"},
        {id: "pass", type: "password_blank"}
    ],
    noneed:[]
};
$(document).ready(function () {
    initTab();
    $("body").mousedown(function(event){
        hide_msgbox();
    });
});

function init_vpn_client(){
    init_app_language(appL.vpn.vpn_client);
    init_client_data();
    checkbox_bind_event("vpn_client_data_tab",client_del);
}

//复制 对象的函数
function cloneAll(fromObj,toObj){
    for(var i in fromObj){
        if(typeof fromObj[i] == "object")
        {
            toObj[i]={};
            cloneAll(fromObj[i],toObj[i]);
            continue;
        }
        else  {
            toObj[i] = fromObj[i];
        }
    }
}

var vpn_paint_data=[],vpn_status_paint_data=[],index= 1,staIndex=1;
var vpn_client_data=[],l2tp_client_data=[],pptp_client_data=[];
function init_client_data(){
    var get_data=function(){
        var defer= $.Deferred();
        vpn_paint_data=[];
        nos.app.net('/app/l2tp_client/webs/l2tp_client_config_show.cgi','noneed=noneed',function(data){
            vpn_paint_data=get_l2tp_client_data(data);
            defer.resolve();
        });
        return defer.promise();
    };

    $.when(get_data()).done(function(){
        nos.app.net('/app/pptp_client/webs/pptp_client_config_show.cgi','noneed=noneed',init_client_tab);
    });
    nos.app.net('../../universal_app/vpn_route_get.cgi','noneed=noneed',function(data){
        if(data.l2tp_route_enable == "1"&&data.pptp_route_enable=="1")
            $("#vpn").prop("checked",true);
        else
            $("#vpn").prop("checked",false);
    });
}

function get_l2tp_client_data(data){
    cloneAll(data,l2tp_client_data);
    index=1;
    var reData=new Array();
    var pass="";
    var len = data.length;
    var lengthKeyObj="";
    if(len>0){
        lengthKeyObj=parentEmt.get_rand_key(0,data[0].pass,true);
    }
    for(var i in data){
        var temp=new Object();
        temp.id="<a href='javascript:void(0);' class='checkbox'></a>"+"<span id='index'>"+index+"</span>";
        temp.type="L2TP";
        temp.server= cutString(data[i]['server'],18);
        temp.user = cutString(data[i]['user'],8);
        pass=parentEmt.getDAesString(data[i].pass,lengthKeyObj.rand_key);
        temp.pass = cutString(pass,8);
        temp.port = "无";
        temp.state=(parseInt(data[i]['enable'])==1)?appHtml.status[0]:appHtml.status[1];
        temp.op = '<a href="javascript:void(0);"  class="modify" title=' + appHtml.clientTabBtn[2] + ' onclick="client_modify(' + index + ')">' + appHtml.clientTabBtn[2] + '</a>' +
        '<a href="javascript:void(0);"  title=' + appHtml.clientTabBtn[1] + ' onclick="client_del(' + index + ')">' + appHtml.clientTabBtn[1] + '</a>';
        l2tp_client_data[i]['pass']=pass;
        reData.push(temp);
        l2tp_client_data[i].type="L2TP";
        index++;
    }
    return reData;
}
function init_client_tab(data){
    cloneAll(data,pptp_client_data);
    var len = data.length,statusStr= appHtml.status;
    var pass="";
    var lengthKeyObj="";
    if(len>0){
        lengthKeyObj=parentEmt.get_rand_key(0,data[0].pass,true);
    }
    for(var i=0; i<len ; i++){
        var tmp = {};
        var state =(parseInt(data[i]['enable'])==1)?statusStr[0]:statusStr[1];
        tmp.id ="<a href='javascript:void(0);' class='checkbox'></a>"+"<span id='index'>"+index+"</span>";
        tmp.type = "PPTP";
        tmp.server = cutString(data[i].server,18);
        tmp.user = cutString(data[i].user,8);
        pass=parentEmt.getDAesString(data[i].pass,lengthKeyObj.rand_key);
        pptp_client_data[i].pass = pass;
        tmp.pass = cutString(pass,8);
        tmp.port = data[i].port;
        tmp.state = state;
        tmp.op = '<a href="javascript:void(0);"  class="modify" title=' + appHtml.clientTabBtn[2] + ' onclick="client_modify(' + index + ')">' + appHtml.clientTabBtn[2] + '</a>' +
        '<a href="javascript:void(0);"  title=' + appHtml.clientTabBtn[1] + ' onclick="client_del(' + index + ')">' + appHtml.clientTabBtn[1] + '</a>';
        vpn_paint_data.push(tmp);
        pptp_client_data[i].type="PPTP";
        index++;
    }
    if(vpn_paint_data.length==0){
        var no_data=[];
        var temp={};
        temp.id=temp.type=temp.server=temp.user=temp.pass=temp.in_port=temp.port=temp.enable=temp.op=null;
        no_data.push(temp);
        tab=new Table("vpn_client_data_tab",appHtml.clientTabHead,no_data);
        tab.initTable();
        $("#no_data").show();
    }else{
        var tab=new Table("vpn_client_data_tab",appHtml.clientTabHead,vpn_paint_data);
        tab.initTable();
        if($("#vpn_client_data_tab .TabFooter").length!=0){
            $("#vpn_client_data_tab").css("border","none");
        }
        vpn_client_data=l2tp_client_data.concat(pptp_client_data);
        l2tp_client_data=[];pptp_client_data=[];
    }
    nos.app.resizePage();
}

//新增vpn客户端弹窗
var vpn_client_pop_layer={
    init:function(){
        var _this=this;
        _this.create();
        _this.bind_event();
    },
    create:function(){
        var html=appL.vpn.vpn_client.html;
        var pop_layer=parentEmt.$(".pop_layer");
        if(pop_layer.length>0){
            pop_layer.remove();
        }
        pop_layer="<div class='pop_layer' id='vpn_pop_layer'></div>";
        parentEmt.$("body").append(pop_layer);
        var compiled= _.template($("#pop_layer").html()),
            popHtml=compiled(html);
        parentEmt.$("#vpn_pop_layer").html(popHtml);
    },
    bind_event:function(){
        parentEmt.$("#client_type").on("change",function(){
            if($(this).val()=="PPTP"){
                parentEmt.$(".port_item").show();
                reg_app_map["client_set_frm"][1].type="port";
            }else{
                parentEmt.$(".port_item").hide();
                reg_app_map["client_set_frm"][1].type="noneed";
            }
        });
        parentEmt.$("#client_set_frm").on("submit",client_set_save);
    }
}

function new_increase(){
    vpn_client_pop_layer.init();
    parentEmt.show_pop_layer("vpn_pop_layer");
}

//区分是域名还是ip
function judge_ip_url(str){
    var flg=0;
    for(var h=0;h<str.length;h++){
        var  cmp="0123456789.";
        var tst=str.substring(h,h+1);
        if(cmp.indexOf(tst) < 0){
            flg++;
        }
    }
    if (flg != 0){//url
        return 0;
    }
    else{//ip
        return 1;
    }
}

function fix_ip(ip){
    var ip_arr = ip.split(".");
    for(var i in ip_arr){
        ip_arr[i] = parseInt(ip_arr[i]);
    }
    return ip_arr[0] + "." + ip_arr[1] + "." + ip_arr[2] + "." + ip_arr[3]
}

var showInfoId;
function client_set_save(){
    if(!check_app_input("client_set_frm",true))
        return;
    var ret = judge_ip_url(parentEmt.$('#server').val());
    parentEmt.$('#is_ipaddr').val(ret);
    if(ret == 1){
        var ip = parentEmt.$("#server").val();
        parentEmt.$("#server").val(fix_ip(ip));
    }
    var type=parentEmt.$("#client_type").val();
    var old_type=parentEmt.$("#old_type").val();
    if(old_type=="")
        parentEmt.$('#deal').val('add');
    (parentEmt.$('#deal').val()=='add')?showInfoId=0:showInfoId=2;
    if(old_type!=""&&type!=old_type){
        parentEmt.$('#deal').val('add');
        showInfoId=2;
    }
    if(type=="L2TP"){
        nos.app.net('/app/l2tp_client/webs/l2tp_client_add.cgi','client_set_frm',set_save_callback);
    }else{
        nos.app.net('/app/pptp_client/webs/pptp_client_add.cgi','client_set_frm',set_save_callback);
    }
}


function set_save_callback(data){
    if(data=="SUCCESS"){
        if(showInfoId>=0){
            //判断修改后的类型是否发生改变
            var id=parentEmt.$("#id").val(),
                type=parentEmt.$("#client_type").val(),
                old_type=parentEmt.$("#old_type").val()
            if(old_type!=""&&type!=old_type){
                type=="L2TP"?$.post('/app/pptp_client/webs/pptp_client_del.cgi','id='+id):$.post('/app/l2tp_client/webs/l2tp_client_del.cgi','id='+id);
            }
            parentEmt.hide_pop_layer("vpn_pop_layer");
            show_message("success",appHtml.clientTabBtn[showInfoId]+appHtml.success);
        }
        load_app_page(current_html,"init_"+current_html);
    }
    else {
        show_message("error", igd.make_err_msg(data));
    }
}

//修改函数
function client_modify(index){
    vpn_client_pop_layer.init();
    var obj=vpn_paint_data[index-1],data=vpn_client_data[index-1];
    obj.user=data.user;
    obj.server=data.server;
    obj.pass=data.pass;
    parentEmt.$('#deal').val('mod');
    parentEmt.$('#old_type').val(obj.type);
    if(obj.state == appHtml.status[1]){//状态为禁止
        parentEmt.$("#client_status").removeClass("radio_on").addClass("radio_off");
        parentEmt.$("#client_status_hidden").val("0");
    }
    else{
        parentEmt.$("#client_status").removeClass("radio_off").addClass("radio_on");
        parentEmt.$("#client_status_hidden").val("1");
    }
    if(obj.type=="PPTP"){
        parentEmt.$(".port_item").show();
        parentEmt.$("#client_type").val("PPTP");
        reg_app_map["client_set_frm"][1].type="port";
    }
    else{
        parentEmt.$(".port_item").hide();
        reg_app_map["client_set_frm"][1].type="noneed";
    }
    nos.app.setForm('client_set_frm', obj);
    parentEmt.show_pop_layer("vpn_pop_layer");
    parentEmt.$("#id").val(vpn_client_data[index-1].id);
}

//删除函数
function client_del(index){
    showInfoId=1;
    var obj,id;
    if(!$.isArray(index)){
        obj=vpn_client_data[index-1];
        show_dialog(appCommonJS.dialog.del_single,function(){
            show_message("deleteing");
            id=obj.id;
            if(obj.type == "L2TP"){
                nos.app.net('/app/l2tp_client/webs/l2tp_client_del.cgi','id='+id,set_save_callback);
            }else{
                nos.app.net('/app/pptp_client/webs/pptp_client_del.cgi','id='+id,set_save_callback);
            }
        })
    }
    else{
        show_dialog(appHtml.dialog_confirm,function(){
            show_message("deleteing");
            for(var i=0;i<index.length;i++){
                var foot=$("#vpn_client_data_tab .TabFooter");
                id=index[i];
                if(foot.length!=0){
                    var current=$("#vpn_client_data_tab .TabFooter .current"),num;
                    num=current.html();
                    id=(parseInt(num)-1)*10+index[i];
                }
                obj=vpn_client_data[id];
                if(obj.type == "L2TP"){
                    nos.app.net('/app/l2tp_client/webs/l2tp_client_del.cgi','id='+obj.id,function(data){
                        if(data!="SUCCESS"){
                            show_message("error", igd.make_err_msg(data));
                        }
                    });
                }else{
                    nos.app.net('/app/pptp_client/webs/pptp_client_del.cgi','id='+obj.id,function(data){
                        if(data!="SUCCESS"){
                            show_message("error", igd.make_err_msg(data));
                        }
                    });
                }
                if(i==index.length-1){
                    setTimeout(function(){
                        show_message("success",appHtml.clientTabBtn[showInfoId]+appHtml.success);
                        load_app_page(current_html, "init_" + current_html);
                    },1000);
                }
            }
        })
    }

}


var vpn_status_data=[],l2tp_status_data=[],pptp_status_data=[];
//客户端状态列表
function init_client_list(){
    init_app_language(appL.vpn.vpn_client_list);
    var get_l2tp_data=function(){
        var defer= $.Deferred();
        vpn_status_paint_data=[];
        nos.app.net('/app/l2tp_client/webs/l2tp_client_status_show.cgi','noneed=noneed',function(data){
            vpn_status_paint_data=get_l2tp_status_data(data);
            defer.resolve();
        });
        return defer.promise();
    };
    $.when(get_l2tp_data()).done(function(){
        nos.app.net('/app/pptp_client/webs/pptp_client_status_show.cgi','noneed=noneed',init_client_status_tab);
    });
}

function get_l2tp_status_data(data){
    cloneAll(data,l2tp_status_data);
    staIndex=1;
    var reData=new Array(),linkStatus =appHtml.linkStr;
    for(var i in data){
        var tempObj=new Object();
        tempObj.id=staIndex;
        tempObj.type="L2TP";
        tempObj.user=data[i]['user'];
        tempObj.con=(parseInt(data[i]['link_status'])==0?linkStatus[1]:linkStatus[0]);
        tempObj.local=data[i]['local_ip'];
        tempObj.remote=data[i]['remote_ip'];
        if(data[i].link_status == '0')
            tempObj.operate = '<a title="'+linkStatus[0]+'" href="javascript:void(0);" onclick="client_connection('+ tempObj.id  +');">'+linkStatus[0]+'</a>';
        else
            tempObj.operate = '<a  title="'+linkStatus[1]+'" href="javascript:void(0);" onclick="client_connection('+ tempObj.id +');">'+linkStatus[1]+'</a>';
        reData.push(tempObj);
        l2tp_status_data[i].type="L2TP";
        staIndex++;
    }
    return reData;
}
//vpn状态列表
function init_client_status_tab(data){
    cloneAll(data,pptp_status_data);
    var linkStatus =appHtml.linkStr,tab;
    for(var i in data){
        var tempObj=new Object();
        tempObj.id=staIndex;
        tempObj.type="PPTP";
        tempObj.user=data[i]['user'];
        tempObj.con=(parseInt(data[i]['link_status'])==0?linkStatus[1]:linkStatus[0]);
        tempObj.local=data[i]['local_ip'];
        tempObj.remote=data[i]['remote_ip'];
        if(data[i].link_status == '0')
            tempObj.operate = '<a title="'+linkStatus[0]+'" href="javascript:void(0);" onclick="client_connection('+ tempObj.id  +');">'+linkStatus[0]+'</a>';
        else
            tempObj.operate = '<a  title="'+linkStatus[1]+'" href="javascript:void(0);" onclick="client_connection('+ tempObj.id +');">'+linkStatus[1]+'</a>';
        vpn_status_paint_data.push(tempObj);
        pptp_status_data[i].type="PPTP";
        staIndex++;
    }
    if(vpn_status_paint_data.length==0){
        var no_data=[];
        var temp={};
        temp.id=temp.type=temp.user=temp.con=temp.local=temp.remote=temp.operate=null;
        no_data.push(temp);
        tab=new Table("vpn_status_tab",appHtml.clientStatusTabHead,no_data);
        tab.initTable();
    }else{
        tab=new Table("vpn_status_tab",appHtml.clientStatusTabHead,vpn_status_paint_data);
        tab.initTable();
        vpn_status_data=l2tp_status_data.concat(pptp_status_data);
        l2tp_status_data=[];pptp_status_data=[];
    }
}
function refresh_status_tab(){
    load_app_page(current_html,"init_"+current_html);
}

function client_connection(index){
    var obj=vpn_status_data[index-1];
    var id=obj.id;
    showInfoId=-1;
    if(obj.type=="L2TP"){
        if(parseInt(obj.link_status)==1){
            show_dialog(appHtml.dialog,function(){
                nos.app.net('/app/l2tp_client/webs/l2tp_client_down.cgi','id='+id,set_save_callback);
            })
        }
        else{
            nos.app.net('/app/l2tp_client/webs/l2tp_client_link.cgi','id='+id,set_save_callback);
        }
    }else{
        if(parseInt(obj.link_status)==1){
            show_dialog(appHtml.dialog,function(){
                nos.app.net('/app/pptp_client/webs/pptp_client_down.cgi','id='+id,set_save_callback);
            })
        }
        else{
            nos.app.net('/app/pptp_client/webs/pptp_client_link.cgi','id='+id,set_save_callback);
        }
    }

}

function set_vpn(){
    var str = "";
    if($("#vpn").prop("checked"))
        str = "1";
    else
        str = "0";
    show_message("save");
    var obj={};
    obj.l2tp_route_enable=str;
    obj.pptp_route_enable=str;
    $.post('../../universal_app/vpn_route_set.cgi',obj, function (data) {
        var data=dataDeal(data);
        if(data=="SUCCESS"){
            show_message("success");
        }else{
            show_message("error",igd.make_err_msg(data));
            if(str == "1")
                $("#vpn").prop("checked",false);
            else
                $("#vpn").prop("checked",true);
        }
    })
}
