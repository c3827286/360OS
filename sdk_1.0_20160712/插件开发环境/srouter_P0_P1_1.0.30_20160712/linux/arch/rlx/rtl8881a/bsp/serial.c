/*
 * Copyright 2006, Realtek Semiconductor Corp.
 *
 * arch/rlx/rlxocp/serial.c
 *     RTL819xD serial port initialization
 *
 * Tony Wu (tonywu@realtek.com.tw)
 * Nov. 07, 2006
 */

#include <linux/types.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/serial.h>
#include <linux/serial_core.h>
#include <linux/serial_8250.h>
#include <linux/string.h>

#include <asm/serial.h>

#include "bspchip.h"

void __init bsp_serial_init(void)
{
	struct uart_port s;

	/* clear memory */
	memset(&s, 0, sizeof(s));

    /*
     * UART0
     */
	s.line = 0;
    s.type = PORT_16550A;
    s.irq = BSP_UART0_IRQ;
    s.iotype = UPIO_MEM;
    s.regshift = 2;
#if 1
	s.uartclk = BSP_SYS_CLK_RATE;
    s.fifosize = 16;
	//s.flags = UPF_SKIP_TEST | UPF_LOW_LATENCY;
	s.flags = UPF_SKIP_TEST;
	s.mapbase = BSP_UART0_MAP_BASE;
	//s.membase = ioremap_nocache(s.mapbase, BSP_UART0_MAPSIZE);
	s.membase = ioremap_nocache(s.mapbase, 0x20);
#else
	s.uartclk = BSP_SYS_CLK_RATE - BSP_BAUDRATE * 24; //???
    s.fifosize = 1;                           //???
    s.flags = UPF_SKIP_TEST | UPF_LOW_LATENCY | UPF_SPD_CUST;
    s.membase = (unsigned char *)BSP_UART0_BASE;
    s.custom_divisor = BSP_SYS_CLK_RATE / (BSP_BAUDRATE * 16) - 1;
#endif

	if (early_serial_setup(&s) != 0) {
		panic("RTL819xD: bsp_serial_init failed!");
	}
}
