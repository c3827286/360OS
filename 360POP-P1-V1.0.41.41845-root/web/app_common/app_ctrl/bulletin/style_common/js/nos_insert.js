(function () {
	function loadScript(url, callback) {
		var d = new Date();
		var script = document.createElement("script")
		script.type = "text/javascript";
		
		if (script.readyState) { //IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					try{
						eval(callback+"();");
					}
					catch(e){}
				}
			};
		}
		else { //Others
			script.onload = function () {
				try{
					callback();
				}
				catch(e){}
			};
		}
		script.src = url + "?t=" + d.getTime();
		document.getElementsByTagName('body')[0].appendChild(script);
	}

	var _isJQ = !!(window.jQuery);
	if(_isJQ){
		loadScript("/javascript/cookie.js",function(){
														
				loadScript("/javascript/err.js",function(){
					
					loadScript("/app_common/app_ctrl/js/app_lib.js",function(){
						
						loadScript("/app_common/app_ctrl/bulletin/style_common/js/nos_param.js");
					});
				});
			});
	}
	else{
		loadScript("/javascript/jquery-1.7.2.min.js",function(){
			
			loadScript("/javascript/cookie.js",function(){
														
				loadScript("/javascript/err.js",function(){
					
					loadScript("/app_common/app_ctrl/js/app_lib.js",function(){
						
						loadScript("/app_common/app_ctrl/bulletin/style_common/js/nos_param.js");
					});
				});
			});
	
		});
	}
})();