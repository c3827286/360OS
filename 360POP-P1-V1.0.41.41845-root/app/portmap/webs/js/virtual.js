var appHtml=appL.portmap.js, current_tab_name = [
    {tab_title: appHtml.tabTitle[0], tab_id: "virtual_tab"},
    {tab_title: appHtml.tabTitle[1], tab_id: "dmz_tab"}
];
var language_type = igd.global_param.language_type;
var L = parentEmt.language[language_type]["JS"];
var reg_app_map = {
    port_a: [
        {id: "dest_port_a", type: "port"}
    ],
    port_b: [
        {id: "dest_port_a", type: "port"},
        {id: "dest_port_a", type: "port"}
    ],
    virtual_service_frm: [
        {id: "virtual_name", type: "string"},
        {id: "virtual_in_ip", type: "in_ip"},
        {id: "src_port_a", type: "port"},
        {id: "src_port_b", type: "port noneed"}
    ],
    dmz_set: [
        {id: "dmz_ip_address", type: "in_ip"}
    ],
    noneed: []
}
$(document).ready(function () {
    initTab();
    $("body").mousedown(function (event) {
        hide_msgbox();
    });
});

//-----------------虚拟服务virtual-------------
function init_virtual() {
    init_app_language(appL.portmap.virtual);
    nos.app.net('./virtual_service_list_show.cgi', 'noneed=noneed', init_virtual_callback);
}

function init_virtual_callback(data) {
    paint_proto_port_dom();
    init_user_sele_protocol("virtual");
    paint_virtual_service_list(data);
    checkbox_bind_event("virtual_service_list",virtual_delete);
}

/**
 * 表格组建  将后台的数据传入即可
 * @param data
 */
//初始化拉取数据成功后 更新删除变为对paint_list_data 的操作 不用每次都重新初始化了
var virtual_service_setup_data = {}
function paint_virtual_service_list(data) {
    var data_new = [];
    var index = 1;
    if(data.length==0){
        var no_data=[];
        var temp={};
        temp.name=temp.ip=temp.pro=temp.v=temp.in_e_port=temp.in_port=temp.out_s_port=temp.out_e_port=temp.out_port=temp.op=null;
        no_data.push(temp);
        tab=new Table("virtual_service_list",appHtml.virtualServiceList,no_data);
        tab.initTable();
        $("#no_device").show();
    }else {
        for (var i in data) {
            var number = parseInt(i, 10) + 1;
            var id = "<a href='javascript:void(0);' class='checkbox'></a>" + "<span id='number'>" + number + "</span>";
            var name = data[i].name;
            var ip = data[i].in_ip;
            var pro = data[i].protocol;
            var in_s_port = data[i].in_start_port;
            var in_e_port = data[i].in_end_port;
            var in_port = (in_s_port == in_e_port ? in_s_port : (in_s_port + "-" + in_e_port));
            var out_s_port = data[i].out_start_port;
            var out_e_port = data[i].out_end_port;
            var out_port = (out_s_port == out_e_port ? out_s_port : (out_s_port + "-" + out_e_port));
            var op = '<a href="javascript:void(0);"  class="modify" title=' + L.modify + ' onclick="virtual_change(' + index + ')">' + L.modify + '</a>' +
                '<a href="javascript:void(0);"  title=' + L.s_delete + ' onclick="virtual_delete(' + index + ')">' + L.s_delete + '</a>';
            data_new.push({id: id, name: name, ip: ip, pro: pro, out_port: out_port, in_port: in_port, op: op});
            virtual_service_setup_data[index] = data[i];
            index++;
        }
        //var fun_arr = [
        //    {type: "edit", name: "virtual_change",str:appCommonJS.btnTitle.edit},
        //    {type: "del", name: "virtual_delete",str:appCommonJS.btnTitle.del}
        //];
        //var tab = new libTable(appHtml.virtualServiceList, data_new, 1, 10);
        //print_table("virtual_service_list", tab, fun_arr, false);
        var tab = new Table("virtual_service_list", appHtml.virtualServiceList, data_new);
        tab.initTable();
    }
    nos.app.resizePage();
}

