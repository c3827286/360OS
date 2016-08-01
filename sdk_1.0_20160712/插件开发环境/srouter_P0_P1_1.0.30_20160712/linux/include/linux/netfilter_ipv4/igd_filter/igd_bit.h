#ifndef _IGD_FILTER_BIT_H_
#define _IGD_FILTER_BIT_H_

#define IGD_BIT_TEST(v,b) ((v)&(b))
#define IGD_BIT_SET(v,b) (v)|=(b)
#define IGD_BIT_UNSET(v,b) (v)=(v)&(~(b))

#endif /*_IGD_FILTER_BIT_H_*/

