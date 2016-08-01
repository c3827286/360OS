local paths = {
	"/web/lua/lib/",
	"/web/lua/project/",
	"/web/lua/project/2500-05/cgi/",
	"/web/lua/project/2500-06/cgi/",
	"/web/lua/project/2507s/cgi/",
	"/web/lua/project/2907/cgi/",
	"/var/"
}

package.path = package.path..";"
package.cpath = package.cpath..";"
for i, v in pairs(paths) do
	package.path = package.path ..v.."?.lua;"
	package.cpath = package.cpath ..v .."?.so;"
end

cgi = cgi or {};

cgi.config = {
	test = false, -- 是否运行测试代码
	debug = true
};

require("config")
require("json")
require("igd")
require("router")
require("set")
require("exec_lua")
require("lua_route")
require("lua_arp")
require("lua_link")
require("lua_addrr")
require("lua_rule")
require("lua_qdisc")
require("lua_password")
require("lua_dhcp_file_write")


set.wan.wan_mac_set();
set.lan.lan_mac_set();
set.lan.dhcp_set();
