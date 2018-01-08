---
title: vuejs npm chromedriver 报错
date: 2017-11-29 11:25:59
tags:[vue, vue-cli]
---

我们在使用vue-cli初始化一个项目的时候，在执行npm install的时候有时候会遇见chromedriver下载失败，这是因为这个资源在国外服务器中， 在请求的时候，由于请求时间太长，导致下载失败
因此我们需要执行下面的操作就可以解决该问题：
```python
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
```