/**
 * 虚拟服务设置增加方法
 * @returns {boolean}
 */
function virtual_service_submit() {
    if (check_app_input("virtual_service_frm",true)) {
        if (!check_proto_sele()) {
            return;
        }
        if (!check_in_out_count()) {
            return;
        }
        var porta = $("#src_port_a").val();
        var portb = $("#src_port_b").val();
        if ($("#src_port_b").val() != "") {
            var return_val = check_start_end_port(porta, portb);
            if (return_val != true) {
                var ctr_obj = document.getElementById("src_port_a");
                var point_xy = getPosition(ctr_obj);
                point_xy.x += ctr_obj.clientWidth + 5;
                point_xy.y -= ctr_obj.clientHeight;
                var msgbox = new MessageBox(return_val, point_xy);
                msgbox.Show();
                return false;
            }
        }
        nos.app.net('./virtual_service_add_del.cgi', 'virtual_service_frm', virtual_service_submit_callback);
    }
}

function virtual_service_submit_callback(data) {
    if (data == "SUCCESS"){
        show_message("success", appCommonJS.controlMessage.s_suc)
        parentEmt.hide_pop_layer("port_map_pop_layer");
    }
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}

/**
 * 操作更新 显示事件
 * @param i 每行的id
 */
function virtual_change(index) {
    port_map_pop_layer.create();
    parentEmt.show_pop_layer("port_map_pop_layer");
    init_user_sele_protocol("virtual");
    parentEmt.$("#action").val("1");
    var obj = virtual_service_setup_data[index];
    parentEmt.$("#virtual_name").val(obj.name);
    parentEmt.$("#virtual_in_ip").val(obj.in_ip);

    change_proto_user_sele(obj);
    select_chose_set("proto", obj.protocol);
    select_chose_set("uiname", obj.uiname);
    var tempStr = "";
    with (obj) {
        tempStr += '<input type="hidden" name="old_name" value="' + name + '"/>';
        tempStr += '<input type="hidden" name="old_in_ip" value="' + in_ip + '"/>';
        tempStr += '<input type="hidden" name="old_in_start_port" value="' + in_start_port + '"/>';
        tempStr += '<input type="hidden" name="old_in_end_port" value="' + in_end_port + '"/>';

        tempStr += '<input type="hidden" name="old_out_start_port" value="' + out_start_port + '"/>';
        tempStr += '<input type="hidden" name="old_out_end_port" value="' + out_end_port + '"/>';

        tempStr += '<input type="hidden" name="old_protocol" value="' + protocol + '"/>';
        tempStr += '<input type="hidden" name="old_uiname" value="' + uiname + '"/>';
        parentEmt.$("#modify_hidevalue_box").html(tempStr);
    }
}

/**
 * 虚拟服务列表 删除方法
 * @param id  序列号
 * @param obj
 */
function virtual_delete(id) {
    if(!$.isArray(id)){
        show_dialog(appCommonJS.dialog.del_single, function () {

            nos.app.net('./virtual_service_add_del.cgi', get_virtual_service_setup_data(id), virtual_delete_callback);
        })
    }else{
        show_dialog(L.delete_checked_list,function(){
            show_message("deleteing");
            for(var i=0;i<id.length;i++){
                var foot=$("#virtual_service_list .TabFooter"),index;
                index=parseInt(id[i],10)+1;
                if(foot.length!=0){
                    var current=$("#virtual_service_list .TabFooter .current"),num;
                    num=current.html();
                    index=(parseInt(num)-1)*10+id[i]+1;
                }
                nos.app.net('./virtual_service_add_del.cgi', get_virtual_service_setup_data(index), function(data){
                    if (data != "SUCCESS") {
                        show_message("error", igd.make_err_msg(data));
                    }
                    load_app_page(current_html, "init_" + current_html);
                });
                if(i==id.length-1){
                    setTimeout(function(){
                        show_message("del_success")
                    },1000);
                }
            }
        })
    }

}
function get_virtual_service_setup_data(index){
    var obj = virtual_service_setup_data[index];
    var out_start_port_ = encodeURIComponent(obj.out_start_port);
    var out_end_port_ = encodeURIComponent(obj.out_end_port);
    var in_start_port_ = encodeURIComponent(obj.in_start_port);
    var in_end_port_ = encodeURIComponent(obj.in_end_port);
    var in_ip = encodeURIComponent(obj.in_ip);
    var protocol =encodeURIComponent(obj.protocol);
    var name = encodeURIComponent(obj.name);
    var str = "mode=2" + "&name=" + name + "&in_ip=" + in_ip + "&protocol=" +
        protocol + "&out_start_port=" + out_start_port_ + "&out_end_port=" +
        out_end_port_ + "&in_start_port=" + in_start_port_ + "&in_end_port=" +
        in_end_port_ + "&uiname=ALL";
    return str;
}


