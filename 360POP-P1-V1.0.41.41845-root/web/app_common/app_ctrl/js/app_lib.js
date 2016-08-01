var current_html = null;
if (typeof parentEmt == "undefined" || parentEmt == null) {
    parentEmt = this.parent;
}

//===========================基本模块部分开始===============================

//绘制选项卡
function paint_tab() {
    $(".tab_area").html("");
    var len = current_tab_name.length;
    var total_width = $("body").width() - 30;//需除开滚动条的位置
    var width = (total_width / len).toFixed(2);
    for (var i = 0; i < len; i++) {
        var $h3 = $("<h3/>");
        var tab_title = current_tab_name[i].tab_title;
        $h3.html(tab_title);
        $h3.css("width", width + "px");
        var tab_id = current_tab_name[i].tab_id;
        if (tab_id != "") {
            $h3.attr("id", tab_id);
        }
        if (current_tab_name[i].init_fun != undefined) {
            var init_fun = current_tab_name[i].init_fun;
            $h3.attr("name", init_fun);
        }

        if ((len - i) == 1) {
            $h3.attr("class", "last");
            $h3.css("width", (width - 3) + "px");
        }
        $(".tab_area").append($h3);
        $h3.unbind("click").bind("click", function () {
            var $obj = $(".tab_area h3").removeClass("selected");
            $(this).addClass("selected");
            var tmp_id;
            if ($(this).attr("id") != undefined) {
                tmp_id = $(this).attr("id").split("_tab")[0];
            }
            if ($(this).attr("name") != undefined && tmp_id != undefined) {
                var tmp_name = $(this).attr("name");
                load_app_page(tmp_id, tmp_name);
            }
            else {
                if (tmp_id != undefined) {
                    tmp_id = $(this).attr("id").split("_tab")[0];
                    load_app_page(tmp_id, 'init_' + tmp_id);
                }
            }
        });
    }
}

//加载app页面
function load_app_page(html_name, init_function) {
    hide_msgbox();
    current_html = html_name;
	var d = new Date();
    $.ajax({
        type: "get",
        url: "./" + html_name + ".html?t="+d.getTime(),
        dataType: "html",
        error: function (XMLHttpRequest, textStatus) {
            window.top.open("/", "_self");
        },
        success: function (ret) {
            if (ret.indexOf("360LoginFlag") != -1) {
                window.top.open("/", "_self");
            }
            var _this = $("#app_page");
            _this.html(ret);
            if (init_function != null && init_function != "") {
                try {
                    eval(init_function + "();");
                }
                catch (e) {
                }
            }
        }
    });
}
//======================================================

//======================表格部分=======================
var arrPage;

var GetPage = function (data, pageSize, pageIndex) {
    var temp = data;
    var pageSize = pageSize;
    var pageIndex = pageIndex;

    var arrPage = new Array();

    for (var i = pageSize * (pageIndex - 1); i < pageSize * pageIndex; i++) {
        if (i < temp.length)
            arrPage.push(temp[i]);
    }
    return arrPage;
}

function libTable(head, data, index, size, totalNum) {
    this.head = head;
    this.data = data;
    this.index = index;
    this.size = size;
    if (totalNum)
        this.totalNum = totalNum;
}
String.prototype.Append = function (str) {
    var temp = String(this);
    temp += str;
    return temp;
}

var tempData;

//绘制表格
function print_table(id, tabObj, fun_arr, isAll_param) {
    tabObj.maxIndex = Math.ceil(tabObj.data.length / tabObj.size);
    var table = $("#" + id);
    if(!table.hasClass("data-table")){
        table=parentEmt.$("#"+id);
    }
    table.html("");
    var obj = tabObj;
    tempData = GetPage(obj.data, obj.size, obj.index);

    if (tabObj.head != null) {
        //构造thead
        var data_thead = $("<thead/>");
        var thead_row = $("<tr/>");
        for (var cell in obj.head) {
            var thead_cell = $("<th/>");
            thead_cell.attr("class", "th_" + cell);
            thead_cell.html(obj.head[cell]);
            thead_row.append(thead_cell);
        }
        data_thead.append(thead_row);
    }
    var tempData = GetPage(obj.data, obj.size, obj.index);

    if (tabObj.head != null) {
        //构造tbody
        var data_tbody = $("<tbody/>");
    }
    for (var row in tempData) {
        var cellRow = "";
        var param = '';
        var cols = 0;
        var cnt_cellData = "";

        var data_row;
        if (row % 2 == 0) {
            if (typeof tempData[row].colorStyle != 'undefined') {
                data_row = $("<tr class=\" " + tempData[row].colorStyle + "\"/>");
            }
            else {
                data_row = $("<tr/>");
            }

        }
        else {
            if (typeof tempData[row].colorStyle != 'undefined') {
                data_row = $("<tr class=\"evenrow " + tempData[row].colorStyle + "\"/>");
            }
            else {
                data_row = $("<tr class=\"evenrow\"/>");
            }
        }

        var cell_id = 0;
        for (cell in tempData[row]) {
            if (cell == 'colorStyle'|| cell == '_person_id') continue;
            cols++;
            var text = tempData[row][cell];
            cnt_cellData += '<td>' + text + '</td>';
            if (cell_id == 0) {
                param = '\'' + tempData[row][cell] + '\'';
            }
            else {
                if (isAll_param)
                    param += ',\'' + tempData[row][cell] + '\'';
            }
            cell_id++;
        }

        var fun_cellData = "";
        if (fun_arr) {
            fun_cellData = '<td>';
            for (var i in fun_arr) {
                var fun = fun_arr[i];
                var p = param;
                var _btnStr = fun.str;
                if(typeof _btnStr === "function"){
                    _btnStr = _btnStr(tempData[row]._person_id);
                }
                fun_cellData += '<a href="javascript:void(0);"  class="fun_link ' + fun.type + '" title="' + _btnStr + '" onclick="' + fun.name + '(' + p + ')">' + _btnStr + '</a>';
            }
            cellRow = cnt_cellData + fun_cellData + '</td>';
            cols++;
        }
        else {
            cellRow = cnt_cellData;
        }
        data_row.html(cellRow);
        if (tabObj.head != null) {
            data_tbody.append(data_row);
        }
        else {
            table.append(data_row);
        }
    }
    if (tabObj.head != null) {
        table.append(data_tbody);
    }

    if (tabObj.head != null) {
        //构造tfoot
        var data_tfoot = $("<tbody/>");
    }
    var tfoot_row = $("<tr/>");
    var tfoot_cell = $("<td/>");
    tfoot_cell.attr("colspan", cols);
    tfoot_cell.attr("class", "paging");
    tfoot_row.append(tfoot_cell);
    if (tabObj.head != null) {
         if (tempData.length != 0 && obj.size < obj.data.length)
            data_tfoot.append(tfoot_row);
    }
    else {
        if (tempData.length != 0 && obj.size < obj.data.length)
            table.append(tfoot_row);
    }

    if (obj.data.length != 0)
        print_page(obj, tfoot_cell, id, fun_arr, isAll_param);//分页函数
    if (tabObj.head != null) {
        table.append(data_thead);
        table.append(data_tbody);
        if (obj.size < obj.data.length)
            table.append(data_tfoot);
    }
    nos.app.resizePage();
}

var step = 10;
//分页函数
function print_page(tab, page_obj, id, fun_arr, isAll_param) {
    var page_obj = typeof(page_obj) == "object" ? page_obj : $("#" + page_obj);

    var allNum = Math.ceil(tab.data.length / tab.size);
    if (allNum < 2)
        return;
    var nowNum = tab.index;
    //首页
    var oA = $("<a/>");
    oA.attr("href", "#1");
    oA.html("首页");
//    page_obj.append(oA);

    //上一页
    var oA = $("<a/>");
    if (nowNum >= 2)
        oA.attr("href", "#" + (nowNum - 1));
    else
        oA.attr("href", "#");
    oA.html("<");
    page_obj.append(oA);
    //}

    //显示格式
    if (allNum <= step) {
        for (var i = 1; i <= allNum; i++) {
            var oA = $("<a/>");
            oA.attr("href", "#" + i);
            if (nowNum == i) {
                oA.attr("class", "current");
            }
            oA.html(i);
            page_obj.append(oA);
        }
    }
    else {
        //每页都只显示步长那么多条,最后一页可能不满步长
        var tmp_len = allNum - nowNum + Math.floor((step - 1) / 2) + 1, len = 0;
        if (tmp_len < step)
            len = tmp_len;
        else
            len = step;
        for (var i = 0; i < len; i++) {
            if (nowNum >= step) {
                var oA = $("<a/>");
                var cur_num = nowNum - Math.floor((step - 1) / 2) + i;
                oA.attr("href", "#" + cur_num);

                if (cur_num == nowNum) {
                    oA.html(nowNum);
                    oA.attr("class", "current");
                }
                else {
                    oA.html(cur_num);
                }
                page_obj.append(oA);
            }

            else {
                for (var i = 1; i <= step; i++) {
                    var oA = $("<a/>");
                    oA.attr("href", "#" + i);
                    if (nowNum == i) {
                        oA.attr("class", "current");
                    }
                    oA.html(i);
                    page_obj.append(oA);
                }
            }
        }
    }

    //下一页
    var oA = $("<a/>");
    if ((allNum - nowNum) >= 1)
        oA.attr("href", "#" + (nowNum + 1));
    else
        oA.attr("href", "#");
    oA.html(">");
    page_obj.append(oA);
    //尾页
    var oA = $("<a/>");
    oA.attr("href", "#" + allNum);
    oA.html("尾页");
//    page_obj.append(oA);


    var page_a = page_obj.find('a');
    page_a.unbind("click").bind("click", function () {
        var nowNum = parseInt($(this).attr('href').substring(1));
        if (isNaN(nowNum))
            return;
        tab.index = nowNum;
        print_table(id, tab, fun_arr, isAll_param);
        return false;
    });

}
//====================================================

//=======================表格排序========================
var TempArray = {};
TempArray.id = "up";
TempArray.ip = "up";
TempArray.user = "up";
TempArray.day = "up";
TempArray.charge = "up";
TempArray.uptime = "up";


var ArrayData_sort = {};
ArrayData_sort.array = [];
ArrayData_sort.fun = function () {
};
function Array_sort_by_type(type, obj) {
    if (type == "id") {
        ArrayData_sort.array.sort(Array_int_compare_id);
        if (TempArray.id == "down") {
            ArrayData_sort.array.reverse();
        }
        if (TempArray.id == "up") {
            TempArray.id = "down";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_asc");
        }
        else {
            TempArray.id = "up";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_desc");
        }
    }
    else if (type == "ip") {
        ArrayData_sort.array.sort(Array_int_compare_ip);
        if (TempArray.ip == "down")
            ArrayData_sort.array.reverse();
        if (TempArray.ip == "up") {
            TempArray.ip = "down";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_asc");
        }
        else {
            TempArray.ip = "up";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_desc");
        }
    }
    else if (type == "user") {
        ArrayData_sort.array.sort(Array_str_compare_user);
        if (TempArray.user == "down")
            ArrayData_sort.array.reverse();
        if (TempArray.user == "up") {
            TempArray.user = "down";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_asc");
        }
        else {
            TempArray.user = "up";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_desc");
        }
    }
    else if (type == "charge") {
        ArrayData_sort.array.sort(Array_str_compare_charge_sort);
        if (TempArray.charge == "down") {
            ArrayData_sort.array.reverse();
        }
        if (TempArray.charge == "up") {
            TempArray.charge = "down";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_asc");
        }
        else {
            TempArray.charge = "up";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_desc");
        }
    }
    else if (type == "day") {
        ArrayData_sort.array.sort(Array_str_compare_day);
        if (TempArray.day == "down")
            ArrayData_sort.array.reverse();
        if (TempArray.day == "up") {
            TempArray.day = "down";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_asc");
        }
        else {
            TempArray.day = "up";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_desc");
        }
    }
    else if (type == "uptime") {
        ArrayData_sort.array.sort(Array_str_compare_uptime);
        if (TempArray.uptime == "down")
            ArrayData_sort.array.reverse();
        if (TempArray.uptime == "up") {
            TempArray.uptime = "down";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_asc");
        }
        else {
            TempArray.uptime = "up";
            reset_sort_bg(obj);
            $(obj).removeClass().addClass("sort_desc");
        }
    }
    ArrayData_sort.fun(ArrayData_sort.array);
}

function reset_sort_bg(obj) {
    var _this = $(obj).parent().find("th");
    for (var i = 0; i < _this.length; i++) {
        if (_this.eq(i).attr("class") != undefined)
            _this.eq(i).removeClass().addClass("sort_bg");
    }
}

function int_compare(int1, int2) {
    var a = parseInt(int1, 10);
    var b = parseInt(int2, 10);
    if (a < b)
        return -1;
    else if (a == b)
        return 0;
    else
        return 1;
}

function str_compare(str1, str2) {
    if (str1 < str2)
        return -1;
    else if (str1 == str2)
        return 0;
    else
        return 1;
}

function Array_int_compare_id(a, b) {
    return int_compare(a.id, b.id);
}

function ip_compare(ip1, ip2) {
    var a1 = ip1.split('.');
    var b1 = ip2.split('.');
    var i = 0;
    for (i = 0; i < a1.length; i++) {
        if (parseInt(a1[i], 10) > parseInt(b1[i], 10))
            return 1;
        if (parseInt(a1[i], 10) < parseInt(b1[i], 10))
            return -1;
    }
    return 0;
}

function Array_int_compare_ip(a, b) {
    return ip_compare(a.ip, b.ip);
}

