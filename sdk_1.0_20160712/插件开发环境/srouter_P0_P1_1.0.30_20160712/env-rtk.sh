export PATH=`pwd`/toolchain/rsdk-4.4.7-5281-EB-2.6.36-0.9.33-m32utb-140618/bin:`pwd`/utility:$PATH
export CROSS_COMPILE=mips-linux-
export CROSS_PREFIX=mips-linux-
export CC=${CROSS_PREFIX}gcc
export STRIP=${CROSS_PREFIX}strip
export AR=${CROSS_PREFIX}ar
export RANLIB=${CROSS_PREFIX}ranlib
export OBJCOPY=${CROSS_PREFIX}objcopy


