var appHtml=appL.group_manager.js,current_tab_name = [
    {tab_title: appHtml.tabTitle[0], tab_id: "dns_group_tab"},
    {tab_title: appHtml.tabTitle[1], tab_id: "url_group_tab"},
    {tab_title: appHtml.tabTitle[2], tab_id: "mac_group_tab"},
    {tab_title: appHtml.tabTitle[3], tab_id: "ip_group_tab"},
    {tab_title: appHtml.tabTitle[4], tab_id: "time_group_tab"}
];
var reg_app_map = {
    dns_group_frm: [
        {id: "dns_group_name", type: "string"}
    ],
    url_group_frm: [
        {id: "url_group_name", type: "string"}
    ],
    mac_group_frm: [
        {id: "mac_group_name", type: "string"}
    ],
    ip_group_frm: [
        {id: "ip_group_name", type: "string"}
    ],
    time_group_frm: [
        {id: "time_group_name", type: "string"}
    ],
    noneed: []
}
$(document).ready(function () {
    init_tab();
    $("body").mousedown(function (event) {
        hide_msgbox();
    });
});

//-----------------------------------------------dns组
var dns_group_text_num = 200;
var dns_group_setup_data = {};
function init_dns_group() {
    init_app_language(appL.group_manager.dns_group);
    $("#dns_group_foot").find("span").eq(0).html("0");
    $("#dns_group_foot").find("span").eq(1).html(dns_group_text_num);
    nos.app.net('igd_group_show.cgi', 'group_type=0', paint_dns_group_tab);
}
function paint_dns_group_tab(data) {
    dns_group_setup_data = {};
    var len = data.length;
    var new_data = [];

    var index = 1;
    for (var i = 0; i < len; i++) {
        var tmp = {};

        tmp.index = index;
        tmp.name = data[i].name;
        tmp.dns = data[i].dns;

        new_data.push(tmp);

        dns_group_setup_data[index] = {};
        dns_group_setup_data[index] = data[i];


        index++;
    }
    var tab = new libTable(new Array("序列号", "名称", "DNS组内容", "操作"), new_data, 1, 10);
    var fun_arr = [
        {type: 'edit', name: 'dns_group_modify',str:'修改'},
        {type: 'del', name: 'dns_group_delete',str:'删除'}
    ];
    print_table("dns_group_list", tab, fun_arr, false);
    nos.app.resizePage();
}
function dns_group_modify(index) {
    var param = dns_group_setup_data[index];
    $("#save").html("修　改");
    $('#cancel').show();
    $('#deal').val('modify');
    $('#old_id').val(param.id);
    $('#dns_group_name').val(param.name);
    $("#dns_group_text").val(param.dns.replace(/,/g, "\n"));
    var text_count = parseInt(param.dns.split(",").length, 10);
    var text_left = dns_group_text_num - text_count;
    $("#dns_group_foot").find("span").eq(0).html(text_count);
    $("#dns_group_foot").find("span").eq(1).html(dns_group_text_num - text_count);
}

function dns_group_delete(index) {
    show_dialog("是否确定全部删除！", function () {
        var str = "";
        str += "id=" + dns_group_setup_data[index].id;
        str += "&action=2&group_type=0";
        nos.app.net('igd_group_set.cgi', str, dns_group_delete_callback);
    });
}
function dns_group_delete_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//dns列表验证   add  2014/5/7
function dns_group_check(str) {
    var dns_arr = new Array();
    var tmp_arr = str.replace(/[\r]/g, '').split("\n");
    for (var i in tmp_arr) {
        if ("" == tmp_arr[i]) {
            continue;
        } else {
            if ("" == tmp_arr[i] || check_char(tmp_arr[i]) != true) {
                show_message("error", "第" + (parseInt(i, 10) + 1) + "行" + check_char(tmp_arr[i]));
                return "err";
            }
            if (check_less32(tmp_arr[i]) != true) {
                show_message("error", "第" + (parseInt(i, 10) + 1) + "行" + check_less32(tmp_arr[i]));
                return "err";
            }
            dns_arr.push(tmp_arr[i]);
        }
    }

    if (dns_arr.length <= 0) {
        show_message("error", "DNS组名单不能为空！");
        return "err";
    }
    return dns_arr;
}
function dns_group_submit() {
    if (!check_app_input("dns_group_frm")) {
        return;
    }
    if (dns_group_check($("#dns_group_text").val()) == "err") {
        return;
    }

    var deal = $("#deal").val();
    if (deal == "add")
        $("#action").val("0");
    else
        $("#action").val("1");

    var str = $("#dns_group_text").val().replace(/ /g, "");
    var arr = str.replace(/\r\n/g, "\n").split("\n");
    var num = 0;
    var tmp_input_str = "";
    for (var i in arr) {
        if (arr[i] == "")
            continue;
        var nu = num + 1000;
        var key_name = (nu + "").substr(1);
        tmp_input_str += "<input name=\"" + key_name + "\" type=\"hidden\" value=\"" + arr[i] + "\"/>";
        num++;
    }
    tmp_input_str += "<input name=\"nr\" value=\"" + num + "\" type=\"hidden\"/>";
    tmp_input_str += "<input name=\"group_type\" value=\"0\" type=\"hidden\"/>";
    $("#action").after(tmp_input_str);

    nos.app.net('igd_group_set.cgi', 'dns_group_frm', dns_group_submit_callback);
}

function dns_group_submit_callback(data) {
    if (data == "SUCCESS") {
        show_message("success", "设置成功！");
    }
    else {
        show_message("error", igd.make_err_msg(data));
    }
    load_app_page(current_html, "init_" + current_html);
}

function count_dns_group_items(str) {
    var arr = str.split("\n");
    var len = arr.length;
    var null_count = 0;
    for (var i = 0; i < len; i++) {
        if (arr[i] == "")
            null_count++;
    }
    var cur_item = len - null_count;
    var left_item = dns_group_text_num - cur_item;
    $("#dns_group_foot").find("span").eq(0).html(cur_item);
    $("#dns_group_foot").find("span").eq(1).html(dns_group_text_num - cur_item);
}

function dns_group_del_all() {
    show_dialog("请确认是否要清空全部记录？", function () {
        nos.app.net('igd_group_set.cgi', 'action=3&group_type=0', dns_group_del_all_callback);
    })

}

function dns_group_del_all_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//-----------------------------------------------dns end

