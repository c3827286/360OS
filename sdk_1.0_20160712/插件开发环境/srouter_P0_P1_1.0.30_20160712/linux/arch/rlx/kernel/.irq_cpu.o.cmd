cmd_arch/rlx/kernel/irq_cpu.o := rsdk-linux-gcc -Wp,-MD,arch/rlx/kernel/.irq_cpu.o.d  -nostdinc -isystem /opt/tool/rtl/bin/../lib/gcc/mips-linux-uclibc/4.4.7/include -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include -Iinclude  -include include/generated/autoconf.h -D__KERNEL__ -Wall -Wundef -Wstrict-prototypes -Wno-trigraphs -fno-strict-aliasing -fno-common -Werror-implicit-function-declaration -Wno-format-security -fno-delete-null-pointer-checks -Os -ffunction-sections -mno-check-zero-division -mabi=32 -G 0 -mno-abicalls -fno-pic -pipe -msoft-float -ffreestanding -EB -UMIPSEB -U_MIPSEB -U__MIPSEB -U__MIPSEB__ -UMIPSEL -U_MIPSEL -U__MIPSEL -U__MIPSEL__ -DMIPSEB -D_MIPSEB -D__MIPSEB -D__MIPSEB__ -Iinclude/asm-rlx -Iarch/rlx/bsp/ -Iarch/rlx/ -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic -D"VMLINUX_LOAD_ADDRESS=0x80000000" -Wframe-larger-than=1024 -fomit-frame-pointer -Wdeclaration-after-statement -Wno-pointer-sign -fno-strict-overflow -fconserve-stack -Werror -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/drivers/net/rtl819x/AsicDriver -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/drivers/net/rtl819x/common    -D"KBUILD_STR(s)=\#s" -D"KBUILD_BASENAME=KBUILD_STR(irq_cpu)"  -D"KBUILD_MODNAME=KBUILD_STR(irq_cpu)"  -c -o arch/rlx/kernel/irq_cpu.o arch/rlx/kernel/irq_cpu.c

