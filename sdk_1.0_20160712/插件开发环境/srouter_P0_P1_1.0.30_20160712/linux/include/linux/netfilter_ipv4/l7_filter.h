#ifndef __IGD_L7_FILTER__H__
#define __IGD_L7_FILTER__H__
static inline unsigned char *l7_str_str(unsigned char *str, int str_len, unsigned char *key, int key_len, u_char end)
{
	while (likely(str_len >= key_len)) {
		if(*str == end)
			return NULL;
		if (!memcmp(str, key, key_len))
			return str;
		str_len--;
		str++;
	}
	return NULL;
}
static inline unsigned char *l7_str_str_2(unsigned char *str, int str_len, unsigned char *key, int key_len)
{
	while (likely(str_len >= key_len)) {
		if (!memcmp(str, key, key_len))
			return str;
		str_len--;
		str++;
	}
	return NULL;
}
#if __KERNEL__
static inline int l7_skb_is_skip_http(const struct sk_buff *skb)
{
	return test_bit(SKB_HTTP_L7_SKIP_FLAG, skb_igdflag(skb));
}
static inline int l7_skb_is_http(const struct sk_buff *skb)
{
	return test_bit(SKB_HTTP_FLAG, skb_igdflag(skb));
}
static inline int l7_skb_is_bulletin_http(const struct sk_buff *skb)
{
	return test_bit(SKB_HTTP_CAN_BULLTEIN_FLAG, skb_igdflag(skb));
}

#define L7_CHECK_NR_VALID(nr, min, max) \
	do{\
		if((nr) < (min) || (nr) >= (max))\
		{\
			printk("number is %d, but min = %d, max = %d\n", (nr), (min), (max));\
			goto error;\
		}\
	}while(0)
#endif

#define HTTP_WARN_SIZE_MX 1300


#endif

