---
title: '[webpack学习系列一] 入门和简单使用'
date: 2017-7-25 10:25:56
tags: [webpack]
---
### 什么是webpack
  - 模块打包机
  - 主要任务是 分析你的项目结构找到JavaScript模块以及其他的一些浏览器不能直接运行的拓展语言（Scss、Less、TypeScrpt）,并将其转换和打包为合适的格式供浏览器使用，关系图如下
  ![关系图](1.png)
<!-- more -->
### 与Gulp/Grunt对比
  - Gulp 的定位是 Task Runner, 就是用来跑一个一个任务，没有解决js module的问题（如何组织代码结构的问题）---- 工具性质
    + 工作方式：在一个配置文件中，指明对某个文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务
      ![关系图](2.png)
  - webpack 的定位是 file bundler ---- 方案性质
    + 工作方式： 把你的项目当做一个整体，通过一个给定的主文件（如：index.js）,webpack将从这个文件开始找到你的项目所有依赖文件，使用loader处理他们，最后打包一个（或多个）浏览器可识别的JavaScript文件
      ![关系图](3.png)

### webpack的安装及使用 
  - 通过 npm 全局安装 webapck  `npm install -g webpack`
  - 创建项目并初始化package.json文件
    + md demo1 && cd demo1
    + npm init
  - 在项目中安装webpack `npm install webpack --save-dev`
    + --save-dev : 开发时依赖的东西
    + --save :发布时依赖的东西
  - 在项目中创建如下文件结构
    + index.html // 显示的网页
    + main.js // webpack入口
    + bundle.js // 通过 webpack 命令生成的文件，无需创建
  - 通过命令对项目中依赖的js文件进行打包
    `webpack main.js bundle.js`  webpack 要打包的js文件名称 打包后生成的js文件名
  - webpack 命令后面还可以加入以下参数
    + `--watch` 实时打包
    + `--progress` 显示打包进度
    + `--display-modules` 显示打包的模块
    + `--display-reasons` 显示模块包含在输出中的原因
    更多参数可以通过命令 webpack --help 查看
    

