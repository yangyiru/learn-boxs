---
title: '[webpack学习系列三] 多入口设置'
date: 2017-7-27 18:07:53
tags: [webpack]
---
 ### 多入口设置与 html-webpack-pugin 插件详解
  - 我们可以在`entry`指定多个入口。 在开始代码前我们需创建下面的目录结构：
    + index.html //显示的页面
    + mian0.js    // webpack入口1
    + mian1.js    // webpack入口2
    + style.css   // 样式文件
    + webpack.config.js  //webpack中默认的配置文件
<!-- more -->
  - 在`index.html`文件中输入以下内容：
    ```python
		<!DOCTYPE html>
		   <html lang="en">
		   <head>
		       <meta charset="UTF-8">
		       <meta name="viewport" content="width=device-width, initial-scale=1.0">
		       <meta http-equiv="X-UA-Compatible" content="ie=edge">
		       <title>demo</title>
		   </head>
		   <body>
		   </body>
		   </html>
    ```
  - 在`mian0.js`文件中输入以下内容：
    ```python
	  import './style.css'
	  var h2 = document.createElement('h2')
	  h2.innertHTML = '这是mian0.js中的内容'
	  document.body.appendChild(h2)
    ```
  - 在`mian1.js`文件中输入以下内容：
    ```python
	  import './style.css'
	  var h1 = document.createElement('h2')
	  h1.innertHTML = '这是mian1.js中的内容'
	  document.body.appendChild(h1)
    ```
  - 在`style.css`文件中输入以下内容：
   ```python
      h1{color: red;}
      h2{color: blue;}
   ``` 
  - 在`webpack.config.js`文件中输入以下内容：
    ```python
		const HtmlWebpackPlugin = require('html-webpack-plugin')
	    const path = require('path')
	    const config = {
	    	entry: {
	    		bundle1: './mian0.js',
	    		bundle2: './mian1.js'
	    	},
	    	output: {
	    		path: path.resolve(__dirname,'dist'),
	    		filename: '[name].js'
	    	},
	    	 module: {
	            rules: [
	                { test: /\.css$/, loader: 'style-loader!css-loader' }
	            ]
	        },
	        pugins: [
	            new HtmlWebpackPlugin({ template: './index.html' })
	        ]
	    }
	    moudle.export = config
    ```
    完成以上代码，运行`webpack`命令后，打开`dist`文件中的index.html
    !(运行结果)(5.png)
    运行结果并不是我们预期的那样展示h1的内容在前，h2内容在后，打开生成后的index.html源码：
    ```python
		<!DOCTYPE html>
	    <html lang="en">
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	        <meta http-equiv="X-UA-Compatible" content="ie=edge">
	        <title>demo</title>
	    </head>
	    <body>
	        <script type="text/javascript" src="bundle2.js"></script>
	        <script type="text/javascript" src="bundle1.js"></script>
	    </body>
	    </html>
    ```
    从源码中便可得知，先引入的 bundle2.js 文件，也就是 main1.js 的内容，后引入的 bundle1.js 文件，也就是 main0.js 的内容
    我们并没有在 index.html 中输入任何引入 JavaScript 文件的代码，那么使用 webpack 打包后生成的文件，是怎么引入 JavaScript 文件的呢。事实上就是通过 html-webpack-plugin 为我们生成的 index.html
  ### `html-webpack-plugin` 中的参数详解
    通过npm中的介绍，html-webpack-plugin 是一个webpack插件，可以简化html文件的创建，为我们的webpack包提供服务，它包含了一个改变每个变异的文件名参数。使用lodash模板提供我们自己的模板或者使用自己的loader，可以通过以下配置参数传递给`HtmlWebpackPlugin`:
    - `title`: 用于生成的`html`文档标题
    - `filename`:要写入 `html`的文件。默认为`index.html`。也可指定一个子目录（eg：assets / index.html)
    - `template`: 引入的模板文件，具体内容可以查看[文档](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md)。
    - `inject: true | 'head' | 'body' | false`，指定引入 `JavaScript` 脚本文件，在生成的`HTML` 中的位置。
    	+ 默认为 `true`，指`JavaScript` 脚本文件在 `<body>` 元素中引入；
    	+ `head` ，指`JavaScript` 脚本文件在 <head> 元素中引入，body 与 true 值相同；
    	+ `false` 指只生成 `HTML` 文件，不引入任何`JavaScript` 脚本文件。
    - `favicon`: 生成的 HTML 文件中的图标路径
    - `minify: {...} | false` : 是否对生成的 HTML 文件压缩，默认为 false,具体配置可查看 html-minifier
	- `hash: true | false` ，如果为 `true` ，给生成的 `js `文件一个独特的 `hash` 值，该 `hash` 值是该次 `webpack` 编译的 `hash` 值,这对缓存清除非常有用。默认值为 `false`。
	- `cache: true | false`,如果为 true 则只编译生成更改的内容将文件,默认值为 `true`
	- `showErrors:true | false`，如果为 true,则将错误内容添加到 `HTML` 中,默认值为 `true`
	- `chunks`: 指定引入的 `JavaScript` 脚本文件（eg：`[ 'bundle1', 'bundle2' ]`）
	- `chunksSortMode: 'none' | 'auto' | 'dependency' |'manual' | {function} - default: 'auto'，对引入的 chunks 进行排序,具体可以查看该(文档)[https://github.com/jantimon/html-webpack-plugin/issues/481]`
	- `excludeChunks`: 排除掉指定的 `JavaScript` 脚本文件（例如：`[ 'bundle1', 'bundle2' ]`）
    - `xhtml: true | false`，默认值是 `false` ，如果为 `true` ,则以兼容 `xhtml` 的模式引用文件
   现在我们知道了 html-webpack-plugin 中的参数，下面我们就来修改 webpack.config.js 中的内容:
   ```python
	    const HtmlWebpackPlugin = require('html-webpack-plugin')
	    const path = require('path')
	    const config = {
	        entry: {
	            bundle1: path.resolve(__dirname,'main1.js'),
	            bundle2: path.resolve(__dirname,'main2.js')
	        },
	        output: {
	            path: path.resolve(__dirname, 'dist'),
	            filename: '[name].js'
	        },
	        module: {
	            rules: [
	                { test: /\.css$/, loader: 'style-loader!css-loader' }
	            ]
	        },
	        plugins: [
	            new HtmlWebpackPlugin({ 
	                title: '多文件引入', // 生成 html 的标题
	                filename: 'index.html',// 生成 html 文件的名称 
	                template: path.resolve(__dirname,'index.html'), // 根据自己的指定的模板文件来生成特定的 html 文件 
	                // inject: true, // 注入选项 有四个值 ture: 默认值，script标签位于html文件的 body 底部, body: 同 true, head: script标签位于html文件的 head 底部,false:不注入script标签
	                favicon: path.resolve(__dirname,'favicon.ico'), // 生成的 html 文件设置 favicon
	                minify: {
	                    caseSensitive: false, //是否大小写敏感
	                    collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
	                    collapseWhitespace: true //是否去除空格
	                },
	                hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false
	                cache: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
	                showErrors: true, // showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true
	                chunks: [ 'bundle1', 'bundle2' ], // 指定引入的 js 文件
	                //excludeChunks:[ 'bundle1' ], // 排除掉某些 js 文件
	                /**
	                 * script 标签的引用顺序
	                 * 'dependency' 按照不同文件的依赖关系来排序
	                 * 'auto' 默认值，插件的内置的排序方式
	                 * 'none'
	                 * 'manual'
	                 * funciton 自定义排序，与JS中自定义数组的sort回调一个含义, 具体可以看 https://github.com/jantimon/html-webpack-plugin/issues/481
	                 */
	                chunksSortMode: function(chunk1,chunk2){
	                    var orders = [ 'bundle1' , 'bundle2' ];
	                    var order1 = orders.indexOf(chunk1.names[0]);
	                    var order2 = orders.indexOf(chunk2.names[0]);
	                    return order1 - order2;
	                },
	                xhtml: false // 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
	            })
	        ]
	    }
	    module.exports = config
   ```
   完成上面的代码工作后，运行 webapck 命令，我们打开 dist 文件中的 index.html。
   [运行结果](5.png)
   Nice!与我们的预期效果显示一致。在对 html-webpack-plugin 的介绍中，提到了 lodash 模板, 那么该怎么用呢？我们再次修改 webpack.config.js 中的内容，为 HtmlWebpackPlugin 传入 Date 参数:
   ```python
        const HtmlWebpackPlugin = require('html-webpack-plugin')
	    const path = require('path')
	    const config = {
	        entry: {
	            bundle1: path.resolve(__dirname,'main1.js'),
	            bundle2: path.resolve(__dirname,'main2.js')
	        },
	        output: {
	            path: path.resolve(__dirname, 'dist'),
	            filename: '[name].js'
	        },
	        module: {
	            rules: [
	                { test: /\.css$/, loader: 'style-loader!css-loader' }
	            ]
	        },
	        plugins: [
	            new HtmlWebpackPlugin({ 
	                date: new Date(),
	                title: '多文件引入', // 生成 html 的标题
	                filename: 'index.html',// 生成 html 文件的名称 
	                template: path.resolve(__dirname,'index.html'), // 根据自己的指定的模板文件来生成特定的 html 文件 
	                // inject: true, // 注入选项 有四个值 ture: 默认值，script标签位于html文件的 body 底部, body: 同 true, head: script标签位于html文件的 head 底部,false:不注入script标签
	                favicon: path.resolve(__dirname,'favicon.ico'), // 生成的 html 文件设置 favicon
	                minify: {
	                    caseSensitive: false, //是否大小写敏感
	                    collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
	                    collapseWhitespace: true //是否去除空格
	                },
	                hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false
	                cache: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
	                showErrors: true, // showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true
	                chunks: [ 'bundle1', 'bundle2' ], // 指定引入的 js 文件
	                //excludeChunks:[ 'bundle1' ], // 排除掉某些 js 文件
	                /**
	                 * script 标签的引用顺序
	                 * 'dependency' 按照不同文件的依赖关系来排序
	                 * 'auto' 默认值，插件的内置的排序方式
	                 * 'none'
	                 * 'manual'
	                 * funciton 自定义排序，与JS中自定义数组的sort回调一个含义, 具体可以看 https://github.com/jantimon/html-webpack-plugin/issues/481
	                 */
	                chunksSortMode: function(chunk1,chunk2){
	                    var orders = [ 'bundle1' , 'bundle2' ];
	                    var order1 = orders.indexOf(chunk1.names[0]);
	                    var order2 = orders.indexOf(chunk2.names[0]);
	                    return order1 - order2;
	                },
	                xhtml: false // 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
	            })
	        ]
	    }
	 module.exports = config
   ```
   更改 index.html 中的内容，lodash 模板默认支持的是 ejs 模板的语法:
   ```python
		<!DOCTYPE html>
	    <html lang="en">
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	        <meta http-equiv="X-UA-Compatible" content="ie=edge">
	        <title>demo3</title>
	    </head>
	    <body>
	        <%= htmlWebpackPlugin.options.date %>
	    </body>
	    </html>
   ```
   完成上面的代码工作后，运行 webapck 命令，我们打开 dist 文件中的 index.html。
   ！(运行结果)[6.png]
   通过运行结果，我们可以发现在顶部输出了当前时间，也就是 HtmlWebpackPlugin 传入的参数，实际上 HtmlWebpackPlugin 中的参数都可以通过 htmlWebpackPlugin.options.参数名称 输出，我就不一一列举