function Array_str_compare_charge_sort(a, b) {
    var timeDW = appCommonJS.time, timeInfo = appCommonJS.timeFull;
    var a_str = a.charge.charAt(a.charge.length - 1);
    var b_str = b.charge.charAt(b.charge.length - 1);
    if (a_str == timeInfo.day && b_str == timeInfo.day) {
        var t3_year = a.charge.split("：")[1].split(timeInfo.year)[0];
        var t3_month = parseInt(a.charge.split("：")[1].split(timeInfo.year)[1].split(timeInfo.month)[0], 10);
        t3_month = t3_month > 9 ? t3_month : "0" + t3_month;
        var t3_day = parseInt(a.charge.split("：")[1].split(timeInfo.year)[1].split(timeInfo.month)[1].split(timeInfo.day)[0]);
        t3_day = t3_day > 9 ? t3_day : "0" + t3_day;
        var t3 = parseInt(t3_year + t3_month + t3_day, 10);

        var t4_year = b.charge.split("：")[1].split(timeInfo.year)[0];
        var t4_month = parseInt(b.charge.split("：")[1].split(timeInfo.year)[1].split(timeInfo.month)[0], 10);
        t4_month = t4_month > 9 ? t4_month : "0" + t4_month;
        var t4_day = parseInt(b.charge.split("：")[1].split(timeInfo.year)[1].split(timeInfo.month)[1].split(timeInfo.day)[0]);
        t4_day = t4_day > 9 ? t4_day : "0" + t4_day;
        var t4 = parseInt(t4_year + t4_month + t4_day, 10);

        if (t3 > t4)
            return 1;
        else if (t3 < t4)
            return -1;
        else
            return 0;
    }
    else if (a_str == timeInfo.day && b_str == timeInfo.zhi)
        return 1;
    else if (a_str == timeInfo.day && b_str != timeInfo.zhi)
        return -1;

    else if (a_str == timeInfo.zhi && b_str == timeInfo.zhi)
        return 0;
    else if (a_str == timeInfo.zhi && b_str != timeInfo.zhi)
        return -1;

    else if ((a_str == timeInfo.hour && b_str == timeInfo.hour) || (a_str == "K" && b_str == "K") || (a_str == "M" && b_str == "M") || (a_str == "G" && b_str == "G") || (a_str == "T" && b_str == "T")) {
        var t1 = parseInt(a.charge.split("：")[2], 10);
        var t2 = parseInt(b.charge.split("：")[2], 10);

        if (t1 > t2)
            return 1;
        else if (t1 < t2)
            return -1;
        else
            return 0;
    }
    else if ((a_str == timeInfo.hour && b_str == timeInfo.zhi) || (a_str == timeInfo.hour && b_str == timeInfo.day))
        return 1;
    else if ((a_str == timeInfo.hour && b_str == "K") || (a_str == timeInfo.hour && b_str == "M") || (a_str == timeInfo.hour && b_str == "G") || (a_str == timeInfo.hour && b_str == "T"))
        return -1;
    else if ((a_str == timeInfo.zhong && b_str == timeInfo.zhong) || (a_str == timeInfo.hour && b_str == timeInfo.zhong) || (a_str == timeInfo.zhong && b_str == timeInfo.hour)) {
        var a_tmp = a.charge.split("：")[2];
        var b_tmp = b.charge.split("：")[2];
        var t5, t6;

        if (a_tmp.indexOf(timeInfo.hour) != -1 && b_tmp.indexOf(timeInfo.hour) != -1) {
            t5 = a_tmp.split(timeDW.hour)[0];
            if (t5 == 0)
                return -1;
            else {
                if (a_tmp.indexOf(timeInfo.min) != -1) {
                    t5 += a_tmp.split(timeDW.hour)[1].split(timeInfo.min)[0];
                }
                t5 = parseInt(t5, 10);
            }

            t6 = b_tmp.split(timeDW.hour)[0];
            if (t6 == 0)
                return 1;
            else {
                if (b_tmp.indexOf(timeInfo.min) != -1) {
                    t6 += b_tmp.split(timeDW.hour)[1].split(timeInfo.min)[0];
                }
                t6 = parseInt(t6, 10);
            }

            if (t5 > t6)
                return 1;
            else if (t5 < t6)
                return -1;
            else
                return 0;
        }
        else if (a_tmp.indexOf(timeInfo.hour) != -1 && b_tmp.indexOf(timeInfo.hour) == -1) {
            if (parseInt(a_tmp.split(timeDW.hour)[0]) == 0) {
                return -1;
            }
            else
                return 1;
        }
        else if (a_tmp.indexOf(timeInfo.hour) == -1 && b_tmp.indexOf(timeInfo.hour) != -1) {
            if (parseInt(b_tmp.split(timeDW.hour)[0]) == 0) {
                return -1;
            }
            else
                return -1;
        }
        else if (a_tmp.indexOf(timeInfo.hour) == -1 && b_tmp.indexOf(timeInfo.hour) == -1) {
            t5 = parseInt(a_tmp, 10);
            t6 = parseInt(b_tmp, 10);
            if (t5 > t6)
                return 1;
            else if (t5 < t6)
                return -1;
            else
                return 0;
        }
    }
    else if ((a_str == timeInfo.zhong && b_str == timeInfo.zhi) || (a_str == timeInfo.zhong && b_str == timeInfo.day))
        return 1;
    else if ((a_str == timeInfo.zhong && b_str == "K") || (a_str == timeInfo.zhong && b_str == "M") || (a_str == timeInfo.zhong && b_str == "G") || (a_str == timeInfo.zhong && b_str == "T"))
        return -1;

    else if ((a_str == "K" && b_str == "M") || (a_str == "K" && b_str == "G") || (a_str == "K" && b_str == "T"))
        return -1;
    else if ((a_str == "K" && b_str == timeInfo.zhong) || (a_str == "K" && b_str == timeInfo.hour) || (a_str == "K" && b_str == timeInfo.zhi) || (a_str == "K" && b_str == timeInfo.day))
        return 1;


    else if ((a_str == "M" && b_str == "K") || (a_str == "M" && b_str == timeInfo.zhong) || (a_str == "M" && b_str == timeInfo.hour) || (a_str == "M" && b_str == timeInfo.zhi) || (a_str == "M" && b_str == timeInfo.day))
        return 1;
    else if ((a_str == "M" && b_str == "G") || (a_str == "M" && b_str == "T"))
        return -1;

    else if (a_str == "G" && b_str == "T")
        return -1;

    else if ((a_str == "G" && b_str == "M") || (a_str == "G" && b_str == "K") || (a_str == "G" && b_str == timeInfo.zhong) || (a_str == "G" && b_str == timeInfo.hour) || (a_str == "G" && b_str == timeInfo.zhi) || (a_str == "G" && b_str == timeInfo.day))
        return 1;

    else if (a_str == "T" && b_str != "T")
        return 1;

    else
        return 0;

}

function Array_str_compare_uptime(a, b) {
    var a_uptime = convert_time_reverse(a.uptime);
    var b_uptime = convert_time_reverse(b.uptime);
    return int_compare(a_uptime, b_uptime);
}

function Array_str_compare_user(a, b) {
    return str_compare(a.user, b.user);
}

function Array_str_compare_day(a, b) {
    return time_compare(a.day, b.day);
}

//支持格式xxxx-xx-xx
function time_compare(a, b) {
    if (a != "-") {
        a = a.replace(/-/g, "");
        a = a.replace(/ /g, "");
        a = a.replace(/:/g, "");
        a = parseInt(a, 10);
    }
    else {
        a = 0;
    }
    if (b != "-") {
        b = b.replace(/-/g, "");
        b = b.replace(/ /g, "");
        b = b.replace(/:/g, "");
        b = parseInt(b, 10);
    }
    else {
        b = 0;
    }
    return int_compare(a, b);
}

//======================校验出错提示部分=======================
//Point类
function Point(x, y) {
    this.x = x;
    this.y = y;
}

//获取一个页面元素的绝对坐标
function getPosition(obj) {
    var p = new Point(0, 0);
    while (obj) {
        p.x = p.x + obj.offsetLeft;
        p.y = p.y + obj.offsetTop;
        obj = obj.offsetParent;
    }
    return p;
}
//MessageBox类
function MessageBox(msg, position,msgTarget) {
    this.msg = msg;
    this.position = position;
    this.msgTarget=msgTarget;
    if (typeof MessageBox._initialized == "undefined") {
        MessageBox.prototype.Obj = document.createElement("div");
        MessageBox.prototype.Obj.id = "_MessageBox_";
        MessageBox.prototype.Obj.className = "MessageBox";
        MessageBox.prototype.Obj.appendChild(document.createElement("div"));
        MessageBox.prototype.Obj.firstChild.className = "MessageBox_div";
        MessageBox.prototype.Show = function (_msg, _position) {
            var obj = this.Obj;
            obj.style.visibility = "visible";

            if (_msg)
                obj.firstChild.innerHTML = _msg;
            else
                obj.firstChild.innerHTML = this.msg;

            if (_position) {
                obj.style.left = (_position.x) + "px";
                obj.style.top = (_position.y) + "px";
            }
            else {
                obj.style.left = (this.position.x) + "px";
                obj.style.top = (this.position.y) + "px";
            }
            if(current_html=="wisp_set"||current_html=="filter_arp"||current_html=="virtual"||current_html=="vpn_client"){
                var _div=parentEmt.document.createElement("div");//先向父页面添加div(兼容IE7)
                _div.id=obj.id;
                _div.className=obj.className;
                _div.style.left =obj.style.left ;
                _div.style.top=obj.style.top;
                _div.innerHTML=obj.innerHTML;
                parentEmt.document.body.appendChild(_div);
            }else{
                document.body.appendChild(this.Obj);
            }
        }


        MessageBox.prototype.Hide = function () {
            this.Obj.style.visibility = "hidden";
        }
        MessageBox._initialized = true;
    }
}

function hide_msgbox() {
    var msgbox = new MessageBox();
    if (msgbox) {
        msgbox.Hide();
    }
}
//========================================================

//======================数据校验类型====================
//请勿删除原有类型，以免影响到路由器基本opk模块的数据验证，如需添加新的类型，请在列表后追加
var check_app_map = {
    int: parentEmt.check_int,
    decimal: parentEmt.check_decimal,
    string: parentEmt.check_string,
    char: check_char,
    pptp_l2tp: check_pptp_l2tp,
    ip: parentEmt.check_ip,
    ip_fourth:parentEmt.check_ip_fourth,
    in_ip: check_in_ip,
    nin_ip: check_nin_ip,
    mac: parentEmt.check_mac,
    mask: parentEmt.check_mask,
    dns: parentEmt.check_dns,
    hour: parentEmt.check_hour,
    minute: parentEmt.check_min,
    url: parentEmt.check_url,
	fuzzy_url:parentEmt.check_fuzzy_url,
    ip_url: parentEmt.check_ip_url,
    nin_ip_url: check_nin_ip_url,
    password: parentEmt.check_password,
    password_blank: parentEmt.check_password_blank,
    port: parentEmt.check_port,
    port0: check_port0,
    prio: check_prio,
    pptp_connects: check_pptp_connects,
    l2tp_connects: check_l2tp_connects,
    calendar: parentEmt.check_calendar,
    eq5: parentEmt.check_eq5,
    eq13: check_eq13,
    eq64: check_eq64,
    eq8_63: parentEmt.check_eq8_63,
    eq8_30: parentEmt.check_eq8_30,
    eq8_64: check_eq8_64,
    eq10: check_eq10,
    eq26: check_eq26,
    char16: check_char16,
    ascii_base: check_ascii_base,
    ascii_password: check_ascii_password,
    ascii: check_ascii,
    update_min30: check_update_min30,
    udp_up: check_udp_up,
    noneed: null
};
// a-zA-Z0-9  组合使用
function check_ascii_base(str) {
    if (str == "" || str == null) {
        var ss = appError.ascii_base;
        return ss;
    }
    return true;
}
function check_ascii_password(str) {
    if (str == "" || str == null) {
        var ss = appError.ascii_password;
        return ss;
    }
    return true;
}
function check_ascii(str) {
    var errorStr = appError.ascii;
    var cmp = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var buf = str;
    for (var h = 0; h < buf.length; h++) {
        var tst = buf.substring(h, h + 1);
        if (tst.charCodeAt(0) < 0 || tst.charCodeAt(0) > 255) {
            var ss = appError[0];
            return ss;
        }
        if (cmp.indexOf(tst) < 0) {
            var ss = appError[1];
            return ss;
        }
    }
    return true;
}

//检查端口（允许输入0代表某默认端口）
function check_port0(str) {
    var errorStr = appError.port0;
    if (str == "" || str == null) {
        var ss = errorStr[0];
        return ss;
    }
    var cmp = '0123456789';
    var buf = str;
    for (var h = 0; h < buf.length; h++) {
        var tst = buf.substring(h, h + 1);
        if (cmp.indexOf(tst) < 0) {
            var ss = errorStr[1];
            return ss;
        }
    }
    if (parseInt(str, 10) > 65535 || parseInt(str, 10) < 0) {
        var ss = errorStr[2];
        return ss;
    }
    return true;
}


//检查优先级
function check_prio(str) {
    var ss = parentEmt.check_int(str);
    if (ss != true) {
        return ss;
    }
    if (str < 0 || str > 1000) {
        ss = appError.prio;
        return ss;
    }
    return true;
}

//检查udp_up
function check_udp_up(str) {
    var ss = parentEmt.check_int(str);
    if (ss != true) {
        return ss;
    }
    if (str == 0)
        return true;
    if (str < 4 || str > 200) {
        ss = appError.udp_up;
        return ss;
    }
    return true;
}

