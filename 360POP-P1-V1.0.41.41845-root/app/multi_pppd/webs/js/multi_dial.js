var multi_num = 4;

var reg_app_map = {
	multi_dial_frm:[],
	noneed:[]
}

//window.onload = function(e){
	//bind_frm_event('multi_dial_frm');
	multi_dial_init();
	var obody=document.getElementsByTagName("body")[0];
	obody.onmousedown = function(){
		hide_msgbox();
	};
//}

function multi_dial_init(){
	nos.app.net('multi_dial_show.cgi', 'wanid=0', init_set_section);
}

function init_set_section(data){
	multi_enable(data.enable);
	nos.app.setForm('multi_dial_form', data);
	var redial_check = document.getElementById("redial_check");
	if(data.redial == "1")
		redial_check.checked = true;
	else
		redial_check.checked = false;
	init_user_pwd_hidden(data);
	nos.app.net('multi_dial_show_ip.cgi', 'wanid=0', init_table_section);
}

function init_table_section(data1){
	paint_multi_dial_tab(data1);
	nos.app.resizePage();
}

function init_user_pwd_hidden(data){
	for(var i=1; i<= multi_num; i++){
		document.getElementById("user"+i+"_hidden").value = eval("(data.user"+i+")");
		document.getElementById("pwd"+i+"_hidden").value = eval("(data.pwd"+i+")");
	}
}

function multi_dial_submit(){
	if(check_app_input("multi_dial_frm")){
		var user2 = document.getElementById("user2");
		var pwd2 = document.getElementById("pwd2");
		
		var user3 = document.getElementById("user3");
		var pwd3 = document.getElementById("pwd3");
		
		var user4 = document.getElementById("user4");
		var pwd4 = document.getElementById("pwd4");
		
		if(!user_pwd_check(user2,pwd2))
			return;
		if(!user_pwd_check(user3,pwd3))
			return;
		if(!user_pwd_check(user4,pwd4))
			return;

		nos.app.net('multi_dial_set.cgi', 'multi_dial_form', multi_dial_submit_callback);
		return false;
	}
}

function multi_dial_submit_callback(data){
	if(data == "SUCCESS")
		alert("设置成功！");
	else
		alert(igd.make_err_msg(data));
	multi_dial_init();
}

function multi_enable(value){
	set_enable_ctrl();	
	reg_app_map["multi_dial_frm"][0] = {};
	reg_app_map["multi_dial_frm"][1] = {};
	reg_app_map["multi_dial_frm"][2] = {};
	reg_app_map["multi_dial_frm"][3] = {};
	reg_app_map["multi_dial_frm"][4] = {};
	reg_app_map["multi_dial_frm"][5] = {};
	reg_app_map["multi_dial_frm"][6] = {};
	reg_app_map["multi_dial_frm"][7] = {};
	if(value == "0"){
		for(var i = 1; i<= multi_num ; i++){
			document.getElementById("user"+i).disabled = true;
			document.getElementById("pwd"+i).disabled = true;
		}
	}
	else if(value == "1"){
		for(var i = 1; i<= multi_num ; i++){
			document.getElementById("user"+i).disabled = false;
			document.getElementById("pwd"+i).disabled = false;
		}
		reg_app_map["multi_dial_frm"][0].id = "user1";
		reg_app_map["multi_dial_frm"][0].type = "string";
		reg_app_map["multi_dial_frm"][1].id = "pwd1";
		reg_app_map["multi_dial_frm"][1].type = "user_password";
		reg_app_map["multi_dial_frm"][2].id = "user2";
		reg_app_map["multi_dial_frm"][2].type = "string noneed";
		reg_app_map["multi_dial_frm"][3].id = "pwd2";
		reg_app_map["multi_dial_frm"][3].type = "user_password noneed";
		reg_app_map["multi_dial_frm"][4].id = "user3";
		reg_app_map["multi_dial_frm"][4].type = "string noneed";
		reg_app_map["multi_dial_frm"][5].id = "pwd3";
		reg_app_map["multi_dial_frm"][5].type = "user_password noneed";
		reg_app_map["multi_dial_frm"][6].id = "user4";
		reg_app_map["multi_dial_frm"][6].type = "string noneed";
		reg_app_map["multi_dial_frm"][7].id = "pwd4";
		reg_app_map["multi_dial_frm"][7].type = "user_password noneed";
	}
}

