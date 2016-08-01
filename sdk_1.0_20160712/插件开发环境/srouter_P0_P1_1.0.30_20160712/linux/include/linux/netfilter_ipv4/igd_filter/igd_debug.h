#ifndef _IGD_FILTER_DEBUG_H_
#define _IGD_FILTER_DEBUG_H_

#ifdef __KERNEL__

#define IGD_ASSERT(exp) do{ \
		if(!(exp)){ \
			printk("%s:%d "#exp" invalid\n", __FUNCTION__, __LINE__); \
			BUG(); \
		} \
	}while(0)

#if 0
	#define IGD_DEBUG(enable, fmt, args...) do{ if(enable) printk("KDEBUG:%s:%d "fmt, __FUNCTION__, __LINE__,##args);}while(0)
	#define IGD_ERROR(enable, fmt, args...) do{ if(enable) printk("KERROR:%s:%d "fmt, __FUNCTION__, __LINE__,##args);}while(0)
#else
	#define IGD_DEBUG(enable, fmt, args...) do{}while(0)
	#define IGD_ERROR(enable, fmt, args...) do{}while(0)
#endif


//2 check pointer
#if 0
#define IGD_ASSERT_POINTER(p) do{ \
		if(!(p)){ \
			printk("%s:%d "#p" is NULL\n", __FUNCTION__, __LINE__); \
			BUG(); \
		} \
	}while(0)
#else
#define IGD_ASSERT_POINTER(p) do{}while(0)
#endif

//2 trace path
#define IGD_TRACE_PATH_ENABLE 0
#if IGD_TRACE_PATH_ENABLE
#define IGD_TRACE_PATH() do{ printk("KPATH %s:%d\n", __FUNCTION__, __LINE__);}while(0)
#else
#define IGD_TRACE_PATH() do{}while(0)
#endif

//2 check stack
#define IGD_STACK_CHECK_ENABLE 0
#if IGD_STACK_CHECK_ENABLE
#define IGD_STACK_FUNCIN() static void * igd_static_stack = NULL; \
						igd_static_stack = __builtin_return_address(0)
#define IGD_STACK_FUNCOU(ret) do{ \
	if(igd_static_stack != __builtin_return_address(0)) \
		printk("STACK %s:%d stack(0):%p->%p\n", __FUNCTION__, __LINE__,igd_static_stack,__builtin_return_address(0)); \
	return ret; \
}while(0)
//#else
//#define IGD_STACK_FUNCIN()	do{}while(0)
//#define IGD_STACK_FUNCOU(ret) do{return #ret;}while(0)
#endif


#endif /* __KERNEL__ */

#endif /*_IGD_FILTER_DEBUG_H_*/