//不含中文
function check_char(str) {
    var errorStr = appError.char;
    if (str == "" || str == null) {
        var ss = errorStr[0];
        return ss;
    }
    var cmp = '\\\'"<>';
    var buf = str;
    for (var h = 0; h < buf.length; h++) {
        var tst = buf.substring(h, h + 1);
        if (cmp.indexOf(tst) >= 0) {
            var ss = errorStr[1] + cmp;
            return ss;
        }
        if (tst.charCodeAt(0) < 0 || tst.charCodeAt(0) > 255) {
            var ss = errorStr[2];
            return ss;
        }
    }
    return true;
}

function check_pptp_l2tp(str) {
    var errorStr = appError.pptp_l2tp;
    if (str == "" || str == null) {
        var ss = errorStr[0];
        return ss;
    }
    var cmp = '\\\'"<> ';
    var buf = str;
    for (var h = 0; h < buf.length; h++) {
        var tst = buf.substring(h, h + 1);
        if (cmp.indexOf(tst) >= 0) {
            var ss = errorStr[1] + cmp + errorStr[2];
            return ss;
        }
        if (tst.charCodeAt(0) < 0 || tst.charCodeAt(0) > 255) {
            var ss = errorStr[3];
            return ss;
        }
    }
    return true;
}

//检查nin_ip+url
function check_nin_ip_url(str) {
    var flg = 0;
    if (str == "") {
        var ss = appError.nin_ip_url;
        return ss;
    }
    for (var h = 0; h < str.length; h++) {
        cmp = "0123456789.";
        var tst = str.substring(h, h + 1);
        if (cmp.indexOf(tst) < 0) {
            flg++;
        }
    }
    if (flg != 0) {//url
        var ss = parentEmt.check_url(str);
        if (ss != true)
            return ss;
    }
    else {//ip
        var ss = check_nin_ip(str);
        if (ss != true)
            return ss;
    }
    return true;
}

//检查pptp连接数
function check_pptp_connects(str) {
    var errorStr = appError.pptp_connects;
    var max_val = parseInt(pptp_max_num, 10);
    if (str == "") {
        var ss = errorStr[0];
        return ss;
    }
    if (isNaN(str) || str < 1 || str > max_val) {
        if (max_val != 1) {
            var ss = errorStr[1] + max_val + errorStr[2];
            return ss;
        }
        else {
            var ss = errorStr[3];
            return ss;
        }
    }
    return true;
}

//检查l2tp连接数
function check_l2tp_connects(str) {
    var errorStr = appError.pptp_connects;
    var max_val = parseInt(l2tp_max_num, 10);
    if (str == "") {
        var ss = errorStr[0];
        return ss;
    }
    if (isNaN(str) || str < 1 || str > max_val) {
        if (max_val != 1) {
            var ss = errorStr[1] + max_val + errorStr[2];
            return ss;
        }
        else {
            var ss = errorStr[3];
            return ss;
        }
    }
    return true;
}

function check_eq13(str) {
    var ss = appError.eq13;
    if (str.length != 13)
        return ss;
    return true;
}
function check_eq8_64(str) {
    var ss = appError.eq8_64;
    if (str.length < 8 || str.length > 64)
        return ss;
    return true;
}
function check_eq64(str) {
    var ss = appError.eq64;
    if (str.length != 64)
        return ss;
    return true;
}
function check_eq10(str) {
    var ss = appError.eq10;
    if (str.length != 10)
        return ss;
    return true;
}
function check_eq26(str) {
    var ss = appError.eq26;
    if (str.length != 26)
        return ss;
    return true;
}
function check_char16(str) {
    if (str == "" || str == null) {
        var ss = appError.char16;
        return ss;
    }
    return true;
}

//小于32个字符
function check_less32(str) {
    var ss = appError.less32;
    if (str.length >= 32) {
        return ss;
    }
    return true;
}
//小于64个字符
function check_less64(str) {
    var ss = appError.less64;
    if (str.length >= 64) {
        return ss;
    }
    return true;
}
//更新周期最小值为30，不更新则为0
function check_update_min30(str) {
    var ss = appError.update_min30;
    str = parseInt(str, 10);
    if (str < 30 && str != 0) {
        return ss;
    }
    return true;
}


//====================================================

//======================数据校验部分======================

//表单整体校验
function check_app_input(key,flag) {
    var page_map = reg_app_map[key];
    for (var i in page_map) {
        var _input = document.getElementById(page_map[i].id);
        if(flag){
            _input=parent.document.getElementById(page_map[i].id);
        }
        if (_input) {
            var point_xy = getPosition(_input);
            point_xy.x += _input.clientWidth + 10;
            if (_input.nodeName.toLowerCase() == "select")
                point_xy.y -= 20;
            else
                point_xy.y -= _input.clientHeight;

            var reg_val = _input.value;
            /* 低版本游览器验证value是否与placehoder相同 */
            var holder = _input.getAttribute('placeholder');
            if (reg_val && holder && reg_val === holder) {
                reg_val = '';
            }
            if (reg_val == '') {
                if (page_map[i].type.indexOf("noneed") != -1)
                    continue;
            }
            var types = page_map[i].type.split(' ');
            for (var p in types) {
                if (types[p] == "noneed")
                    continue;
                var reg_type = types[p];
                var res = check_app_map[reg_type](reg_val);
                if (res == true)res = CheckLength(_input);
                if (res != true) {
                    var msgbox = new MessageBox(res, point_xy,page_map[i].id);
                    msgbox.Show();
                    return false;
                }
            }
        }
    }
    return true;
}

//表单各项最大长度检查
function CheckLength(strTemp) {
    var i, sum, count;
    count = strTemp.value.length;
    sum = 0;
	var maxLength = strTemp.maxLength;
    if(maxLength>0) {
        for (i = 0; i < count; i++) {
            if ((strTemp.value.charCodeAt(i) >= 0) && (strTemp.value.charCodeAt(i) <= 255))
                sum = sum + 1;
            else
                sum = sum + 3;

            if (sum > maxLength) {
                var v = strTemp.value.substring(0, i);
                strTemp.value = v;
                return appError.lastLength;
            }
        }
    }
    return true;
}

//单项校验
function get_msgbox(id, type) {
    var _input;
    if (typeof(id) == "object") {
        _input = id;
    }
    else {
        _input = document.getElementById(id);
    }
    if (_input == null)
        return;
    var point_xy = getPosition(_input);
    point_xy.x += _input.clientWidth + 5;
    if (_input.nodeName.toLowerCase() == "select")
        point_xy.y -= 20;
    else
        point_xy.y -= _input.clientHeight;
    var reg_val = _input.value;
    var types = type.split(' ');

    for (var p in types) {
        if (types[p] == "noneed")
            continue;
        var reg_type = types[p];
        var res = check_app_map[reg_type](reg_val);
        if (res == true)res = CheckLength(_input);
        if (res != true) {
            var msgbox = new MessageBox(res, point_xy);
            msgbox.Show();
            return false;
        }
    }
    return true;
}

//检验textarea
function check_textarea(id, str) {
    var ctr_obj = document.getElementById(id);
    var str = ctr_obj.value;
    var point_xy = getPosition(ctr_obj);
    point_xy.x += ctr_obj.clientWidth + 5;
    point_xy.y -= 20;
    var ss = parentEmt.check_string(str);
    if (ss != true) {
        var msgbox = new MessageBox(ss, point_xy);
        msgbox.Show();
        return false;
    }
    return true;
}
//======================================================

//=============================其他========================================

//设置选中select
function select_chose_set(sel_id, val, func) {
	var collection = document.getElementById(sel_id);
    if(current_html=="virtual"){
        collection = parentEmt.document.getElementById(sel_id);
    }
    if (collection&&collection.options)
            for (var i = 0; i < collection.options.length; i++) {
                if (collection.options[i].value == val) {
                    collection.options[i].selected = true;
                }
            }
    if (func) {
        func(val);
    }
}

//设置选中radio
function radio_sele_set(radio_name, get_value, func) {
    var collection = document.getElementsByName(radio_name), i = 0;
    for (; i < collection.length; i++) {
        collection[i].checked = (collection[i].value == get_value) ? true : false;
    }
    if (func) {
        func(get_value, radio_name);
    }
}

//检查起始IP大小
function check_start_end_ip(ip1, ip2) {
    var ip_arr1 = ip1.split(".");
    var ip_arr2 = ip2.split(".");
    for (var i = 0; i < 4; i++) {
        if (parseInt(ip_arr1[i], 10) > parseInt(ip_arr2[i], 10)) {
            var ss = appError.start_end_ip;
            return ss;
        }
        if (parseInt(ip_arr1[i], 10) < parseInt(ip_arr2[i], 10))
            break;
    }
    return true;
}

//检查起始端口大小
function check_start_end_port(port1, port2) {
    var port_a = parseInt(port1, 10);
    var port_b = parseInt(port2, 10);
    if (port_a > port_b) {
        var ss = appError.start_end_port;
        return ss;
    }
    return true;
}

//绘制下拉框
function paint_select(id, arr) {
    $("#" + id).html("");
    for (var i in arr) {
        $("#" + id).append("<option value=\"" + arr[i].value + "\">" + arr[i].text + "</option>");
    }
    if(current_html=="filter_arp"){
        parentEmt.$("#" + id).html("");
        for (var i in arr) {
            parentEmt.$("#" + id).append("<option value=\"" + arr[i].value + "\">" + arr[i].text + "</option>");
        }
    }
}

//wan口显示（适用于多wan口的情况）
var g_wan_num = 1;

function format_wan(i) {
    var tmp = "";
    if (g_wan_num == 1)
        tmp = "WAN";
    else
        tmp = "WAN" + i;
    return tmp;
}

//绘制wan下拉框（适用于多wan口的情况）
function set_uiname_select(id, type) {
    var arr = [];
    if (type == "ALL") {
        arr.push({text: "ALL", value: "ALL"});
        for (var i = 1; i <= g_wan_num; i++) {
            var wan_text = format_wan(i);
            var wan_val = "WAN" + i;
            arr.push({text: wan_text, value: wan_val});
        }
        arr.push({text: "LAN", value: "LAN"});
    }
    else if (type == "WAN") {
        for (var i = 1; i <= g_wan_num; i++) {
            var wan_text = format_wan(i);
            var wan_val = "WAN" + i;
            arr.push({text: wan_text, value: wan_val});
        }
    }
    else if (type == "LAN") {
        arr.push({text: "LAN", value: "LAN"});
    }
    else if (type == "WAN+LAN") {
        for (var i = 1; i <= g_wan_num; i++) {
            var wan_text = format_wan(i);
            var wan_val = "WAN" + i;
            arr.push({text: wan_text, value: wan_val});
        }
        arr.push({text: "LAN", value: "LAN"});
    }
    else if (type == "NODEV") {
        arr.push({text: appError.uiname_select, value: "nodev"});
        for (var i = 1; i <= g_wan_num; i++) {
            var wan_text = format_wan(i);
            var wan_val = "WAN" + i;
            arr.push({text: wan_text, value: wan_val});
        }
        arr.push({text: "LAN", value: "LAN"});
    }
    else if (type == "LAN+WAN") {
        arr.push({text: "LAN", value: "LAN"});
        for (var i = 1; i <= g_wan_num; i++) {
            var wan_text = format_wan(i);
            var wan_val = "WAN" + i;
            arr.push({text: wan_text, value: wan_val});
        }
    }
    paint_select(id, arr);
}

//转换函数
function math_unit_conversion(str) {
    var int_v = parseInt(str, 10);
    var map = {0: "", 1: "K", 2: "M", 3: "G", 4: "T"};
    var h = 0;
    for (h = 0; int_v > 1024; h++) {
        int_v = int_v / 1024;
    }
    if (h > 4) {
        int_v = int_v * Math.pow(1024, (h - 4));
        h = 4;
    }

    var ret_str = int_v.toString().indexOf(".") > -1 ? int_v.toFixed(2) : int_v;
    if (ret_str == "1024") {
        return "1" + map[h + 1];
    }
    else
        return ret_str + map[h];
}

function math_unit_converter(str) {
    var int_v = parseInt(str, 10);
    var map = {0: "B", 1: "K", 2: "M", 3: "G", 4: "T"};
    var h = 0;
    for (h = 0; int_v > 1024; h++) {
        int_v = int_v / 1024;
    }
    if (h > 4) {
        int_v = int_v * Math.pow(1024, (h - 4));
        h = 4;
    }

    var ret_str = int_v.toString().indexOf(".") > -1 ? int_v.toFixed(2) : int_v;
    return ret_str + map[h];
}