var tab_head =["IP地址","子网掩码","网关"];
function paint_multi_dial_tab(data){
	var oTable = document.getElementById("multi_dial_tab");
	if(oTable){
		oTable.parentNode.removeChild(oTable);
	}
	oTable=document.createElement("table");	
	oTable.id="multi_dial_tab";
	oTable.className="datatable";
	var thead = document.createElement("thead");
	var thead_tr = document.createElement("tr");
	for(var j = 0;j < tab_head.length;j++){
		var th = document.createElement("th");
		var thcontent=document.createTextNode(tab_head[j]);
		th.appendChild(thcontent);
		thead_tr.appendChild(th);
	}
	thead.appendChild(thead_tr);
	if(data.length == 0){
		document.getElementById("multi_dial_tab").innerHTML = "<tbody><tr><td colspan=\"3\">当前无任何数据</td></tr></tbody>";
		return;
	}
	var tbody=document.createElement("tbody");
	for(var i=1; i<= multi_num; i++){
		var tbody_tr = document.createElement("tr");
		if(i %2 == 0){
			tbody_tr.className="evenrow";
		}
		for(var j = 0;j < 3; j++){
			var td = document.createElement("td");
			var tdcontent;
			if(j == 0)
				tdcontent = document.createTextNode( eval("(data.ip"+i+")"));
			else if(j == 1)
				tdcontent = document.createTextNode( eval("(data.mask"+i+")"));
			else if(j == 2)
				tdcontent = document.createTextNode( eval("(data.gw"+i+")"));
			td.appendChild(tdcontent);
			tbody_tr.appendChild(td);
		}
		tbody.appendChild(tbody_tr);
	}
	oTable.appendChild(thead);
	oTable.appendChild(tbody);
	document.getElementById("multi_dial_wrap").appendChild(oTable);
}


function bind_frm_event(form_id){
	var tForm = document.getElementById(form_id);
	for (var i=0; i<tForm.elements.length; i++){
		var temptype = tForm.elements[i].type.toLowerCase();
		if(temptype == "text" || temptype == "password"){
			/*tForm.elements[i].onfocus = function(){}*/
			tForm.elements[i].onblur = function(){
				if(this.value != ""){
					if(!app_form_check(this,form_id))
						return;
				}
				
			}
			tForm.elements[i].onkeyup = function(e){
				e = window.event?window.event:e;
				var code = e.keyCode?e.keyCode:e.which;
				if(code == 13)
					return;
				if(this.value != ""){
					if(!app_form_check(this,form_id))
						return;
				}
				else{
					this.focus();
				}
			}
		}
	}
}


function app_form_check(obj,form_id){
	var ctr_id = obj.getAttribute("id");
	for(var i in reg_app_map[form_id]){
		if(ctr_id == reg_app_map[form_id][i].id.toString()){
			var type_arr = reg_app_map[form_id][i].type.split(" ");
			for(var j in type_arr){
				if(!get_msgbox(ctr_id,type_arr[j])){
					return false;
				}
				else{
					hide_msgbox();
				}
			}
			break;
		}
	}
}


function set_enable_ctrl(){
	hide_msgbox();
	for(var i = 1; i<= multi_num ; i++){
		document.getElementById("user"+i).value = document.getElementById("user"+i+"_hidden").value;
		document.getElementById("pwd"+i).value = document.getElementById("pwd"+i+"_hidden").value;
	}
}

function user_pwd_check(user_obj,pwd_obj){
		if(pwd_obj.value != ""){
			if(user_obj.value == ""){
				var ctr_obj=document.getElementById(user_obj);
				var point_xy=getPosition(user_obj);
				point_xy.x += user_obj.clientWidth+5;
				point_xy.y -= user_obj.clientHeight;
				var msgbox = new MessageBox("请重新输入一个非空字符串",point_xy);
				msgbox.Show();
				return false;
			}
			return true;
		}
		if(user_obj.value != ""){
			if(pwd_obj.value == ""){
				var ctr_obj=document.getElementById(pwd_obj);
				var point_xy=getPosition(pwd_obj);
				point_xy.x += pwd_obj.clientWidth+5;
				point_xy.y -= pwd_obj.clientHeight;
				var msgbox = new MessageBox("密码不能为空",point_xy);
				msgbox.Show();
				return false;
			}
			return true;
		}
		return true;
}

function set_redial(){
	var obj = document.getElementById("redial_check");
	var obj_hidden = document.getElementById("redial_hidden");
	if(obj.checked)
		obj_hidden.value = "1";
	else
		obj_hidden.value = "0";
}