//-----------------------------------------------url组
var url_group_text_num = 200;
var url_group_setup_data = {};
function init_url_group() {
    init_app_language(appL.group_manager.url_group);
    $("#url_group_foot").find("span").eq(0).html("0");
    $("#url_group_foot").find("span").eq(1).html(url_group_text_num);
    nos.app.net('igd_group_show.cgi', 'group_type=1', paint_url_group_tab);
}
function paint_url_group_tab(data) {
    url_group_setup_data = {};
    var len = data.length;
    var new_data = [];

    var index = 1;
    for (var i = 0; i < len; i++) {
        var tmp = {};

        tmp.index = index;
        tmp.name = data[i].name;
        tmp.url = data[i].url;

        new_data.push(tmp);

        url_group_setup_data[index] = {};
        url_group_setup_data[index] = data[i];


        index++;
    }
    var tab = new libTable(new Array("序列号", "名称", "URL组内容", "操作"), new_data, 1, 10);
    var fun_arr = [
        {type: 'edit', name: 'url_group_modify',str:"修改"},
        {type: 'del', name: 'url_group_delete',str:'删除'}
    ];
    print_table("url_group_list", tab, fun_arr, false);
    nos.app.resizePage();
}

function url_group_modify(index) {
    var param = url_group_setup_data[index];
    $("#save").html("修　改");
    $('#cancel').show();
    $('#deal').val('modify');
    $('#old_id').val(param.id);
    $('#url_group_name').val(param.name);
    $("#url_group_text").val(param.url.replace(/,/g, "\n"));
    var text_count = parseInt(param.url.split(",").length, 10);
    var text_left = url_group_text_num - text_count;
    $("#url_group_foot").find("span").eq(0).html(text_count);
    $("#url_group_foot").find("span").eq(1).html(url_group_text_num - text_count);
}

function url_group_delete(index) {
    show_dialog('请确认是否要删除此条记录？', function () {
        var str = "";
        str += "id=" + url_group_setup_data[index].id;
        str += "&action=2&group_type=1";
        nos.app.net('igd_group_set.cgi', str, url_group_delete_callback);

    })
}

function url_group_delete_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//url列表验证   add  2014/5/7
function url_group_check(str) {
    var url_arr = new Array();
    var tmp_arr = str.replace(/[\r]/g, '').split("\n");
    /* var null_num = 0;*/
    for (var i in tmp_arr) {
        if ("" == tmp_arr[i]) {
            /* null_num++;*/     // 空白行数
            continue;
        } else {
            if ("" == tmp_arr[i] || check_char(tmp_arr[i]) != true) {
                show_message("error", "第" + (parseInt(i, 10) + 1) + "行" + check_char(tmp_arr[i]));
                return "err";
            }
            if (check_less64(tmp_arr[i]) != true) {
                show_message("error", "第" + (parseInt(i, 10) + 1) + "行" + check_less64(tmp_arr[i]));
                return "err";
            }
            url_arr.push(tmp_arr[i]);
        }
    }
    if (url_arr.length <= 0) {
        show_message("error", "URL组名单不能为空！");
        return "err";
    }
    return url_arr;
}
function url_group_submit() {
    if (!check_app_input("url_group_frm")) {
        return;
    }
    if (url_group_check($("#url_group_text").val()) == "err") {
        return;
    }

    var deal = $("#deal").val();
    if (deal == "add")
        $("#action").val("0");
    else
        $("#action").val("1");

    var str = $("#url_group_text").val().replace(/ /g, "");
    var arr = str.replace(/\r\n/g, "\n").split("\n");
    var num = 0;
    var tmp_input_str = "";
    for (var i in arr) {
        if (arr[i] == "") {
            continue;
        }
        var nu = num + 1000;
        var key_name = (nu + "").substr(1);
        tmp_input_str += "<input name=\"" + key_name + "\" type=\"hidden\" value=\"" + arr[i] + "\"/>";
        num++;
    }
    tmp_input_str += "<input name=\"nr\" value=\"" + num + "\" type=\"hidden\"/>";
    tmp_input_str += "<input name=\"group_type\" value=\"1\" type=\"hidden\"/>";
    $("#action").after(tmp_input_str);

    nos.app.net('igd_group_set.cgi', 'url_group_frm', url_group_submit_callback);
}

function url_group_submit_callback(data) {
    if (data == "SUCCESS") {
        show_message("success", "设置成功！");
    }
    else {
        show_message("error", igd.make_err_msg(data));
    }
    load_app_page(current_html, "init_" + current_html);
}

function count_url_group_items(str) {
    var arr = str.split("\n");
    var len = arr.length;
    var null_count = 0;
    for (var i = 0; i < len; i++) {
        if (arr[i] == "")
            null_count++;
    }
    var cur_item = len - null_count;
    var left_item = url_group_text_num - cur_item;
    $("#url_group_foot").find("span").eq(0).html(cur_item);
    $("#url_group_foot").find("span").eq(1).html(url_group_text_num - cur_item);
}

function url_group_del_all() {
    show_dialog('请确认是否要删除此条记录？', function () {
        nos.app.net('igd_group_set.cgi', 'action=3&group_type=1', url_group_del_all_callback);
    })
}

function url_group_del_all_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//------------------------------------------url end

//-----------------------------------------mac用户组
var mac_group_text_num = 200;
var mac_group_setup_data = {};
var check_mac_name_data = new Array();
function init_mac_group() {
    init_app_language(appL.group_manager.mac_group);
    $("#mac_group_foot").find("span").eq(0).html("0");
    $("#mac_group_foot").find("span").eq(1).html(mac_group_text_num);
    nos.app.net('igd_group_show.cgi', 'group_type=3', paint_mac_group_tab);
    nos.app.net('igd_group_show.cgi', 'group_type=2', check_mac_name_callback);
}
function check_mac_name_callback(data) {
    check_mac_name_data = data;
}
function paint_mac_group_tab(data) {
    mac_group_setup_data = {};
    var len = data.length;
    var new_data = [];

    var index = 1;
    for (var i = 0; i < len; i++) {
        var tmp = {};

        tmp.index = index;
        tmp.name = data[i].name;
        tmp.mac = data[i].mac;

        new_data.push(tmp);

        mac_group_setup_data[index] = {};
        mac_group_setup_data[index] = data[i];


        index++;
    }
    var tab = new libTable(new Array("序列号", "名称", "MAC用户组内容", "操作"), new_data, 1, 10);
    var fun_arr = [
        {type: 'edit', name: 'mac_group_modify',str:'修改'},
        {type: 'del', name: 'mac_group_delete',str:'删除'}
    ];
    print_table("mac_group_list", tab, fun_arr, false);
    nos.app.resizePage();
}

function mac_group_modify(index) {
    var param = mac_group_setup_data[index];
    $("#save").html("修　改");
    $('#cancel').show();
    $('#deal').val('modify');
    $('#old_id').val(param.id);
    $('#mac_group_name').val(param.name);
    $("#mac_group_text").val(param.mac.replace(/,/g, "\n"));
    var text_count = parseInt(param.mac.split(",").length, 10);
    var text_left = mac_group_text_num - text_count;
    $("#mac_group_foot").find("span").eq(0).html(text_count);
    $("#mac_group_foot").find("span").eq(1).html(mac_group_text_num - text_count);
}

