---
title: '[面试总结之Iframe的跨域问题]'
date: 2017-12-26 00:12:14
tags: [面试, 跨域, iframe]
---
 晚上十点钟的时候，接到了一个电面，因为基础差，还有发挥的问题，导致没有通过。这是我在面试过程中面试官问我的问题中没有答出来，下来之后翻阅资料后整理出来的结果，以此给自己一个警钟和提醒，再次感谢面试官的耐心还有解答，谢谢....

 这道题涉及到的知识点：iframe同域下Window对象的函数调用，iframe跨域时Window对象的函数调用
 <!-- more -->
 ## 首先是要先获取iframe中的window对象
   > 因为有兼容问题，一般使用contentWidow属性来获取iframe中的window对象
  ```python
	<iframe src="http://www.demo.com/index.html" id="ifr"></iframe>

	// js
	var ifrwindow = document.getElementById('ifr').contentWindow;

  ```

## 在同域中
   - 在页面中的全局变量和全局函数会挂载到window的属性上 （http://www.demo.com/index.html这个页面有一个fuc的函数）
   ```python
    function fuc() {
      console.log('55')
    }
    // 调用方法一
    fuc()
    // 调用方法二
    window.fuc()
   ```
    #### 父调子
       - 可以结合获取iframe的window对象以及函数挂载在window对象上的属性

       ```python
          // 在同域中调用iframe嵌入进来页面的函数
          <iframe src="http://www.demo.com/index.html" id="ifr"></iframe>

          // js
          var ifrwindow = document.getElementById('ifr').contentWindow
          ifrwindow.fuc()
       ```
    #### 子调父
      - 同父调子一样，iframe内部想调用外部页面的函数，需先获取他的window对象，在js中，使用window.parent,window.top来获取上层页面的window对象
       + window.parent 返回父窗口 ，这里指上一层iframe
       + window.top 返回顶层窗口，即浏览器窗口

      ```python
         // 这是父页面 index.html
		 <iframe src="http://www.demo.com/child.html" id="ifr"></iframe>
         // 父页面 js
         function father(){
         	console.log('我是顶层')
         }

         // 这是父页面下面的第一孩子页面 child.html
         <<iframe id="ifr_child" src="http://www.demo.com/ch_child.html" frameborder="0"></iframe>
         // 第一个孩子页面 js
         function child() {
         	console.log('孩子')
         }

         // 我是ch_child.html页面
           // 获取 child.html的window对象
           var parent_window = window.parent
           parent_window.child()  // 返回值 为孩子
		   // 获取index.html页面的window对象
		   var top_window = window.top   //  var top_window = window.parent.parent 
		   top_window.father() // 返回值 为我是顶层
      ```

## 跨域调用
   - 通过修改document.domain来跨子域
       现有一个页面，它的地址是www.demo.com/index.html,页面里有一个iframe，它的src是demo.com/index.html,显然现在这个页面和它里面的iframe的地址页面是不同域，用js是获取不到iframe内的东西：
	   ```python
		  // www.demo.com 下的inde.html
		    function onload() {
		      var iframe = document.getElementById('iframe')
		      var win = iframe.contentWindow // 获取到iframe里面的window对象，但是window对象的属性和方法几乎不可用
		      var doc = win.document // 获取不到iframe的document对象
		      var name = win.name // 获取不到
		    }
		  <iframe src="http://demo.com/index.html" frameborder="0"></iframe>ame	
	   ```
	  - document.domain 使用条件 这两个域名必须属于同一个基础域名!而且所用的协议，端口都要一致

	  按照上面的demo，
	  先在www.demo.com/index.html和demo.com/index.html的页面中设置相同的基础域名。
	  eg: a.b.example.com中的某些文档页面中可以设置document.domain为b.example.com、example.com、a.b.example.com中的任意一个，但是不能设置c.a.d.example.com,因为这是当前域的子域，也不能设置成baidu.com,因为主域已经不同了

	  ```python
		<iframe src="http://demo.com/index.html" id="iframe" onload="test()"></iframe>
		<script>
			document.domain="demo.com" // 设置主域
			function test() {
				alert(document.getElemntById('iframe').contentWindow)
			}
		</script>
	  ```
	  在页面http://demo.com/index.html中也设置document.domain，必须设置

	  ```python
		<script>
			document.domain="demo.com" // 设置主域
		</script>
	  ```
   
   - 代理页面
     原理： 这个iframe的src的路径是和获取数据的目标页面处于相同域的页面，这个iframe的页面是可以正常通过ajax来获取你想要的数据，然后再修改document.domain，可以通过js完全控制这个iframe，让iframe去获取数据，我们来控制这个iframe

   - window.name
     window对象有一个name属性，这个属性有个特征：在一个window的生命周期内，窗口载入的所有页面都是共享一个window.name，每个页面都是有读写的权利。widow.name是持久存在一个窗口载入过的所有页面中的，并不会因为新页面的载入而进行重置
     + 同域下：
	     eg: 一个页面a.html ，它里面的代码：
	     ```python
			window.name = '我是页面的a设置的值'  // window.name的值
			setTimeout(function(){
				window.location = 'b.html'	
			},3000)
	     ```
	       b.html 页面的代码
	       ```python
			  <script>
				alert (window.name) // 读取window.name的值
			  </script>
	       ```
	 + 跨域下
	   有一个页面 www.demo.com/a.html，需要通过js来获取另外一个页面 b.demo.com/data.html页面中数据。
		data.html里的代码
		```python
			<script>
				window.name = "我是a.html页面的想要的数据，所有可以转化成字符串来传递的数据，都可以放在这里使用，比如json数据"
		    </script>
		```
	   a.html页面	   
	    ```python
	        <iframe src="b.demo.com/data.html" id="proxy" style="dispaly:none" onload="getDate()"></iframe>
			<script>
				function getDate() {
					var iframe = document.getElementById('proxy')
					iframe.onload = function(){ // 这里的a.html与iframe同源
						var data = iframe.contentWindow.name
						alert(data)
					}
					iframe.src = 'about:blank'
				}
			</script>
	    ```
	    这里的步骤是：
	    1.在a.html页面中内嵌一个iframe，第一次的src的路径是b.demo.com/data.html；
	    2.在b.demo.com/data.html的页面里设置了window.name；
	    3、因为在a.html页面中设置了两次onload，第一次是获取b.demo.com/data.html，然后转发了到与a.html同域的页面中，再在这个页面中获取iframe.contentWindow.name，而这个值是b.demo.com/data.html设置的

	    > 补充知识：
		  about:blank，javascript: 和 data: 中的内容，继承了载入他们的页面的源。






