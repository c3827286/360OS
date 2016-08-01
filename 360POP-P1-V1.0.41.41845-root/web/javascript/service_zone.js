/*客服专区*/
(function(){
    var urlObj ={
        check_start:"/app/custom_service/webs/fault_check_start.cgi",
        check_get:"/app/custom_service/webs/fault_check_get.cgi",
        fix:"/app/custom_service/webs/onekey_fix.cgi",
        unset:"/app/custom_service/webs/onekey_fix_unset.cgi"
    }
    var L_Service = L.service_zone_errMsg;
    var service_zone = {
        add_service_zone_eventList : function () {
          this.bind_event_menu_item();
          this.bind_event_qa_code();
        },
        bind_event_menu_item:function(){
            $(".service-zone .main-menu-box ").undelegate(".menu-item", "click").delegate(".menu-item", "click", function () {
                var html_name = $(this).attr("data-html-name");
                var appIdNo = $(this).attr("data-us-fov-count");
                var newUrlToken = "#serviceitem/" +html_name +"/normal";
                window.location.hash = newUrlToken;
                user_fov_info.appInfo(appIdNo);
            });
        },
        bind_event_qa_code:function(){//二维码
            $(".share").on("mouseenter",".weixin",function(e){
                $(".weixin_qr_code").fadeIn();
            })
            $(".share").on("mouseleave",".weixin_qr_code",function(e){
                $(".weixin_qr_code").fadeOut();
            })
        },
        init_service_zone:function(){
            this.add_service_zone_eventList();
        }
    }
    var question_list = {
        progress_time:5,
        delay_time:250,
        delay_time_unlock:10000,
        module_id:{
            "no_internet":1,
            "network_dropped":2,
            "no_wifi":3,
            "no_connect_wifi":4,
            "page_slow":5,
            "connect_another_route":6
        },
        init_soChange:function(){//图片选项卡
            $('.sochange .view li').soChange({
                thumbObj:'.sochange .control li',
                thumbNowClass:'current',//切换时使用样式
                btnPrev:null,//上一张按钮
                btnNext:null,//下一张按钮
                slideTime: 1000,//幻灯片换片时间
                autoChange: false,
                changeTime:5000
            });
        },
        resetTabs:function(){
            var $warp = $(".service_zone");
            $warp.find(".tab").removeClass("section_show").addClass("section_hide");
        },
        bind_event_lists:function(){
            this.bind_event_immediately_repair();
            this.bind_event_akey_repair();
            this.bind_event_has_resolved();
            this.bind_event_has_not_resolve();
            this.bind_event_fix_chk();
            this.bind_event_action();
            this.bind_event_other();
        },
        bind_event_immediately_repair:function(){//立即修复
            var that = this;
            $(".info-list").on("click",".repair_btn",function(){
                if(that.module_id[current_html]==1){
                    $.post("/router/interface_status_show.cgi", {
                        noneed: "noneed"
                    }, function (data) {
                        var data = dataDeal(data);
                        if (data && data[0].WAN1) {
                            if (data[0].WAN1.status =="0" || data[0].WAN1.status =="4" ){
                                that.normal_process()
                            }else{//断网则运行故障诊断
                                that.fail_help_process()
                            }
                        }
                    });
                }else{
                    that.normal_process()
                }
            })
        },
        bind_event_akey_repair:function(){//一键修复
            var $warp = $(".service_zone"),
                that = this;
            $(".suggest-wrap").on("click",".repair_btn",function(){

                if($("#repair_frm input:checked").length == 0){
                    show_message("check_repair_at_least");
                    return;
                }

                var parm = igd.ui.form.collect("repair_frm");
                parm.mid = that.module_id[current_html];
                //console.log(parm);
                show_message("repair_ing");
                $.post(urlObj.fix,parm,function(ret){
                    var data = dataDeal(ret);
                    if(data == "SUCCESS"){
                        setTimeout(function(){
                            show_message("repair_success");
                            setTimeout(function(){
                                that.resetTabs();
                                $warp.find(".tab-4").removeClass("section_hide").addClass("section_show");
                            },1500)
                        },that.delay_time_unlock)

                    }else{
                        show_message("error", igd.make_err_msg(data));
                    }
                })
            })
        },
        bind_event_has_resolved:function(){//已经解决
            $(".detection-btn-wrap").on("click",".btn_resolved",function(){
                var id = "service_zone"
                var newUrlToken = "#menu" + "/";
                newUrlToken += id;
                window.location.hash = newUrlToken;
            })
        },
        bind_event_has_not_resolve:function(){//还没有解决
            var $warp = $(".service_zone"),
                that = this;

            $(".detection-btn-wrap").on("click",".btn_unresolved",function(){
                var parm = {
                    id:that.module_id[current_html]
                };
                show_message("wait");
                $.post(urlObj.unset,parm,function(ret){
                    var res = dataDeal(ret);
                    if(res == "SUCCESS"){
                        setTimeout(function(){
                            $("#message_layer").stop(false, true).delay(1000).fadeOut(500, function () {
                                hide_lock_div();
                                remove_select_iframe();
                                that.resetTabs();
                                $warp.find(".tab-5").removeClass("section_hide").addClass("section_show");
                            });
                        },that.delay_time_unlock)
                    }else{
                        show_message("error", igd.make_err_msg(res));
                    }
                })

            })
        },
        bind_event_fix_chk:function(){
            $("#repair_frm").on("click",".chk",function(){
                var new_val = $(this).val() == 1 ? 0 : 1;
                $(this).val(new_val);
                $(this).attr("checked",!!new_val);
            })
        },
        bind_event_action:function(){//给建议检查项动态添加的标签添加事件
            var me = this;
            $("#recommand_frm").on("click",".default-txt",function(){
                var $this = $(this);
                if($this.hasClass("slide")){
                    $this.parent().siblings(".action-item").stop(true,true).fadeToggle("fast");
                    $this.next(".slide-icon").stop(true,true).toggleClass("down");
                    if(!$this.hasClass("detail")){
                        if($this.next(".slide-icon").hasClass("down")){
                            $this.html(L_Service.temp.arrow_down)
                        }else{
                            $this.html(L_Service.temp.arrow_up)
                        }
                    }
                }else{
                    if($this.hasClass("setLink")){
                        var target_parent = $this.data("target_parent");
                        var target_sub = $this.data("target_sub");
                        $("#"+target_parent).click();
                        setTimeout(function(){
                            if($("#"+target_sub).length>0){
                                $("#"+target_sub).click();
                            }else{
                                if($("."+target_sub).length>0){
                                    $("."+target_sub).click();
                                }
                            }
                        },me.delay_time);

                    }else if($this.hasClass("downLink")){
                        var new_url = $this.data("new_url");
                        window.open(new_url,"_blank");
                    }
                }

            })
            $("#recommand_frm").on("click",".slide-icon",function(){
                var $this = $(this);
                $this.prev(".default-txt").click();
            })
        },
        bind_event_other:function(){//其他问题
            $(".others-wrap").on("click",".item",function(){
                var html_name = $(this).attr("data-html-name");
                var newUrlToken = "#serviceitem/"+html_name+ "/normal";
                var id = html_name;
                var return_html_name = "service_zone";
                var parent_html_name = "service_zone";
                PAGE_INFO.menu_parent = null;
                jump_sub_html(id, 'init_' + id, return_html_name, parent_html_name);
                 //  window.location.hash = newUrlToken;
            })
        },
        fail_help_process:function(){
            var me = this,
                $warp = $(".service_zone"),
                meCall = arguments.callee;

            me.resetTabs();
            $warp.find(".tab-6").removeClass("section_hide").addClass("section_show");

            var jump_to_fail_help_index_page = function(){
                $("#index_page").click();
                setTimeout(function(){
                    //  $(".router-info-box .button-fail-help").click();
                    show_pop_layer("link_help_pop");
                    hitchDiagnosis.init();
                },me.delay_time)
            }

            $("#detect_time").html(me.progress_time);
            if(me.timeOutId){clearTimeout(me.timeOutId)}
            me.timeOutId = setTimeout(function(){
                me.progress_time -=1;
                $("#detect_time").html(me.progress_time);
               // console.log(me.timeOutId)
                if(me.progress_time <=0){
                    clearTimeout(me.timeOutId);
                    me.progress_time = 5;
                    jump_to_fail_help_index_page();
                    return;
                }
                meCall.call(me);
            },1000)
        },
        normal_process:function(){
            var that = this,
                parm = {
                    id:that.module_id[current_html]
                },
                $warp = $(".service_zone");
            //temp modify
       /*     that.resetTabs();
            $warp.find(".tab-2").removeClass("section_hide").addClass("section_show");*/
            show_message("detecting");
            //temp modify end
            var _check_start = function(){
                $.post(urlObj.check_start,parm,function(ret){
                    var data = dataDeal(ret);
                    if(data == "SUCCESS"){
                        _check_get();
                    }else{
                        show_message("error", igd.make_err_msg(data));
                    }
                })
            }
            var _check_get = function(){
                $.post(urlObj.check_get,parm,function(ret){
                    var res = dataDeal(ret);
                    if(res.state == "0"){ //检测完成
                        that.processEnd(res);
                        that.paint_onekey_fix_list(res.onekey_fix);
                        that.paint_recommand_fix_list(res.recommand_fix);
                        if(that.check_loop_id){clearInterval(that.check_loop_id);}
                    }else{
                        _check_get_loop();
                    }
                })
            }
            var _check_get_loop = function(){
                if(that.check_loop_id){clearInterval(that.check_loop_id)}
                that.check_loop_id = setInterval(function(){
                    _check_get();
                },2000);
            }
            _check_start();
        },
        processEnd:function(res){
            var data = res.onekey_fix;
            var $warp = $(".service_zone"),
                that = this;
            that.resetTabs();
            show_message("detecting_over");
            if(data && $.isArray(data) && data.length>0){
                $warp.find(".tab-3").removeClass("section_hide").addClass("section_show");
            }else{//无建议修复项
                if(that.module_id[current_html] == 6){//二级路由
                    $warp.find(".tab-7").removeClass("section_hide").addClass("section_show");   //串联上网完成
                }else{
                    $warp.find(".tab-5").removeClass("section_hide").addClass("section_show");   //跳到建议检查项去
                }
            }
        },
        paint_onekey_fix_list:function(data){//一键修复 建议修复项
            if(!$.isArray(data)){
                return;
            }
            var len = data.length,
                tempArr = [],
                htmlStr = "",
                id_str = "";
            if(len>0){
                $.each(data,function(i,o){
                    id_str = "id-"+o.id;
                    tempArr = [
                        '<div class="item clearfix" id="'+id_str+'">',
                        '<p class="fl">'+L_Service[current_html][id_str].info+'</p>',
                        '<input type="checkbox" value="1" class="chk" name="'+id_str+'" checked="true">',
                        '</div>'
                    ];
                    htmlStr += tempArr.join("");
                })
                $("#repair_frm").html(htmlStr);
                this.set_fix_list(data);

            }else{
                // console.log("暂无建议修复项");
            }

        },
        paint_recommand_fix_list:function(data){//建议检查项
            if(!$.isArray(data)){
                return;
            }
            var len = data.length,
                tempArr = [],
                htmlStr = "",
                id_str = "";
            if(len>0){
                $.each(data,function(i,o){
                    id_str = "id-"+o.id;
                    tempArr = [
                        '<div class="suggest-'+(i+1)+'" id="'+ id_str+'">',
                            '<div class="item clearfix">',
                                "<span class='num'>"+(i+1)+"、</span>"+L_Service[current_html][id_str].title,
                            '</div>',
                            '<div class="item clearfix pad info">',
                                '<span class="detail-txt">'+L_Service.temp.detail_txt+'</span>'+L_Service[current_html][id_str].info,
                            '</div>',
                            '<div class="item clearfix pad">',
                                L_Service[current_html][id_str].action,
                            '</div>',
                        '</div>'
                    ];
                    htmlStr += tempArr.join("");
                })
                $("#recommand_frm").html(htmlStr);
                this.set_fix_list(data);
            }else{
               // console.log("暂无建议检查项");
            }

        },
        set_fix_list:function(data){//给建议修复项和建议检查项部分地方赋值
            var mid = this.module_id[current_html],
                id_str = "",
                temp_str = "";
            var conversion_time = function(timeStr){//1500->15:00
                    return timeStr.slice(0,2)+":"+timeStr.slice(2)
            }
            var set_chan = function(idStr,data){
                 temp_str = "";
                $.each(data,function(j,k){
                    temp_str = k.channel;
                })
                $("#"+id_str).find(".chan").html(temp_str);
            }
            var set_default_ssid = function(idStr,data){
                temp_str = "";
                $.each(data,function(j,k){
                    temp_str = k.def_ssid;
                })
                $("#"+id_str).find(".default_ssid").html(temp_str);
            }
            var set_child_mode = function(idStr,data){
                temp_str = "";
                $.each(data,function(j,k){
                    temp_str += [
                        (function(){
                            var str = '<div>'
                            if(j==0){
                                str +=  '<span class="detail-txt">'+L_Service.temp.detail_txt+'</span>'
                            }else{
                                str+='<span class="detail-txt">&nbsp;</span>'
                            }
                            return str;
                        })(),
                        L_Service.temp.host_name+'<span class="host_name">'+ k.name+'</span>',
                        L_Service.temp.seted_child_mode+L_Service.temp.range,
                        '<span class="start_time">'+ conversion_time(k.start_time)+'</span>'+L_Service.temp.to,
                        '<span class="end_time">'+ conversion_time(k.end_time)+'</span>'+L_Service.temp.forbidden_internet,
                        '</div>'

                    ].join("");
                })
                $("#"+id_str).find(".info").html(temp_str);
            }
            var set_black_list = function(idStr,data){
                temp_str = "";
                $.each(data,function(j,k){
                    var blackDate = new Date(k.blacklist_time * 1000);
                    var blackDateStr = blackDate.format("yyyy"+ L.year +"MM"+ L.month +"dd"+ L.s_day);//new lib
                    temp_str += [
                        (function(){
                            var str = '<div>'
                            if(j==0){
                                str +=  '<span class="detail-txt">'+L_Service.temp.detail_txt+'</span>'
                            }else{
                                str+='<span class="detail-txt">&nbsp;</span>'
                            }
                            return str;
                        })(),
                        (k.device_label || k.name)+"[MAC:"+(k.mac).toUpperCase()+"]("+blackDateStr+")" +
                            L_Service.temp.black_info,
                            "</div>"
                    ].join("");

                })
                $("#"+id_str).find(".info").html(temp_str);
            }
            var set_ip_address = function(idStr,data){
                temp_str = "";
                $.each(data,function(j,k){
                    temp_str += (k.device_label || k.name || k.ip )+"/";
                })
                temp_str = temp_str.slice(0,-1);
                $("#"+id_str).find(".info_arr").html(temp_str);
            }
            var set_ap_mode = function(idStr,data){
                temp_str = "";
                $.each(data,function(j,k){
                    temp_str = k.limit_hosts_num;
                })
                $("#"+id_str).find(".limit_hosts_num").html(temp_str);
            }
            var set_qos_limit = function(idStr,data){
                temp_str = "";
                $.each(data,function(j,k){
                    temp_str += k.host_name || k.name+"/";
                })
                temp_str = temp_str.slice(0,-1);
                $("#"+id_str).find(".host_name").html(temp_str);
            }
            $.each(data,function(i,o){
                id_str = "id-"+o.id;
                if(o.data && o.data.length>0){
                    if(mid == 1){
                        if(o.id == 2){//不支持12.13信道
                            set_chan(id_str,o.data);
                        }
                        if(o.id == 5){//儿童保护模式
                            set_child_mode(id_str,o.data);
                        }
                        if(o.id == 7){//上网黑名单
                            set_black_list(id_str,o.data);
                        }
                        if(o.id == 8){//电脑IP地址配置错误
                            set_ip_address(id_str,o.data);
                        }
                    }
                    if(mid == 3){
                        if(o.id == 2){//不支持12.13信道
                            set_chan(id_str,o.data);
                        }
                        if(o.id == 22){//特殊字符ssid，恢复默认
                            set_default_ssid(id_str,o.data);
                        }
                    }
                    if(mid == 4){
                        if(o.id == 5){//儿童保护模式
                            set_child_mode(id_str,o.data);
                        }
                        if(o.id == 7){//上网黑名单
                            set_black_list(id_str,o.data);
                        }
                        if(o.id == 8){//电脑IP地址配置错误
                            set_ip_address(id_str,o.data);
                        }
                        if(o.id == 26){//访客模式数量限制已经启用
                            set_ap_mode(id_str,o.data);
                        }
                    }
                    if(mid == 5){
                        if(o.id == 32){//当前限速设置规则异常
                            set_qos_limit(id_str,o.data);
                        }

                    }
                }
            })
        }
    }

    function _init_service_zone (){
        service_zone.init_service_zone();
    }
    function _temp_fun(){
        question_list.init_soChange();
        question_list.bind_event_lists();
    }

    window.init_service_zone = _init_service_zone;
    window.init_no_internet = _temp_fun;
    window.init_network_dropped = _temp_fun;
    window.init_no_wifi = _temp_fun;
    window.init_no_connect_wifi = _temp_fun;
    window.init_page_slow = _temp_fun;
    window.init_connect_another_route = _temp_fun;
})()