function mac_group_delete(index) {
    show_dialog('请确认是否要删除此条记录？',function(){
        var str = "";
        str += "id=" + mac_group_setup_data[index].id;
        str += "&action=2&group_type=3";
        nos.app.net('igd_group_set.cgi', str, mac_group_delete_callback);
    })
}

function mac_group_delete_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//mac列表验证
function mac_group_check(str) {
    var mac_arr = new Array();
    var tmp_arr = str.replace(/[\r]/g, '').split("\n");
    for (var i in tmp_arr) {
        if ("" == tmp_arr[i])
            continue;
        else {
            if ("" == tmp_arr[i] || parentEmt.check_mac(tmp_arr[i]) != true) {
                show_message("error", "第" + (parseInt(i, 10) + 1) + "行" + check_mac(tmp_arr[i]));
                return "err";
            }
            mac_arr.push(tmp_arr[i]);
        }
    }
    if (mac_arr.length <= 0) {
        show_message("error", "MAC用户组名单不能为空！");
        return "err";
    }
    return mac_arr;
}
// mac/ip 名称验证， 不能相等  相等为 false 不等为 true
function check_mac_name(iptval) {
    var len = check_mac_name_data.length;
    var name;
    for (var i = 0; i < len; i++) {
        name = check_mac_name_data[i].name;
        if (name == iptval) {
            return false;
        }
    }
    return true;
}
function mac_group_submit() {
    if (!check_app_input("mac_group_frm")) {
        return;
    }
    if (mac_group_check($("#mac_group_text").val()) == "err") {
        return;
    }

    var iptName = $("#mac_group_name").val();
    iptName = $.trim(iptName);
    if (check_mac_name(iptName) == false) {
        show_message("error", "已存在相同的MAC或IP用户组名!");
        return;
    }

    var deal = $("#deal").val();
    if (deal == "add")
        $("#action").val("0");
    else
        $("#action").val("1");

    var str = $("#mac_group_text").val().replace(/ /g, "");
    var arr = str.replace(/\r\n/g, "\n").split("\n");
    var num = 0;
    var tmp_input_str = "";
    for (var i in arr) {
        if (arr[i] == "")
            continue;
        var nu = num + 1000;
        var key_name = (nu + "").substr(1);
        tmp_input_str += "<input name=\"" + key_name + "\" type=\"hidden\" value=\"" + arr[i] + "\"/>";
        num++;
    }
    tmp_input_str += "<input name=\"nr\" value=\"" + num + "\" type=\"hidden\"/>";
    tmp_input_str += "<input name=\"group_type\" value=\"3\" type=\"hidden\"/>";
    $("#action").after(tmp_input_str);

    nos.app.net('igd_group_set.cgi', 'mac_group_frm', mac_group_submit_callback);
}

function mac_group_submit_callback(data) {
    if (data == "SUCCESS") {
        show_message("success", "设置成功！");
    }
    else {
        show_message("error", igd.make_err_msg(data));
    }
    load_app_page(current_html, "init_" + current_html);
}

function count_mac_group_items(str) {
    var arr = str.split("\n");
    var len = arr.length;
    var null_count = 0;
    for (var i = 0; i < len; i++) {
        if (arr[i] == "")
            null_count++;
    }
    var cur_item = len - null_count;
    var left_item = mac_group_text_num - cur_item;
    $("#mac_group_foot").find("span").eq(0).html(cur_item);
    $("#mac_group_foot").find("span").eq(1).html(mac_group_text_num - cur_item);
}

function mac_group_del_all() {
    show_dialog("请确认是否要清空全部记录？",function(){
        nos.app.net('igd_group_set.cgi', 'action=3&group_type=3', mac_group_del_all_callback);
    });

}

function mac_group_del_all_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//-----------------------------------mac用户组 end
//------------------------------------ip用户组
var ip_group_text_num = 100;
var ip_group_setup_data = {};
var check_ip_name_data = new Array();
function init_ip_group() {
    init_app_language(appL.group_manager.ip_group);
    $("#ip_group_foot").find("span").eq(0).html("0");
    $("#ip_group_foot").find("span").eq(1).html(ip_group_text_num);
    nos.app.net('igd_group_show.cgi', 'group_type=2', paint_ip_group_tab);
    nos.app.net('igd_group_show.cgi', 'group_type=3', check_ip_name_callback);
}
function check_ip_name_callback(data) {
    check_ip_name_data = data;
}
function paint_ip_group_tab(data) {
    ip_group_setup_data = {};
    var len = data.length;
    var new_data = [];

    var index = 1;
    for (var i = 0; i < len; i++) {
        var tmp = {};

        tmp.index = index;
        tmp.name = data[i].name;
        var temp_ip_range = data[i].ip_range;
        var temp_len = temp_ip_range.length;
        var temp_str = "";
        for (var j = 0; j < temp_len; j++) {
            var start = temp_ip_range[j].start;
            var end = temp_ip_range[j].end
            if (start == end) {
                temp_str += start + ',';
            } else {
                temp_str += start + "-" + end + ',';
            }

        }
        temp_str = temp_str.slice(0, -1);
        tmp.ip_range = temp_str;
        new_data.push(tmp);

        ip_group_setup_data[index] = {};
        ip_group_setup_data[index] = data[i];


        index++;
    }
    var tab = new libTable(new Array("序列号", "名称", "IP用户组内容", "操作"), new_data, 1, 10);
    var fun_arr = [
        {type: 'edit', name: 'ip_group_modify',str:'修改'},
        {type: 'del', name: 'ip_group_delete',str:'删除'}
    ];
    print_table("ip_group_list", tab, fun_arr, false);
    nos.app.resizePage();
}

function ip_group_modify(index) {
    var param = ip_group_setup_data[index];
    $("#save").html("修　改");
    $('#cancel').show();
    $('#deal').val('modify');
    $('#old_id').val(param.id);
    $('#ip_group_name').val(param.name);
    var temp_ip_range = param.ip_range;
    var temp_len = temp_ip_range.length;
    var temp_ip_range_str = "";
    for (var i = 0; i < temp_len; i++) {
        var start = temp_ip_range[i].start;
        var end = temp_ip_range[i].end;
        if (start == end) {
            temp_ip_range_str += start + ",";
        } else {
            temp_ip_range_str += start + '-' + end + ",";
        }
    }
    $("#ip_group_text").val(temp_ip_range_str.replace(/,/g, "\n"));
    var text_count = parseInt(temp_len, 10);

    var text_left = ip_group_text_num - text_count;
    $("#ip_group_foot").find("span").eq(0).html(text_count);
    $("#ip_group_foot").find("span").eq(1).html(ip_group_text_num - text_count);
}

