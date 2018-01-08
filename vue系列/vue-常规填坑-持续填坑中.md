---
title: vue 常规填坑--持续填坑中
date: 2017-12-06 11:16:16
tags: [vue报错]
---
今天在开发vue组件时，报错如下：
```python
	[Vue warn]: data functions should return an object:
```
但是我没有管这个错误，一直到我在写路由守卫时，跳转页面的时突然报错
```python
[Vue warn]: Error in nextTick: "TypeError: Cannot read property '__ob__' of undefined"
vue.esm.js?efeb:1687 TypeError: Cannot read property '__ob__' of undefined
    at VueComponent.Vue.$destroy (vue.esm.js?efeb:2619)
    at destroy (vue.esm.js?efeb:4031)
    at invokeDestroyHook (vue.esm.js?efeb:5557)
    at invokeDestroyHook (vue.esm.js?efeb:5562)
    at VueComponent.patch [as __patch__] (vue.esm.js?efeb:5869)
    at VueComponent.Vue.$destroy (vue.esm.js?efeb:2625)
    at destroy (vue.esm.js?efeb:4031)
    at invokeDestroyHook (vue.esm.js?efeb:5557)
    at removeVnodes (vue.esm.js?efeb:5573)
    at updateChildren (vue.esm.js?efeb:5681)

```
排查很久，后来在Google后有前辈说是因为data模拟数据时该data(){return{}} 代码块需要rerun的，回归第一个报错信息排查，发现是在写data(){return{}}时，没有return，加上即可解决问题
> 因此，小伙伴们在写代码的时候一定要规范代码呀，不然填坑排查会花费很时间，费时费力


