/*
 * This file is subject to the terms and conditions of the GNU General Public
 * License.  See the file "COPYING" in the main directory of this archive
 * for more details.
 *
 * Copyright (C) 1994 Waldorf GMBH
 * Copyright (C) 1995, 1996, 1997, 1998, 1999, 2001, 2002, 2003 Ralf Baechle
 * Copyright (C) 1996 Paul M. Antoine
 * Copyright (C) 1999, 2000 Silicon Graphics, Inc.
 */
#ifndef _ASM_PROCESSOR_H
#define _ASM_PROCESSOR_H

#include <linux/cpumask.h>
#include <linux/threads.h>

#include <asm/cachectl.h>
#include <asm/cpu.h>
#include <asm/cpu-info.h>
#include <asm/rlxregs.h>
#include <asm/system.h>

/*
 * Return current * instruction pointer ("program counter").
 */
#define current_text_addr() ({ __label__ _l; _l: &&_l;})

/*
 * System setup and hardware flags..
 */
#ifdef CONFIG_CPU_HAS_SLEEP
#define __cpu_wait()                                \
{                                                 \
      __asm__ __volatile__(                       \
       "sleep         \n"                         \
       "nop           \n"                         \
       "nop           \n");                       \
}
#else
#define __cpu_wait()                                \
{                                                 \
      __asm__ __volatile__(                       \
       "nop           \n"                         \
       "nop           \n"                         \
       "nop           \n"                         \
       "nop           \n"                         \
       "nop           \n"                         \
       "nop           \n");                       \
}
#endif

 #ifdef CONFIG_ARCH_SUSPEND_POSSIBLE
/* this function is refer to nino_wait() in \linux-2.4.18\arch\mips\philips\nino\power.c */
static inline void cpu_wait(void)
{
#ifdef CONFIG_RTL8197B_PANA
	extern int cpu_suspend_enabled;
	if (!cpu_suspend_enabled)
		return;	
#endif

/*
 * 08-12-2008, due to the WLAN performance is no difference in 10/100 and giga board when gCpuCanSuspend=1
 * (that means CPU always can suspend), the following code is disabled.
 * ==> only apply to RTL865X, it still need to check the WLAN throughput in RTL8196B
 */

#if defined(CONFIG_RTL_8196C) || defined(CONFIG_RTL_819XD) || defined(CONFIG_RTL_8196E)
#ifdef CONFIG_CPU_HAS_SLEEP
	extern int cpu_can_suspend, cpu_can_suspend_check_init;
	extern void suspend_check_interrupt_init(void);
	
	if (cpu_can_suspend_check_init) {
		if (!cpu_can_suspend){
	            return;
	        }
	}
	else {
		suspend_check_interrupt_init();
		cpu_can_suspend_check_init = 1;
	}
#endif
#endif

	/* We stop the CPU to conserve power */
	__cpu_wait();
};
#endif

/*
 * User space process size: 2GB. This is hardcoded into a few places,
 * so don't change it unless you know what you are doing.
 */
#define TASK_SIZE	0x7fff8000UL
#define STACK_TOP	TASK_SIZE

/*
 * This decides where the kernel will search for a free chunk of vm
 * space during mmap's.
 */
#define TASK_UNMAPPED_BASE	((TASK_SIZE / 3) & ~(PAGE_SIZE))

#define TASK_IS_32BIT_ADDR 1
#ifdef __KERNEL__
#define STACK_TOP_MAX	TASK_SIZE
#endif

#define NUM_FPU_REGS	32

typedef __u64 fpureg_t;

/*
 * It would be nice to add some more fields for emulator statistics, but there
 * are a number of fixed offsets in offset.h and elsewhere that would have to
 * be recalculated by hand.  So the additional information will be private to
 * the FPU emulator for now.  See asm-mips/fpu_emulator.h.
 */

struct mips_fpu_struct {
	fpureg_t	fpr[NUM_FPU_REGS];
	unsigned int	fcr31;
};

#define NUM_DSP_REGS   6

typedef __u32 dspreg_t;

struct mips_dsp_state {
	dspreg_t        dspr[NUM_DSP_REGS];
	unsigned int    dspcontrol;
};
#define INIT_CPUMASK { \
	{0,} \
}

#if defined(CONFIG_CPU_HAS_WATCH)
struct rlx3264_watch_reg_state {
	/* The width of watchlo is 32 in a 32 bit kernel and 64 in a
	   64 bit kernel.  We use unsigned long as it has the same
	   property. */
	unsigned long watchlo[NUM_WATCH_REGS];
	/* Only the mask and IRW bits from watchhi. */
	u16 watchhi[NUM_WATCH_REGS];
	unsigned long wmpxmask[NUM_WATCH_REGS];
	unsigned long wmpvaddr;
};

union rlx_watch_reg_state {
	struct rlx3264_watch_reg_state rlx3264;
};
#endif

