if (typeof(nos)=='undefined' || nos==null) { var nos = {}; }
nos.app = {};

nos.app.JumpPrevPage = function(){
	if(nos_location != undefined){
		window.location.href = nos_url;
	}
}
//解析参数
var nos_r = "";
var nos_url = "";
var nos_year = "", nos_hour = "", nos_flow = "";
var nos_bulletin_content = "";
var nos_location = decodeURIComponent(location.toString());

if(nos_location!=undefined){
	var nos_tmp_param_arr = nos_location.split("?");
	var nos_tmp_param_str = "";
	for(var i = 1; i < nos_tmp_param_arr.length; i++){
		nos_tmp_param_str += nos_tmp_param_arr[i]+"?";
	}
	nos_tmp_param_str = nos_tmp_param_str.substring(0,nos_tmp_param_str.length-1);
	var nos_param_arr = nos_tmp_param_str.split("&");
	
	for(var j = 0; j < nos_param_arr.length; j++){
		if(nos_param_arr[j].split("=")[0] == "r"){
			nos_r = nos_param_arr[j].split("=")[1].charAt(0);
		}
		if(nos_param_arr[j].split("=")[0] == "url"){
			nos_url = nos_param_arr[j].split("=")[1];
		}
		if(nos_param_arr[j].split("=")[0] == "year"){
			nos_year = nos_param_arr[j].split("=")[1];
			var year_str = nos_year.split("-");
			nos_bulletin_content = "尊敬的用户您好! 您的账户到期时间为: <span class=\"red\">"+ year_str[0] +"年"+ year_str[1] +"月"+ year_str[2] +"日</span>";
		}
		if(nos_param_arr[j].split("=")[0] == "hour"){
			nos_hour = nos_param_arr[j].split("=")[1];
			var hour_str = nos_hour.split("-");
			nos_bulletin_content = "尊敬的用户您好! 您的账户总时间为: <span class=\"red\">"+ hour_str[0] +"小时&nbsp;"+ hour_str[1] +"分钟</span>, 还剩下<span class=\"red\">"+ hour_str[2] +"小时&nbsp;"+ hour_str[3] +"分钟</span>未使用";
		}
		if(nos_param_arr[j].split("=")[0] == "flow"){
			nos_flow = nos_param_arr[j].split("=")[1];
			var flow_str = nos_flow.split("-");
			nos_bulletin_content = "尊敬的用户您好! 您的账户总流量为: <span class=\"red\">"+flow_str[0]+"G&nbsp;" + flow_str[1] +"M</span>, 还剩下<span class=\"red\">"+ flow_str[2] +"G&nbsp;"+ flow_str[3] +"M</span>未使用";
		}
	}
	
	if(nos_r == 1){//预览
		if($("#nos_bulletin_layer").length > 0)
			$("#nos_bulletin_layer").remove();
		
		if($("#nos_net_auth").length > 0)
			$("#nos_net_auth").remove();
		
		if($("#nos_return_btn_layer").length > 0)
			$("#nos_return_btn_layer").remove();
	}
	if(nos_r == 2){//用户名 密码
		if($("#nos_bulletin_layer").length > 0)
			$("#nos_bulletin_layer").remove();
		
		if($("#nos_return_btn_layer").length > 0)
			$("#nos_return_btn_layer").remove();
		
		var $net_auth_div = $("<div/>");
		$net_auth_div.attr("id","nos_net_auth");
		
		$("#nos_content_layer").after($net_auth_div);
		$("#nos_net_auth").load("/app_common/app_ctrl/bulletin/style_common/net_auth.htm");
	}
	if(nos_r == 3){//电子公告
		if($("#nos_bulletin_layer").length > 0)
			$("#nos_bulletin_layer").remove();
			
		if($("#nos_net_auth").length > 0)
			$("#nos_net_auth").remove();
		
		var $nos_return_btn_div = $("<div/>");
		$nos_return_btn_div.attr("id","nos_return_btn_layer");
		$("#nos_content_layer").after($nos_return_btn_div);
		$nos_return_btn_div.html("<center><input type=\"button\" onclick=\"nos.app.JumpPrevPage()\" value=\"返回\" class=\"nos_button\" /></center>");
	}
	if(nos_r == ""){//计费
		if($("#nos_net_auth").length > 0)
			$("#nos_net_auth").remove();
		
		var $nos_return_btn_div = $("<div/>");
		$nos_return_btn_div.attr("id","nos_return_btn_layer");
		$("#nos_content_layer").after($nos_return_btn_div);
		$nos_return_btn_div.html("<center><input type=\"button\" onclick=\"nos.app.JumpPrevPage()\" value=\"返回\" class=\"nos_button\" /></center>");
		
		var $nos_bulletin_layer_div = $("<div/>");
		$nos_bulletin_layer_div.attr("id","nos_bulletin_layer");
		$("#nos_content_layer").after($nos_bulletin_layer_div);
		$("#nos_bulletin_layer").html(nos_bulletin_content);
	
		if($("#nos_content_layer").length > 0)
			$("#nos_content_layer").remove();
	}
}