function virtual_delete_callback(data) {
    if (data == "SUCCESS") {
        show_message("success",appCommonJS.controlMessage.d_suc);
    }
    else {
        show_message("error", igd.make_err_msg(data));
    }
    load_app_page(current_html, "init_" + current_html);
}

/**
 * 虚拟服务删除全部方法
 */
function virtual_clean_all() {
    show_dialog(appCommonJS.dialog.del_all, function () {
        nos.app.net('./virtual_service_clean.cgi', "noneed=noneed", virtual_clean_all_callback);
    })

}
function virtual_clean_all_callback(data) {
    if (data == "SUCCESS")
        show_message("success", appCommonJS.controlMessage.c_suc);
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}

//-----------------dmz------------------
function init_dmz() {
    init_app_language(appL.portmap.dmz);
    if (g_wan_num == 1) {
        html_load_dmz(1);
    }
    else {
        var num = g_wan_num;
        for (var i = 1; i <= num; i++) {
            $("#wan" + i + "_dmz_tr").show();
            init_dmz_set_table(i);
        }
        $("#dmz_detail_info_div").hide();
    }
}

function dmz_change(val) {
    var val = $("#dmz_status_hidden").val();
    if (val == "1") {
        $("#dmz_ip_address").attr("disabled", false);  //启用
        $("#dmz_ip_address_tip").addClass("isneed");
    } else {
        $("#dmz_ip_address").attr("disabled", true);  //禁止
        $("#dmz_ip_address_tip").removeClass("isneed");
    }
}
function virtual_dmz_add() {
    var dmz_status = $("#dmz_status_hidden").val();
    if (dmz_status == "1") {
        if (!check_app_input("dmz_set")) {
            return;
        }
    }
    $("#ok_btn").html(appCommonJS.Button.saving);
    nos.app.net('./dmz.cgi', 'dmz_form', function (data) {
        if (data == "SUCCESS")
            show_message("success", appCommonJS.controlMessage.s_suc);
        else
            show_message("error", igd.make_err_msg(data));
        load_app_page(current_html, "init_" + current_html);

    });
}
function html_load_dmz(index) {
    //{"dmz_status":"0","host_ip":"0.0.0.0"}
    $("#dmz_detail_info_div").show();
    $("#dmz_info_list_div").hide();
    $("#title").html("WAN" + index);
    if (g_wan_num == 1) {
        $("#title").html("WAN口");
        $("#dmz_return").hide();
    }

    var uiname = "WAN" + index;
    $("#uiname").val(uiname);
    var parm = "uiname=" + $("#uiname").val();
    nos.app.net('./dmz_show.cgi', parm, function (data) {
        if (data) {
            //radio_sele_set("dmz_enable", data.dmz_status);
            radio_set(data.dmz_status,"dmz_status");
            dmz_change(data.dmz_status);
            $("#dmz_ip_address").val(data.host_ip);
            nos.app.resizePage();
        }
    });

}
function return_dmz_set() {
    $("#dmz_info_list_div").show();
    $("#dmz_detail_info_div").hide();
}

