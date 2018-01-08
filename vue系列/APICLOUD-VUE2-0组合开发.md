---
title: APICLOUD+VUE2.0组合开发
date: 2018-01-07 16:02:01
tags: [apicloud, vue2.0]
---
近来几天有许多事情发生，刚腾出手来写了这一篇文章，意在总结和积累。

## 第一步  将VUE生成可被网页正常使用的JS文件
  - 我们创建了一个名为vueapp的helloworld项目
    [helloworld](1.png)
    + 在当前目录下的命令行中，执行`npm run build` ,生成可被常规浏览器解析的被压缩后的目录文件（资源文件和静态文件）
    + 生成后的文件放在vueapp/dist
<!-- more -->
## 第二步 在apicloud-studio中创建vue2ac项目
  - 创建完成后默认得到如下文件夹（加红部分非默认文件夹）
    ![基础目录](2.png)

## 第三步 整合
  - 将vueapp/dist中的static资源文件夹复制到vue2ac
    ![基础目录](3.png)
   将所有的vue静态CSS和JS资源放入apicloud
  - 引入JS文件
   + 打开vueapp/dist/index.html
     ![基础目录](4.png)
     因为vue在生成静态文件时，会自动用哈希算法生成文件，为避免出错，用复制的方式将js代码复制走。在本处样例复制如下：
     ![基础目录](5.png)
   + 将复制的JS内容粘贴到apicloud项目根目录的 index.html中代码`<script type="text/javascript" src="./script/api.js"></script>`的下一行
   + 注意看此处的路径变化。所有SRC都改成了./作为入口，这是APIClOUD寻找文件的入口方式。效果如下：
     ![基础目录](6.png)
  - 调整APICLOUD入口文件Index.html的CSS信息
    + 删除APICLOUD默认引入的CSS文件
      ![基础目录](7.png)
    + 修改BODY背景颜色为白色
      将head区的stytle代码区改为如下:
      ```python
		<style type="text/css">
		        body{
		          background-color: #fff;
		        }
		</style>
      ```
    + 引入VUE静态文件夹中的CSS文件  *注意：引入方式：./*
	  ![基础目录](8.png)
	+ 修改首页默认自带的JS代码区，调整为如下代码:
	  ```python
	    <script type="text/javascript">
		    apiready = function(){
			   	console.log("Hello APICloud");
		    };
		</script>
	  ```
	+ 修改BODY区
	  整个BODY区的代码改为如下：
	  ```python
		<body>
		    <div id="app"></div>
		</body>
	  ```
##  第四步 真机演示
  - 开发工具，建议官方IDE ：https://www.apicloud.com/devtools
  - 开发演示：不建议用虚拟机的方式查看APICLOUD项目。AC项目可使用真机集合AC官方提供的APPLOADER的方式，实时同步并查看效果。APPLOADER二维码：
    ![](9.png)
  - 当手机中装有APPLOADER的时候，可在同一个局域网内实现电脑同步至手机，查看真机效果。
