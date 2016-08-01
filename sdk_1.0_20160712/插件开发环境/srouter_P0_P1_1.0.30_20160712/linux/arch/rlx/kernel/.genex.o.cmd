cmd_arch/rlx/kernel/genex.o := rsdk-linux-gcc -Wp,-MD,arch/rlx/kernel/.genex.o.d  -nostdinc -isystem /opt/tool/rtl/bin/../lib/gcc/mips-linux-uclibc/4.4.7/include -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include -Iinclude  -include include/generated/autoconf.h -D__KERNEL__ -D__ASSEMBLY__ -ffunction-sections  -mno-check-zero-division -mabi=32 -G 0 -mno-abicalls -fno-pic -pipe -msoft-float -ffreestanding -EB -UMIPSEB -U_MIPSEB -U__MIPSEB -U__MIPSEB__ -UMIPSEL -U_MIPSEL -U__MIPSEL -U__MIPSEL__ -DMIPSEB -D_MIPSEB -D__MIPSEB -D__MIPSEB__ -Iinclude/asm-rlx -Iarch/rlx/bsp/ -Iarch/rlx/ -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic        -c -o arch/rlx/kernel/genex.o arch/rlx/kernel/genex.S

deps_arch/rlx/kernel/genex.o := \
  arch/rlx/kernel/genex.S \
    $(wildcard include/config/trace/irqflags.h) \
    $(wildcard include/config/cpu/has/watch.h) \
  include/linux/init.h \
    $(wildcard include/config/modules.h) \
    $(wildcard include/config/hotplug.h) \
  include/linux/compiler.h \
    $(wildcard include/config/trace/branch/profiling.h) \
    $(wildcard include/config/profile/all/branches.h) \
    $(wildcard include/config/enable/must/check.h) \
    $(wildcard include/config/enable/warn/deprecated.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/asm.h \
    $(wildcard include/config/printk.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/sgidefs.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/asmmacro.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/hazards.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/asmmacro-32.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/asm-offsets.h \
  include/generated/asm-offsets.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/regdef.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/rlxregs.h \
    $(wildcard include/config/cpu/rlx5281.h) \
    $(wildcard include/config/cpu/rlx4281.h) \
  include/linux/linkage.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/linkage.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/cacheops.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/irqflags.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/stackframe.h \
    $(wildcard include/config/cpu/has/radiax.h) \
  include/linux/threads.h \
    $(wildcard include/config/nr/cpus.h) \
    $(wildcard include/config/base/small.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/page.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic/spaces.h \
    $(wildcard include/config/32bit.h) \
    $(wildcard include/config/64bit.h) \
    $(wildcard include/config/dma/noncoherent.h) \
  include/linux/const.h \
  include/asm-generic/memory_model.h \
    $(wildcard include/config/flatmem.h) \
    $(wildcard include/config/discontigmem.h) \
    $(wildcard include/config/sparsemem/vmemmap.h) \
    $(wildcard include/config/sparsemem.h) \
  include/asm-generic/getorder.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/thread_info.h \
    $(wildcard include/config/kernel/stack/size/order.h) \
    $(wildcard include/config/debug/stack/usage.h) \

arch/rlx/kernel/genex.o: $(deps_arch/rlx/kernel/genex.o)

$(deps_arch/rlx/kernel/genex.o):
