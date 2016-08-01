var reg_map = {
    webauth_frm: [
        {id: "url", type: "url"}
    ]
};
var webauth = {
	path:"/app/webauth_example/webs/",
	init_data:function(){
		$.post(this.path + "auth_info_get.cgi",{},function(data){
			var data = dataDeal(data);
			$("#enable").val(data.state);
			radio.radio_set(data.state,"enable");
			$("#url").val(data.url);
		});
	},
	submit_data:function(){
			var me = this;
		    if (check_input("webauth_frm")) {
				show_message("save");
				var obj = igd.ui.form.collect("webauth_frm");
				$.post(me.path + 'auth_info_set.cgi', obj, me.submit_callback);
			}
	},
	submit_callback:function(data){
		var data = dataDeal(data);
		if (data == "SUCCESS")
			show_message("success");
		else
			show_message("error", igd.make_err_msg(data));
	},
	add_event:function(){
		var me = this;
		$("#enable").off("click").on("click",function(){
			radio.radio_toggle(this);
		});
		$("#webauth_btn").off("click").on("click",function(){
			me.submit_data();
		});
	},
	init:function(){
		this.add_event();
		this.init_data();
	}
};

$(document).ready(function(){
	webauth.init();
});

radio = {
	default_param:{
		"on":1,
		"off":0
	},
	radio_toggle:function(obj,o_event,options){
		var name = $(obj).attr("id");
		if($(obj).attr("class").indexOf("radio_on") != -1){
			$(obj).removeClass("radio_on").addClass("radio_off");
			if(options)
				$("#" + name +"_hidden").val(options.off);
			else
				$("#" + name +"_hidden").val(this.default_param.off);
		}
		else{
			$(obj).removeClass("radio_off").addClass("radio_on");
			if(options)
				$("#" + name +"_hidden").val(options.on);
			else
				$("#" + name +"_hidden").val(this.default_param.on);
		}
		var str = $("#" + name +"_hidden").val();
		//alert(typeof o_event);
		if(typeof o_event == "string")
			eval(o_event + "("+ str +")");
		else if(typeof o_event == "function")
			o_event.call(this);
	},
	radio_set:function(key,id){
		if(key == "0"){
			$("#" + id).removeClass("radio_on").addClass("radio_off");
		}
		else{
			$("#" + id).removeClass("radio_off").addClass("radio_on");
		}
		$("#"+ id +"_hidden").val(key);
	}
};