typedef struct {
	unsigned long seg;
} mm_segment_t;

#define ARCH_MIN_TASKALIGN	8

struct mips_abi;

/*
 * If you change thread_struct remember to change the #defines below too!
 */
struct thread_struct {
	/* Saved main processor registers. */
	unsigned long reg16;
	unsigned long reg17, reg18, reg19, reg20, reg21, reg22, reg23;
	unsigned long reg29, reg30, reg31;

	/* Saved cp0 stuff. */
	unsigned long cp0_status;
	/* Saved fpu/fpu emulator stuff. */
	struct mips_fpu_struct fpu;
#if defined(CONFIG_CPU_HAS_WATCH)
	/* Saved watch register state, if available. */
	union rlx_watch_reg_state watch;
#endif
	/* Other stuff associated with the thread. */
	unsigned long cp0_badvaddr;	/* Last user fault */
	unsigned long cp0_baduaddr;	/* Last kernel fault accessing USEG */
	unsigned long error_code;
	unsigned long trap_no;
	struct mips_abi *abi;
};

#if defined(CONFIG_CPU_HAS_WATCH)

#define INIT_THREAD  {				    \
    /*							        \
     * Saved main processor registers	\
     */							        \
	.reg16			= 0,				\
	.reg17			= 0,				\
	.reg18			= 0,				\
	.reg19			= 0,				\
	.reg20			= 0,				\
	.reg21			= 0,				\
	.reg22			= 0,				\
	.reg23			= 0,				\
	.reg29			= 0,				\
	.reg30			= 0,				\
	.reg31			= 0,				\
	/*							        \
	 * Saved cp0 stuff					\
	 */							        \
	.cp0_status		= 0,				\
	/*							\
	 * saved watch register stuff				\
	 */							\
	.watch = {{{0,},},},					\
	/*							        \
	 * Other stuff associated with the process	\
	 */                                     \
	.cp0_badvaddr		= 0,				\
	.cp0_baduaddr		= 0,				\
	.error_code		= 0,				    \
}
#else
#define INIT_THREAD  {				    \
    /*							        \
     * Saved main processor registers	\
     */							        \
	.reg16			= 0,				\
	.reg17			= 0,				\
	.reg18			= 0,				\
	.reg19			= 0,				\
	.reg20			= 0,				\
	.reg21			= 0,				\
	.reg22			= 0,				\
	.reg23			= 0,				\
	.reg29			= 0,				\
	.reg30			= 0,				\
	.reg31			= 0,				\
	/*							        \
	 * Saved cp0 stuff					\
	 */							        \
	.cp0_status		= 0,				\
	/*							        \
	 * Other stuff associated with the process	\
	 */                                     \
	.cp0_badvaddr		= 0,				\
	.cp0_baduaddr		= 0,				\
	.error_code		= 0,				    \
	.trap_no		= 0,				    \
}
#endif /*CONFIG_CPU_HAS_WATCH*/

struct task_struct;

/* Free all resources held by a thread. */
#define release_thread(thread) do { } while(0)

/* Prepare to copy thread state - unlazy all lazy status */
#define prepare_to_copy(tsk)	do { } while (0)

extern long kernel_thread(int (*fn)(void *), void * arg, unsigned long flags);

extern unsigned long thread_saved_pc(struct task_struct *tsk);

/*
 * Do necessary setup to start up a newly executed thread.
 */
extern void start_thread(struct pt_regs * regs, unsigned long pc, unsigned long sp);

unsigned long get_wchan(struct task_struct *p);

#define __KSTK_TOS(tsk) ((unsigned long)task_stack_page(tsk) + \
            THREAD_SIZE - 32 - sizeof(struct pt_regs)) 
#define task_pt_regs(tsk) ((struct pt_regs *)__KSTK_TOS(tsk))
#define KSTK_EIP(tsk) (task_pt_regs(tsk)->cp0_epc)
#define KSTK_ESP(tsk) (task_pt_regs(tsk)->regs[29])
#define KSTK_STATUS(tsk) (task_pt_regs(tsk)->cp0_status)

#define cpu_relax()	barrier()

/*
 * Return_address is a replacement for __builtin_return_address(count)
 * which on certain architectures cannot reasonably be implemented in GCC
 * (MIPS, Alpha) or is unuseable with -fomit-frame-pointer (i386).
 * Note that __builtin_return_address(x>=1) is forbidden because GCC
 * aborts compilation on some CPUs.  It's simply not possible to unwind
 * some CPU's stackframes.
 *
 * __builtin_return_address works only for non-leaf functions.  We avoid the
 * overhead of a function call by forcing the compiler to save the return
 * address register on the stack.
 */
#define return_address() ({__asm__ __volatile__("":::"$31");__builtin_return_address(0);})

#endif /* _ASM_PROCESSOR_H */
