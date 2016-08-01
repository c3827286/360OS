var isEditFinish = true;
var childrenListsArr = [];
var lastScrollTop = 0;
var appLanguageJs = appL.baby_mode.js;
;
(function () {
    timeSlot.init();
    weekSlot.init("1 2 3 4 5 6 7");
    var baby_mode = {
        init: function () {
            var babyModelListDeferred = $.Deferred();
            var getBabyModeList = function () {
                parentEmt.json_ajax({
                    url: "/app/devices/webs/getchildlist.cgi",
                    data: {action: "mul_get"},
                    successFn: function (data) {
                        renderBabyModeList(data);
                    }
                });
                function renderBabyModeList(data) {
                    childrenListsArr = data;
                    var babyModeList = "";
                    if (data.length > 0) {
                        var temp = data;
                        for (var i = 0, length = temp.length; i < length; i++) {
                            var name = temp[i].alias || temp[i].device_label || temp[i].name || appCommonJS.other.unknownDevice;
                            var full_name = parentEmt.removeHTMLTag(name);
                            name = parentEmt.removeHTMLTag(parentEmt.GetDeviceNameStr(name));
                            var timeSlotHtmlStr = create_timeSlot(temp[i], name, full_name, i);
                            var addBtnPosClass = "";
                            temp[i].child_time.length === 0 && (addBtnPosClass = "noTimeSlot");
                            temp[i].child_time.length === 4 && (addBtnPosClass = "off");
                            babyModeList += '<div id="baby-mode-' + i + '" class="device-item ' + (temp[i].sex >> 0 == 1 ? "boy" : "girl") + '">' +
                                '<span class="close"  title="' + appLanguageJs.cancel_baby_mode + '" onclick="cancelBabyMode(\'' + temp[i].mac + '\', ' + i + ')">X</span>' +
                                '<div class="device-name" title=\'' + full_name + '\'>' +
                                name +
                                '</div>' +
                                '<div class="device-detail">' +
                                '<div class="info"><ul>' + timeSlotHtmlStr + '</ul></div>' +
                                '<span class="settting-btn ' + addBtnPosClass + '" onclick="setBabyMode(\'' + i + '\',\'' + name + '\',\'' + full_name + '\')">' + appLanguageJs.manageOnline + '</span>' +
                                '</div>' +
                                '</div>';
                        }
                    }
                    $(".baby-mode-list").html(babyModeList);
                    nos.app.resizePage();
                    $("html,body", window.parent.document).scrollTop(lastScrollTop);
                    babyModelListDeferred.resolve();
                }

                function create_timeSlot(data, name, full_name, id) {
                    var timeHtml = "";
                    if (data.child_time.length > 0) {
                        var timeFormat = timeSlotTableFormat(data.child_time);
                        var timeLen = timeFormat.length;
                        var listODD = "";
                        var isOffTimeSlot = "";
                        for (var i = 0; i < timeLen; i++) {
                            listODD = "";
                            isOffTimeSlot = "";
                            if (i % 2 !== 0) listODD = "_children_list_odd";
                            if (data.child_time[i].timer_enable == 0) isOffTimeSlot = "  timer_slot_off";
                            timeHtml += "<li class='" + listODD + isOffTimeSlot + "'><p><span class='time_line'>" + timeFormat[i].time + "</span><br/><span class='time_week'>" + timeFormat[i].week + "</span></p><a href='javascript:void(0)' onclick=\"baby_mode_enable('" + data.mac + "\',\'" + id + "\',\'" + i + "\')\" class='status'>" + appLanguageJs.status_btn[data.child_time[i].timer_enable] + "</a><a href='javascript:void(0)' onclick=\"del_baby_mode_one_timeSlot('" + data.mac + "\',\'" + i + "\')\" class='del'>" + appLanguageJs.opt_btn[1] + "</a><a href='javascript:void(0)' onclick=\"setBabyMode('" + id + "\',\'" + name + "\',\'" + full_name + "\',\'" + i + "\')\" class='edit'>" + appLanguageJs.opt_btn[0] + "</a></li>"
                        }
                    }
                    return timeHtml;
                }

                return babyModelListDeferred.promise();
            };
            var getWaitingList = function () {
                var waitingListDeferred = $.Deferred();
                nos.app.net("/app/devices/webs/getdeviceslist.cgi", "noneed=noneed", renderBabyModeWaitingList);
                function renderBabyModeWaitingList(data) {
                    var babyModeWaitingList = "";
                    if (data && data.data) {
                        var temp = data.data;
                        var tempLength = temp.length;
                        for (var i = 0; i < tempLength; i++) {
                            if (temp[i].is_child == "1") {
                                continue;
                            }
                            if (temp[i].device_label == "unknown")
                                temp[i].device_label = "";
                            else if (temp[i].device_label.indexOf(appLanguageJs.camera) != -1)
                                temp[i].os_type = "10";
                            else if (temp[i].device_label.indexOf(appLanguageJs.router) != -1)
                                temp[i].os_type = "11";
                            else if(temp[i].name.indexOf("360R1")>-1){
                                temp[i].os_type = "12";
                            }else if(temp[i].name.indexOf("POWER4S")>-1){
                                temp[i].os_type = "13";
                            }
                            var name = temp[i].alias || temp[i].device_label || temp[i].name || appCommonJS.other.unknownDevice;
                            var full_name = parentEmt.removeHTMLTag(name);
                            name = parentEmt.removeHTMLTag(parentEmt.GetDeviceNameStr(name));
                            babyModeWaitingList += '<div class="device-item ' + getDeviceType(temp[i].os_type) + '">' +
                                '<div class="device-info">' +
                                '<div class="device-name-section">' +
                                '<p>' +
                                '<span class="device-name" title=\'' + full_name + '\'>' + name + '</span>' +
                                '</p>' +
                                '</div>' +
                                '<div class="device-ip-section">' +
                                '<p> ' +
                                'IP: <span class="device-ip">' + temp[i].ip + '</span>' +
                                '</p>' +
                                '<p>' +
                                'MAC: <span class="device-mac">' + temp[i].mac + '</span>' +
                                '</p>' +
                                '</div>' +
                                '<div class="device-ctrl-section">' +
                                '<button class="set-button" onclick="start_baby_mode_setting(\'' + temp[i].mac + '\',\'' + name + '\',\'' + full_name + '\')">' + appLanguageJs.setBabyMode + '</button>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                    }
                    if (babyModeWaitingList == "") {
                        $(".waiting-list-title").html(appLanguageJs.noBabyModeFamilyTxt);
//        babyModeWaitingList +="<div class='device-item no-device-list'><div class='device-info'>"+appLanguageJs.noBabyModeFamilyTxt+"</div></div>";
                    } else {
                        $(".waiting-list-title").html(appL.baby_mode.index.html.waiting_list_title);
                    }
                    $("body").attr("class", "adding-mode");
                    $(".baby-mode-waiting-list").html(babyModeWaitingList);
                    nos.app.resizePage();
                    $("html,body", window.parent.document).scrollTop(lastScrollTop);
                    waitingListDeferred.resolve();
                }

                return waitingListDeferred.promise();
            };
            $.when(getBabyModeList(), getWaitingList()).done(function () {
                isEditFinish = true;
                baby_mode.addEventList();
            });
        },
        addEventList: function () {
            var setSec = $(".setting-panel");
            setSec.undelegate(".cancel-btn", "click").delegate(".cancel-btn", "click", function () {
                togglePanel(0);
            });
            setSec.undelegate(".submit-btn", "click").delegate(".submit-btn", "click", function () {
                if (!startEditProcess()) {
                    return;
                }
                if (!timeSlot.check() || !weekSlot.check()) {
                    isEditFinish = true;
                } else {
                    var inputs = $("input.start,input.end"),
                        start = $(inputs[0]).val() + $(inputs[1]).val(),
                        end = $(inputs[2]).val() + $(inputs[3]).val(),
                        sex = $("input[name=sex]:checked").val(),
                        mac = $(".submit-mac").val(),
                        action = $(".submit-action").val(),
                        timer_day = $("input[name=timer_day]").val(),
                        url = "action=" + action + "&sex=" + sex + "&mac=" + mac + "&timer_enable=1&timer_day=" + timer_day + "&start_hour=" + $(inputs[0]).val() + "&start_minute=" + $(inputs[1]).val() + "&end_hour=" + $(inputs[2]).val() + "&end_minute=" + $(inputs[3]).val();
                    if (action === "mod") {
                        url += "&idx=" + $(".submit-idx").val();
                    }
                    nos.app.net("/app/devices/webs/setchildlist.cgi", url, function () {
                        togglePanel(0);
                    });
                }
            });
            setSec.undelegate("#boy,#girl", "change").delegate("#boy,#girl", "change", function () {
                var sex = ( $("input[name=sex]:checked").val() >>> 0 === 0 ? "girl" : "boy");
                $("#" + sex).prop("checked", "checked");
                $(".setting-panel").attr("class", "setting-panel").addClass(sex);
            });
        }
    };
    init_app_language(appL.baby_mode.index);
    baby_mode.init();
    window.babyMode = baby_mode;
    window.startEditProcess = function () {
        if (isEditFinish) {
            isEditFinish = false;
            return true;
        } else {
            return false;
        }
    };
})();

//页面切换
function togglePanel(mark) {
    var _body = $("body");
    if (mark === 0) {
        babyMode.init();
    } else if (mark === 1) {
        _body.removeClass().addClass("setting-mode");
        nos.app.resizePage();
    }
}

//获取设备类型
function getDeviceType(typeN) {
    if (typeN in {2: "iPhone", 3: "Android", 4: "Windows Phone"}) {
        return "mobile";
    }
    else if (typeN in {1: "Windows", 5: "Mac OS X", 6: "Linux"}) {
        return "pc";
    }
    else if (typeN in {7: "Pad"}) {
        return "pad";
    }
    else if (typeN in {10: "Camera"}) {
        return "camera";
    }
    else if (typeN in {11: "Router"}) {
        return "router";
    }
    else if(typeN in {12:"Repeater"}){
        return "repeater";
    }
    else if(typeN in {13:"Power4s"}){
        return "power4s";
    }
    else {
        return "none"
    }
}

//取消儿童模式
function cancelBabyMode(mac, i) {
    if (!startEditProcess()) {
        return;
    }
    lastScrollTop = $("body", window.parent.document).scrollTop() || $("html", window.parent.document).scrollTop();
    nos.app.net("/app/devices/webs/delchildlist.cgi", "mac=" + mac, function () {
        $("#baby-mode-" + i).fadeOut();
        babyMode.init();
    });
}
//新增儿童模式
function start_baby_mode_setting(mac, name) {
    if (!startEditProcess()) {
        return;
    }
    lastScrollTop = $("body", window.parent.document).scrollTop() || $("html", window.parent.document).scrollTop();
    nos.app.net("/app/devices/webs/setchildlist.cgi", "action=new&sex=1&mac=" + mac, function (data) {
        if (data.err_no == 0) {
            babyMode.init();
        } else {
            show_message("error", igd.make_err_msg(data));
            //show_message("msg_info", appLanguageJs.babyModeLimitTip);
            isEditFinish = true;
        }
    });
}
//设置儿童保护时间 添加 + 修改
function setBabyMode(id, name, fullName, timeSlotId) {
    var inputs = $("input.start,input.end");
    var deviceItem = childrenListsArr[id];
    inputs.val("00");
    togglePanel(1); //打开面板
    if (typeof timeSlotId !== "undefined") {
        var timeObj = deviceItem.child_time[timeSlotId];
        timeObj && timeSlot.setData(timeObj);
        timeObj && weekSlot.setData(timeObj.timer_day);
        $(".submit-idx").val(timeObj.idx);
        $(".submit-action").val("mod");
    } else {
        timeSlot.setData();
        weekSlot.setData("1 2 3 4 5 6 7");
        $(".submit-action").val("add");
    }
    $(".submit-mac").val(deviceItem.mac);
    $(".device-name-title").html("(" + name + ")").attr("title", fullName);
    var sexId = (deviceItem.sex >>> 0 == 0 ? "girl" : "boy");
    $("#" + sexId).prop("checked", "checked");
    $(".setting-panel").attr("class", "setting-panel").addClass(sexId);
}
//删除一条时间段
function del_baby_mode_one_timeSlot(mac, id) {
    if (!startEditProcess()) {
        return;
    }
    lastScrollTop = $("body", window.parent.document).scrollTop() || $("html", window.parent.document).scrollTop();
    nos.app.net("/app/devices/webs/setchildlist.cgi", "action=del&idx=" + id + "&mac=" + mac, function () {
        babyMode.init();
    });
}
//改变状态
function baby_mode_enable(mac, id, idx) {
    if (!startEditProcess()) {
        return;
    }
    lastScrollTop = $("body", window.parent.document).scrollTop() || $("html", window.parent.document).scrollTop();
    var obj = childrenListsArr[id];
    var list = obj["child_time"][idx];
    var url = "action=mod" + "&idx=" + idx + "&sex=" + obj.sex + "&mac=" + obj.mac + "&timer_enable=" + (!(list.timer_enable >> 0) >> 0) + "&timer_day=" + list.timer_day + "&start_hour=" + list.start_hour + "&start_minute=" + list.start_minute + "&end_hour=" + list.end_hour + "&end_minute=" + list.end_minute;
    nos.app.net("/app/devices/webs/setchildlist.cgi", url, function () {
        babyMode.init();
    });
}



