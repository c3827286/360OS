cmd_arch/rlx/lib/memcpy-inatomic.o := rsdk-linux-gcc -Wp,-MD,arch/rlx/lib/.memcpy-inatomic.o.d  -nostdinc -isystem /opt/tool/rtl/bin/../lib/gcc/mips-linux-uclibc/4.4.7/include -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include -Iinclude  -include include/generated/autoconf.h -D__KERNEL__ -D__ASSEMBLY__ -ffunction-sections  -mno-check-zero-division -mabi=32 -G 0 -mno-abicalls -fno-pic -pipe -msoft-float -ffreestanding -EB -UMIPSEB -U_MIPSEB -U__MIPSEB -U__MIPSEB__ -UMIPSEL -U_MIPSEL -U__MIPSEL -U__MIPSEL__ -DMIPSEB -D_MIPSEB -D__MIPSEB -D__MIPSEB__ -Iinclude/asm-rlx -Iarch/rlx/bsp/ -Iarch/rlx/ -I/home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/mach-generic        -c -o arch/rlx/lib/memcpy-inatomic.o arch/rlx/lib/memcpy-inatomic.S

deps_arch/rlx/lib/memcpy-inatomic.o := \
  arch/rlx/lib/memcpy-inatomic.S \
    $(wildcard include/config/cpu/little/endian.h) \
    $(wildcard include/config/cpu/has/uls.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/asm.h \
    $(wildcard include/config/printk.h) \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/sgidefs.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/asm-offsets.h \
  include/generated/asm-offsets.h \
  /home/lianlong/P1_POWER4S_PLUGIN/RT288x_SDK/source/linux-2.6.36.x/arch/rlx/include/asm/regdef.h \

arch/rlx/lib/memcpy-inatomic.o: $(deps_arch/rlx/lib/memcpy-inatomic.o)

$(deps_arch/rlx/lib/memcpy-inatomic.o):
