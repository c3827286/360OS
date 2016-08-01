local paths = {
	"/web/lua/lib/",
	"/var/"
}

package.path = package.path..";"
package.cpath = package.cpath..";"
for i, v in pairs(paths) do
	package.path = package.path ..v.."?.lua;"
	package.cpath = package.cpath ..v .."?.so;"
end
require("router")
require("lua_route")
require("lua_arp")


function route_init()
	for k,v in pairs(igd.router.route.normal_route.table) do
		route.add(v.ip,v.mask,igd.router.dev.LAN);
	end
end
function arp_init()
	
	for k,v in pairs(igd.router.bind_arp.table) do
		arp.add(v.ip,v.mac,v.interface);
	end

end

route_init();
arp_init();