function ip_group_delete(index) {
    show_dialog('请确认是否要删除此条记录？',function(){
        var str = "";
        str += "id=" + ip_group_setup_data[index].id;
        str += "&action=2&group_type=2";
        nos.app.net('igd_group_set.cgi', str, ip_group_delete_callback);

    })
}

function ip_group_delete_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//IP列表验证
function ip_group_check(str) {
    var ip_arr = new Array();
    var tmp_arr = str.replace(/[\r]/g, '').split("\n");

    for (var i in tmp_arr) {
        if ("" == tmp_arr[i]) {
            continue;
        } else {
            var tmp_arr2 = tmp_arr[i].split('-');
            var tmp_arr2_len = tmp_arr2.length;
            if (tmp_arr2_len != 2 && tmp_arr2_len != 1) {
                show_message("error", "格式不正确，请重新输入！(例如：192.168.1.1-192.168.1.2或192.168.1.1)");
                return "err";
            } else {
                if (tmp_arr2_len == 2) {
                    if (parentEmt.check_ip(tmp_arr2[0]) != true) {
                        show_message("error", parentEmt.check_ip(tmp_arr2[0]) + "[第" + (parseInt(i, 10) + 1) + "行第1个IP]");
                        return "err";
                    }
                    if (parentEmt.check_ip(tmp_arr2[1]) != true) {
                        show_message("error", parentEmt.check_ip(tmp_arr2[1]) + "[第" + (parseInt(i, 10) + 1) + "行第2个IP]");
                        return "err";
                    }
                    if (parentEmt.check_start_end_ip(tmp_arr2[0], tmp_arr2[1]) != true) {
                        show_message("error", check_start_end_ip(tmp_arr2[0], tmp_arr2[1]) + "[第" + (parseInt(i, 10) + 1) + "行]");
                        return "err";
                    }
                }
                if (tmp_arr2_len == 1) {
                    if (parentEmt.check_ip(tmp_arr2[0]) != true) {
                        show_message("error", parentEmt.check_ip(tmp_arr2[0]) + "[第" + (parseInt(i, 10) + 1) + "行]");
                        return "err";
                    }
                }

                ip_arr.push(tmp_arr[i]);
            }

        }
    }
    if (ip_arr.length <= 0) {
        show_message("error", "IP用户组名单不能为空！");
        return "err";
    }
    return ip_arr;
}
// mac/ip 名称验证， 不能相等  相等为 false 不等为 true
function check_ip_name(iptval) {
    var len = check_ip_name_data.length;
    var name;
    for (var i = 0; i < len; i++) {
        name = check_ip_name_data[i].name;
        if (name == iptval) {
            return false;
        }
    }
    return true;
}

function ip_group_submit() {
    if (!check_app_input("ip_group_frm")) {
        return;
    }
    if (ip_group_check($("#ip_group_text").val()) == "err") {
        return;
    }

    var iptName = $("#ip_group_name").val();
    iptName = $.trim(iptName);
    if (check_ip_name(iptName) == false) {
        show_message("error", "已存在相同的MAC或IP用户组名!");
        return;
    }

    var deal = $("#deal").val();
    if (deal == "add")
        $("#action").val("0");
    else
        $("#action").val("1");

    var str = $("#ip_group_text").val().replace(/ /g, "");
    var arr = str.replace(/\r\n/g, "\n").split("\n");
    var num = 0;
    var tmp_input_str = "";
    for (var i in arr) {
        if (arr[i] == "") {
            continue;
        }
        var tmp_arr = arr[i].split('-');
        var tmp_len = tmp_arr.length;
        if (tmp_len == 2) {
            tmp_input_str += "<input name=\"ip" + i + "\" value=\"" + tmp_arr[0] + "\" type=\"hidden\"/>";
            tmp_input_str += "<input name=\"mask" + i + "\" value=\"" + tmp_arr[1] + "\" type=\"hidden\"/>";
        }
        if (tmp_len == 1) {
            tmp_input_str += "<input name=\"ip" + i + "\" value=\"" + tmp_arr[0] + "\" type=\"hidden\"/>";
            tmp_input_str += "<input name=\"mask" + i + "\" value=\"" + tmp_arr[0] + "\" type=\"hidden\"/>";
        }
        num++;
    }
    tmp_input_str += "<input name=\"nr\" value=\"" + num + "\" type=\"hidden\"/>";
    tmp_input_str += "<input name=\"group_type\" value=\"2\" type=\"hidden\"/>";
    $("#action").after(tmp_input_str);

    nos.app.net('igd_group_set.cgi', 'ip_group_frm', ip_group_submit_callback);
}

function ip_group_submit_callback(data) {
    if (data == "SUCCESS") {
        show_message("success", "设置成功！");
    }
    else {
        show_message("error", igd.make_err_msg(data));
    }
    load_app_page(current_html, "init_" + current_html);
}

function count_ip_group_items(str) {
    var arr = str.split("\n");
    var len = arr.length;
    var null_count = 0;
    for (var i = 0; i < len; i++) {
        if (arr[i] == "")
            null_count++;
    }
    var cur_item = len - null_count;
    var left_item = ip_group_text_num - cur_item;
    $("#ip_group_foot").find("span").eq(0).html(cur_item);
    $("#ip_group_foot").find("span").eq(1).html(ip_group_text_num - cur_item);
}

function ip_group_del_all() {
    show_dialog('请确认是否要清空全部记录？',function(){
        nos.app.net('igd_group_set.cgi', 'action=3&group_type=2', ip_group_del_all_callback);
    })

}

