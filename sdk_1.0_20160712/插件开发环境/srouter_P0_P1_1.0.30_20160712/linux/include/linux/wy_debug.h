
#ifndef __WY_DEBUG_H__
#define __WY_DEBUG_H__

#include <linux/types.h>

#define WYDBG_LEVEL(x)		(1 << (x))

extern uint32_t wy_dbg_mask;

int wy_printk(const char *fmt, ...);
#if 0
char *mac2str(uint8_t *mac);
uint8_t *str2mac(uint8_t *str, uint8_t mac[6]);
void print_hex(void *addr,int len,int bitwidth , int (*print)(const char*string,...));
#endif

#endif