function init_dmz_set_table(num) {
    var parm = "uiname=" + "WAN" + num,btnStr=appHtml.openStatus;
    var state;
    nos.app.net('./dmz_show.cgi', parm, function (data) {
        if (data) {
            if (data.dmz_status == "1") {
                state = btnStr[0];
            }
            else {
                state = "<span style=\"color:red;\">"+btnStr[1]+"</span>";
            }
            $("#wan" + num + "_dmz_status").html(state);
            $("#wan" + num + "_dmz_ip").html(data.host_ip);
            nos.app.resizePage();
        }
    });
}
function check_in_out_count() {
    var dest_port_a = parentEmt.$("#dest_port_a").val();
    var dest_port_b = parentEmt.$("#dest_port_b").val();
    var src_port_a = parentEmt.$("#src_port_a").val();
    var src_port_b = parentEmt.$("#src_port_b").val();
    if ((dest_port_b == "" && src_port_b != "" && (src_port_b * 1 - src_port_a * 1) != 0) || (src_port_b == "" && dest_port_b != "" && (dest_port_b * 1 - dest_port_b * 1) != 0) || ((dest_port_b != "" && src_port_b != "") && (dest_port_b * 1 - dest_port_a * 1) != (src_port_b * 1 - src_port_a * 1))) {
        show_message("error", appHtml.controlMessage);
        return false;
    }
    return true;
}


//新增端口映射弹框
var port_map_pop_layer={
    create: function () {
        var html=appL.portmap.virtual.html,temp={},new_data=[];
        var pop_layer=parentEmt.$(".pop_layer");
        if(pop_layer.length>0){
            pop_layer.remove();
        }
        parentEmt.$("body").append("<div class='pop_layer' id='port_map_pop_layer'></div>");
        var compiled= _.template($("#pop_layer").html()),
            popHtml=compiled(html);
        parentEmt.$("#port_map_pop_layer").html(popHtml);
        parentEmt.$("#virtual_service_frm").on("submit", virtual_service_submit);
        parentEmt.$("#proto").on("change", function () {
            proto_user_sele($(this).val());
        });
        /* ======== by lwj ====== */
//        (function(){
            var dataPortModel = {};
            var destPortA = $("#dest_port_a",parentEmt.document);
            var destPortB = $("#dest_port_b",parentEmt.document);
            var srcPortA = $("#src_port_a",parentEmt.document);
            var srcPortB = $("#src_port_b",parentEmt.document);
            destPortA.val()===destPortB.val()?dataPortModel.isOut="single":dataPortModel.isOut="multiple";
            srcPortA.val()===srcPortB.val()?dataPortModel.isIn="single":dataPortModel.isIn="multiple";
            $("#dest_port_a,#src_port_a",parentEmt.document).one("change", function () {
                var _name = $(this).attr("name").split("_")[0];
                var reverserDom = $("input[name="+$(this).attr("name").replace("start","end")+"]",parentEmt.document);
                if(dataPortModel[_name]==="single"){
                    reverserDom.val($(this).val());
                }else{
                    reverserDom.val()>>0===65535&&reverserDom.val($(this).val());
                }
                reverserDom.val()===$(this).val()?dataPortModel[_name]="single":dataPortModel[_name]="multiple";
                $(this).on("change",function(){
                    if(dataPortModel[_name]!=="single"){
                        $(this).val()===reverserDom.val() && (dataPortModel[_name]="single");
                        return;
                    }
                    reverserDom.val($(this).val());
                });
            });
            $("#dest_port_b,#src_port_b",parentEmt.document).on("change", function () {
                var _name = $(this).attr("name").split("_")[0];
                var reverserDom = $("input[name="+$(this).attr("name").replace("end","start")+"]",parentEmt.document);
                $(this).val()===reverserDom.val()?dataPortModel[_name]="single":dataPortModel[_name]="multiple";
            });
    /*    })();*/
        /* ======== by lwj ====== */
    }

};
function new_increase(){
    port_map_pop_layer.create();
    parentEmt.show_pop_layer("port_map_pop_layer");
    init_user_sele_protocol("virtual");
}