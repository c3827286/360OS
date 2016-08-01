#ifndef _IGD_LIST_H_
#define _IGD_LIST_H_

//2 KERNEL SPACE
#ifdef __KERNEL__

#define IGD_LIST_DEBUG_ENABLE	1

#define IGD_LIST_CONTINUE 	1
#define IGD_LIST_STOP		2

struct igd_list_node{
	struct igd_list_node * prev;
	struct igd_list_node * next;
};

struct igd_list{
	struct igd_list_node list;
	atomic_t count;
	rwlock_t lock;
};


#define IGD_LIST_OFFSET(type,member) ((size_t)&((type *)0)->member)

static inline void igd_list_node_init(struct igd_list_node * n)
{
	IGD_ASSERT(n);

	n->next = n;
	n->prev = n;
}

static inline void igd_list_node_add(struct igd_list_node * prev, struct igd_list_node * next,struct igd_list_node * node)
{
	IGD_ASSERT(prev);
	IGD_ASSERT(next);
	IGD_ASSERT(node);

	node->next = next;
	node->prev = prev;

	prev->next = node;
	next->prev = node;
}

static inline struct igd_list_node * igd_list_node_del(struct igd_list_node * node)
{
	IGD_ASSERT(node);

	node->prev->next = node->next;
	node->next->prev = node->prev;

	return node;
}

static inline void igd_list_init(struct igd_list * l)
{
	IGD_ASSERT(l);

	igd_list_node_init(&l->list);
	atomic_set(&l->count, 0);
	rwlock_init(&l->lock);
}

static inline void igd_list_fini(struct igd_list *l)
{
	IGD_ASSERT(l);

	igd_list_node_init(&l->list);
	atomic_set(&l->count, 0);
	rwlock_init(&l->lock);
}

static inline struct igd_list_node * igd_list_add(struct igd_list *l, struct igd_list_node * prev, struct igd_list_node * node)
{
	IGD_ASSERT(l);
	IGD_ASSERT(prev);
	IGD_ASSERT(node);

#if IGD_LIST_DEBUG_ENABLE
#endif /*IGD_LIST_DEBUG_ENABLE*/

	write_lock(&l->lock);
	igd_list_node_add(prev, prev->next,node);
	write_unlock(&l->lock);
	
	atomic_inc(&l->count);

	return node;
}

static inline int igd_list_isnull(struct igd_list *l)
{
	return l->list.next == &l->list;
}

static inline struct igd_list_node * igd_list_add_head(struct igd_list *l, struct igd_list_node * node)
{
	return igd_list_add(l, l->list.next, node);
}

static inline struct igd_list_node * igd_list_add_tail(struct igd_list *l, struct igd_list_node * node)
{
	return igd_list_add(l, l->list.prev, node);
}

static inline struct igd_list_node * igd_list_del(struct igd_list * l, struct igd_list_node * node)
{
	struct igd_list_node * n = NULL;
	IGD_ASSERT(l);
	IGD_ASSERT(node);

#if IGD_LIST_DEBUG_ENABLE
#endif /*IGD_LIST_DEBUG_ENABLE*/

	write_lock(&l->lock);
	n = igd_list_node_del(node);
	if(n == &l->list){
		write_unlock(&l->lock);
		return NULL;
	}
	else{
		atomic_dec(&l->count);
		write_unlock(&l->lock);
		return n;
	}
}

static inline struct igd_list_node * igd_list_del_head(struct igd_list *l)
{
	return igd_list_del(l, l->list.next);
}

static inline struct igd_list_node * igd_list_del_tail(struct igd_list *l)
{
	return igd_list_del(l, l->list.prev);
}

static inline struct igd_list_node * igd_list_traversal(struct igd_list *l, int (*func)(struct igd_list_node **, void *), void * data)
{
	struct igd_list_node * head = &l->list;
	struct igd_list_node *p1 = NULL;
	struct igd_list_node *p2 = NULL;
	int ret = 0;

	IGD_ASSERT(l);
	IGD_ASSERT(func);

	p1 = head;
	p2 = head->next;

	while(p2 != head){
		igd_list_del(l, p2);
		ret = func(&p2,data);
		if(p2)
			igd_list_add(l,p1,p2);
		if(ret == IGD_LIST_STOP)
			return p2;
		if(p2){
			p1 = p1->next;
			p2 = p1->next;
		}
		else{
			p2 = p1->next;
		}
	}

	return NULL;
}

#endif /* __KERNEL__ */

#endif /*_IGD_LIST_H_*/
