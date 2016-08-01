var appHtml = appL.multi_pppd.js, current_tab_name = [
    {tab_title: appHtml.tabTitle[0], tab_id: "quicken_pppd_tab"},
    {tab_title: appHtml.tabTitle[1], tab_id: "quicken_log_tab"}
];
$(document).ready(function () {
    initTab();
});
(function () {
    var lastQuickenState = 0;

    var dataDeal = parentEmt.dataDeal;

    var formatSpeed = parentEmt.formatSpeed;

    var btn_quicken_status = "quicken";

    var statusOutTimeId = null;

    var get_speed_txt = function (data) {
        var max_speed = formatSpeed(data), max_Munit, resultSpeed;
        max_Munit = max_speed.unit === "KB/s" ? (max_speed.value / 1024).toFixed(1) : max_speed.value;
        resultSpeed = Math.floor(parseInt(max_Munit * 8)) + 1;
        return  (resultSpeed > 100 ? 100 : resultSpeed) + "M";
    };

    var get_quicken_status = function (isSearchState, timer, noLoop) {
        /*isSearchResult    2/4/4*/
        var quickenStatusDeferred = $.Deferred();
        if (isSearchState && isSearchState <= lastQuickenState) {
            quickenStatusDeferred.resolve();
        } else {
            (function () {
                statusOutTimeId = setTimeout(function () {
                    var quickenStatus = arguments.callee;
                    $.post("/app/multi_pppd/webs/multi_dial_dump_status.cgi", {wanid: 0}, function (data) {
                        var obj = dataDeal(data);
                        var resData = obj.data[0];
                        if (obj.err_no === "0") {
                            if (isSearchState && resData.state !== "4" && resData.state < isSearchState) {
                                if (!noLoop && resData.state === "0") {
                                    quickenStatusDeferred.reject({status: 2});
                                } else {
                                    noLoop ? quickenStatusDeferred.reject() : statusOutTimeId = setTimeout(quickenStatus, 3000);
                                }
                            } else if (isSearchState && resData.state === "4" && isSearchState !== 4 && resData.status !== "1") {
                                quickenStatusDeferred.reject({status: get_errorId_map(resData.status>>0)});
                            } else {
                                if (!isSearchState && resData.state === "0") {
                                    quickenStatusDeferred.reject();
                                } else {
                                    quickenStatusDeferred.resolve(resData);
                                }
                            }
                        } else {
                            quickenStatusDeferred.reject({status: 2});
                            console.log("multi_dial_dump_status.cgi --- error!");
                        }
                    });
                }, timer || 0);
            })();
        }
        return quickenStatusDeferred.promise();
    };

    var get_errorId_map = function (status){
        var _errorId = 0;
        switch (status){
            case 3:_errorId=1;break;
            case 5:_errorId=3;break;
            case 6:_errorId=2;break;
            default :_errorId=0;
        }
        return _errorId;
    };

    var quicken_check_status = function (status) {
        var statusArr = ["quicken", "quickening", "failure"];
        var isQuickening = !!(status % 2);
        var btnQuicken = $(".quicken_btn");
        var condition = $("#quickening_tip");
        $(".quickened_tip").hide();
        $(".quicken_status_logo").removeClass("quicken quickening failure").addClass(statusArr[status]);
        isQuickening ? (btnQuicken.addClass("quickening"), condition.show()) : (btnQuicken.removeClass("quickening"), condition.hide());
        status === 0 && $("#quicken_footer_tip").show();
        status === 2 && $("#quicken_header_tip").show();
        btnQuicken.html(appHtml.quicken_btn[statusArr[status]]);
        $("#quicken_check").show();
        $("#quicken_result").hide();
    };

    var quicken_condition_check = {
        status: function (status) {
            var enhance = appHtml.enhanceTip;
            for (var i = 0; i < 3; i++) {
                if (i === status) {
                    $(".quickeningTip:eq(" + i + ")").removeClass("check_suc").addClass("condition_loading").html(enhance[i][1]);
                } else if (i < status) {
                    $(".quickeningTip:eq(" + i + ")").removeClass("condition_loading").addClass("check_suc").html(enhance[i][2]);
                } else {
                    $(".quickeningTip:eq(" + i + ")").removeClass("condition_loading check_suc").html(enhance[i][0]);
                }
            }
        },
        setChartData: function (result) {
            var enhanceIsSuccessDeferred = $.Deferred();
            var maxValue = Math.max(result.before_up_speed, result.before_down_speed, result.after_up_speed, result.after_down_speed);
            var noEnhanceUpHeight, noEnhanceDownHeight, enhanceUpHeight, enhanceDownHeight, enhanceUpPercent, enhanceDownPercent;
            var workTime = parentEmt.timeFormat(result["dial_time"]);
            (result.before_up_speed>>0) > (result.after_up_speed>>0) && (result.after_up_speed = result.before_up_speed);
            (result.before_down_speed>>0) > (result.after_down_speed>>0) && (result.after_down_speed = result.before_down_speed);
            noEnhanceUpHeight = ((result.before_up_speed / maxValue) * 200).toFixed(0) >>> 0;
            enhanceUpHeight = ((result.after_up_speed / maxValue) * 200).toFixed(0) >>> 0;
            noEnhanceDownHeight = ((result.before_down_speed / maxValue) * 200).toFixed(0) >>> 0;
            enhanceDownHeight = ((result.after_down_speed / maxValue) * 200).toFixed(0) >>> 0;
            enhanceUpPercent = (result["dial_ok_num"] * result["up_delta"] * 100 ).toFixed(0) >>> 0;
            enhanceDownPercent = (result["dial_ok_num"] * result["down_delta"] * 100 ).toFixed(0) >>> 0;
            $("#enhance_percent").html(Math.max(enhanceUpPercent, enhanceDownPercent) + "%");
            $("#quicken_time").html(workTime.value);
            $("#quicken_time_unit").html(workTime.unit);
            if (result.before_down_speed === "0") {
                $(".quicken_result_chart").addClass("unknownSpeedResult");
                enhanceIsSuccessDeferred.resolve();
            } else {
                $(".quicken_result_chart").removeClass("unknownSpeedResult");
                $(".enhance_down_percent").css("visibility", (result["down_delta"] * 100 === 0) ? "hidden" : "visible");
                $(".enhance_up_percent").css("visibility", (result["up_delta"] * 100 === 0) ? "hidden" : "visible");
                $("#noQuickentUp_chart").height(noEnhanceUpHeight);
                $("#quickenedUp_chart").height(enhanceUpHeight);
                $("#noQuickenDown_chart").height(noEnhanceDownHeight);
                $("#quickenedDown_chart").height(enhanceDownHeight);
                $("#noQuickened_up_speed").html(formatSpeed(result.before_up_speed).allValue).css({bottom: noEnhanceUpHeight + 12 + "px"});
                $("#quickened_up_speed").html(formatSpeed(result.after_up_speed).allValue).css({bottom: enhanceUpHeight + 12 + "px"});
                $("#noQuickened_down_speed").html(formatSpeed(result.before_down_speed).allValue).css({bottom: noEnhanceDownHeight + 12 + "px"});
                $("#quickened_down_speed").html(formatSpeed(result.after_down_speed).allValue).css({bottom: enhanceDownHeight + 12 + "px"});
                $("#up_speed_enhance_percent").html(enhanceUpPercent + "%");
                $("#down_speed_enhance_percent").html(enhanceDownPercent + "%");
                $("#upEnhance_chart").css({bottom: noEnhanceUpHeight + "px"});
                $("#downEnhance_chart").css({bottom: noEnhanceDownHeight + "px"});
                enhanceIsSuccessDeferred.resolve();
            }
            return enhanceIsSuccessDeferred.promise();
        },
        support: function () {
            var me = this;
            var supportDeferred = $.Deferred();
            var startQuicken = function () {
                var startQuicken = $.Deferred();
                if (lastQuickenState > 0) {
                    startQuicken.resolve();
                } else {
                    $.post("/app/multi_pppd/webs/multi_dial_do_dial.cgi", {wanid: 0}, function (data) {
                        var res = dataDeal(data);
                        if (res.err_no === "0") {
                            startQuicken.resolve();
                        } else if (res.err_no === "1") {
                            startQuicken.reject(3);
                        } else if (res.err_no === "3") {
                            startQuicken.reject(2);
                        }else if (res.err_no === "4") {
                            startQuicken.reject(4);
                        }
                        else {
                            startQuicken.reject(0);
                        }
                    });
                }
                return startQuicken.promise();
            };
            me.status(0);
            startQuicken().then(function () {
                get_quicken_status(1, 3000, true).then(function () {
                    get_quicken_status(2, 3000).then(function () {
                        supportDeferred.resolve();
                    }, function (statusObj) {
                        supportDeferred.reject(statusObj.status);
                    });
                }, function () {
                    supportDeferred.reject(2);
                });
            }, function (error) {
                supportDeferred.reject(error);
            });

            return supportDeferred.promise();
        },
        enhance_speed: function () {
            var me = this;
            var enhanceDeferred = $.Deferred();
            me.status(1);
            get_quicken_status(4, 3000).then(function (quickenResult) {
                if (quickenResult.status === "1") {
                    me.setChartData(quickenResult).then(function () {
                        enhanceDeferred.resolve();
                    }, function () {
                        enhanceDeferred.reject(0);
                    });
                } else {
                    enhanceDeferred.reject(get_errorId_map(quickenResult.status));
                }
            }, function () {
                enhanceDeferred.reject(2);
            });
            return enhanceDeferred.promise();
        },
        fulfil: function () {
            var me = this;
            var fulfilDeferred = $.Deferred();
            me.status(2);
            statusOutTimeId = setTimeout(function () {
                fulfilDeferred.resolve();
            }, 2000);
            return fulfilDeferred.promise();
        },
        failure: function (tips) {
            btn_quicken_status = "failure";

            $("#quicken_header_tip").html(appHtml.quickenFailureTip[tips]);
            quicken_check_status(2);
        },
        success: function () {
            $("#quicken_check").toggle();
            $("#quicken_result").toggle();
            nos.app.resizePage();
            btn_quicken_status = "quicken";
        },
        init: function () {
            var me = this;
            me.support().then(function () {
                me.enhance_speed().then(function () {
                    me.fulfil().done(function () {
                        me.success();
                    });
                }, function (status) {
                    me.failure(status);
                });
            }, function (status) {
                me.failure(status);
            });
        }
    };

    var current_log_location = 0;// log num

    var quickenSuccessDelta = 0;

    var quicken_log = function (data) {
        var log_content = $("#log_list");
        var curTime = new Date();
        var curTimeStr = curTime.getFullYear() + "-" + (curTime.getMonth() + 1) + "-" + curTime.getDate();
        var liStatusClassArr = ["enhance_failure", "enhance_half", "enhance_fulfill"];
        var logLength = data.length;
        var currentShowDate = null;
        var create_list = function (list) {
            var status = list.status;
            var timeStr = (function () {
                if (!!currentShowDate && list.date === currentShowDate) {
                    return "<span class='time'>" + list.time + "</span>";
                } else {
                    currentShowDate = list.date;
                    var dataStr = list.date === curTimeStr ? appHtml.today : list.date;
                    return "<span class='date'>" + dataStr + "</span>" + "<br/>" + "<span class='time'>" + list.time + "</span>";
                }
            })();
            var log_info = "<h4>" + appHtml.log_status[status] + "</h4><p>" + appHtml.log_txt_up[0] + list.up_speed + appHtml.log_txt_up[1] + list.enhance_up + "。<br/>" + appHtml.log_txt_down[0] + list.down_speed + appHtml.log_txt_down[1] + list.enhance_down + "。" + "</p>";
            if (list.up_speed === false && list.down_speed === false) {
                log_info = "<h4>" + appHtml.log_status[status] + "</h4><p>" + appHtml.speedGetFauilre + "</p>";
            }
            var _li = $("<li>", {"class": liStatusClassArr[status]});
            var liStr = "<div class='time_line'>" + timeStr + "</div><div class='log_info'>" + log_info + "</div>";
            _li.html(liStr).appendTo(log_content);
        };
        var listDataFormat = function (list) {
            return {
                date: getLogTime().date,
                time: getLogTime().time,
                up_speed: getSpeedTxt(list.after_up_speed, "up_delta"),
                enhance_up: statusFormat(list["up_delta"]),
                down_speed: getSpeedTxt(list.after_down_speed, "down_delta"),
                enhance_down: statusFormat(list["down_delta"]),
                status: getStatus()
            };
            function statusFormat(delta) {
                return (delta * list["dial_ok_num"] * 100).toFixed(0) + "%";
            }

            function getLogTime() {
                var logTime = new Date(list.time * 1000);
                return {
                    date: logTime.getFullYear() + "-" + (logTime.getMonth() + 1) + "-" + logTime.getDate(),
                    time: getTimeFormat(logTime.getHours()) + ":" + getTimeFormat(logTime.getMinutes())
                };
                function getTimeFormat(val) {
                    return (val << 0 < 10 ? "0" + val : val);
                }
            }

            function getStatus() {
                if (list["dial_ok_num"] * 100 !== 0) {
                    if (list["dial_ok_num"] < list["max_ok_num"]) {
                        return 1;
                    } else {
                        return 2;
                    }
                } else {
                    return 0;
                }
            }

            function getSpeedTxt(val, type) {
                if (list["after_up_speed"] >>> 0 === 0 && list["after_down_speed"] >>> 0 === 0) {
                    return false;
                }
                if (list["dial_ok_num"] === list["max_ok_num"] || list["max_ok_num"] >>> 0 === 0 || quickenSuccessDelta === 0) {
                    return get_speed_txt(val);
                } else {
                    return get_speed_txt((val / (1 + quickenSuccessDelta[type] * list["max_ok_num"])) * (1 + quickenSuccessDelta[type] * list["dial_ok_num"]));
                }
            }
        };
        if (logLength === 0) {
            $(".log_timeLine").hide();
            log_content.html("<li class='noLogList'>" + appHtml.logListNull + "</li>");
            return;
        }
        if (logLength > current_log_location) {
            !quickenSuccessDelta && getQuickenSuccessDelta(data);
            current_log_location && (currentShowDate = listDataFormat(data[current_log_location - 1]).date);
            for (var i = current_log_location; i < current_log_location + 5 && i < logLength; i++) {
                create_list(listDataFormat(data[i]));
            }
            current_log_location += i - current_log_location;
        }
    };

    var getQuickenSuccessDelta = function (data) {
        var logLen = data.length;
        for (var i = 0; i < logLen; i++) {
            if (data[i]["up_delta"] * 100 !== 0 || data[i]["down_delta"] * 100 !== 0) {
                return  quickenSuccessDelta = {
                    up_delta: data[i]["up_delta"],
                    down_delta: data[i]["down_delta"]
                };
            }
        }
    };
    /*start quickening*/
    var refresh_check_condition = function (ev, isInit) {
        if (btn_quicken_status === "quickening")  return false;
        btn_quicken_status = "quickening";
        !isInit && (lastQuickenState = 0);
        quicken_check_status(1);
        quicken_condition_check.init();
    };

    var stop_dial = function(msg){
        var stopDeffer = $.Deferred();
        show_message("save",msg);
        $.post("/app/multi_pppd/webs/multi_dial_stop_dial.cgi", {wanid: 0}, function (data) {
            var res = dataDeal(data);
            if (res.err_no === "0") {
                stopDeffer.resolve();
            } else {
                show_message("error", igd.make_err_msg(res.err_no));
                stopDeffer.reject();
            }
        });
        return stopDeffer.promise();
    };

    var quicken = {
        quickening: function () {
            btn_quicken_status = "quicken";
            clearTimeout(statusOutTimeId);
            init_app_language(appL.multi_pppd);
            quicken.addEventList();
            get_quicken_status().then(function (quickenResult) {
                if (quickenResult.state === "4") {
                    if (quickenResult.status === "1") {
                        quicken_condition_check.setChartData(quickenResult).then(function () {
                            $("#quicken_result").show();
                        }, function () {
                            $("#quicken_check").show();
                        });
                    } else {
                        quicken_condition_check.failure(get_errorId_map(quickenResult.status>>0));
                    }
                } else {
                    if (quickenResult.state === "0") {
                        $("#quicken_check").show();
                    } else {
                        lastQuickenState = quickenResult.state>>0;
                        refresh_check_condition(true, true);
                    }
                }
                nos.app.resizePage();
            }, function () {
                $("#quicken_check").show();
                nos.app.resizePage();
            });
        },
        log: function () {
            var logList = [];
            var isLogListLoading = false;
            current_log_location = 0;
            init_app_language(appL.multi_pppd);
            $.post("/app/multi_pppd/webs/multi_dial_dump_log.cgi", {wanid: 0}, function (data) {
                logList = dataDeal(data).data;
                quicken_log(logList.reverse());
                nos.app.resizePage();
            });
            var scrollFunc = function (e) {
                var isBottom = parent.document.documentElement.scrollHeight - (parent.document.documentElement.scrollTop + parent.document.body.scrollTop) - parent.document.documentElement.clientHeight;
                var currentTop = $("body", window.parent.document).scrollTop() || $("html", window.parent.document).scrollTop();
                if (isBottom <= 0 && current_log_location < logList.length && !isLogListLoading) {
                    isLogListLoading = true;
                    $("#quicken_log_loading").show();
                    nos.app.resizePage();
                    $("body,html", window.parent.document).scrollTop(currentTop || 0);
                    /*e = e || window.event;
                     if (e.wheelDelta) {//IE/Opera/Chrome
                     console.log(e.wheelDelta);
                     } else if (e.detail) {//Firefox
                     console.log(e.detail);
                     }*/
                    setTimeout(function () {
                        quicken_log(logList);
                        nos.app.resizePage();
                        $("#quicken_log_loading").hide();
                        $("body,html", window.parent.document).scrollTop(currentTop || 0);
                        isLogListLoading = false;
                    }, 1000);
                }
            };
            /*注册事件*/
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            }//W3C
            window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome

        },
        addEventList: function () {
            var checkPanel = $("#app_page");
            checkPanel.undelegate(".quicken_btn", "click").delegate(".quicken_btn", "click", refresh_check_condition);
            checkPanel.undelegate("#reQuicken", "click").delegate("#reQuicken", "click", function(e){
                stop_dial("请稍候.....").then(function(){
                    $("#message_layer",window.top.document).stop(false, true).delay(2500).fadeOut(500, function () {
                        parentEmt.hide_lock_div();
                        parentEmt.remove_select_iframe();
                        refresh_check_condition(e);
                    });
                });
            });
            checkPanel.undelegate("#stopQuicken", "click").delegate("#stopQuicken", "click", function () {
                stop_dial().then(function(){
                    show_message("success");
                    quicken_check_status(0);
                });
            });
            checkPanel.undelegate(".danger_tip", "click").delegate(".danger_tip", "click", function () {
                show_dialog(appHtml.quickenDanger_content, $.noop, null, "quicken_tip");
            });
        }
    };
    window.init_quicken_pppd = quicken.quickening;
    window.init_quicken_log = quicken.log;
})();