function convert_time(timeStr) {
    var int_v = parseInt(timeStr, 10), timeDW = appCommonJS.time;
    var map = {0: timeDW.sec, 1: timeDW.min, 2: timeDW.hour, 3: timeDW.day};
    var h = 0;
    if (0 < int_v < 60) {
        h = 0
    }
    if (int_v >= 60 && int_v < 3600) {
        h = 1
    }
    if (int_v >= 3600 && int_v < 86400) {
        h = 2
    }
    if (int_v >= 86400) {
        h = 3
    }
    var re_str = "";
    if (h == 0) {
        ret_str = int_v + map[h];
    }
    if (h == 1) {
        var p1 = 0, p2 = 0;
        p1 = Math.floor(int_v / 60);
        p2 = Math.floor(int_v % 60);
        if (p2 != 0)
            ret_str = p1 + map[h] + p2 + map[h - 1];
        else
            ret_str = p1 + map[h];
    }
    if (h == 2) {
        var p1 = 0, p2 = 0, p3 = 0;
        p1 = Math.floor(int_v / 3600);
        p2 = Math.floor((int_v % 3600) / 60);
        p3 = Math.floor(int_v % 60);
        if (p3 == 0 && p2 == 0)
            ret_str = p1 + map[h];
        else if (p3 != 0 && p2 == 0)
            ret_str = p1 + map[h] + p3 + map[h - 2];
        else if (p3 == 0 && p2 != 0)
            ret_str = p1 + map[h] + p2 + map[h - 1];
        else
            ret_str = p1 + map[h] + p2 + map[h - 1] + p3 + map[h - 2];
    }
    if (h == 3) {
        var p1 = 0, p2 = 0, p3 = 0, p4 = 0;
        p1 = Math.floor(int_v / (60 * 60 * 24));
        p2 = Math.floor((int_v / 3600) % 24);
        p3 = Math.floor((int_v % 3600) / 60);
        p4 = Math.floor(int_v % 60);
        if (p2 == 0 && p3 == 0 & p4 == 0)
            ret_str = p1 + map[h];
        else if (p2 != 0 && p3 == 0 && p4 == 0)
            ret_str = p1 + map[h] + p2 + map[h - 1];
        else if (p2 == 0 && p3 != 0 && p4 == 0)
            ret_str = p1 + map[h] + p3 + map[h - 2];
        else if (p2 == 0 && p3 == 0 && p4 != 0)
            ret_str = p1 + map[h] + p4 + map[h - 3];
        else if (p2 != 0 && p3 != 0 && p4 == 0)
            ret_str = p1 + map[h] + p2 + map[h - 1] + p3 + map[h - 2];
        else if (p2 == 0 && p3 != 0 && p4 != 0)
            ret_str = p1 + map[h] + p3 + map[h - 2] + p4 + map[h - 3];
        else if (p2 != 0 && p3 == 0 && p4 != 0)
            ret_str = p1 + map[h] + p2 + map[h - 1] + p4 + map[h - 3];
        else
            ret_str = p1 + map[h] + p2 + map[h - 1] + p3 + map[h - 2] + p4 + map[h - 3];
    }
    return ret_str;
}

function convert_time_reverse(s_val) {
    var timeDW = appCommonJS.time;
    var s_day = "";
    var s_hour = "";
    var s_min = "";
    var s_sec = "";
    var s_day_flag = false;
    var s_hour_flag = false;
    var s_min_flag = false;
    if (s_val.indexOf(timeDW.day) != -1) {
        s_day = s_val.split(timeDW.day)[0];
        s_day_flag = true;
    }
    if (s_val.indexOf(timeDW.hour) != -1) {
        s_hour_flag = true;
        if (s_day_flag) {
            s_hour = s_val.split(timeDW.day)[1].split(timeDW.hour)[0];
        }
        else {
            s_hour = s_val.split(timeDW.hour)[0];
        }
    }
    if (s_val.indexOf(timeDW.min) != -1) {
        s_min_flag = true;
        if (s_day_flag && s_hour_flag) {
            s_min = s_val.split(timeDW.day)[1].split(timeDW.hour)[1].split(timeDW.min)[0];
        }
        else if (s_day_flag && !s_hour_flag) {
            s_min = s_val.split(timeDW.day)[1].split(timeDW.min)[0];
        }
        else if (!s_day_flag && s_hour_flag) {
            s_min = s_val.split(timeDW.hour)[1].split(timeDW.min)[0];
        }
        else if (!s_day_flag && !s_hour_flag) {
            s_min = s_val.split(timeDW.min)[0];
        }
    }
    if (s_val.indexOf(timeDW.sec) != -1) {
        if (s_day_flag && s_hour_flag && s_min_flag) {
            s_sec = s_val.split(timeDW.day)[1].split(timeDW.hour)[1].split(timeDW.min)[1].split(timeDW.sec)[0];
        }
        else if (s_day_flag && s_hour_flag && !s_min_flag) {
            s_sec = s_val.split(timeDW.day)[1].split(timeDW.hour)[1].split(timeDW.sec)[0];
        }
        else if (s_day_flag && !s_hour_flag && s_min_flag) {
            s_sec = s_val.split(timeDW.day)[1].split(timeDW.min)[1].split(timeDW.sec)[0];
        }
        else if (s_day_flag && !s_hour_flag && !s_min_flag) {
            s_sec = s_val.split(timeDW.day)[1].split(timeDW.sec)[0];
        }
        else if (!s_day_flag && s_hour_flag && s_min_flag) {
            s_sec = s_val.split(timeDW.hour)[1].split(timeDW.min)[1].split(timeDW.sec)[0];
        }
        else if (!s_day_flag && s_hour_flag && !s_min_flag) {
            s_sec = s_val.split(timeDW.hour)[1].split(timeDW.sec)[0];
        }
        else if (!s_day_flag && !s_hour_flag && s_min_flag) {
            s_sec = s_val.split(timeDW.min)[1].split(timeDW.sec)[0];
        }
        else if (!s_day_flag && !s_hour_flag && !s_min_flag) {
            s_sec = s_val.split(timeDW.sec)[0];
        }
    }
    var s_uptime = 0;

    if (s_day != "")
        s_uptime += parseInt(s_day * 24 * 3600, 10);
    if (s_hour != "")
        s_uptime += parseInt(s_hour * 3600, 10);
    if (s_min != "")
        s_uptime += parseInt(s_min * 60, 10);
    if (s_sec != "")
        s_uptime += parseInt(s_sec, 10);
    return s_uptime;
}

//换行
function break_row(str, len) {
    var temp_str = "", n = 1;
    if (str.length <= len) {
        temp_str = str;
    }
    else {
        var temp_arr = new Array();
        for (var i = 0; i < str.length; i++) {
            temp_arr[i] = str.charAt(i);
            if (n % len == 0) {
                temp_arr[i] = temp_arr[i] + "<br/>";
            }
            n++;
            temp_str += temp_arr[i];
        }
    }
    return temp_str;
}

//===========================基本模块部分结束================================


//===========================通用模块部分开始================================

//各种组类型
//===========================用户组=========================================
var g_user_group;
//初始化用户组
function init_user_group(data) {
    $("#user_group_cnt").html("");
    g_user_group = data;
    var user_grp = data;
    for (var i in user_grp) {
        if (i % 3 == 0 && i != 0) {
            $("#user_group_cnt").append("<br/>");
        }
        var $cusr = $("<input type='checkbox' value='" + user_grp[i].gid + "' id='user_grp" + i + "'>");
        var $lusr = $("<label for='user_grp" + i + "' class='inline'>" + user_grp[i].name + "</label>");
        $("#user_group_cnt").append($cusr);
        $("#user_group_cnt").append($lusr);
    }
}
//修改用户组
function modify_user_group(data) {
    $("#user_group_cnt :checkbox").attr("checked", false);
    var len = $("#user_group_cnt :checkbox").length;
    var gid_value_arr = [];
    if (data.ugid == undefined)
        return;
    gid_value_arr = data.ugid.split(",");
    for (var i = 0; i < gid_value_arr.length; i++) {
        for (var m = 0; m < len; m++) {
            var usr_grp_value = $("#user_grp" + m).val();
            if (parseInt(gid_value_arr[i], 10) == parseInt(usr_grp_value, 10)) {
                $("#user_grp" + m).attr("checked", true);
                break;
            }
        }
    }
}
//绘制用户组
function paint_user_group(obj) {
    var str = '';
    var user_group_arr = [];
    if (obj.ugid == undefined)
        return str;
    user_group_arr = obj.ugid.split(",");
    for (var i in g_user_group) {
        for (var j in user_group_arr) {
            if (user_group_arr[j] == g_user_group[i].gid) {
                str += g_user_group[i].name + "<br/>";
                continue;
            }
        }
    }
    str = str.slice(0, -1);
    return str;
}

//===========================时间组/时间段设置=====================================

function paint_time_segment_dom() {
    var timeStr = appCommonJS.timeGroup;
    $("#time_segment_layer").html("");
    var str = "";
    str += '<div class="item">';
    str += '<label for="g_time0" class="form-label isneed">' + timeStr.time + '</label>';
    str += '<input type="radio" name="g_time" value="3" onClick="g_time_change(this.value)" id="g_time0" checked="checked"/>';
    str += '<label for="g_time0" class="inline margin-r">' + timeStr.fullDay + '</label>';
    str += '<input type="radio" name="g_time" value="1" onClick="g_time_change(this.value)" id="g_time1"/>';
    str += '<label for="g_time1" class="inline">' + timeStr.timeD + '</label>';
    str += '<input type="radio" name="g_time" value="2" onClick="g_time_change(this.value)" id="g_time2"/>';
    str += '<label for="g_time2" class="inline">' + timeStr.timeG + '</label>';
    str += '<input type="hidden" name="timer_enable" id="g_time_flag" value="3"/>';
    str += '</div>';
    str += '<div id="g_time_layer" class="off">';
    str += '<div class="item">';
    str += '<label class="form-label isneed">' + timeStr.week + '</label>';
    str += '<input type="checkbox" value="1" id="g_day0">';
    str += '<label for="g_day0" style="margin:0 3px;">' + timeStr.weekG[0] + '</label>';
    str += '<input type="checkbox" value="2" id="g_day1">';
    str += '<label for="g_day1" style="margin:0 3px;">' + timeStr.weekG[1] + '</label>';
    str += '<input type="checkbox" value="3" id="g_day2">';
    str += '<label for="g_day2" style="margin:0 3px;">' + timeStr.weekG[2] + '</label>';
    str += '<input type="checkbox" value="4" id="g_day3">';
    str += '<label for="g_day3" style="margin:0 3px;">' + timeStr.weekG[3] + '</label>';
    str += '<input type="checkbox" value="5" id="g_day4">';
    str += '<label for="g_day4" style="margin:0 3px;">' + timeStr.weekG[4] + '</label>';
    str += '<input type="checkbox" value="6" id="g_day5">';
    str += '<label for="g_day5" style="margin:0 3px;">' + timeStr.weekG[5] + '</label>';
    str += '<input type="checkbox" value="7" id="g_day6">';
    str += '<label for="g_day6" style="margin:0 3px;">' + timeStr.weekG[6] + '</label>';
    str += '<input type="hidden" name="timer_day" id="g_day" value=""/>';
    str += '</div>';
    str += '<div class="item">';
    str += '<label for="g_start_hour" class="form-label">' + timeStr.time + '</label>';
    str += '<input type="text" class="input-text input-small" maxlength="2" size="5" name="start_hour" id="g_start_hour"/>';
    str += '<label class="time-label" for="g_start_hour">' + appCommonJS.timeFull.hour + '</label>';
    str += '<input type="text" class="input-text input-small" maxlength="2" size="5" name="start_minute" id="g_start_min"/>';
    str += '<label class="time-label" for="g_start_min">' + appCommonJS.time.min + '</label>';
    str += '<label class="time-label">---</label>';
    str += '<input type="text" class="input-text input-small" maxlength="2" size="5" name="end_hour" id="g_end_hour"/>';
    str += '<label class="time-label" for="g_end_hour">' + appCommonJS.timeFull.hour + '</label>';
    str += '<input type="text" class="input-text input-small" maxlength="2" size="5" name="end_minute" id="g_end_min"/>';
    str += '<label class="time-label" for="g_end_min">' + appCommonJS.time.min + '</label>';
    str += '</div>';
    str += '</div>';
    str += '<div id="time_group_layer" class="off">';
    str += '<div class="item">';
    str += '<label class="form-label isneed">' + timeStr.timeG + '</label>';
    str += '<div class="inline" id="time_group_cnt"></div>';
    str += '</div>';
    str += '</div>';
    $("#time_segment_layer").html(str);
}

var g_time_obj = {};
//时间段设置
function g_time_change(value) {
    if (value == "3") {
        $("#g_time_layer").removeClass("on").addClass("off");
        $("#time_group_layer").removeClass("on").addClass("off");
    }
    else if (value == "1") {
        $("#g_time_layer").removeClass("off").addClass("on");
        $("#time_group_layer").removeClass("on").addClass("off");
    }
    else if (value == "2") {
        $("#g_time_layer").removeClass("on").addClass("off");
        $("#time_group_layer").removeClass("off").addClass("on");
    }


    $("#g_time_flag").val(value);
    //清空
    hide_msgbox();
    clear_g_time_text();
    nos.app.resizePage();
    //赋值
    if (g_time_obj.start_hour)
        $("#g_start_hour").val(g_time_obj.start_hour);
    if (g_time_obj.start_min)
        $("#g_start_min").val(g_time_obj.start_min);
    if (g_time_obj.end_hour)
        $("#g_end_hour").val(g_time_obj.end_hour);
    if (g_time_obj.end_min)
        $("#g_end_min").val(g_time_obj.end_min);
    if (g_time_obj.day) {
        var week = g_time_obj.day.split(' ');
        for (e = 0; e < week.length; e++) {
            var j = parseInt(week[e], 10) - 1;
            $("#g_day" + j).attr("checked", true);
        }
    }
}
//时间段显示
function show_g_time(data) {
    g_time_obj = {};
    if (!(data.start_hour == "0" && data.start_minute == "0" && data.end_hour == "0" && data.end_minute == "0" && data.timer_day == "")) {
        g_time_obj.start_hour = data.start_hour;
        g_time_obj.start_min = data.start_minute;
        g_time_obj.end_hour = data.end_hour;
        g_time_obj.end_min = data.end_minute;
        g_time_obj.day = data.timer_day;
    }
    radio_sele_set("g_time", data.timer_enable);
    g_time_change(data.timer_enable);
}
//打印时间段
function print_time_str(obj) {
    var weekStr = appCommonJS.timeGroup.weekG;
    var timer_enable = obj.timer_enable;
    var timer_str = '';
    if (timer_enable == "1") {
        var timer_day = obj.timer_day;
        var timer_day_arr = timer_day.split(' ');
        var start_hour = obj.start_hour;
        var start_minute = obj.start_minute;
        var end_hour = obj.end_hour;
        var end_minute = obj.end_minute;
        if (timer_day != '') {
            var tmp_str = "星期";
            for (var m = 0; m < timer_day_arr.length; m++) {
                var j = timer_day_arr[m];
                tmp_str = weekStr[parseInt(j, 10) - 1] + ",";
//                switch (parseInt(j, 10)) {
//                    case 1:
//                        tmp_str += "一,";
//                        break;
//                    case 2:
//                        tmp_str += "二,";
//                        break;
//                    case 3:
//                        tmp_str += "三,";
//                        break;
//                    case 4:
//                        tmp_str += "四,";
//                        break;
//                    case 5:
//                        tmp_str += "五,";
//                        break;
//                    case 6:
//                        tmp_str += "六,";
//                        break;
//                    case 7:
//                        tmp_str += "日,";
//                        break;
//                }

            }
            timer_str += tmp_str.slice(0, -1);

            if (!(0 == start_hour && 0 == start_minute && 23 == end_hour && 59 == end_minute)) {
                timer_str += " (" + format_number(start_hour) + ":" + format_number(start_minute) + "-" + +format_number(end_hour) + ":" + format_number(end_minute) + ")";
            }
        }
    }
    else if (timer_enable == "0") {
        timer_str = appCommonJS.timeGroup.fullDay;
    }
    else if (timer_enable == "2") {
        //时间组
        timer_str += paint_time_group(obj.time_group);
    }
    return timer_str;
}

