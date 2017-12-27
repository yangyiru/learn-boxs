---
title: '[javascript学习系列一] 简介和常用方法'
date: 2017-01-01 21:28:48
tags: [javascript]
---
## 1.javascript 简介
 > 如果ajax让Javascript有了新生，那么最近几年，html5和node的兴起，让javascript有了质的飞跃，如果以后我们想从事前端方向的发展，那么javascript一定要学好。
 - javascript是网景（Netscape）公司开发的一款基于客户端浏览器，面向（基于）对象，事件驱动的网页脚本语言。
 - javascript在用户浏览器内部运行，javascript能够检测和响应特定的用户操作，比如鼠标点击和键盘操作，更重要的是：几乎每个web浏览器都支持javascript。
 > 历史
 > javascript 的祖先可以追索到20世纪90年代中期，首先是Netscape Navigator2引入了1.0版本，随后，‘哦周计算机制造商协会’（ECMA）开始介入，制订了ECMAScript规范，奠定了javascript迅猛发展的基础。与此同时，微软开发了自己版本的javascript：jscript,在IE浏览器上使用。
 > Netscape在最初将其脚本语言命名为LiveScript,后来Netscape在与Sun合作知乎将其改名为Javascript.Javascript最初受java自发而开始设计，目的之一是看上去像java.因此语法上有类似之处，一些名称和命名规范也借自java.最终的结果Javascript和Java的关系是：雷锋与雷峰塔，周杰和周杰伦的关系

## 1.1 javascript是脚本语言
  - 脚本英文为script，脚本简单来说就是一条条文字命令，并按程序顺序执行。比如php也是脚本语言
  - 它和java等编程语言不同的是，javascript语法比较松散，要求不想编程语言那么严格
   + java: var number = 10 
   + javascript: var num =10

## 1.2.javascript作用
  对于制作一个网页而言：
   + html  // 给网业添加结果，骨骼
   + css   // 给网页添加样式，衣服
   + js    // 给网页添加功能，动作

## 1.3 体验javascript

## 2.学习javascript需要知道的
 - javascript在页面中的位置
 - 书写规范
 - 执行顺序
 - 环境
 ...
#### 2.1.在web页面中添加javascript
 javascript代码适合页面内容一起发送给浏览器的，可以把javascript代码在HTML页面
 - 嵌入式
   javascript语句之间包含在HTML文件里，语法结构如下：
   ```python
	<script type="text/javascript">
       // js语句
	</script>
   ```
 - 外链式
   把javascript代码保存到单独的文件，然后利用<script>标签的src属性把这个文链接到这个页面里面
   ```python
	<script type="text/javascript" src="你的js文件路径"></script>
   ```
 #### 2.2.javascript 基本格式
   - javascript程序是由一些单独的指令组成。这些指令成为‘语句’。为了能正确的解释语句，浏览器对语句的是些方式有所要求
    + 每个语句一行
      eg: 
         语句1
         语句2
    + 在同一行书写多个语句，每个语句一份好表示结束
       eg: 语句1;语句2
    为了提高代码的可读性，也为了减少元素中造成的语法错误，最好是结合上述两种方式的有点，也就是一行书写一个语句，并且以分好表示语句结束
       eg:
          语句1;
          语句2;
    还需注意：javascript严格区分大小写下，myName和myname是不一样的
#### 2.3.javascript注释
    - 单行注释：//  快捷键：Ctrl+/
    - 多行注释： /**/  快捷键：Ctrl+shift+/

### 3.与用户交互
  对于制作一个网页而言：
   + html  // 给网业添加结果，骨骼
   + css   // 给网页添加样式，衣服
   + js    // 给网页添加功能，动作
  #### 3.1 alert弹出警示框
    - alert 中文提示的意思，一般称为警示框
    - alert('内容')
    - 因为有兼容问题，不同浏览器不同样式，对用户体验不好，我们一般经量少用
  #### 3.2 prompt弹出输入框
    - prompt()用于显示可提示用户进行输入的对话框
     + 语法：prompt('参数1','参数2')
     + 说明：如果用户单击提示框的取消按钮，则返回null。如果用户单击确认按钮，则返回输入字段当前显示的文本，如果只有一个参数，则默认显示参数1
  #### 3.3.console.log控制台输出
     - consol.log('内容')  控制台会打印括号内的内容
     - console的中文翻译是控制台的意思  
     - log 日志 记录
     - 低版本IE不支持该语句，比如IE6
  #### 3.4 document.write 文档打印输出
     - document.write('内容') 在HTML文档页面输出内容
     - document 文档
     - write 写
     比如：
     ```python
		<script>
          document.write('helloworld')
		</script>
     ```
