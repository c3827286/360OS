/**
 * Created by lan on 13-12-6.
 */
var appHtml=appL.qos_limit.js;
var reg_app_map = {
    ddnsform:[
        {id:"user_id",type:"string"},
        {id:"user_password", type:"string"}
    ],
    noneed:[]
}
$(document).ready(function(){
    init_app_language(appL.qos_limit.index);
    ddns_init();
    $("body").mousedown(function(event){
        hide_msgbox();
    });
});
//改变隐藏表单的值---动态域名服务(DDNS)状态
var inputObj=document.getElementsByTagName('input');
function change_ddns_enable(flag){
    document.getElementById('ddns_flag').value=flag;
    if($('#ddns_flag').val()==0){
        for(var i in inputObj){
            if(inputObj[i].type!='radio'){
                //document.getElementById('user_id').style.backgroundColor='#BEC0C5';
                //document.getElementById('user_password').style.backgroundColor='#BEC0C5';
                document.getElementById('user_id').disabled=true;
                document.getElementById('user_password').disabled=true;

            }
        }
    }
    else{
        for(var i in inputObj){
            if(inputObj[i].type!='radio'){
                //document.getElementById('user_id').style.backgroundColor='white';
                //document.getElementById('user_password').style.backgroundColor='white';
                document.getElementById('user_id').disabled=false;
                document.getElementById('user_password').disabled=false;
            }
        }
    }
}


function initDone(data){
    if(data == "SUCCESS")
        show_message("success",appCommonJS.controlMessage.s_suc);
    else
        show_message("error",igd.make_err_msg(data));
    nos.app.net('./igd_ddns.cgi','noneed=noneed&action=get',setFormData);
    return false;
}
/*submitSetData 提交函数  */
function submitSetData(){
    if($('#ddns_flag').val()==1){
        if(check_app_input("ddnsform")){
            nos.app.net('./igd_ddns.cgi','ddnsform',initDone); //  ddnsform 是表单名字不能变  setFormData配置表单数据函数
            return false;
        }
    }
    else{
        nos.app.net('./igd_ddns.cgi','ddnsform',initDone); //  ddnsform 是表单名字不能变  setFormData配置表单数据函数
    }

}
/*
 setFormData函数初始化表单的值
 dnsData   表单的值Json
 */
function setFormData(dnsData){
    var radioObj=['ddns_status_1','ddns_status_0'];

    if(dnsData.WAN0.enable0==0){
        document.getElementById(radioObj[1]).checked=true;
        document.getElementById(radioObj[0]).checked=false;
        change_ddns_enable(dnsData.WAN0.enable0);
    }
    else {
        document.getElementById(radioObj[0]).checked=true;
        document.getElementById(radioObj[1]).checked=false;
        change_ddns_enable(dnsData.WAN0.enable0);
    }
    document.getElementById('user_id').value=dnsData.WAN0.user_id0;
    document.getElementById('user_password').value=dnsData.WAN0.password0;

    if(dnsData.WAN0.status_info0==""){

        document.getElementById('ddns_status').innerHTML="";
    }
    else{
        var ddns_map_status=dnsData.WAN0.status_info0;
        var ddns_map_index=ddns_map_status.split(',');
        var ddns_map_indexValue=ddns_map_index[0];
        var str = "";
        if(dnsData.WAN0.domain0 != "")
            str = appHtml.ddns_map[ddns_map_indexValue] + dnsData.WAN0.domain0;
        else
            str = appHtml.ddns_map[ddns_map_indexValue];
        document.getElementById('ddns_status').innerHTML=str;
    }
}

function ddns_init(){
    nos.app.net('./igd_ddns.cgi','noneed=noneed&action=get',setFormData);
    return false;
}