function paint_time_group(obj) {
    var tmp_str = "";
    for (var i in obj) {
        for (var j in g_time_group) {
            if (obj[i].gid == g_time_group[j].kid) {
                tmp_str += g_time_group[j].name + "<br/>";
            }
        }
    }
    tmp_str = appCommonJS.timeGroup.timeG + "<br/>" + tmp_str.substring(0, tmp_str.length - 5);
    return tmp_str;
}

function format_number(no) {
    no = "" + no;
    if (no.length == 1) {
        no = "0" + no;
    }
    return no;
}
//清空时间段
function clear_g_time_text() {
    $("#g_start_hour").val("");
    $("#g_start_min").val("");
    $("#g_end_hour").val("");
    $("#g_end_min").val("");
    $("#g_day").val("");
    for (var i = 0; i < 7; i++) {
        $("#g_day" + i).attr("checked", false);
    }
}
//时间段校验
function check_g_time() {
    if (!check_time_week()) {
        return false;
    }
    if ("1" == $("#g_time_flag").val() && (!check_time_segment())) {
        return false;
    }
    if ("2" == $("#g_time_flag").val() && (!check_time_group())) {
        return false;
    }
    return true;
}

function check_time_week() {
    if ($("#g_time_flag").val() != "1")//1为时间段
        return true;
    else {
        var day_str = '';
        var nu = 0;
        for (var h = 0; h < 7; h++) {
            var obj = $('#g_day' + h);
            if (obj.get(0).checked == true) {
                day_str = day_str + obj.val() + ' ';
                nu++;
            }
        }
        if (day_str == "") {
            alert(appError.time_week);
            return false;
        }
        $("#g_day").val(day_str);
        return 1;
    }
}

function check_time_segment() {
    var hour_s = $("#g_start_hour");
    var min_s = $("#g_start_min");
    var hour_e = $("#g_end_hour");
    var min_e = $("#g_end_min");
    if ("" == hour_s.val() && "" == min_s.val() && "" == hour_e.val() && "" == min_e.val()) {
        hour_s.val(0);
        min_s.val(0);
        hour_e.val(23);
        min_e.val(59);
    }
    else {
        if (!check_app_input("g_time_segment")) {
            return false;
        }
        /*if(hour_s.val()*60+parseInt(min_s.val()) >= hour_e.val()*60+parseInt(min_e.val())){
         alert("结束时间应大于起始时间");
         return false;
         }*/
    }
    return true;
}

//时间组

//初始化时间组
var g_time_group;
function init_time_group_ctrl(data) {
    if (data.length == 0 || data.length == undefined) {
        $("#g_time2").hide();
        $("label[for=g_time2]").hide();
    }
    else {
        $("#g_time2").show();
        $("label[for=g_time2]").show();
        $("#time_group_cnt").html("");
        var time_grp = data;
        g_time_group = data;
        for (var i in time_grp) {
            if (i % 3 == 0 && i != 0) {
                $("#time_group_cnt").append("<br/>");
            }
            var $cusr = $("<input type='checkbox' value='" + time_grp[i].kid + "' id='time_grp" + i + "'>");
            var $lusr = $("<label for='time_grp" + i + "' class=\"inline\">" + time_grp[i].name + "</label>");
            $("#time_group_cnt").append($cusr);
            $("#time_group_cnt").append($lusr);
        }
    }
}

function time_group_error() {
    $("#g_time2").hide();
    $("label[for=g_time2]").hide();
}

//修改时间组
function modify_time_group(obj) {
    $("#time_group_cnt :checkbox").attr("checked", false);
    var len = $("#time_group_cnt :checkbox").length;
    if (obj.time_group == undefined)
        return;
    var data = obj.time_group;
    for (var i = 0; i < data.length; i++) {
        for (var m = 0; m < len; m++) {
            var time_grp_value = $("#time_grp" + m).val();
            if (parseInt(data[i].gid, 10) == parseInt(time_grp_value, 10)) {
                $("#time_grp" + m).attr("checked", true);
                break;
            }
        }
    }
}

//时间组校验
function check_time_group() {
    var ck_flag = false;
    var obj = $("#time_group_cnt :checkbox");
    for (var i = 0; i < obj.length; i++) {
        if (obj.eq(i).attr("checked")) {
            ck_flag = true;
            break;
        }
    }
    if (!ck_flag) {
        alert(appError.time_group);
        return false;
    }
    else
        return true;
}

//时间组提交
function get_time_group() {
    var obj = $("#time_group_cnt :checkbox");
    var count = 0;
    var tmp_input_str = "";
    for (var i = 0; i < obj.length; i++) {
        var name = "";
        var _this = $("#time_grp" + i);
        if (_this.attr("checked")) {
            if (i < 10) {
                name = "time00" + count;
            } else if (i >= 10 && i < 100) {
                name = "time0" + count;
            } else {
                name = "time" + count;
            }
            tmp_input_str += "<input name=\"" + name + "\" type=\"hidden\" value=\"" + _this.val() + "\"/>";
            count++;
        }
    }
    tmp_input_str += "<input name=\"nr\" value=\"" + count + "\" type=\"hidden\"/>";
    $("#time_group_cnt").after(tmp_input_str);
}

//========================================================================

//===========================网址组=========================================
//初始化网址组
function init_bw_url_group(content) {
    $("#url_grp_sel").html("");
    var ctent = content;
    if (ctent.length == 0) {
        $opt = $("<option value='-1'>" + appCommonJS.other.knull + "</option>");
        $opt.appendTo("#url_grp_sel");
        return;
    }
    for (var i in ctent) {
        $opt = $("<option value='" + ctent[i].gid + "'>" + ctent[i].name + "</option>");
        $opt.appendTo("#url_grp_sel");
    }
}

//===========================DNS组==========================================
var g_dns_group;
//change dgid into grp_name
//初始化DNS组
function init_dns_group_sele(content) {
    g_dns_group = content;
    $("#dns_filter_group").html("");
    var ctent = content;
    if (ctent.length == 0) {
        $opt = $("<option value='-1'>" + appCommonJS.other.knull + "</option>");
        $opt.appendTo("#dns_filter_group");
        return;
    }
    for (var i in ctent) {
        //$opt = $("<option value='"+ctent[i].gid+"'>"+ctent[i].name+"</option>");
        $opt = $("<option value='" + ctent[i].name + "'>" + ctent[i].name + "</option>");
        $opt.appendTo("#dns_filter_group");
    }
}

//绘制DNS组
function paint_dns_group(obj) {
    var str = '';
    /*	if(obj.dgid == undefined)
     return str;
     for(var i in g_dns_group){
     if(obj.dgid == g_dns_group[i].gid){
     str =  g_dns_group[i].name;
     }
     }*/
    if (obj.grp_name == undefined)
        return str;
    str = obj.grp_name;
    return str;
}


//===========================内网主机（源主机） 开始========================

//绘制内网主机（源主机）+用户组
function paint_lan_ip_dom() {
    var lanUser = appCommonJS.lanUserGroup;
    $("#lan_ip_layer_wrap").html("");
    var str = '';
    str += '<div id="lan_ip_layer">';
    str += '<div class="item">';
    str += '<label class="form-label isneed" for="lan_host_flag">' + lanUser.ipHost + '</label>';
    str += '<select id="lan_host_flag" name="lan_host_flag" onChange="lan_mode_change(this.value)">';
    str += '<option value="all" >' + lanUser.allHost + '</option>';
    //str += '<option value="user_group">用户组</option>';
    str += '<option value="host">' + lanUser.speHost + '</option>';
    str += '<option value="sub_host">' + lanUser.hostSubIp + '</option>';
    str += '<option value="ip_host">' + lanUser.hostIpD + '</option>';
    str += '</select>';
    str += '<input type="hidden" id="user_type" name="user_type"/>';
    str += '</div>';
    str += '<div id="lan_host_sub_ip" class="off">';
    str += '<div class="item">';
    str += '<label id="lan_host_first" for="lan_filter_ip" class="form-label isneed"></label>';
    str += '<input name="lan_host_ip" id="lan_filter_ip" type="text" class="input-text" size="17" maxlength="31"/>';
    str += '</div>';
    str += '<div class="item">';
    str += '<label id="lan_host_second" for="lan_filter_mask" class="form-label isneed"></label>';
    str += '<input name="lan_host_mask" id="lan_filter_mask" type="text" class="input-text" size="17" maxlength="31"/>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div id="user_group_layer" class="off">';
    str += '<div>';
    str += '<div id="user_group_cnt"></div>';
    str += '<input type="hidden" id="user_group" name="ugid" />';
    str += '</div>';
    str += '</div>';
    $("#lan_ip_layer_wrap").html(str);
}

//内网主机（源主机）类型切换
function lan_mode_change(ip_mode) {
    var lanIpStr = appCommonJS.lanUserGroup.lanIPTxt;
    $("#lan_filter_ip").val("");
    $("#lan_filter_mask").val("");
    $("#user_group_cnt :checkbox").attr("checked", false);
    if (ip_mode == "host") {
        $("#lan_host_sub_ip").removeClass("off").addClass("on");
        $("#user_group_layer").removeClass("on").addClass("off");
        $("#lan_host_first").html(lanIpStr.ip);
        $("#lan_host_second").html(lanIpStr.mask);
        $("#lan_filter_mask").val("255.255.255.255");
        $("#lan_filter_mask").attr("disabled", true);
    }
    else if (ip_mode == "sub_host") {
        $("#lan_host_sub_ip").removeClass("off").addClass("on");
        $("#user_group_layer").removeClass("on").addClass("off");
        $("#lan_host_first").html(lanIpStr.ip);
        $("#lan_host_second").html(lanIpStr.mask);
        $("#lan_filter_mask").val("");
        $("#lan_filter_mask").attr("disabled", false);
    }
    else if (ip_mode == "ip_host") {
        $("#lan_host_sub_ip").removeClass("off").addClass("on");
        $("#user_group_layer").removeClass("on").addClass("off");
        $("#lan_host_first").html(lanIpStr.startIp);
        $("#lan_host_second").html(lanIpStr.endIp);
        $("#lan_filter_mask").val("");
        $("#lan_filter_mask").attr("disabled", false);
    }
    else if (ip_mode == "user_group") {
        $("#lan_host_sub_ip").removeClass("on").addClass("off");
        $("#user_group_layer").removeClass("off").addClass("on");
    }
    else if (ip_mode == "all") {
        $("#lan_host_sub_ip").removeClass("on").addClass("off");
        $("#user_group_layer").removeClass("on").addClass("off");
    }
    nos.app.resizePage();
}
//修改内网主机（源主机）
function modify_lan_mode_change(obj) {
    var lanIpStr = appCommonJS.lanUserGroup.lanIPTxt;
    var user_type = obj.user_type;
    $("#lan_filter_ip").val("");
    $("#lan_filter_mask").val("");
    if (user_type == "1") {
        var ip_mode = obj.lan_host_flag;
        select_chose_set("lan_host_flag", ip_mode);
        if (ip_mode == "host") {
            $("#lan_host_sub_ip").removeClass("off").addClass("on");
            $("#lan_host_first").html(lanIpStr.ip);
            $("#lan_host_second").html(lanIpStr.mask);
            $("#lan_filter_mask").val('255.255.255.255');
            $("#lan_filter_mask").attr("disabled", true);
            $("#lan_filter_ip").val(obj.lan_host_ip);
        }
        else if (ip_mode == "sub_host") {
            $("#lan_host_sub_ip").removeClass("off").addClass("on");
            $("#lan_host_first").html(lanIpStr.ip);
            $("#lan_host_second").html(lanIpStr.mask);
            $("#lan_filter_mask").val(obj.lan_host_mask);
            $("#lan_filter_mask").attr("disabled", false);
            $("#lan_filter_ip").val(obj.lan_host_ip);
        }
        else if (ip_mode == "ip_host") {
            $("#lan_host_sub_ip").removeClass("off").addClass("on");
            $("#lan_host_first").html(lanIpStr.startIp);
            $("#lan_host_second").html(lanIpStr.endIp);
            $("#lan_filter_mask").val(obj.lan_host_mask);
            $("#lan_filter_mask").attr("disabled", false);
            $("#lan_filter_ip").val(obj.lan_host_ip);
        }
        else if (ip_mode == "all") {
            $("#lan_host_sub_ip").removeClass("on").addClass("off");
            $("#user_group_layer").removeClass("on").addClass("off");
        }
    }
    else if (user_type == "2") {
        $("#lan_host_sub_ip").removeClass("on").addClass("off");
        $("#user_group_layer").removeClass("off").addClass("on");
        select_chose_set("lan_host_flag", "user_group");
        modify_user_group(obj);
    }
}
//获取内网主机（源主机）+用户组字符串
function get_lanhost_str(data) {
    var lanhost_str = "";
    if ("all" == data.lan_host_flag) {
        lanhost_str = "ALL" + "<br/>";
    }
    else if ("host" == data.lan_host_flag) {
        lanhost_str = data.lan_host_ip + "<br/>";
    }
    else if ("sub_host" == data.lan_host_flag) {
        lanhost_str = data.lan_host_ip + "<br>/" + data.lan_host_mask + "<br/>";
    }
    else if ("ip_host" == data.lan_host_flag) {
        lanhost_str = data.lan_host_ip + "<br>/" + data.lan_host_mask + "<br/>";
    }
    else {
        lanhost_str = '';
    }
    lanhost_str += paint_user_group(data);
    return lanhost_str;
}
//获取内网主机（源主机）+用户组类型
function get_user_lan_ip_conbine() {
    if ($("#lan_host_flag").val() == "user_group") {
        $("#user_type").val("2");
        get_user_group();
    }
    else {
        $("#user_type").val("1");
    }
}
//获取用户组
function get_user_group() {
    var tmp_str = "";
    var len = $("#user_group_cnt :checkbox").length;
    for (var t = 0; t < len; t++) {
        if ($("#user_grp" + t).attr("checked")) {
            tmp_str += $("#user_grp" + t).val() + ",";
        }
    }
    $("#user_group").val(tmp_str);
    return tmp_str;
}
//内网主机（源主机）+用户组校验函数
function check_user_lan_ip_combine() {
    var ck_user_type = $("#lan_host_flag").val();
    if (ck_user_type != "user_group") {
        if (!lan_mode_check()) {
            return false;
        }
    }
    else {
        if (!check_user_group()) {
            return false;
        }
    }
    return true;
}
//内网主机（源主机）校验
function lan_mode_check() {
    var flag = $("#lan_host_flag").val();
    if ("host" == flag) {
        if (!check_app_input("lan_host")) {
            return false;
        }
    }
    else if ("sub_host" == flag) {
        if (!check_app_input("lan_sub_host")) {
            return false;
        }
    }
    else if ("ip_host" == flag) {
        if (!check_app_input("lan_ip_host")) {
            return false;
        }
        var return_val = host_ip_check("lan_filter_ip");
        if (return_val != true) {
            return false;
        }
    }
    return true;
}
//用户组校验
function check_user_group() {
    var ck_flag = false;
    var obj = $("#user_group_cnt :checkbox");
    var len = obj.length;
    for (var i = 0; i < len; i++) {
        if (obj.eq(i).attr("checked")) {
            ck_flag = true;
            break;
        }
    }
    if (!ck_flag) {
        alert(appError.user_group);
        return false;
    }
    else
        return true;
}

