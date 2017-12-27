---
title: '[webpack学习系列二] 四个核心概念和使用 '
date: 2017-7-26 16:46:04
tags: [webpack]
---
 ### webpack 四个核心概念
   + Entry 入口
   + Output 输出
   + Loaders
   + Plugins 插件
  webpack中默认的配置文件名称是webpack.config.js,因此我们需要在项目中创建如下文件结构：
   + index.html   // 显示的页面
   + main.js      // webpack 入口
   + webpack.config.js    // webpack 中默认的配置文件
   + bundle.js      // webpack命令自动生成的文件，无需创建
<!-- more -->
  #### `Entry` 入口
   入口起点(entry point)指示webpack应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口后，webpack会找到有哪些模块和库是入口起点（直接和间接）依赖的。
    可以在webpack.config.js中配置entry属性，来指定一个入口或多个起点入口，代码如下：
    ```Python
    moudle.exports = {
		entry: './path/file.js'
	}
	```
  #### `Output` 输出
   Output属性是告诉webpack在哪里输出它所创建的bundle，以及如何命名这些文件。你可以通过在配置指定一个output字段，来配置这些过程：
   ```Python
   const path = require('path');
   moudle.exports = {
   	  entry: './path/file.js',
   	  output:{
   	  	path: path.resolve(__dirname,'dist'),
   	  	filename: 'my-webpack.bundle.js'
   	  }
   }
   ```
   其中`output.path`属性用于指定生成文件的路径，`output.filename`用于生成文件的名称

  #### Loaders
   - `Loaders`让`webpack`能够去处理那些非	`Javascript`文件（webpack自身理解JavaScript）。
   - `loader`可以将所有类型的文件转换为`webpack`能够处理的有效模块，然后利用`webpack`    的打包能力，对他们进行处理
   - 本质上，`webpack loader`将所有类型的文件，转换为应用程序的依赖图可以直接引用模块。在更高层面上，webpack的配置中的`loader`有两个目标：
     + 识别应该被应用的`loader`进行转换的那些文件（使用test属性)
     + 转换这些文件，从而使其能够被添加到依赖图中（最终被添加到bundle中） (use属性)

     在开始下面的代码前，需要安装[style-loader](https://www.npmjs.com/package/style-loader)和 [css-loader](https://www.npmjs.com/package/css-loader)
     ```Python
       npm install --save-dev style-loader css-loader
     ```
     并且在项目中创建style.css，如下
     ```Python
       p{font-size:26px;color:red}
     ```
     然后在`webpack.config.js`中输入以下代码：
     ```Python
	   const path = require('path')
        module.export = {
        	entry: './main.js',
        	output: {
        		path: path.resolve(__dirname,'dist'),
        		filename: 'bundle.js'
        	},
        	module: {
        		rules: [
                  {
                  	test: /\.css$/,
                  	use: [
                      {loader: 'style-loader'},
                      {loader: 'css-loader'}
                  	]
                  }
        		]
        	}
        }
     ```
   ### `Plugins` 插件
    - Loader被用于转换某些类型的模块，而Plugins则用于执行范围更广的任务。
    - Plugins的范围包括：打包优化、压缩、重新定义环境中的变量
    - 使用方法： 先require()它，然后添加到`Plugins `数组中，多数插件可以通过选项自定义
    - 在一个配置文件中因为不同目的而多次使用同一个插件，需要使用`new`操作符来创建它的实例
    demo:
      + 步骤一： 需安装(html-webpack-plugin )[https://www.npmjs.com/package/html-webpack-plugin]插件：`npm install html-webpack-plugin --save-dev `
     它可以简化html文件的创建，为webpack包提供服务
      + 步骤二： 在`webpack.config.js`中输入以下代码
        ```python
			const HtmlWebpackPlugin = require('html-webpack-plugin')
			const path = require('path')
			const config = {
				entry: './main.js',
				output: {
					path: path.resolve(__dirname,'dist'),
					filename: 'bundle.js'
				},
				module: {
					rules: [
                       {
                       	 test: /\.css/,
                       	 use: [
                            {loader: 'style-loader'},
                            {loader: 'css-loader'}
                       	 ]
                       }
					]
				},
				plugins: [
                  new HtmlWebpackPlugin({template: './index.html'})
				]
			}
			module.exports = config
        ```
   ### 运行和配置
    - 直接通过webpack命令编译打包，如果在其命令后加入参数，可以通过配置package.json文件中的script属性：
    ```python
       {
       	 scripts:{
 			"build": "webpack ---config webpack.config.js --progress --display-modules"
       	 }
       }
    ```
    - 如果想要更改默认的配置文件名称，可以将`---config`后面的`webpack.config.js`配置文件名改为你自定义的名称
    执行该命令：`npm run build`