deps_arch/rlx/kernel/irq_cpu.o := \
  arch/rlx/kernel/irq_cpu.c \
    $(wildcard include/config/serial/rtl8198/uart1.h) \
    $(wildcard include/config/rtl8192cd.h) \
    $(wildcard include/config/rtl/8196c.h) \
    $(wildcard include/config/rtl/8196ct.h) \
    $(wildcard include/config/rtl/8196cs.h) \
    $(wildcard include/config/rtl/92d/dmdp.h) \
    $(wildcard include/config/rtl/dual/pcieslot/biwlan/d.h) \
    $(wildcard include/config/rtl/8198.h) \
    $(wildcard include/config/rtl/92d/support.h) \
    $(wildcard include/config/usb.h) \
    $(wildcard include/config/rtl/819x.h) \
    $(wildcard include/config/rtl/ictest/switch.h) \
    $(wildcard include/config/rtl/865x/eth.h) \
    $(wildcard include/config/rtl/nfbi/mdio.h) \
    $(wildcard include/config/rtl/8198/nfbi/board.h) \
    $(wildcard include/config/rtk/voip.h) \
  include/linux/init.h \
    $(wildcard include/config/modules.h) \
    $(wildcard include/config/hotplug.h) \
  include/linux/compiler.h \
    $(wildcard include/config/trace/branch/profiling.h) \
    $(wildcard include/config/profile/all/branches.h) \
    $(wildcard include/config/enable/must/check.h) \
    $(wildcard include/config/enable/warn/deprecated.h) \
  include/linux/compiler-gcc.h \
    $(wildcard include/config/arch/supports/optimized/inlining.h) \
    $(wildcard include/config/optimize/inlining.h) \
  include/linux/compiler-gcc4.h \
  include/linux/interrupt.h \
    $(wildcard include/config/generic/hardirqs.h) \
    $(wildcard include/config/lockdep.h) \
    $(wildcard include/config/pm/sleep.h) \
    $(wildcard include/config/smp.h) \
    $(wildcard include/config/generic/irq/probe.h) \
    $(wildcard include/config/proc/fs.h) \
  include/linux/kernel.h \
    $(wildcard include/config/lbdaf.h) \
    $(wildcard include/config/preempt/voluntary.h) \
    $(wildcard include/config/debug/spinlock/sleep.h) \
    $(wildcard include/config/prove/locking.h) \
    $(wildcard include/config/printk.h) \
    $(wildcard include/config/dynamic/debug.h) \
    $(wildcard include/config/ring/buffer.h) \
    $(wildcard include/config/tracing.h) \
    $(wildcard include/config/numa.h) \
    $(wildcard include/config/ftrace/mcount/record.h) \
    $(wildcard include/config/wy/debug.h) \
  /opt/tool/rtl/bin/../lib/gcc/mips-linux-uclibc/4.4.7/include/stdarg.h \
  include/linux/linkage.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/linkage.h \
  include/linux/stddef.h \
  include/linux/types.h \
    $(wildcard include/config/uid16.h) \
    $(wildcard include/config/phys/addr/t/64bit.h) \
    $(wildcard include/config/64bit.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/types.h \
  include/asm-generic/int-ll64.h \
    $(wildcard include/config/hsan.h) \
  include/linux/autoconf.h \
    $(wildcard include/config/nf/conntrack/h323.h) \
    $(wildcard include/config/ip/nf/target/redirect.h) \
    $(wildcard include/config/crc32.h) \
    $(wildcard include/config/nf/nat/proto/sctp.h) \
    $(wildcard include/config/seccomp.h) \
    $(wildcard include/config/vlan/8021q.h) \
    $(wildcard include/config/ip/multiple/tables.h) \
    $(wildcard include/config/flatmem/manual.h) \
    $(wildcard include/config/net/sch/hbwrr.h) \
    $(wildcard include/config/xz/dec/ia64.h) \
    $(wildcard include/config/nf/conntrack/netbios/ns.h) \
    $(wildcard include/config/rtl/check/switch/tx/hangup.h) \
    $(wildcard include/config/experimental.h) \
    $(wildcard include/config/ppp/sync/tty.h) \
    $(wildcard include/config/arch/cpu/rlx5281.h) \
    $(wildcard include/config/arch/suspend/possible.h) \
    $(wildcard include/config/inline/write/unlock/irq.h) \
    $(wildcard include/config/extrtl8212/phyid/p5.h) \
    $(wildcard include/config/cpu/has/wbc.h) \
    $(wildcard include/config/netfilter/xt/match/helper.h) \
    $(wildcard include/config/ssb/possible.h) \
    $(wildcard include/config/nf/nat/sip.h) \
    $(wildcard include/config/rtl/vlan/8021q.h) \
    $(wildcard include/config/net/sch/fifo.h) \
    $(wildcard include/config/stp.h) \
    $(wildcard include/config/arch/flatmem/enable.h) \
    $(wildcard include/config/flash/id.h) \
    $(wildcard include/config/nf/conntrack/sip.h) \
    $(wildcard include/config/crypto/manager/disable/tests.h) \
    $(wildcard include/config/default/security/dac.h) \
    $(wildcard include/config/cpu/big/endian.h) \
    $(wildcard include/config/fib/rules.h) \
    $(wildcard include/config/netfilter/xt/match/realm.h) \
    $(wildcard include/config/netdev/1000.h) \
    $(wildcard include/config/default/tcp/cong.h) \
    $(wildcard include/config/uevent/helper/path.h) \
    $(wildcard include/config/nf/nat/proto/gre.h) \
    $(wildcard include/config/rtl/extport/vlanid.h) \
    $(wildcard include/config/realtek/819xd.h) \
    $(wildcard include/config/wlan.h) \
    $(wildcard include/config/blk/dev/bsg.h) \
    $(wildcard include/config/netfilter/xt/target/rateest.h) \
    $(wildcard include/config/legacy/ptys.h) \
    $(wildcard include/config/crypto/rng2.h) \
    $(wildcard include/config/netfilter/netlink/queue.h) \
    $(wildcard include/config/serial/8250.h) \
    $(wildcard include/config/wireless/ext/sysfs.h) \
    $(wildcard include/config/arch/bus/pci.h) \
    $(wildcard include/config/sched/omit/frame/pointer.h) \
    $(wildcard include/config/crc/itu/t.h) \
    $(wildcard include/config/rtl8192e/soc/monitor.h) \
    $(wildcard include/config/jffs2/compression/options.h) \
    $(wildcard include/config/crypto/cast5.h) \
    $(wildcard include/config/mtd/partitions.h) \
    $(wildcard include/config/repeater/macconv.h) \
    $(wildcard include/config/rtl/reinit/switch/core.h) \
    $(wildcard include/config/rtl/5g/slot/1.h) \
    $(wildcard include/config/nf/conntrack/proc/compat.h) \
    $(wildcard include/config/dns/resolver.h) \
    $(wildcard include/config/mtd/cfi/i2.h) \
    $(wildcard include/config/inetpeer.h) \
    $(wildcard include/config/rtl/vap/support.h) \
    $(wildcard include/config/shmem.h) \
    $(wildcard include/config/mtd.h) \
    $(wildcard include/config/ask/ip/fib/hash.h) \
    $(wildcard include/config/crypto/des.h) \
    $(wildcard include/config/nls/codepage/437.h) \
    $(wildcard include/config/net/cls/u32.h) \
    $(wildcard include/config/rtl/pcie/simple/init.h) \
    $(wildcard include/config/nf/conntrack/sane.h) \
    $(wildcard include/config/max/swapfiles/shift.h) \
    $(wildcard include/config/zlib/inflate.h) \
    $(wildcard include/config/nf/ct/proto/dccp.h) \
    $(wildcard include/config/nf/nat/rtsp.h) \
    $(wildcard include/config/wlan/hal/88xx.h) \
    $(wildcard include/config/crypto/twofish/common.h) \
    $(wildcard include/config/page/size/4kb.h) \
    $(wildcard include/config/net/cls/route.h) \
    $(wildcard include/config/crypto/serpent.h) \
    $(wildcard include/config/kernel/stack/size/order.h) \
    $(wildcard include/config/arch/cpu/tls.h) \
    $(wildcard include/config/jffs2/fs.h) \
    $(wildcard include/config/cpu/has/sync.h) \
    $(wildcard include/config/mtd/cfi/util.h) \
    $(wildcard include/config/rtl/exchange/portmask.h) \
    $(wildcard include/config/netfilter/xt/match/string.h) \
    $(wildcard include/config/ip/nf/target/log.h) \
    $(wildcard include/config/hw/has/pci.h) \
    $(wildcard include/config/rtl/ap/package.h) \
    $(wildcard include/config/standalone.h) \
    $(wildcard include/config/mips.h) \
    $(wildcard include/config/block.h) \
    $(wildcard include/config/init/env/arg/limit.h) \
    $(wildcard include/config/nf/conntrack/pptp.h) \
    $(wildcard include/config/tmpfs/posix/acl.h) \
    $(wildcard include/config/nf/conntrack/irc.h) \
    $(wildcard include/config/ppp/deflate.h) \
    $(wildcard include/config/textsearch/kmp.h) \
    $(wildcard include/config/rtl/repeater/mode/support.h) \
    $(wildcard include/config/netfilter/xt/target/classify.h) \
    $(wildcard include/config/split/ptlock/cpus.h) \
    $(wildcard include/config/netfilter/xt/target/nfqueue.h) \
    $(wildcard include/config/wext/core.h) \
    $(wildcard include/config/nls.h) \
    $(wildcard include/config/arch/irq/vec.h) \
    $(wildcard include/config/pppoe.h) \
    $(wildcard include/config/netfilter/xt/match/owner.h) \
    $(wildcard include/config/ip/advanced/router.h) \
    $(wildcard include/config/cpu/has/llsc.h) \
    $(wildcard include/config/ip/nf/igd/ddos.h) \
    $(wildcard include/config/nls/iso8859/1.h) \
    $(wildcard include/config/crypto/workqueue.h) \
    $(wildcard include/config/textsearch/bm.h) \
    $(wildcard include/config/nat/linux.h) \
    $(wildcard include/config/ppp/mppe.h) \
    $(wildcard include/config/netdevices.h) \
    $(wildcard include/config/eventfd.h) \
    $(wildcard include/config/fs/posix/acl.h) \
    $(wildcard include/config/defconfig/list.h) \
    $(wildcard include/config/list.h) \
    $(wildcard include/config/serial/8250/console.h) \
    $(wildcard include/config/ip/nf/target/masquerade.h) \
    $(wildcard include/config/cc/optimize/for/size.h) \
    $(wildcard include/config/rtl/819xd.h) \
    $(wildcard include/config/nf/nat/proto/dccp.h) \
    $(wildcard include/config/nf/defrag/ipv4.h) \
    $(wildcard include/config/select/memory/model.h) \
    $(wildcard include/config/netfilter/advanced.h) \
    $(wildcard include/config/netfilter/xt/match/tcpmss.h) \
    $(wildcard include/config/mtd/cfi.h) \
    $(wildcard include/config/jffs2/fs/debug.h) \
    $(wildcard include/config/rtl/layered/driver.h) \
    $(wildcard include/config/band/2g/on/wlan0.h) \
    $(wildcard include/config/netfilter/netlink/log.h) \
    $(wildcard include/config/netfilter/xt/match/mark.h) \
    $(wildcard include/config/rtl/mld/proxy.h) \
    $(wildcard include/config/wlan/hal.h) \
    $(wildcard include/config/ip/nf/mangle.h) \
    $(wildcard include/config/ip/nf/filter.h) \
    $(wildcard include/config/rtl/odm/wlan/driver.h) \
    $(wildcard include/config/netfilter/xt/match/length.h) \
    $(wildcard include/config/textsearch/fsm.h) \
    $(wildcard include/config/generic/clockevents.h) \
    $(wildcard include/config/generic/find/last/bit.h) \
    $(wildcard include/config/mtd/cfi/staa.h) \
    $(wildcard include/config/ip/nf/netsniffer.h) \
    $(wildcard include/config/cls/u32/mark.h) \
    $(wildcard include/config/crypto/blowfish.h) \
    $(wildcard include/config/module/force/load.h) \
    $(wildcard include/config/nls/ascii.h) \
    $(wildcard include/config/slot/1/92d.h) \
    $(wildcard include/config/max/user/rt/prio.h) \
    $(wildcard include/config/trace/irqflags/support.h) \
    $(wildcard include/config/mtd/physmap.h) \
    $(wildcard include/config/mempool.h) \
    $(wildcard include/config/netfilter/xt/match/connmark.h) \
    $(wildcard include/config/xattr.h) \
    $(wildcard include/config/binfmt/elf.h) \
    $(wildcard include/config/ip/nf/target/ulog.h) \
    $(wildcard include/config/keys.h) \
    $(wildcard include/config/netfilter/xt/mark.h) \
    $(wildcard include/config/netfilter/xtables.h) \
    $(wildcard include/config/slabinfo.h) \
    $(wildcard include/config/crypto/hw.h) \
    $(wildcard include/config/jffs2/fs/writebuffer.h) \
    $(wildcard include/config/xz/dec/x86.h) \
    $(wildcard include/config/crc16.h) \
    $(wildcard include/config/generic/calibrate/delay.h) \
    $(wildcard include/config/net/cls.h) \
    $(wildcard include/config/broken/on/smp.h) \
    $(wildcard include/config/tmpfs.h) \
    $(wildcard include/config/pseudo/extend/dev.h) \
    $(wildcard include/config/anon/inodes.h) \
    $(wildcard include/config/nls/codepage/936.h) \
    $(wildcard include/config/futex.h) \
    $(wildcard include/config/cpu/supports/32bit/kernel.h) \
    $(wildcard include/config/netfilter/xt/target/hl.h) \
    $(wildcard include/config/serial/core/console.h) \
    $(wildcard include/config/nf/conntrack/events.h) \
    $(wildcard include/config/sysvipc.h) \
    $(wildcard include/config/crypto/pcomp2.h) \
    $(wildcard include/config/igmp.h) \
    $(wildcard include/config/nf/conntrack/ftp.h) \
    $(wildcard include/config/ip/nf/match/ecn.h) \
    $(wildcard include/config/unix.h) \
    $(wildcard include/config/crypto/hash2.h) \
    $(wildcard include/config/rtl/layered/asic/driver.h) \
    $(wildcard include/config/arch/cpu/uls.h) \
    $(wildcard include/config/rtl/wlan/hal/not/exist.h) \
    $(wildcard include/config/crypto/algapi.h) \
    $(wildcard include/config/bridge.h) \
    $(wildcard include/config/use/pcie/slot/0.h) \
    $(wildcard include/config/extrtl8212/phyid/p3.h) \
    $(wildcard include/config/mtd/cfi/i1.h) \
    $(wildcard include/config/nf/nat.h) \
    $(wildcard include/config/crypto/hash.h) \
    $(wildcard include/config/log/buf/shift.h) \
    $(wildcard include/config/rtl/eee/disabled.h) \
    $(wildcard include/config/extra/firmware.h) \
    $(wildcard include/config/virt/to/bus.h) \
    $(wildcard include/config/rtl/tdls/support.h) \
    $(wildcard include/config/generic/time.h) \
    $(wildcard include/config/blk/dev/loop.h) \
    $(wildcard include/config/nf/nat/irc.h) \
    $(wildcard include/config/trad/signals.h) \
    $(wildcard include/config/serial/8250/runtime/uarts.h) \
    $(wildcard include/config/arch/cache/wbc.h) \
    $(wildcard include/config/nf/nat/tftp.h) \
    $(wildcard include/config/ip/nf/igd/advert.h) \
    $(wildcard include/config/netfilter/xt/match/multiport.h) \
    $(wildcard include/config/rtl/wps2/support.h) \
    $(wildcard include/config/crypto/manager2.h) \
    $(wildcard include/config/xz/dec/bcj.h) \
    $(wildcard include/config/jffs2/zlib.h) \
    $(wildcard include/config/rtl/wtdog.h) \
    $(wildcard include/config/boot/32bit.h) \
    $(wildcard include/config/crypto/ecb.h) \
    $(wildcard include/config/nf/conntrack/amanda.h) \
    $(wildcard include/config/base/full.h) \
    $(wildcard include/config/zlib/deflate.h) \
    $(wildcard include/config/cpu/has/sleep.h) \
    $(wildcard include/config/fw/loader.h) \
    $(wildcard include/config/kallsyms.h) \
    $(wildcard include/config/netfilter/xt/match/recent.h) \
    $(wildcard include/config/netfilter/xt/match/pkttype.h) \
    $(wildcard include/config/crypto/sha1.h) \
    $(wildcard include/config/slot/0/8192ee.h) \
    $(wildcard include/config/net/sk/filter.h) \
    $(wildcard include/config/xz/dec.h) \
    $(wildcard include/config/watchdog.h) \
    $(wildcard include/config/arch/cpu/eb.h) \
    $(wildcard include/config/has/iomem.h) \
    $(wildcard include/config/ip/nf/match/ttl.h) \
    $(wildcard include/config/rtl/linkchg/process.h) \
    $(wildcard include/config/rtl/8197d/ap.h) \
    $(wildcard include/config/proc/kcore.h) \
    $(wildcard include/config/mtd/map/bank/width/1.h) \
    $(wildcard include/config/constructors.h) \
    $(wildcard include/config/epoll.h) \
    $(wildcard include/config/partition/advanced.h) \
    $(wildcard include/config/netfilter/xt/match/dccp.h) \
    $(wildcard include/config/net.h) \
    $(wildcard include/config/rtl/client/mode/support.h) \
    $(wildcard include/config/netfilter/xt/target/tcpmss.h) \
    $(wildcard include/config/rtl/layered/driver/l2.h) \
    $(wildcard include/config/netfilter/xt/match/dscp.h) \
    $(wildcard include/config/netfilter/xt/match/conntrack.h) \
    $(wildcard include/config/netfilter/xt/match/rateest.h) \
    $(wildcard include/config/mtd/gen/probe.h) \
    $(wildcard include/config/packet.h) \
    $(wildcard include/config/netfilter/xt/match/iprange.h) \
    $(wildcard include/config/nf/conntrack/tftp.h) \
    $(wildcard include/config/inet.h) \
    $(wildcard include/config/xz/dec/powerpc.h) \
    $(wildcard include/config/crypto/twofish.h) \
    $(wildcard include/config/crypto/aes.h) \
    $(wildcard include/config/dma/need/pci/map/state.h) \
    $(wildcard include/config/cpu/has/uls.h) \
    $(wildcard include/config/nf/conntrack/mark.h) \
    $(wildcard include/config/netfilter.h) \
    $(wildcard include/config/netfilter/xt/match/hashlimit.h) \
    $(wildcard include/config/arch/32bit.h) \
    $(wildcard include/config/nls/codepage/950.h) \
    $(wildcard include/config/nr/ldiscs.h) \
    $(wildcard include/config/blk/dev/ram/count.h) \
    $(wildcard include/config/ip/mroute.h) \
    $(wildcard include/config/nf/nat/needed.h) \
    $(wildcard include/config/32bit.h) \
    $(wildcard include/config/lockdep/support.h) \
    $(wildcard include/config/rtl/8197d.h) \
    $(wildcard include/config/generic/hardirqs/no//do/irq.h) \
    $(wildcard include/config/mtd/blkdevs.h) \
    $(wildcard include/config/netfilter/xt/match/sctp.h) \
    $(wildcard include/config/sysctl/syscall.h) \
    $(wildcard include/config/jffs2/cmode/priority.h) \
    $(wildcard include/config/nf/conntrack/rtsp.h) \
    $(wildcard include/config/netfilter/xt/match/connbytes.h) \
    $(wildcard include/config/generic/find/next/bit.h) \
    $(wildcard include/config/arch/cpu/sleep.h) \
    $(wildcard include/config/ip/nf/target/ttl.h) \
    $(wildcard include/config/defaults/kernel/2/6.h) \
    $(wildcard include/config/preempt/none.h) \
    $(wildcard include/config/netfilter/xt/match/mac.h) \
    $(wildcard include/config/netfilter/xt/target/nflog.h) \
    $(wildcard include/config/l2tp.h) \
    $(wildcard include/config/libcrc32c.h) \
    $(wildcard include/config/wlan/hal/8192ee.h) \
    $(wildcard include/config/iosched/noop.h) \
    $(wildcard include/config/generic/acl.h) \
    $(wildcard include/config/compat/brk.h) \
    $(wildcard include/config/localversion.h) \
    $(wildcard include/config/crypto.h) \
    $(wildcard include/config/default/mmap/min/addr.h) \
    $(wildcard include/config/ip/nf/iptables.h) \
    $(wildcard include/config/cmdline.h) \
    $(wildcard include/config/mtd/physmap/bankwidth.h) \
    $(wildcard include/config/cpu/rlx5281.h) \
    $(wildcard include/config/scsi/mod.h) \
    $(wildcard include/config/ip/nf/igd/gate/keeper.h) \
    $(wildcard include/config/slot/0/ext/lna.h) \
    $(wildcard include/config/crypto/crc32c.h) \
    $(wildcard include/config/serial/core.h) \
    $(wildcard include/config/embedded.h) \
    $(wildcard include/config/inline/read/unlock.h) \
    $(wildcard include/config/has/dma.h) \
    $(wildcard include/config/nf/ct/proto/sctp.h) \
    $(wildcard include/config/nf/nat/pptp.h) \
    $(wildcard include/config/auto/pcie/phy/scan.h) \
    $(wildcard include/config/squashfs/fragment/cache/size.h) \
    $(wildcard include/config/arch/cpu/llsc.h) \
    $(wildcard include/config/jffs2/rtime.h) \
    $(wildcard include/config/misc/filesystems.h) \
    $(wildcard include/config/netfilter/xt/match/connlimit.h) \
    $(wildcard include/config/pppol2tp.h) \
    $(wildcard include/config/nf/nat/h323.h) \
    $(wildcard include/config/xz/dec/sparc.h) \
    $(wildcard include/config/inline/read/unlock/irq.h) \
    $(wildcard include/config/netfilter/xt/match/esp.h) \
    $(wildcard include/config/irq/vec.h) \
    $(wildcard include/config/ip/route/multipath.h) \
    $(wildcard include/config/nf/nat/amanda.h) \
    $(wildcard include/config/crypto/arc4.h) \
    $(wildcard include/config/slhc.h) \
    $(wildcard include/config/use/pcie/slot/1.h) \
    $(wildcard include/config/crypto/manager.h) \
    $(wildcard include/config/net/sch/htb.h) \
    $(wildcard include/config/ppp/bsdcomp.h) \
    $(wildcard include/config/rt/mutexes.h) \
    $(wildcard include/config/netfilter/xt/target/mark.h) \
    $(wildcard include/config/net/cls/fw.h) \
    $(wildcard include/config/wireless.h) \
    $(wildcard include/config/wext/proc.h) \
    $(wildcard include/config/squashfs.h) \
    $(wildcard include/config/rtl/support/multi/profile.h) \
    $(wildcard include/config/hz/250.h) \
    $(wildcard include/config/arch/populates/node/map.h) \
    $(wildcard include/config/frame/warn.h) \
    $(wildcard include/config/generic/hweight.h) \
    $(wildcard include/config/netcore/fastpath.h) \
    $(wildcard include/config/netfilter/xt/target/idletimer.h) \
    $(wildcard include/config/inline/spin/unlock.h) \
    $(wildcard include/config/has/ioport.h) \
    $(wildcard include/config/hz.h) \
    $(wildcard include/config/netfilter/xt/match/u32.h) \
    $(wildcard include/config/inline/spin/unlock/irq.h) \
    $(wildcard include/config/serial/8250/nr/uarts.h) \
    $(wildcard include/config/default/iosched.h) \
    $(wildcard include/config/nlattr.h) \
    $(wildcard include/config/tcp/cong/cubic.h) \
    $(wildcard include/config/full/panic.h) \
    $(wildcard include/config/netfilter/xt/connmark.h) \
    $(wildcard include/config/firmware/in/kernel.h) \
    $(wildcard include/config/sysfs.h) \
    $(wildcard include/config/ip/nf/match/ah.h) \
    $(wildcard include/config/netfilter/xt/match/limit.h) \
    $(wildcard include/config/mtd/physmap/len.h) \
    $(wildcard include/config/xz/dec/arm.h) \
    $(wildcard include/config/rtl/debug/tool.h) \
    $(wildcard include/config/rtl/hw/l2/only.h) \
    $(wildcard include/config/arch/cpu/sync.h) \
    $(wildcard include/config/ip/fib/hash.h) \
    $(wildcard include/config/nf/conntrack/ipv4.h) \
    $(wildcard include/config/zone/dma/flag.h) \
    $(wildcard include/config/legacy/pty/count.h) \
    $(wildcard include/config/mtd/map/bank/width/2.h) \
    $(wildcard include/config/extrtl8212/phyid/p1.h) \
    $(wildcard include/config/ip/multicast.h) \
    $(wildcard include/config/squashfs/xz.h) \
    $(wildcard include/config/default/security.h) \
    $(wildcard include/config/nf/nat/proto/udplite.h) \
    $(wildcard include/config/wireless/ext.h) \
    $(wildcard include/config/tiny/rcu.h) \
    $(wildcard include/config/rwsem/generic/spinlock.h) \
    $(wildcard include/config/default/noop.h) \
    $(wildcard include/config/pci/hci.h) \
    $(wildcard include/config/mips/l1/cache/shift.h) \
    $(wildcard include/config/rtl/proc/debug.h) \
    $(wildcard include/config/base/small.h) \
    $(wildcard include/config/crypto/blkcipher2.h) \
    $(wildcard include/config/mtd/block.h) \
    $(wildcard include/config/sys/supports/arbit/hz.h) \
    $(wildcard include/config/rtl/819x/swcore.h) \
    $(wildcard include/config/flatmem.h) \
    $(wildcard include/config/pageflags/extended.h) \
    $(wildcard include/config/mtd/physmap/compat.h) \
    $(wildcard include/config/rtl819x/spi/flash.h) \
    $(wildcard include/config/sysctl.h) \
    $(wildcard include/config/ppp/async.h) \
    $(wildcard include/config/cpu/has/tls.h) \
    $(wildcard include/config/slab.h) \
    $(wildcard include/config/binfmt/elf32.h) \
    $(wildcard include/config/arch/irq/cpu.h) \
    $(wildcard include/config/rtl865x/mbuf/headroom.h) \
    $(wildcard include/config/blk/dev.h) \
    $(wildcard include/config/unix98/ptys.h) \
    $(wildcard include/config/netfilter/xt/target/connmark.h) \
    $(wildcard include/config/net/sched.h) \
    $(wildcard include/config/printk/time.h) \
    $(wildcard include/config/ppp.h) \
    $(wildcard include/config/netfilter/xt/match/quota.h) \
    $(wildcard include/config/txpwr/lmt.h) \
    $(wildcard include/config/nf/nat/ftp.h) \
    $(wildcard include/config/nf/ct/proto/udplite.h) \
    $(wildcard include/config/elf/core.h) \
    $(wildcard include/config/textsearch.h) \
    $(wildcard include/config/dma/noncoherent.h) \
    $(wildcard include/config/mtd/jedecprobe.h) \
    $(wildcard include/config/slot/0/tx/beamforming.h) \
    $(wildcard include/config/mtd/char.h) \
    $(wildcard include/config/inet/lro.h) \
    $(wildcard include/config/flat/node/mem/map.h) \
    $(wildcard include/config/sta/announce.h) \
    $(wildcard include/config/blk/dev/ram.h) \
    $(wildcard include/config/netfilter/xt/match/state.h) \
    $(wildcard include/config/irq/cpu.h) \
    $(wildcard include/config/generic/clockevents/build.h) \
    $(wildcard include/config/mtd/cfi/amdstd.h) \
    $(wildcard include/config/sys/supports/32bit/kernel.h) \
    $(wildcard include/config/sysvipc/sysctl.h) \
    $(wildcard include/config/mtd/physmap/start.h) \
    $(wildcard include/config/reltek/gpio.h) \
    $(wildcard include/config/llc.h) \
    $(wildcard include/config/cross/compile.h) \
    $(wildcard include/config/xz/dec/armthumb.h) \
    $(wildcard include/config/nls/utf8.h) \
    $(wildcard include/config/sch/hbwrr/keepid.h) \
    $(wildcard include/config/rtl/layered/driver/acl.h) \
    $(wildcard include/config/crc/ccitt.h) \
    $(wildcard include/config/netfilter/netlink.h) \
    $(wildcard include/config/module/unload.h) \
    $(wildcard include/config/bitreverse.h) \
    $(wildcard include/config/blk/dev/ram/size.h) \
    $(wildcard include/config/crypto/blkcipher.h) \
    $(wildcard include/config/nf/conntrack.h) \
    $(wildcard include/config/file/locking.h) \
    $(wildcard include/config/mac/phy/rf/parameter/v702b/skyworth.h) \
    $(wildcard include/config/arch/supports/oprofile.h) \
    $(wildcard include/config/ip/nf/target/reject.h) \
    $(wildcard include/config/mtd/map/bank/width/4.h) \
    $(wildcard include/config/nls/default.h) \
    $(wildcard include/config/nf/ct/proto/gre.h) \
    $(wildcard include/config/crypto/aead2.h) \
    $(wildcard include/config/netfilter/xt/match/hl.h) \
    $(wildcard include/config/crypto/algapi2.h) \
    $(wildcard include/config/rtl/sdram/ge/32m.h) \
    $(wildcard include/config/ip/nf/match/addrtype.h) \
    $(wildcard include/config/proc/sysctl.h) \
    $(wildcard include/config/mmu.h) \
    $(wildcard include/config/inline/write/unlock.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/bitsperlong.h \
  include/asm-generic/bitsperlong.h \
  include/linux/posix_types.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/posix_types.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/sgidefs.h \
  include/linux/bitops.h \
    $(wildcard include/config/generic/find/first/bit.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/bitops.h \
    $(wildcard include/config/cpu/rlx4181.h) \
    $(wildcard include/config/cpu/rlx5181.h) \
    $(wildcard include/config/cpu/has/radiax.h) \
  include/linux/irqflags.h \
    $(wildcard include/config/trace/irqflags.h) \
    $(wildcard include/config/irqsoff/tracer.h) \
    $(wildcard include/config/preempt/tracer.h) \
  include/linux/typecheck.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/irqflags.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/hazards.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/cpu-features.h \
    $(wildcard include/config/cpu/has/ejtag.h) \
    $(wildcard include/config/cpu/has/watch.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/cpu.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/cpu-info.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/cache.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic/kmalloc.h \
    $(wildcard include/config/dma/coherent.h) \
  arch/rlx/bsp/bspcpu.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/barrier.h \
    $(wildcard include/config/cpu/has/wb.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/bug.h \
    $(wildcard include/config/bug.h) \
  include/asm-generic/bug.h \
    $(wildcard include/config/generic/bug.h) \
    $(wildcard include/config/generic/bug/relative/pointers.h) \
    $(wildcard include/config/debug/bugverbose.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/byteorder.h \
  include/linux/byteorder/big_endian.h \
  include/linux/swab.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/swab.h \
  include/linux/byteorder/generic.h \
  include/asm-generic/bitops/non-atomic.h \
  include/asm-generic/bitops/fls64.h \
  include/asm-generic/bitops/ffz.h \
  include/asm-generic/bitops/find.h \
  include/asm-generic/bitops/sched.h \
  include/asm-generic/bitops/hweight.h \
  include/asm-generic/bitops/arch_hweight.h \
  include/asm-generic/bitops/const_hweight.h \
  include/asm-generic/bitops/ext2-non-atomic.h \
  include/asm-generic/bitops/le.h \
  include/asm-generic/bitops/ext2-atomic.h \
  include/asm-generic/bitops/minix.h \
  include/linux/log2.h \
    $(wildcard include/config/arch/has/ilog2/u32.h) \
    $(wildcard include/config/arch/has/ilog2/u64.h) \
  include/linux/dynamic_debug.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/div64.h \
  include/asm-generic/div64.h \
  include/linux/wy_debug.h \
  include/linux/preempt.h \
    $(wildcard include/config/debug/preempt.h) \
    $(wildcard include/config/preempt.h) \
    $(wildcard include/config/preempt/notifiers.h) \
  include/linux/thread_info.h \
    $(wildcard include/config/compat.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/thread_info.h \
    $(wildcard include/config/debug/stack/usage.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/processor.h \
    $(wildcard include/config/rtl8197b/pana.h) \
    $(wildcard include/config/rtl/8196e.h) \
  include/linux/cpumask.h \
    $(wildcard include/config/cpumask/offstack.h) \
    $(wildcard include/config/hotplug/cpu.h) \
    $(wildcard include/config/debug/per/cpu/maps.h) \
    $(wildcard include/config/disable/obsolete/cpumask/functions.h) \
  include/linux/threads.h \
    $(wildcard include/config/nr/cpus.h) \
  include/linux/bitmap.h \
  include/linux/string.h \
    $(wildcard include/config/binary/printf.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/string.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/cachectl.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/rlxregs.h \
    $(wildcard include/config/cpu/rlx4281.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/system.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/addrspace.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic/spaces.h \
  include/linux/const.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/cmpxchg.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/watch.h \
  include/linux/list.h \
    $(wildcard include/config/debug/list.h) \
  include/linux/poison.h \
    $(wildcard include/config/illegal/pointer/value.h) \
  include/linux/prefetch.h \
  include/linux/irqreturn.h \
  include/linux/irqnr.h \
  include/linux/hardirq.h \
    $(wildcard include/config/virt/cpu/accounting.h) \
    $(wildcard include/config/no/hz.h) \
  include/linux/lockdep.h \
    $(wildcard include/config/lock/stat.h) \
    $(wildcard include/config/debug/lock/alloc.h) \
    $(wildcard include/config/prove/rcu.h) \
  include/linux/ftrace_irq.h \
    $(wildcard include/config/ftrace/nmi/enter.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/hardirq.h \
  include/linux/irq.h \
    $(wildcard include/config/s390.h) \
    $(wildcard include/config/irq/per/cpu.h) \
    $(wildcard include/config/irq/release/method.h) \
    $(wildcard include/config/intr/remap.h) \
    $(wildcard include/config/generic/pending/irq.h) \
    $(wildcard include/config/sparse/irq.h) \
    $(wildcard include/config/numa/irq/desc.h) \
    $(wildcard include/config/cpumasks/offstack.h) \
  include/linux/smp.h \
    $(wildcard include/config/use/generic/smp/helpers.h) \
  include/linux/errno.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/errno.h \
  include/asm-generic/errno-base.h \
  include/linux/cache.h \
    $(wildcard include/config/arch/has/cache/line/size.h) \
  include/linux/spinlock.h \
    $(wildcard include/config/debug/spinlock.h) \
    $(wildcard include/config/generic/lockbreak.h) \
  include/linux/stringify.h \
  include/linux/bottom_half.h \
  include/linux/spinlock_types.h \
  include/linux/spinlock_types_up.h \
  include/linux/rwlock_types.h \
  include/linux/spinlock_up.h \
  include/linux/rwlock.h \
  include/linux/spinlock_api_up.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/atomic.h \
  include/asm-generic/atomic-long.h \
  include/linux/gfp.h \
    $(wildcard include/config/kmemcheck.h) \
    $(wildcard include/config/highmem.h) \
    $(wildcard include/config/zone/dma.h) \
    $(wildcard include/config/zone/dma32.h) \
    $(wildcard include/config/debug/vm.h) \
  include/linux/mmzone.h \
    $(wildcard include/config/force/max/zoneorder.h) \
    $(wildcard include/config/memory/hotplug.h) \
    $(wildcard include/config/sparsemem.h) \
    $(wildcard include/config/compaction.h) \
    $(wildcard include/config/discontigmem.h) \
    $(wildcard include/config/cgroup/mem/res/ctlr.h) \
    $(wildcard include/config/no/bootmem.h) \
    $(wildcard include/config/have/memory/present.h) \
    $(wildcard include/config/have/memoryless/nodes.h) \
    $(wildcard include/config/need/node/memmap/size.h) \
    $(wildcard include/config/need/multiple/nodes.h) \
    $(wildcard include/config/have/arch/early/pfn/to/nid.h) \
    $(wildcard include/config/sparsemem/extreme.h) \
    $(wildcard include/config/nodes/span/other/nodes.h) \
    $(wildcard include/config/holes/in/zone.h) \
    $(wildcard include/config/arch/has/holes/memorymodel.h) \
  include/linux/wait.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/current.h \
  include/linux/numa.h \
    $(wildcard include/config/nodes/shift.h) \
  include/linux/seqlock.h \
  include/linux/nodemask.h \
  include/linux/pageblock-flags.h \
    $(wildcard include/config/hugetlb/page.h) \
    $(wildcard include/config/hugetlb/page/size/variable.h) \
  include/generated/bounds.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/page.h \
  include/linux/pfn.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/io.h \
  include/asm-generic/iomap.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/pgtable-bits.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic/ioremap.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic/mangle-port.h \
    $(wildcard include/config/swap/io/space.h) \
  include/asm-generic/memory_model.h \
    $(wildcard include/config/sparsemem/vmemmap.h) \
  include/asm-generic/getorder.h \
  include/linux/memory_hotplug.h \
    $(wildcard include/config/have/arch/nodedata/extension.h) \
    $(wildcard include/config/memory/hotremove.h) \
  include/linux/notifier.h \
  include/linux/mutex.h \
    $(wildcard include/config/debug/mutexes.h) \
  include/linux/rwsem.h \
  include/linux/rwsem-spinlock.h \
  include/linux/srcu.h \
  include/linux/topology.h \
    $(wildcard include/config/sched/smt.h) \
    $(wildcard include/config/sched/mc.h) \
    $(wildcard include/config/use/percpu/numa/node/id.h) \
  include/linux/percpu.h \
    $(wildcard include/config/need/per/cpu/embed/first/chunk.h) \
    $(wildcard include/config/need/per/cpu/page/first/chunk.h) \
    $(wildcard include/config/have/setup/per/cpu/area.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/percpu.h \
  include/asm-generic/percpu.h \
  include/linux/percpu-defs.h \
    $(wildcard include/config/debug/force/weak/per/cpu.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/topology.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic/topology.h \
  include/asm-generic/topology.h \
  include/linux/mmdebug.h \
    $(wildcard include/config/debug/virtual.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/irq.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic/irq.h \
    $(wildcard include/config/i8259.h) \
    $(wildcard include/config/irq/cpu/rm7k.h) \
    $(wildcard include/config/irq/cpu/rm9k.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/ptrace.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/isadep.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/irq_regs.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/hw_irq.h \
  include/linux/irq_cpustat.h \
  include/linux/hrtimer.h \
    $(wildcard include/config/timer/stats.h) \
    $(wildcard include/config/high/res/timers.h) \
    $(wildcard include/config/debug/objects/timers.h) \
  include/linux/rbtree.h \
  include/linux/ktime.h \
    $(wildcard include/config/ktime/scalar.h) \
  include/linux/time.h \
    $(wildcard include/config/arch/uses/gettimeoffset.h) \
  include/linux/math64.h \
  include/linux/jiffies.h \
  include/linux/timex.h \
  include/linux/param.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/param.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/timex.h \
  include/linux/timer.h \
  include/linux/debugobjects.h \
    $(wildcard include/config/debug/objects.h) \
    $(wildcard include/config/debug/objects/free.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/irq_cpu.h \
  arch/rlx/bsp/bspchip.h \
    $(wildcard include/config/fpga/platform.h) \
    $(wildcard include/config/rtl/usb/ip/host/speedup.h) \

arch/rlx/kernel/irq_cpu.o: $(deps_arch/rlx/kernel/irq_cpu.o)

$(deps_arch/rlx/kernel/irq_cpu.o):