//===========================内网主机（源主机） 结束=======================


//===========================目的主机 开始===========================

//绘制目的主机+dns组
function paint_wan_ip_dom() {
    var wanIpStr = appCommonJS.wanUserGroup;
    $("#wan_ip_layer_wrap").html("");
    var str = '';
    str += '<div id="wan_ip_layer">';
    str += '<div class="item">';
    str += '<label class="form-label isneed" for="wan_host_flag">' + wanIpStr.desHost + '</label>';
    str += '<select id="wan_host_flag" name="wan_host_flag" onChange="wan_mode_change(this.value)">';
    str += '</select>';
    str += '</div>';
    str += '<div id="wan_host_sub_ip" class="off">';
    str += '<div class="item">';
    str += '<label id="wan_host_first" for="wan_filter_ip" class="form-label isneed"></label>';
    str += '<input name="wan_host_ip" id="wan_filter_ip" class="input-text" type="text" size="17" maxlength="31"/>';
    str += '</div>';
    str += '<div class="item">';
    str += '<label id="wan_host_second" for="wan_filter_mask" class="form-label isneed"></label>';
    str += '<input name="wan_host_mask" id="wan_filter_mask" class="input-text" type="text" size="17" maxlength="31"/>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div id="dns_type_choose_layer">';
    str += '<div id="dns_url_layer" class="item off">';
    str += '<label class="form-label isneed" for="dns_filter_url">DNS</label>';
    str += '<input type="text" id="dns_filter_url" class="input-text" name="dns_txt" maxlength="31" size="30" />';
    str += '<span class="tip">' + wanIpStr.tip + '</span>';
    str += '</div>';
    str += '<div id="dns_group_name_layer" class="item off">';
    str += '<label class="form-label isneed" for="dns_filter_group">' + wanIpStr.dnsG + '</label>';
    str += '<select id="dns_filter_group" name="grp_name" />';
    str += '</select>';
    str += '</div>';
    str += '</div>';
    $("#wan_ip_layer_wrap").html(str);
}

//初始化目的主机
//此函数接收一个参数判断是否类型为dns过滤页面的目的主机
function init_wan_mode_sele(type) {
    var wanStr = appCommonJS.lanUserGroup;
    $("#wan_host_flag").empty("");
    if (type == "dns_filter") {
        $("#wan_host_flag").append("<option value=\"dns\">DNS</option>");
        //$("#wan_host_flag").append("<option value=\"dns_group\">DNS组</option>");
        $("#dns_type_choose_layer").removeClass("off").addClass("on");
        $("#dns_url_layer").removeClass("off").addClass("on");
    }
    else {
        $("#wan_host_flag").append("<option value=\"all\" selected=\"selected\">" + wanStr.allHost + "</option>");
        $("#wan_host_flag").append("<option value=\"host\">" + wanStr.speHost + "</option>");
        $("#wan_host_flag").append("<option value=\"sub_host\">" + wanStr.hostSubIp + "</option>");
        $("#wan_host_flag").append("<option value=\"ip_host\">" + wanStr.hostIpD + "</option>");
        $("#wan_host_flag").append("<option value=\"dns\">DNS</option>");
        //$("#wan_host_flag").append("<option value=\"dns_group\">DNS组</option>");
    }
}
//目的主机类型切换
function wan_mode_change(ip_mode) {
    var strInfo = appCommonJS.lanUserGroup.lanIPTxt;
    $("#wan_filter_ip").val("");
    $("#wan_filter_mask").val("");
    $("#dns_filter_url").val("");
    $("#dns_filter_group").get(0).selectedIndex = "0";
    if (ip_mode == "host") {
        $("#wan_host_sub_ip").removeClass("off").addClass("on");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
        $("#wan_host_first").html(strInfo.ip);
        $("#wan_host_second").html(strInfo.mask);
        $("#wan_filter_mask").val("255.255.255.255");
        $("#wan_filter_mask").attr("disabled", true);
    }
    else if (ip_mode == "sub_host") {
        $("#wan_host_sub_ip").removeClass("off").addClass("on");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
        $("#wan_host_first").html(strInfo.ip);
        $("#wan_host_second").html(strInfo.mask);
        $("#wan_filter_mask").val("");
        $("#wan_filter_mask").attr("disabled", false);
    }
    else if (ip_mode == "ip_host") {
        $("#wan_host_sub_ip").removeClass("off").addClass("on");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
        $("#wan_host_first").html(strInfo.startIp);
        $("#wan_host_second").html(strInfo.endIp);
        $("#wan_filter_mask").val("");
        $("#wan_filter_mask").attr("disabled", false);
    }
    else if (ip_mode == "all") {
        $("#wan_host_sub_ip").removeClass("on").addClass("off");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
    }
    else if (ip_mode == "dns") {
        $("#wan_host_sub_ip").removeClass("on").addClass("off");
        $("#dns_type_choose_layer").removeClass("off").addClass("on");
        $("#dns_url_layer").removeClass("off").addClass("on");
        $("#dns_group_name_layer").removeClass("on").addClass("off");
    }
    else if (ip_mode == "dns_group") {
        $("#wan_host_sub_ip").removeClass("on").addClass("off");
        $("#dns_type_choose_layer").removeClass("off").addClass("on");
        $("#dns_group_name_layer").removeClass("off").addClass("on");
        $("#dns_url_layer").removeClass("on").addClass("off");
    }
    nos.app.resizePage();
}
//修改目的主机
function modify_wan_mode_change(obj) {
    var strInfo = appCommonJS.lanUserGroup.lanIPTxt;
    $("#wan_filter_ip").val("");
    $("#wan_filter_mask").val("");
    $("#dns_filter_url").val("");
    $("#dns_filter_group").get(0).selectedIndex = "0";
    var ip_mode = obj.wan_host_flag;
    select_chose_set("wan_host_flag", ip_mode);
    if (ip_mode == "host") {
        $("#wan_host_sub_ip").removeClass("off").addClass("on");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
        $("#wan_host_first").html(strInfo.ip);
        $("#wan_host_second").html(strInfo.mask);
        $("#wan_filter_mask").val('255.255.255.255');
        $("#wan_filter_mask").attr("disabled", true);
        $("#wan_filter_ip").val(obj.wan_host_ip);
    }
    else if (ip_mode == "sub_host") {
        $("#wan_host_sub_ip").removeClass("off").addClass("on");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
        $("#wan_host_first").html(strInfo.ip);
        $("#wan_host_second").html(strInfo.mask);
        $("#wan_filter_mask").val(obj.wan_host_mask);
        $("#wan_filter_mask").attr("disabled", false);
        $("#wan_filter_ip").val(obj.wan_host_ip);
    }
    else if (ip_mode == "ip_host") {
        $("#wan_host_sub_ip").removeClass("off").addClass("on");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
        $("#wan_host_first").html(strInfo.startIp);
        $("#wan_host_second").html(strInfo.endIp);
        $("#wan_filter_mask").val(obj.wan_host_mask);
        $("#wan_filter_mask").attr("disabled", false);
        $("#wan_filter_ip").val(obj.wan_host_ip);
    }
    else if (ip_mode == "all") {
        $("#wan_host_sub_ip").removeClass("on").addClass("off");
        $("#dns_type_choose_layer").removeClass("on").addClass("off");
    }
    else if (ip_mode == "dns") {
        $("#wan_host_sub_ip").removeClass("on").addClass("off");
        $("#dns_type_choose_layer").removeClass("off").addClass("on");
        $("#dns_url_layer").removeClass("off").addClass("on");
        $("#dns_group_name_layer").removeClass("on").addClass("off");
        $("#dns_filter_url").val(obj.dns_txt);
        $("#wan_host_flag").val();
    }
    else if (ip_mode == "dns_group") {
        $("#wan_host_sub_ip").removeClass("on").addClass("off");
        $("#dns_type_choose_layer").removeClass("off").addClass("on");
        $("#dns_group_name_layer").removeClass("off").addClass("on");
        $("#dns_url_layer").removeClass("on").addClass("off");
        //if($('#dns_filter_group option[value='+obj.dgid+']').length == 0){
        var dnsError = appError.dnsError;
        if ($('#dns_filter_group option[value=' + obj.grp_name + ']').length == 0) {
            if (current_html == "dns_filter") {
                alert(dnsError[0]);
                select_chose_set("wan_host_flag", "dns");
                wan_mode_change("dns");
            }
            else {
                alert(dnsError[1]);
                select_chose_set("wan_host_flag", "all");
                wan_mode_change("all");
            }
        }
        else {
            //$("#dns_filter_group").val(obj.dgid);
            $("#dns_filter_group").val(obj.grp_name);
        }
        $("#wan_host_flag").val();
    }
}
//获取目的主机+用户组字符串
function get_wanhost_str(data) {
    var wanhost_str = "", dnsStr = appCommonJS.dnsUserGroup;
    if ("all" == data.wan_host_flag) {
        wanhost_str = "ALL";
    }
    else if ("host" == data.wan_host_flag) {
        wanhost_str = data.wan_host_ip;
    }
    else if ("sub_host" == data.wan_host_flag) {
        wanhost_str = data.wan_host_ip + "<br>/" + data.wan_host_mask;
    }
    else if ("ip_host" == data.wan_host_flag) {
        wanhost_str = data.wan_host_ip + "<br>/" + data.wan_host_mask;
    }
    else if ("dns" == data.wan_host_flag) {
        wanhost_str = dnsStr.dns1 + data.dns_txt;
    }
    else if ("dns_group" == data.wan_host_flag) {
        wanhost_str = dnsStr.dns2 + paint_dns_group(data);
    }
    else {
        wanhost_str = '';
    }
    return wanhost_str;
}
//目的主机+dns组校验
function check_dns_wan_ip_combine() {
    var ck_user_type = $("#wan_host_flag").val();
    if (ck_user_type != "dns" && ck_user_type != "dns_group") {
        if (!wan_mode_check()) {
            return false;
        }
    }
    else {
        if (ck_user_type == "dns") {
            if (!get_msgbox("dns_filter_url", "fuzzy_url")) {
                return false;
            }
        }
    }
    return true;
}
//目的主机校验
function wan_mode_check() {
    var flag = $("#wan_host_flag").val();
    if ("host" == flag) {
        if (!check_app_input("wan_host")) {
            return false;
        }
    }
    else if ("sub_host" == flag) {
        if (!check_app_input("wan_sub_host")) {
            return false;
        }
    }
    else if ("ip_host" == flag) {
        if (!check_app_input("wan_ip_host")) {
            return false;
        }
        var return_val = host_ip_check("wan_filter_ip");
        if (return_val != true) {
            return false;
        }
    }
    return true;
}
//===========================目的主机 结束===========================