function ip_group_del_all_callback(data) {
    if (data == "SUCCESS")
        show_message("success", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
//-----------------------------------ip用户组 end

//----------------------------------时间组
var time_group_setup_data = {};
function init_time_group() {
    init_app_language(appL.group_manager.time_group);
    nos.app.net('igd_group_show.cgi', 'group_type=4', paint_time_group_tab);
    set_time_set_type(0);
}
function paint_time_group_tab(data) {
    var len = data.length;
    var new_data = [];

    var index = 1;
    for (var i = 0; i < len; i++) {
        var tmp = {};

        tmp.index = index;
        tmp.name = data[i].name;
        tmp.time = print_time_arr(data[i].time_type, data[i].time);
        new_data.push(tmp);

        time_group_setup_data[index] = {};
        time_group_setup_data[index] = data[i];


        index++;
    }
    var tab = new libTable(new Array("序列号", "名称", "时间段", "操作"), new_data, 1, 10);
    var fun_arr = [
        {type: 'edit', name: 'time_group_modify',str:'修改'},
        {type: 'del', name: 'time_group_delete',str:'删除'}
    ];
    print_table("time_group_list", tab, fun_arr, false);
    nos.app.resizePage();
}
var time_data_index;
function time_group_modify(index) {
    time_data_index = index;
    var param = time_group_setup_data[index];
    $("#save").html("修　改");
    $('#cancel').show();
    $('#deal').val('modify');
    $('#old_id').val(param.id);
    $('#time_group_name').val(param.name);
    var time_type = param.time_type;
    var nr = param.time.length;
    if (time_type == "0") {
        timeNr.week_nr = nr;
    } else if (time_type == "1") {
        timeNr.day_nr = nr;
    } else if (time_type == "2") {
        timeNr.mouth_nr = nr;
    }
    radio_sele_set("time_type", param.time_type, set_time_set_type);
    set_time_list(param);
}
function set_time_list(user_time) {
    var time_type = user_time.time_type;
    var nr = user_time.time.length;
    var day, h_start, h_end, m_start, m_end, s_year, s_month, s_day, e_year, e_month, e_day;
    var box_arr;
    var temp_canclader_s, temp_canclader_e, smonth, sday, emonth, eday;
    for (var i = 0; i < nr; i++) {
        day = user_time.time[i].day;
        h_start = user_time.time[i].h_start;
        h_end = user_time.time[i].h_end;
        m_start = user_time.time[i].m_start;
        m_end = user_time.time[i].m_end;
        s_year = user_time.time[i].s_year;
        s_month = user_time.time[i].s_month;
        s_day = user_time.time[i].s_day;
        e_year = user_time.time[i].e_year;
        e_month = user_time.time[i].e_month;
        e_day = user_time.time[i].e_day;

        if (time_type == "0") {
            box_arr = $("#time_type_0_" + (i + 1) + " .week_wrap input");
            set_week_box_arr(box_arr, day);
            if (!(0 == h_start && 0 == m_start && 23 == h_end && 59 == m_end)) {
                $("#start_hour" + i).val(h_start);
                $("#end_hour" + i).val(h_end);
                $("#start_minute" + i).val(m_start);
                $("#end_minute" + i).val(m_end);
            }
        } else if (time_type == "1") {
            smonth = s_month > 9 ? s_month : "0" + s_month;
            sday = s_day > 9 ? s_day : "0" + s_day;
            temp_canclader_s = s_year + "-" + smonth + "-" + sday;

            $("#start_calendar_" + (i + 1)).val(temp_canclader_s);

            emonth = e_month > 9 ? e_month : "0" + e_month;
            eday = e_day > 9 ? e_day : "0" + e_day;
            temp_canclader_e = e_year + "-" + emonth + "-" + eday;
            $("#end_calendar_" + (i + 1)).val(temp_canclader_e);

            if (!(0 == h_start && 0 == m_start && 23 == h_end && 59 == m_end)) {
                $("#start_hour_" + (i + 1)).val(h_start);
                $("#end_hour_" + (i + 1)).val(h_end);
                $("#start_minute_" + (i + 1)).val(m_start);
                $("#end_minute_" + (i + 1)).val(m_end);
            }

        } else if (time_type == "2") {
            box_arr = $("#time_type_2_" + (i + 1) + " .mouth_wrap input");
            set_month_box_arr(box_arr, day);
            if (!(0 == h_start && 0 == m_start && 23 == h_end && 59 == m_end)) {
                $("#start_hour" + i).val(h_start);
                $("#end_hour" + i).val(h_end);
                $("#start_minute" + i).val(m_start);
                $("#end_minute" + i).val(m_end);
            }
        }
    }

}
function set_week_box_arr(box_arr, day) {
    var check_value = day;
    var val = check_value.substring(0, 1);
    box_arr[6].value = val;
    if ("1" == val) {
        box_arr[6].checked = true;
    } else {
        box_arr[6].checked = false;
    }
    for (var i = 0; i < 6; i++) {
        val = check_value.substring(i + 1, i + 2);
        box_arr[i].value = val;
        if (val == "1") {
            box_arr[i].checked = true;
        } else {
            box_arr[i].checked = false;
        }
    }
}
function set_month_box_arr(box_arr, day) {
    var check_value = day;
    for (var i = 0; i < 31; i++) {
        var val = check_value.substring(i, i + 1);
        box_arr[i].value = val;
        if (val == "1") {
            box_arr[i].checked = true;
        } else {
            box_arr[i].checked = false;
        }
    }
}
function time_group_delete(index) {
    show_dialog('请确认是否要删除此条记录？',function(){
        var str = "";
        str += "id=" + time_group_setup_data[index].id;
        str += "&action=2&group_type=4";
        nos.app.net('igd_group_set.cgi', str, ip_group_delete_callback);

    })
}

function time_group_del_all() {
    show_dialog('请确认是否要清空全部记录？',function(){
        nos.app.net('igd_group_set.cgi', 'action=3&group_type=4', time_group_del_all_callback);
    })

}

function time_group_del_all_callback(data) {
    if (data == "SUCCESS")
        show_message("error", "删除成功！");
    else
        show_message("error", igd.make_err_msg(data));
    load_app_page(current_html, "init_" + current_html);
}
function print_time_arr(type, time) {
    var str = "";
    for (var i in time) {
        if (i > 0)str += ";";
        if (type == "0") {
            str += format_day_string(time[i].day);
            if (!(0 == time[i].h_start && 0 == time[i].m_start && 23 == time[i].h_end && 59 == time[i].m_end)) {
                str += " (" + format_number(time[i].h_start) + ":" + format_number(time[i].m_start) + "-" + format_number(time[i].h_end) + ":" + format_number(time[i].m_end) + ")";
            }
        }
        if (type == "1") {
            str += time[i].s_year + "-" + time[i].s_month + "-" + time[i].s_day;
            if (!(0 == time[i].h_start && 0 == time[i].m_start )) {
                str += "(" + format_number(time[i].h_start) + ":" + format_number(time[i].m_start) + ")";
            }
            str += "-" + time[i].e_year + "-" + time[i].e_month + "-" + time[i].e_day;
            if (!( 23 == time[i].h_end && 59 == time[i].m_end)) {
                str += "(" + format_number(time[i].h_end) + ":" + format_number(time[i].m_end) + ")";
            }
        }
        if (type == "2") {
            str += format_num_string(time[i].day);
            if (!(0 == time[i].h_start && 0 == time[i].m_start && 23 == time[i].h_end && 59 == time[i].m_end)) {
                str += " (" + format_number(time[i].h_start) + ":" + format_number(time[i].m_start) + "-" + format_number(time[i].h_end) + ":" + format_number(time[i].m_end) + ")";
            }
        }
    }
    return str;
}
function format_day_string(time_str) {
    //  接收到的是1111111  日123456
    time_str = time_str.substring(1, 7) + time_str.substring(0, 1);
    var str = "星期";
    var day_table = ["一", "二", "三", "四", "五", "六", "日"];
    for (var i = 0; i < 7; i++) {
        var item = time_str.substring(i, i + 1);
        if (1 == item) {
            str += day_table[i] + ",";
        }
    }
    return str.slice(0, -1);
}
function format_num_string(time_str) {
    var str = "每月";
    for (var i = 0; i < 31; i++) {
        var item = time_str.substring(i, i + 1);
        if (1 == item) {
            str += (i + 1) + "号,";
        }
    }
    return str.slice(0, -1);
}
// 复选框 选择事件
function change_val(sel, sel_val) {
    if (sel_val == "0")
        sel.value = '1';
    else
        sel.value = '0';
}

function set_time_set_type(type) {

    $("#time_set_type").val(type);
    $("#time_wrap").empty();
    var nr;
    var deal = $("#deal").val();  // 判断是增加 还是修改
    if (type == "0") {
        if (deal == "add") {
            timeNr.week_nr = 1;
        }
        nr = timeNr.week_nr;
        for (var i = 1; i <= nr; i++) {
            print_week(i);
            set_add_time_quantum("0");
        }

        if (deal == "modify") {
            var param = time_group_setup_data[time_data_index];
            if (param.time_type == "0") {
                set_time_list(param);
            }
        }
    } else if (type == "1") {
        if (deal == "add") {
            timeNr.day_nr = 1;
        }
        nr = timeNr.day_nr;
        for (var j = 1; j <= nr; j++) {
            print_date(j);
            set_add_time_quantum("1");
        }
        if (deal == "modify") {
            var param = time_group_setup_data[time_data_index];
            if (param.time_type == "1") {
                set_time_list(param);
            }
        }

    } else if (type == "2") {
        if (deal == "add") {
            timeNr.mouth_nr = 1;
        }
        nr = timeNr.mouth_nr;
        for (var k = 1; k <= nr; k++) {
            print_mouth(k);
            set_add_time_quantum("2");
        }
        if (deal == "modify") {
            var param = time_group_setup_data[time_data_index];
            if (param.time_type == "2") {
                set_time_list(param);
            }
        }
    }
    nos.app.resizePage();
}

function time_group_submit() {

    var type = $("#time_set_type").val();

    if (!check_app_input("time_group_frm")) {
        return;
    }
    if (!check_time_group(type)) {
        return;
    }

    if (type == "0") {
        get_week_config_val(timeNr.week_nr);

    } else if (type == "1") {

        get_day_config_val(timeNr.day_nr);

    } else if (type == "2") {

        get_month_config_val(timeNr.mouth_nr);
    }

    var deal = $("#deal").val();
    if (deal == "add") {
        $("#action").val("0");
    } else {
        $("#action").val("1");
    }

    var tmp_input_str = "";
    tmp_input_str += "<input name=\"group_type\" value=\"4\" type=\"hidden\"/>";
    $("#action").after(tmp_input_str);

    nos.app.net('igd_group_set.cgi', 'time_group_frm', time_group_submit_callback);

}
function time_group_submit_callback(data) {
    if (data == "SUCCESS") {
        show_message("success", "设置成功！");
    }
    else {
        show_message("error", igd.make_err_msg(data));
    }
    load_app_page(current_html, "init_" + current_html);
}

function check_time_group(type) { //分别检测  周、日、月设置是否符合要求
    var box_arr = "";
    var cmp_str = "";
    var check_value;
    var h_start, h_end, m_start, m_end, nr;
    if (type == "0") {//按周设置
        nr = timeNr.week_nr;
        for (var i = 0; i < nr; i++) {
            box_arr = $("#time_type_0_" + (i + 1) + " .week_wrap input");
            cmp_str = "0000000";
            check_value = "";
            for (var ii = 0; ii < box_arr.length; ii++) {
                check_value += box_arr[ii].value;
            }
            if (check_value == cmp_str) {
                show_message("error", "请设置正确的时间段！");
                return false;
            }
            h_start = $("#start_hour" + i).val();
            h_end = $("#end_hour" + i).val();
            m_start = $("#start_minute" + i).val();
            m_end = $("#end_minute" + i).val();
            if (!("" == h_start && "" == h_end && "" == m_start && "" == m_end)) {
                if (!get_msgbox("start_hour" + i, "hour") || !get_msgbox("end_hour" + i, "hour") || !get_msgbox("start_minute" + i, "minute") || !get_msgbox("end_minute" + i, "minute")) {
                    return false;
                }
            }
        }
    } else if (type == "1") {//按日期设置
        nr = timeNr.day_nr;
        for (var k = 0; k < nr; k++) {
            h_start = $("#start_hour_" + (k + 1)).val();
            h_end = $("#end_hour" + (k + 1)).val();
            m_start = $("#start_minute" + (k + 1)).val();
            m_end = $("#end_minute" + (k + 1)).val();
            if (!get_msgbox("start_calendar_" + (k + 1), "calendar")) {
                return false;
            }
            if (!get_msgbox("end_calendar_" + (k + 1), "calendar")) {
                return false;
            }
            if (!("" == h_start && "" == h_end && "" == m_start && "" == m_end)) {
                if (!get_msgbox("start_hour_" + (k + 1), "hour") || !get_msgbox("end_hour_" + (k + 1), "hour") || !get_msgbox("start_minute_" + (k + 1), "minute") || !get_msgbox("end_minute_" + (k + 1), "minute")) {
                    return false;
                }
            }
        }
    } else if (type == "2") {//按月设置
        nr = timeNr.mouth_nr;
        for (var j = 0; j < nr; j++) {
            box_arr = $("#time_type_2_" + (j + 1) + " .mouth_wrap input");
            cmp_str = "0000000000000000000000000000000";
            check_value = "";
            for (var jj = 0; jj < box_arr.length; jj++) {
                check_value += box_arr[jj].value;
            }
            if (check_value == cmp_str) {
                show_message("error", "请设置正确的时间段！");
                return false;
            }
            h_start = $("#start_hour" + j).val();
            h_end = $("#end_hour" + j).val();
            m_start = $("#start_minute" + j).val();
            m_end = $("#end_minute" + j).val();
            if (!("" == h_start && "" == h_end && "" == m_start && "" == m_end)) {
                if (!get_msgbox("start_hour" + j, "hour") || !get_msgbox("end_hour" + j, "hour") || !get_msgbox("start_minute" + j, "minute") || !get_msgbox("end_minute" + j, "minute")) {
                    return false;
                }
            }
        }
    }
    return true;
}

function get_week_config_val(nr) { // 得到按周设置的参数
    var nr = parseInt(nr);
    var box_arr, check_value;
    var dom_str = "";
    for (var i = 0; i < nr; i++) {
        box_arr = $("#time_type_0_" + (i + 1) + " .week_wrap input");
        check_value = "";
        check_value = box_arr[6].value;   // 得到星期天的值
        for (var j = 0; j < 6; j++) {
            check_value += box_arr[j].value;
        }
        dom_str += "<input type='hidden' name='day" + i + "' value='" + check_value + "' /> ";
    }
    dom_str += "<input type='hidden' name='nr' value='" + nr + "' />";

    $("#time_wrap").append(dom_str);
}
function get_month_config_val(nr) { // 得到按月设置的参数
    var nr = parseInt(nr);
    var box_arr, check_value;
    var dom_str = "";
    for (var i = 0; i < nr; i++) {
        box_arr = $("#time_type_2_" + (i + 1) + " .mouth_wrap input");
        check_value = "";
        for (var j = 0; j < 31; j++) {
            check_value += box_arr[j].value;
        }
        dom_str += "<input type='hidden' name='day" + i + "' value='" + check_value + "' /> ";
    }
    dom_str += "<input type='hidden' name='nr' value='" + nr + "' />";

    $("#time_wrap").append(dom_str);
}
function get_day_config_val(nr) {  //设置 日期
    var nr = parseInt(nr);
    var start_calendar, end_calendar;
    var s_year, s_month, s_day, e_year, e_month, e_day;
    var dom_str = "";
    for (var i = 0; i < nr; i++) {
        start_calendar = $("#start_calendar_" + (i + 1)).val();
        end_calendar = $("#end_calendar_" + (i + 1)).val();
        s_year = start_calendar.split("-")[0];
        s_month = start_calendar.split("-")[1];
        s_day = start_calendar.split("-")[2];
        e_year = end_calendar.split("-")[0];
        e_month = end_calendar.split("-")[1];
        e_day = end_calendar.split("-")[2];
        dom_str += "<input type='hidden' name='s_year" + i + "' value='" + s_year + "'/>";
        dom_str += "<input type='hidden' name='s_month" + i + "' value='" + s_month + "'/>";
        dom_str += "<input type='hidden' name='s_day" + i + "' value='" + s_day + "'/>";
        dom_str += "<input type='hidden' name='e_year" + i + "' value='" + e_year + "'/>";
        dom_str += "<input type='hidden' name='e_month" + i + "' value='" + e_month + "'/>";
        dom_str += "<input type='hidden' name='e_day" + i + "' value='" + e_day + "'/>";
    }
    dom_str += "<input type='hidden' name='nr' value='" + nr + "' />";

    $("#time_wrap").append(dom_str);
}
//添加时间段
var timeNr = {
    week_nr: "1",
    day_nr: "1",
    mouth_nr: "1"
};
function add_time_quantum() {
    var nr;
    var time_type = $("#time_set_type").val();
    var deal = $("#deal").val();  // 判断是正常情况下添加时间段 还是修改时候添加时间段
    if (time_type == "0") {      //添加 -- 周设置
        nr = parseInt(timeNr.week_nr);
        nr++;
        timeNr.week_nr++;
        if (nr > 10) {
            show_message("error", "最多添加10个时间段！");
            timeNr.week_nr = 10;
            return;
        }
        print_week(nr);
        set_add_time_quantum("0");
    } else if (time_type == "1") {  //  添加 --  日期设置
        nr = parseInt(timeNr.day_nr);
        nr++;
        timeNr.day_nr++;
        if (nr > 10) {
            show_message("error", "最多添加10个时间段！");
            timeNr.day_nr = 10;
            return;
        }
        print_date(nr);
        set_add_time_quantum("1");
    } else if (time_type == "2") {
        nr = parseInt(timeNr.mouth_nr);
        nr++;
        timeNr.mouth_nr++;
        if (nr > 10) {
            show_message("error", "最多添加10个时间段！");
            timeNr.mouth_nr = 10;
            return;
        }
        print_mouth(nr);
        set_add_time_quantum("2");
    }
    nos.app.resizePage();
}
//让最新添加的时间段可以删除
function set_add_time_quantum(type) {
    var len = $("#time_wrap div[id^='time_type_" + type + "_']").length;
    if (len > 1) {
        $("#delTimeQuantum_" + (len - 1)).hide();
        $("#delTimeQuantum_" + len).show();
    } else {
        $("#delTimeQuantum_1").hide();
    }
}
//删除该时间段
function del_time_quantum(obj, type) {
    var idstr = $(obj).attr("id");
    var no = idstr.split("_")[1];
    $("#time_type_" + type + "_" + no).remove();

    var len = parseInt(no) - 1;
    if (len > 1) {
        $("#delTimeQuantum_" + len).show();
    }
    if (type == "0") {
        timeNr.week_nr--;
    } else if (type == "1") {
        timeNr.day_nr--;
    } else if (type == "2") {
        timeNr.mouth_nr--;
    }
}
function refreshPage() {
    timeNr.week_nr = 1;
    timeNr.day_nr = 1;
    timeNr.mouth_nr = 1;
    load_app_page(current_html, 'init_' + current_html);
}
function print_week(nr) {
    var tmp_nr = parseInt(nr) - 1;
    var time_dom_str = "";
    time_dom_str += '<div id="time_type_0_' + nr + '">' +
        '<span class="del_time_wrap">时间段' + nr + '<img src="images/del.gif" title="删除该时间段" alt="删除该时间段" id="delTimeQuantum_' + nr + '" onclick="del_time_quantum(this,\'0\')" class="del_img_time"/></span>' +
        '<div class="time_type">' +
        '<div class="week_wrap">' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_day0"/>' +
        '<label for="time' + nr + '_day0" class="inline">周一</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_day1"/>' +
        '<label for="time' + nr + '_day1" class="inline">周二</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_day2"/>' +
        '<label for="time' + nr + '_day2" class="inline">周三</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_day3"/>' +
        '<label for="time' + nr + '_day3" class="inline">周四</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_day4"/>' +
        '<label for="time' + nr + '_day4" class="inline">周五</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_day5"/>' +
        '<label for="time' + nr + '_day5" class="inline">周六</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_day6"/>' +
        '<label for="time' + nr + '_day6" class="inline">周日</label>' +
        '</div>' +
        '<div id="time_div_0_' + tmp_nr + '">' +
        '<input type="text" id="start_hour' + tmp_nr + '" size="5" maxlength="2" value="0"  name="h_start' + tmp_nr + '"/>' +
        '<label for="start_hour' + tmp_nr + '" class="inline">时</label>' +
        '<input type="text" id="start_minute' + tmp_nr + '" size="5" maxlength="2" value="0" name="m_start' + tmp_nr + '"/>' +
        '<label for="start_minute' + tmp_nr + '" class="inline">分</label>' +
        '<span>---</span>' +
        '<input type="text" id="end_hour' + tmp_nr + '" size="5" maxlength="2" value="23" name="h_end' + tmp_nr + '"/>' +
        '<label for="end_hour' + tmp_nr + '" class="inline">时</label>' +
        '<input type="text" id="end_minute' + tmp_nr + '" size="5" maxlength="2" value="59" name="m_end' + tmp_nr + '"/>' +
        '<label for="end_minute' + tmp_nr + '" class="inline">分</label>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#time_wrap").append(time_dom_str);
}
function print_date(nr) {
    var time_dom_str = "";
    var tmp_nr = parseInt(nr) - 1;
    time_dom_str += ' <div id="time_type_1_' + nr + '">' +
        '<span class="del_time_wrap">时间段' + nr + '<img src="images/del.gif" title="删除该时间段" alt="删除该时间段" id="delTimeQuantum_' + nr + '" onclick="del_time_quantum(this,\'1\')" class="del_img_time"/></span>' +
        '<div class="time_type">' +
        '<div class="start">' +
        '<label for="start_calendar_' + nr + '" class="inline">开始时间：</label>' +
        '<input type="text" id="start_calendar_' + nr + '" onFocus="SelectDate(this,\'yyyy-MM-dd\')" maxlength="10" value=" " size="10">' +
        '<input type="text" id="start_hour_' + nr + '" size="2" maxlength="2" name="h_start' + tmp_nr + '" value="0" class="btn_l_sep" />' +
        '<label for="start_hour_' + nr + '" class="inline">时</label>' +
        '<input type="text" id="start_minute_' + nr + '" size="2" maxlength="2" name="m_start' + tmp_nr + '" value="0"/>' +
        '<label for="start_minute_' + nr + '" class="inline">分</label>' +
        '</div>' +
        '<div class="end">' +
        '<label for="end_calendar_' + nr + '" class="inline">结束时间：</label>' +
        '<input type="text" id="end_calendar_' + nr + '" onFocus="SelectDate(this,\'yyyy-MM-dd\')" maxlength="10"value=" " size="10">' +
        '<input type="text" id="end_hour_' + nr + '" size="2" maxlength="2" name="h_end' + tmp_nr + '" value="23" class="btn_l_sep"/>' +
        '<label for="end_hour_' + nr + '" class="inline">时</label>' +
        '<input type="text" id="end_minute_' + nr + '" size="2" maxlength="2" name="m_end' + tmp_nr + '" value="59"/>' +
        '<label for="end_minute_' + nr + '" class="inline">分</label>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#time_wrap").append(time_dom_str);
}
function print_mouth(nr) {
    var tmp_nr = parseInt(nr) - 1;
    var time_dom_str = "";
    time_dom_str += '<div id="time_type_2_' + nr + '">' +
        '<span class="del_time_wrap">时间段' + nr + '<img src="images/del.gif" title="删除该时间段" alt="删除该时间段" id="delTimeQuantum_' + nr + '" onclick="del_time_quantum(this,\'2\')" class="del_img_time"/></span>' +
        '<div class="time_type">' +
        '<div class="mouth_wrap">' +
        '<div>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num1" />' +
        '<label for="time' + nr + '_num1" class="inline">1号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num2" />' +
        '<label for="time' + nr + '_num2" class="inline">2号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num3" />' +
        '<label for="time' + nr + '_num3" class="inline">3号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num4" />' +
        '<label for="time' + nr + '_num4" class="inline">4号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num5" />' +
        '<label for="time' + nr + '_num5" class="inline">5号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num6" />' +
        '<label for="time' + nr + '_num6" class="inline">6号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num7" />' +
        '<label for="time' + nr + '_num7" class="inline">7号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num8" />' +
        '<label for="time' + nr + '_num8" class="inline">8号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num9" />' +
        '<label for="time' + nr + '_num9" class="inline">9号</label>' +
        '</div>' +
        '<div>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num10" />' +
        '<label for="time' + nr + '_num10" class="inline">10号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num11" />' +
        '<label for="time' + nr + '_num11" class="inline">11号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num12" />' +
        '<label for="time' + nr + '_num12" class="inline">12号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num13" />' +
        '<label for="time' + nr + '_num13" class="inline">13号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num14" />' +
        '<label for="time' + nr + '_num14" class="inline">14号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num15" />' +
        '<label for="time' + nr + '_num15" class="inline">15号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num16" />' +
        '<label for="time' + nr + '_num16" class="inline">16号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num17" />' +
        '<label for="time' + nr + '_num17" class="inline">17号</label>' +
        '</div>' +
        '<div>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num18" />' +
        '<label for="time' + nr + '_num18" class="inline">18号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num19" />' +
        '<label for="time' + nr + '_num19" class="inline">19号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num20" />' +
        '<label for="time' + nr + '_num20" class="inline">20号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num21" />' +
        '<label for="time' + nr + '_num21" class="inline">21号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num22" />' +
        '<label for="time' + nr + '_num22" class="inline">22号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num23" />' +
        '<label for="time' + nr + '_num23" class="inline">23号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num24" />' +
        '<label for="time' + nr + '_num24" class="inline">24号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num25" />' +
        '<label for="time' + nr + '_num25" class="inline">25号</label>' +
        '</div>' +
        '<div>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num26" />' +
        '<label for="time' + nr + '_num26" class="inline">26号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num27" />' +
        '<label for="time' + nr + '_num27" class="inline">27号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num28" />' +
        '<label for="time' + nr + '_num28" class="inline">28号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num29" />' +
        '<label for="time' + nr + '_num29" class="inline">29号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num30" />' +
        '<label for="time' + nr + '_num30" class="inline">30号</label>' +
        '<input type="checkbox" value="0" onClick="change_val(this,this.value)" id="time' + nr + '_num31" />' +
        '<label for="time' + nr + '_num31" class="inline">31号</label>' +
        '</div>' +
        '</div>' +
        '<div id="time_div_0_' + tmp_nr + '">' +
        '<input type="text" id="start_hour' + tmp_nr + '" size="5" maxlength="2" value="0"  name="h_start' + tmp_nr + '"/>' +
        '<label for="start_hour' + tmp_nr + '" class="inline">时</label>' +
        '<input type="text" id="start_minute' + tmp_nr + '" size="5" maxlength="2" value="0" name="m_start' + tmp_nr + '"/>' +
        '<label for="start_minute' + tmp_nr + '" class="inline">分</label>' +
        '<span>---</span>' +
        '<input type="text" id="end_hour' + tmp_nr + '" size="5" maxlength="2" value="23" name="h_end' + tmp_nr + '"/>' +
        '<label for="end_hour' + tmp_nr + '" class="inline">时</label>' +
        '<input type="text" id="end_minute' + tmp_nr + '" size="5" maxlength="2" value="59" name="m_end' + tmp_nr + '"/>' +
        '<label for="end_minute' + tmp_nr + '" class="inline">分</label>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#time_wrap").append(time_dom_str);
}

//-----------------------------------时间组  end
