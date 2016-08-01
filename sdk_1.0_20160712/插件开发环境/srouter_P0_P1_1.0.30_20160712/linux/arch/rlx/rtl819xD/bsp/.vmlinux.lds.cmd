cmd_arch/rlx/bsp/vmlinux.lds := rsdk-linux-gcc -E -Wp,-MD,arch/rlx/bsp/.vmlinux.lds.d  -nostdinc -isystem /opt/tool/rtl/bin/../lib/gcc/mips-linux-uclibc/4.4.7/include -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include -Iinclude  -include include/generated/autoconf.h -D__KERNEL__   -Wall -Wundef -Wstrict-prototypes -Wno-trigraphs -fno-strict-aliasing -fno-common -Werror-implicit-function-declaration -Wno-format-security -fno-delete-null-pointer-checks -Os -ffunction-sections  -mno-check-zero-division -mabi=32 -G 0 -mno-abicalls -fno-pic -pipe -msoft-float -ffreestanding -EB -UMIPSEB -U_MIPSEB -U__MIPSEB -U__MIPSEB__ -UMIPSEL -U_MIPSEL -U__MIPSEL -U__MIPSEL__ -DMIPSEB -D_MIPSEB -D__MIPSEB -D__MIPSEB__ -Iinclude/asm-rlx -Iarch/rlx/bsp/ -Iarch/rlx/ -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic -D"VMLINUX_LOAD_ADDRESS=0x80000000" -D"LOADADDR=0x80000000" -D"JIFFIES=jiffies_64 + 4" -D"DATAOFFSET=0" -D"ZZ_DRAMSIZE_ZZ=8k" -D"ZZ_IRAMSIZE_ZZ=8k" -D"ZZ_L2RAMSIZE_ZZ=32k" -P -C -Urlx -D__ASSEMBLY__ -DLINKER_SCRIPT -o arch/rlx/bsp/vmlinux.lds arch/rlx/bsp/vmlinux.lds.S

deps_arch/rlx/bsp/vmlinux.lds := \
  arch/rlx/bsp/vmlinux.lds.S \
    $(wildcard include/config/rtk/voip.h) \
    $(wildcard include/config/rtl8192se.h) \
    $(wildcard include/config/mapped/kernel.h) \
    $(wildcard include/config/blk/dev/initrd.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/asm-offsets.h \
  include/generated/asm-offsets.h \
  include/asm-generic/vmlinux.lds.h \
    $(wildcard include/config/hotplug.h) \
    $(wildcard include/config/hotplug/cpu.h) \
    $(wildcard include/config/memory/hotplug.h) \
    $(wildcard include/config/ftrace/mcount/record.h) \
    $(wildcard include/config/trace/branch/profiling.h) \
    $(wildcard include/config/profile/all/branches.h) \
    $(wildcard include/config/event/tracing.h) \
    $(wildcard include/config/tracing.h) \
    $(wildcard include/config/ftrace/syscalls.h) \
    $(wildcard include/config/function/graph/tracer.h) \
    $(wildcard include/config/constructors.h) \
    $(wildcard include/config/generic/bug.h) \
    $(wildcard include/config/pm/trace.h) \

arch/rlx/bsp/vmlinux.lds: $(deps_arch/rlx/bsp/vmlinux.lds)

$(deps_arch/rlx/bsp/vmlinux.lds):