//===========================内网主机（源主机） 目的主机 共同函数===========================
//内网主机（源主机）/目的主机 起始IP大小校验
function host_ip_check(ctr) {
    var ip1 = $("#lan_filter_ip").val();
    var ip2 = $("#lan_filter_mask").val();
    var return_val = check_start_end_ip(ip1, ip2);
    if (return_val != true) {
        var ctr_obj = document.getElementById(ctr);
        var point_xy = getPosition(ctr_obj);
        point_xy.x += ctr_obj.clientWidth + 5;
        point_xy.y -= ctr_obj.clientHeight;
        var msgbox = new MessageBox(return_val, point_xy);
        msgbox.Show();
        return false;
    }
    return true;
}
//=====================================================================================


//=================================协议与端口===========================================

var port_proto_map = [];
port_proto_map[0] = ["", "", "tcp"];
port_proto_map[1] = ["HTTP", "80", "tcp"];
port_proto_map[2] = ["HTTPS", "443", "tcp"];
port_proto_map[3] = ["FTP", "21", "tcp"];
port_proto_map[4] = ["POP3", "110", "tcp"];
port_proto_map[5] = ["SMTP", "25", "tcp"];
port_proto_map[6] = ["DNS", "53", "udp"];
port_proto_map[7] = ["TELNET", "23", "tcp"];
port_proto_map[8] = ["IPSEC", "500", "udp"];
port_proto_map[9] = ["PPTP", "1723", "tcp"];
port_proto_map[10] = ["TERMINAL CLIENT", "3389", "tcp"];
port_proto_map[11] = ["GuruGuru", "9292", "tcp"];
port_proto_map[12] = ["H323 VoIP Phone", "1720", "tcp"];
port_proto_map[13] = ["Soribada", "22321", "udp"];
port_proto_map[14] = ["", "", ""];

//绘制协议与端口

function paint_proto_port_dom() {
    $("#proto_port_wrap").html("");
    var str = '';
    str += '<div id="proto_port_layer">';
    str += '<div class="item" id="out_port_layer">';
    str += '<label class="form-label" id="proto_name" for=""></label>';
    str += '<select id="proto" name="protocol" onchange="proto_user_sele(this.value);">';
    str += '</select>';
    str += '<span style="padding-left:5px"></span>';
    str += '<input class="input-text input-small" id="dest_port_a" type="text" size="5" maxlength="5" disabled="disabled" />';
    str += '<span style="padding:0 5px">-</span>';
    str += '<input class="input-text input-small" id="dest_port_b" type="text" size="5" maxlength="5" disabled="disabled" />';
    str += '</div><div id="proto_port_template_layer" class="off item"><label class="form-label"></label>';
    str += '<select id="protocol_sel" onChange="user_sele_protocol()">';
    str += '<option value="tcp" selected="true">' + appCommonJS.portMode.selectMode + '</option>';
    str += '<option value="tcp">HTTP</option>';
    str += '<option value="tcp">HTTPS</option>';
    str += '<option value="tcp">FTP</option>';
    str += '<option value="tcp">POP3</option>';
    str += '<option value="tcp">SMTP</option>';
    str += '<option value="udp">DNS</option>';
    str += '<option value="tcp">TELNET</option>';
    str += '<option value="udp">IPSEC</option>';
    str += '<option value="tcp">PPTP</option>';
    str += '<option value="tcp">Windows Terminal Client</option>';
    str += '<option value="tcp">GuruGuru</option>';
    str += '<option value="tcp">H323 VoIP Phone</option>';
    str += '<option value="udp">Soribada</option>';
    str += '</select>';
    str += '</div>';
    str += '<div id="in_port_layer" class="off item">';
    str += '<label for="" id="src_port_label" class="form-label"></label>';
    str += '<input class="input-text input-small" id="src_port_a" type="text" size="5" maxlength="5" />';
    str += '<span style="padding:0 5px">-</span>';
    str += '<input class="input-text input-small" id="src_port_b" type="text" size="5" maxlength="5" />';
    str += '</div>';
    str += '</div>';
    $("#proto_port_wrap").html(str);
}

//初始化协议与端口
//此函数接收一个参数,用于判断是哪个页面，需要以何种样式显示协议与端口
function init_user_sele_protocol(page_name) {
    var portHtml = appCommonJS.portMode.html;
    $("#proto").empty("");
    if (page_name != "virtual")
        $("#proto").append("<option value=\"all\" selected=\"selected\">ALL</option>");
    else////新增判断
        parentEmt.$("#proto").append("<option value=\"tcp\">TCP</option>");
        parentEmt.$("#proto").append("<option value=\"udp\">UDP</option>");
    $("#proto").append("<option value=\"tcp\">TCP</option>");
    $("#proto").append("<option value=\"udp\">UDP</option>");
    if (page_name == "access_control" || page_name == "qos_speed" || page_name == "qos_filter") {//访问控制 主机带宽控制 应用优先级
        $("#proto_name").html(portHtml.proto_name[0]);
        $("#src_port_label").html(portHtml.src_port_label[0]);
        $("#proto").append("<option value=\"tcp+udp\">TCP+UDP</option>");
        $("#proto").append("<option value=\"icmp\">ICMP</option>");
        $("#dest_port_a").attr("name", "start_port");
        $("#dest_port_b").attr("name", "end_port");
        $("#src_port_a").attr("name", "");
        $("#src_port_b").attr("name", "");
    }
    else if (page_name == "policy_routing") {//策略路由
        $("#proto_name").html(portHtml.proto_name[1]);
        $("#src_port_label").html(portHtml.src_port_label[1]);
        $("#in_port_layer").removeClass("off").addClass("on");
        $("#proto").append("<option value=\"tcp+udp\">TCP+UDP</option>");
        $("#proto").append("<option value=\"icmp\">ICMP</option>");
        $("#dest_port_a").attr("name", "start_port");
        $("#dest_port_b").attr("name", "end_port");
        $("#src_port_a").attr("name", "src_start_port");
        $("#src_port_b").attr("name", "src_end_port");
        $("#src_port_a").val("1");
        $("#src_port_b").val("65535");
    }
    else if (page_name == "virtual") {//虚拟服务
        //parentEmt.$("#proto_name").html(portHtml.proto_name[2]);
        //parentEmt.$("#src_port_label").html(portHtml.src_port_label[0]);
        parentEmt.$("#proto").append("<option value=\"tcp+udp\">TCP+UDP</option>");
        parentEmt.$("#dest_port_a").attr("disabled", false);
        parentEmt.$("#dest_port_b").attr("disabled", false);
        //parentEmt.$("#in_port_layer").removeClass("off").addClass("on");
        parentEmt.$("#dest_port_a").attr("name", "out_start_port");
        parentEmt.$("#dest_port_b").attr("name", "out_end_port");
        parentEmt.$("#src_port_a").attr("name", "in_start_port");
        parentEmt.$("#src_port_b").attr("name", "in_end_port");
        parentEmt.$("#dest_port_a").val("1");
        parentEmt.$("#dest_port_b").val("65535");
        parentEmt.$("#src_port_a").val("1");
        parentEmt.$("#src_port_b").val("65535");
    }
    else if (page_name == "capture") {//抓包
        $("#proto_name").html(portHtml.proto_name[0]);
        $("#src_port_label").html(portHtml.src_port_label[0]);
        $("#proto").append("<option value=\"tcp+udp\">TCP+UDP</option>");
        $("#proto").append("<option value=\"icmp\">ICMP</option>");
        $("#proto").append("<option value=\"arp\">ARP</option>");
        $("#dest_port_a").attr("name", "start_port");
        $("#dest_port_b").attr("name", "end_port");
        $("#src_port_a").attr("name", "");
        $("#src_port_b").attr("name", "");
    }
    $("#proto").append("<option value=\"template\">" + appCommonJS.portMode.selectMode + "</option>");
}

//模版事件函数
function user_sele_protocol() {
    var i = $("#protocol_sel").get(0).selectedIndex;
    $("#dest_port_a").val(port_proto_map[i][1]);
    if (current_html != "policy_routing") {
        $("#src_port_a").val(port_proto_map[i][1]);
    }
    $("#proto").val(port_proto_map[i][2]);
    $("#dest_port_b").val('');
    $("#dest_port_a").attr("disabled", false);
    $("#dest_port_b").attr("disabled", false);
    if (current_html != "policy_routing") {
        $("#src_port_a").attr("disabled", false);
        $("#src_port_b").attr("disabled", false);
    }
}
//协议事件函数
function proto_user_sele(strvalue) {
    var dest_a = $("#dest_port_a"),dest_b = $("#dest_port_b"),src_a = $("#src_port_a"),src_b = $("#src_port_b"),template_layer=$("#proto_port_template_layer");
    if (strvalue == 'all' || strvalue == 'icmp' || strvalue == 'arp') {
        template_layer.addClass("off");
        dest_a.add(dest_b).val("").prop("disabled",true);
        if (current_html != "policy_routing") {
            src_a.add(src_b).val("").prop("disabled",true);
        }
    }
    else if (strvalue == 'tcp' || strvalue == 'udp' || strvalue == 'tcp+udp') {
        template_layer.addClass("off");
        dest_a.val("1").prop("disabled",false);
        dest_b.val("65535").prop("disabled",false);
        if (current_html != "policy_routing") {
            src_a.val("1").prop("disabled",false);
            src_b.val("65535").prop("disabled",false);
        }
        /*if (current_html == "virtual") {
            parentEmt.$("#dest_port_a,#src_port_a").prop("disabled", false);
            parentEmt.$("#dest_port_b,#src_port_b").prop("disabled", false);
        }*/
    }
    else if (strvalue == 'template') {
        template_layer.removeClass("off");
        if ($("#proto option[value = 'all']").length != 0) {
            $("#proto").val("all");
            dest_a.add(dest_b).prop("disabled",true);
            if (current_html != "policy_routing") {
                src_a.add(src_b).prop("disabled",true);
            }
        }
        else {
            $("#proto").val("tcp");
        }
        dest_a.add(dest_b).val("");
        if (current_html != "policy_routing") {
            src_a.add(src_b).val("");
        }
    }
}
//修改协议于端口
function change_proto_user_sele(obj) {
    select_chose_set("proto", obj.protocol);
    proto_user_sele(obj.protocol);
    if (current_html != "virtual") {
        $("#dest_port_a").val(obj.start_port);
        $("#dest_port_b").val(obj.end_port);
        $("#src_port_a").val(obj.src_start_port);
        $("#src_port_b").val(obj.src_end_port);
    }
    else {
        parentEmt.$("#dest_port_a").val(obj.out_start_port);
        parentEmt.$("#dest_port_b").val(obj.out_end_port);
        parentEmt.$("#src_port_a").val(obj.in_start_port);
        parentEmt.$("#src_port_b").val(obj.in_end_port);
    }
}

//获取协议与端口字符串
function get_proto_port_str(data) {
    var proto_port_str = "";
    if ('ALL' == data.protocol || "ICMP" == data.protocol) {
        proto_port_str = data.protocol;
    }
    else {
        if (data.start_port != data.end_port) {
            proto_port_str = data.protocol + ':' + data.start_port + "-" + data.end_port;
        }
        else {
            var proto_str = get_filter_modal_by_port(data.start_port);
            if ("" != proto_str) {
                proto_port_str = data.protocol + ':' + proto_str;
            }
            else {
                proto_port_str = data.protocol + ':' + data.start_port;
            }
        }
    }
    return proto_port_str;
}
function get_filter_modal_by_port(port) {
    var str = "";
    for (var i = 0; i < port_proto_map.length; i++) {
        if (port == port_proto_map[i][1]) {
            str = port_proto_map[i][0];
        }
    }
    return str;
}
//协议于端口校验函数
function check_proto_sele() {
    var flag = $("#proto").val();
    var porta = $("#dest_port_a").val();
    var portb = $("#dest_port_b").val();
    if ("all" != flag && "icmp" != flag) {
        if (!check_app_input("port_a")) {
            return false;
        }
        if ("" != portb) {
            if (!check_app_input("port_b")) {
                return false;
            }
            var return_val = check_start_end_port(porta, portb);
            if (return_val != true) {
                var ctr_obj = document.getElementById("dest_port_a");
                var point_xy = getPosition(ctr_obj);
                point_xy.x += ctr_obj.clientWidth + 5;
                point_xy.y -= ctr_obj.clientHeight;
                var msgbox = new MessageBox(return_val, point_xy);
                msgbox.Show();
                return false;
            }
        }
    }
    return true;
}
//检查在lan_ip段的ip
function check_in_ip(str) {
    var ROUTE_INFO = ROUTE_INFO || parentEmt.ROUTE_INFO;
    var ipChkStr = parentEmt.check_ip(str);
    if (typeof ipChkStr == "string") {
        return ipChkStr;
    }
    var ipArray = str.split(".");
    var lanIpArray = ROUTE_INFO.lan_ip.split(".");
    var maskArray = ROUTE_INFO.lan_mask.split(".");

    for (var i = 0; i < ipArray.length; i++) {
        var ipPart = (lanIpArray[i]*1) & (maskArray[i]*1);
        if ((ipArray[i] !== ipPart + "") && (!!(maskArray[i]*1))) {
            return appError.in_ip;
        }
    }
    return true;
}
//检查不在lan_ip段的ip
function check_nin_ip(str) {
    var ROUTE_INFO = ROUTE_INFO || parentEmt.ROUTE_INFO;
    var ipChkStr = parentEmt.check_ip(str);
    if (typeof ipChkStr == "string") {
        return ipChkStr;
    }
    var ipArray = str.split(".");
    var lanIpArray = ROUTE_INFO.lan_ip.split(".");
    var maskArray = ROUTE_INFO.lan_mask.split(".");
    if (parentEmt.getIsSameSegment(ipArray, maskArray,lanIpArray, maskArray)) {
        return appError.nin_ip;
    }

    return true;
}
/* createTab by zhaoyan */
;
(function () {

    var temp = '<div class="tab-item" id="{tabId}" style="width:{width}">{tabTxt}</div>';
    var initTab = function (index) {
        $('.tab_area').undelegate('.tab-item', 'click').delegate('.tab-item', 'click', function () {
            var self = $(this);
            self.addClass('on').siblings().removeClass('on');
            var tmp_id;
            if (self.attr("id")) {
                tmp_id = self.attr("id").split("_tab")[0];
            }
            if (self.attr("name") && tmp_id) {
                var tmp_name = self.attr("name");
                load_app_page(tmp_id, tmp_name);
            } else {
                if (tmp_id) {
                    load_app_page(tmp_id, 'init_' + tmp_id);
                }
            }
        });
        createTab(index);
    };
    var createTab = function (index) {
        var nums = current_tab_name.length,
            html = '',
            width = (100 / nums).toFixed(2),
            tabArea = $('.tab_area');
        tabArea.html('');
        for (var i = 0; i < nums; i++) {
            html += temp.replace('{tabId}', current_tab_name[i].tab_id).replace('{tabTxt}', current_tab_name[i].tab_title);
        }
        if (!index) {
            index = 0;
        }
        tabArea.html(html).find('.tab-item').css('width', width + '%').eq(index).addClass('on').click();
    };
    window.initTab = initTab;
})();
/* createTab by houbingyang */
if(typeof this.parent == "function")
	var parentEmt = this;
else
	var parentEmt = this.parent;
var show_message = parentEmt.show_message || function (title, message) {
        alert(message)
    };
var show_dialog = parentEmt.show_dialog || function (title, confirm_callback, cancel_callback) {
        if (confirm(title)) {
            confirm_callback()
        }
    };
var utf8to16 = parentEmt.utf8to16;
var base64decode = parentEmt.base64decode;
var utf16to8 = parentEmt.utf16to8;
var base64encode = parentEmt.base64encode;
var show_lock_div=parentEmt.show_lock_div;
var dataDeal=parentEmt.dataDeal;

function radio_toggle(obj, o_event ,defineVal) {
    var name = $(obj).attr("id");
    var D_Values={
        on:(defineVal&&defineVal.on)?defineVal.on:1,
        off:(defineVal&&defineVal.off)?defineVal.off:0
    } ;

    if ($(obj).attr("class").indexOf("radio_on") != -1) {
        $(obj).removeClass("radio_on").addClass("radio_off");
        $("#" + name + "_hidden").val(D_Values.off);
    }
    else {
        $(obj).removeClass("radio_off").addClass("radio_on");
        $("#" + name + "_hidden").val(D_Values.on);
    }
    var str = $("#" + name + "_hidden").val();
    if (typeof(o_event) == "string")
        eval(o_event + "(" + str + ")");
    else if(typeof(o_event) == "function")
        o_event.call(this);
}

function radio_set(key, id,options) {
    var _values = {
        on:(options&&options.on)?options.on:1,
        off:(options&&options.off)?options.off:0
    };

    if(key == _values.off){
        $("#" + id).removeClass("radio_on").addClass("radio_off");
    }
    else{
        $("#" + id).removeClass("radio_off").addClass("radio_on");
    }
    $("#"+ id +"_hidden").val(key);
}
//APP Language function
var appLType = igd.global_param.language_type,
    appL = languageApp[appLType].HTML,
    appCommonJS = languageApp[appLType].COMMON,
    appError = languageApp[appLType].ERROR;
function init_app_language(path) {
    var L = path, member,
        reObj = function (str) {
            var changeStatus = str.replace(/_/g, "-"), _$1, _$2, _$3, _$4;
            _$1 = $("." + str);
            _$2 = $("#" + str);
            _$3 = $("." + changeStatus);
            _$4 = $(str);
            return (!!_$1.length ? _$1 : false) || (!!_$2.length ? _$2 : false) || (!!_$3.length ? _$3 : false) || (!!_$4.length ? _$4 : false);
        },
        setHtml = function (data, type) {
            for (var i in data) {
				var currentObj = reObj(i);
				if (!currentObj) {
					continue;
				}
				if (typeof data[i] != "string") {
					for (var j = 0; j < data[i].length; j++) {
						currentObj.eq(j)[type](data[i][j]);
					}
				}
				else {
					currentObj[type](data[i]);
				}
			}
        },
        attrSet = function (type, data) {
            for (var node in data) {
				var currentObj = reObj(node);
				if(!currentObj.length){continue;}
				if (currentObj.length > 0) {
					for (var n = 0; n < currentObj.length; n++) {
						currentObj.eq(n).attr(type, data[node]);
					}
				}
				else {
					currentObj.attr(type, data[node]);
				}
			}
        },
        init = function () {
            for (member in L) {
                switch (member) {
                    case "html":
                        setHtml(L[member], "html");
                        break;
                    case "value":
                        setHtml(L[member], "val");
                        break;
                    case "placeholder":
                        attrSet("placeholder", L[member]);
                        break;
                    case "title":
                        $("title").html(L[member]);
                        break;
                    case "alt":
                        attrSet("alt", L[member]);
                        break;
                }
            }
        };
    init();
}

function cutString(str, len) {
	var strlen = 0;
	var s = "";
	for(var i = 0;i < str.length; i++) {
		s = s + str.charAt(i);
		if (str.charCodeAt(i) > 255 || str.charCodeAt(i) < 0) {
			strlen = strlen + 3;
			if(strlen >= len){
				return s.substring(0,s.length-1) + "...";
			}
		} else {
			strlen = strlen + 1;
			if(strlen >= len){
				return s.substring(0,s.length-2) + "...";
			}
		}
	}
	return s;
}

/*
 *
 * time slot  by lwj
 *
 * */

;(function(){
    var timeFormat = function(val){
        return (val<10?"0"+val:val);
    };
    var timeSlot = {
        addEventList:function(){
            var timeSlotDom = $(".timeSlot");
            var maxNum = [23,59];
            var lastVal = "00";
            timeSlotDom.undelegate("input","keyup").delegate("input","keyup",function(){
                var viewValue = $(this).val(),errorStr;
                var _type = $(this).hasClass("hour")?0:1;
                (errorStr = viewValue.match(/[^0-9]+/gi)) && $(this).val(viewValue.replace(errorStr,""));
                viewValue = $(this).val()>>>0;
                viewValue>maxNum[_type] &&  $(this).val(maxNum[_type]);
            });
            timeSlotDom.undelegate("input","blur").delegate("input","blur",function(){
                $(this).val()==="" && $(this).val(lastVal);
                var viewValue = $(this).val()>>>0;
                viewValue<10 && $(this).val("0"+viewValue);
            });
            timeSlotDom.undelegate("input","focus").delegate("input","focus",function(){
                lastVal = $(this).val();
                $(this).val("");
            });
        },
        setData:function(data){
            if(!!data){
                $(".start.hour").val(timeFormat(data["start_hour"]));
                $(".start.min").val(timeFormat(data["start_minute"]));
                $(".end.hour").val(timeFormat(data["end_hour"]));
                $(".end.min").val(timeFormat(data["end_minute"]));
            }else{
                $(".start,.end").val("00");
            }
        },
        check:function(startH,startM,endH,endM){
            var start_h = startH>>0 || ($(".start.hour").val())>>0;
            var start_m = startM>>0 || ($(".start.min").val())>>0;
            var end_h = endH>>0 ||($(".end.hour").val())>>0;
            var end_m = endM>>0 ||($(".end.min").val())>>0;
            end_h ===0&&start_h !==0&&(end_h=24);
            if(start_h<=end_h){
                 start_m === 0 &&(start_h-=1,start_m=60);
                 end_m === 0 &&(end_h-=1,end_m=60);
                 if(end_h===start_h && end_m===start_m){
                    show_message("msg_info",appCommonJS.timeSlotErrorTip.startAndEnd);return false;
                 }
                if((end_h===start_h && end_m-start_m>=0&&end_m-start_m<5)||(end_h === (start_h+1)&&(60+end_m-start_m)<5)){
                    show_message("msg_info",appCommonJS.timeSlotErrorTip.atLeastFiveMinute);return false;
                 }
            }
            return true;
        },
        init:function(data){
            var me = this ;
            var timeHtml = "<input class='start hour' name='start_hour' maxlength='2' value='00' autocomplete='off'/>" +
                "<b  class='timeSlot_unit' id='hourStart'> 点</b>" +
                "<input class='start min'  name='start_minute' maxlength='2' value='00' autocomplete='off'/>" +
                "<b class='spacing' class='timeSlot_unit' id='minStart'> 分&nbsp; ~ &nbsp;</b>" +
                "<input class='end hour'  name='end_hour' maxlength='2' value='00' autocomplete='off'/>" +
                "<b class='timeSlot_unit' id='hourEnd'> 点</b>" +
                "<input class='end min'  name='end_minute'  maxlength='2' value='00' autocomplete='off'/>" +
                "<b class='timeSlot_unit' id='minEnd'> 分</b>";
            var timeSlotDom = $(".timeSlot");
            timeSlotDom.html(timeHtml);
            data && me.setData(data);
            me.addEventList();
        }
    };
    var weekSlot = {
        addEventList:function(){
            var weeks = $(".weekSlot span");
            $(".weekSlot").undelegate("span","click").delegate("span","click",function(){
                $(this).toggleClass("active");
                setWeekDay();
            });
            function setWeekDay(){
                var weekDay = [];
                $.each(weeks,function(i,n){
                    if($(n).hasClass("active")){
                        weekDay.push(i+1);
                    }
                });
                $(".weekSlotVal").val(weekDay.join(" "));
            }
        },
        check:function(){
            if(!$(".weekSlotVal").val()){
                show_message("msg_info",appCommonJS.timeSlotErrorTip.atLeastOneWeekDay);
                return false;
            }
            return true;
        },
        setData:function(data){
            var weekObj = $(".weekSlot span");
            weekObj.removeClass("active");
            if(!!data){
                data = data.replace(/\+/gi," ");
                var checkedWeek = data.split(" ");
                var activeLen = checkedWeek.length;
                for(var i =0;i<activeLen;i++){
                    weekObj.eq(checkedWeek[i]-1).addClass("active");
                }
            }
            $(".weekSlotVal").val(data);
        },
        init:function(data){
            var me = this;
            var weekHtml = "<span class='noMargin'>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>" +
                "<input type='hidden' name='timer_day' class='weekSlotVal' />";
            $(".weekSlot").html(weekHtml);
            me.addEventList();
            data && me.setData(data);
        }
    };

    var _init_weekStr  = function(weeks){
        var weekLang = ["一","二","三","四","五","六","日"];
        var weekArr = weeks.replace(/(\+|\s)/gi,",").split(",").sort();
        var weekLen = weekArr.length;
        var weekStr="";
        if(weekLen===7){
            weekStr="每天";
        }else{
            for(var i = 0;i<weekLen;i++){
                if(weekArr[i]>=6){
                    weekStr+="<span class='weekend'>星期"+weekLang[weekArr[i]-1]+"</span> ";
                }else{
                    weekStr+="星期"+weekLang[weekArr[i]-1]+" ";
                }
            }
        }
        return weekStr;
    };

    function _table_timeFormat(data){
        var listLen = data.length;
        var listArr_tab = [];
        for(var i = 0;i<listLen;i++){
            var list = [];
            list.index= i+1;
            list.time = timeFormat(data[i]['start_hour'])+":"+timeFormat(data[i]['start_minute'])+"~"+timeFormat(data[i]['end_hour'])+":"+timeFormat(data[i]['end_minute']);
            list.week = _init_weekStr(data[i].timer_day);
            list._person_id=i;
            listArr_tab.push(list);
        }
        return listArr_tab;
    }

    window.timeSlot = timeSlot;
    window.weekSlot = weekSlot;
    window.timeSlotTableFormat = _table_timeFormat;
    window.init_weekStr = _init_weekStr;
    window.timeSlotFormat = timeFormat;
})();

//表格复选框选中事件
function checkbox_bind_event(id,fun){
    $("#"+id).off("click",".checkbox").on("click",".checkbox",function(){
        var checked_tr=$(this).parent().parent();
        if(checked_tr.hasClass("checked")){
            checked_tr.removeClass("checked");
        }else{
            checked_tr.addClass("checked");
        }
        checkbox_btn_show(id,fun);
    });
    checkbox_btn_show(id,fun);
}
//解绑选中按钮状态显示
function checkbox_btn_show(id,fun){
    var checked_dhcp=$("#"+id+" .checked");
    if(checked_dhcp.length>=1){
        if($("#btn_unbind").hasClass("btn_gray")){
            $("#btn_unbind").removeClass("btn_gray").on("click",function(){
                checked_unbind(id,fun);
            });
        }
    }else{
        $("#btn_unbind").addClass("btn_gray").off("click");
    }
}
//解绑选中
function checked_unbind(id,fun){
    var checked=$("#"+id+" .checked");
    var index_list=[];
    checked.each(function(){
        var index=$(this).index();
        index_list.push(index);
    });
    fun(index_list);
}