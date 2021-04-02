## 准备工作
###【认识Flow】
  Flow是Facebook出品的JavaScript静态类型检测器。Vue的源码利用了静态类型检查，了解Flow有利于我们阅读Vue源码。
### 【为什么要用Flow】
  JavaScript是动态类型语言，其灵活性有目共睹，但过于的灵活导致容易写出非常隐蔽的隐患代码，增加了运行阶段出现的各种奇怪的bug，以及其调试时间。
  所谓类型检测就是在编译初期尽早发现（由类型错误引起的）bug，又不影响代码运行，使其编写JavaScript具有和编写Java等强类型语言相近的体验。
  项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性。 Vue.js 在做 2.0 重构的时候，在 ES2015 的基础上，除了 ESLint 保证代码风格之外，也引入了 Flow 做静态类型检查。之所以选择 Flow，主要是因为 Babel 和 ESLint 都有对应的 Flow 插件以支持语法，可以完全沿用现有的构建配置，非常小成本的改动就可以拥有静态类型检查的能力。
### 【Flow的工作方式】
  * 类型推断：通过变量的使用通过上下文来推断变量的类型，然后根据这些推断来检测这些类型；
  * 类型注释：事先注释好我们期待的类型，Flow会根据这个注释来检测改类型。
    **类型推断**
    它不需要任何代码修改即可进行类型检查，最小化开发的工作量。它不会强制你改变开发习惯，因为它自己会自动推断出变量的类型。即是类型推断：
    e.g.
  ```
  // 案例一
  /*@flow*/
  var str = "hello world"
  console.log(str)
  
  // 案例二
  function split(str) {
    return str.split(' ')
  }  
  split(152)
  ```
  Flow在检查上述案例一的代码后不会报错，提示No errors! 而在案例二中则会报错，因为函数split期待的参数是字符串，而我们输入了数字
  **类型注释**
  如上所述，类型推断是Flow最有用的特性之一，不需要编写特定的类型注释就能获取有用的反馈。但是在某些特定的场景下，添加注释可以提供更好更明确的检查依据
  e.g.
  ```
  /*@flow*/
  function add(a, b) {
	return a + b
  }
  add(5 + "world")
  ```
  Flow在检查上述代码是没有检出任何错误，因为从语法上讲"+"即可以用在字符串上也可以应在数字上，我们没有明确指出add()的参数必须为数字。
  这种情况下，我们可以借助类型注释来指明期望的类型。类型注释是以冒号: 开头，可在函数参数、返回值、变量声明中使用。
  如果我们在上段代码中添加类型注释，就会变成如下：
  ```
  /*@flow*/
  function add(a: number, b: number): number {
  	return a + b
  }
  add(5 + "world")
  ```
  现在Flow就能检查出错误，因为函数参数的期待类型是为数字，而我们传入了一个字符串。
  以上例子针对的是函数类型注释。而Flow能支持的一些常用类型注释：
  * 数组
  * 类和对象
  * Null

### Flow 在 Vue.js 源码中的应用
  因为有时候我们想引用第三方库或者自定义一些类型，但是Flow并不认识，因此在检查的时候会报错。为了解决这类问题，Flow提出了**libdef**的概念，可以用来失败这些第三方库或者自定义类型，而Vue.js也利用了这一特性。
  在Vue.js的主目录中有个.flowconfig 文件，他是Flow的配置文件，具体配置可以参考![官方文档](https://flow.org/en/docs/config/#flowconfig-format-)。其中[libs]部分用来描述包含指定库定义目录，默认目录为flow-typed的目录。
  而vue.js里面的[libs]配置是flow，则表示指定的库定义都在flow文件中。而这个目录结构如下：
  ```
  flow
  ├── compiler.js		# 编译相关
  ├── component.js		# 组件数据结构
  ├── global-api.js		# Global API 结构
  ├── modules.js		# 第三方库定义
  ├── options.js		# 选项相关
  ├── ssr.js			# 服务端渲染相关
  ├── vnode.js			# 虚拟 node 相关
  ├── weex.js			# weex 相关
  ```
  以上可以看出来，Vue.js有很多自定义类型的定义，在阅读源码的时候，如果遇到某个类型并想了解它完整的数据结构的时候，可以回来翻阅这些数据结构的定义。
  ### 总结
  通过对Flow的认识，有助于我们阅读Vue的源码，并且这种静态类型的检查方式有利于大型项目的开发与维护。类似Flow的工具还有如TypeScript

## 了解Vue.js的源码目录设计
  vue.js的源码都在src目录下，其目录结构如下：
  ```
  src
  ├── compiler		# 编译相关
  ├── core			# 核心代码
  ├── platforms		# 不同平台的支持
  ├── server		# 服务端编译渲染
  ├── sfc			# .vue文件解析
  ├── shared		# 共享代码
  ```
  ### compiler
  compiler目录下包含了vue.js所有编译相关的代码。包括把模板解析成AST语法树，AST语法树优化，代码生成等功能。
  编译工作可以在构建时完成（借助webpack、vue-loader等辅助插件）；也可以在运行时做，使用包含构建功能的Vue.js。但是编译是一件消耗性能的工作，所以更推荐前者——离线编译。
  ### core
  core目录包含了Vue.js的核心代码，包括内置组件、全局API封装。vue实例化、观察者、vnode、工具函数等等（**重点**）
  ### platforms
  因Vue.js是一个跨平台的MVVM框架，它既能在web上运行又能在weex的配合下运行在native客户端上。platforms是vue.js的入口，2个目录代表2个主要入口，分别打包运行在web上和weex的vue.js。
  ### server
  Vue.js2.0支持了服务端渲染，所有的服务端渲染相关的逻辑都在server目录下**注意：这部分代码是跑在服务端的nodejs，不能和跑在浏览器端的vue.js混为一谈**。
  服务端渲染主要是把组件渲染成服务端的HTML字符串，将他们直接发送到浏览器，最后将静态标记“混合”为客户端上完全交互的应用程序。
  ### sfc
  通常我们使用vue.js开发都会借助webpack构建，然后通过.vue单文件编写组件。这个目录下的代码逻辑会吧.vue文件内容解析成一个javascript对象。
  ### shared
  vue.js会定义一些工具方法，这里定义的工具方法都会被浏览器端的vue.js和服务端的vue.js所共享。
  ### 总结
  单从vue.js的目录设计上来看，作者把功能模块拆分的非常清楚，相关的逻辑放在一个独立的目录下维护。并且把复用的代码也抽成一个独立的目录。这样的目录设计可以让一个项目的可维护度和可阅读性变得很强。

## Vue.js的源码构建
  Vue.js的源码是根据![Rollup](https://www.rollupjs.com/guide/zh)构建的，具体了解可参看![官方文档](https://www.rollupjs.com/guide/zh)，而它的构建相关配置都在scripts目录下。
  ### 构建脚本
  通常一个基于NPM托管的项目都会有一个package.json文件，它是对项目的描述文件，实际上是一个JSON对象。
  我们通常会配置script字段作为NPM的执行脚本，Vue.js源码构建如下：
  ```
  "scripts": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex"
  },
  ```
  这里总共有3个命令，作用都是构建Vue.js，后面2条是在第一条命令的基础上，添加一些环境参数。
  当执行 `npm run build` 的时候，实际上就会执行 `node scripts/build.js`，接下来看它是怎么构建的。
  ### 构建过程
  我们对于构建过程分析是基于源码，先打开构建入口Js文件，在`node scripts/build.js`中：
  ```
   let builds = require('./config').getAllBuilds()
   
   // filter builds via command line arg
   
   if (process.argv[2]) {
     const filters = process.argv[2].split(',')
     builds = builds.filter(b => {
       return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
     })
   } else {
     // filter out weex builds by default
     builds = builds.filter(b => {
       return b.output.file.indexOf('weex') === -1
     })
   }
   build(builds)
  ```
  这段代码逻辑非常简单，先从配置文件中读取配置，在通过命令行参数对构建配置做过滤，这样就可以构建出不同用途的Vue.js。而配置文件`script/config.js`中：
  ```
  const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.dev.js'),
    format: 'cjs',
    env: 'development',
    banner
  },
  'web-runtime-cjs-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.prod.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.dev.js'),
    format: 'cjs',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  'web-full-cjs-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.prod.js'),
    format: 'cjs',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only ES modules build (for bundlers)
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
  // Runtime+compiler ES modules build (for bundlers)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.js'),
    format: 'es',
    transpile: false,
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.min.js'),
    format: 'es',
    transpile: false,
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // runtime-only production build (Browser)
  'web-runtime-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  }
  // ....
  }
}
  ```
  这里列举了一些Vue.js构建配置，还有一些关于服务端渲染webpack插件以及weex的打包配置就不列举，可以查看`script/config.js`
  对于单个配置，它是遵循Rollup的构建规则。其代表意义：
  * `entry`		构建的入口JS文件地址
  * `dest`		构建后的JS文件地址
  * `format` 	构建格式  
				cjs：表示构建出来的文件遵循CommonJS规范
				es 表示构建出来的文件遵循 ES Module 规范
				umd 表示构建出来的文件遵循UMD规范
  * `env`		构建环境
  * `alias`		

### 源码阅读

#### 数据驱动

vue.js最核心的思想就是**数据驱动**。所谓数据驱动，是指视图是有数据驱动生成，我们对视图的修改不会直接操作DOM，而是通过修改数据。它相比传统的前端开发，如使用jQuery等前端库直接修改DOM,大大简化了代码量。特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑编辑的非常清晰，因为DOM变成数据的映射，我们所有的逻辑都是对数据的修改，而不用碰触DOM，这样的代码非常利于维护。

在Vue.js中我们可以采用简洁的模板语法来声明式的将数据渲染为DOM:

```html
<div id="app">
    {{message}}
</div>
```

```js
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
```

#### new Vue发生了什么

从入口文件开始分析，我们先分析 **new Vue**背后发生了神马事情。我们都知道**new**关键字在JavaScript语言中代表实例化一个对象，而在Vue实际上是一个类，类在Javascript中适用Function来实现的,在源码中,路径：ser**<u>src/core/instance/index.js</u>**中

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

可以看到vue只能通过new关键字初始化，然后调用this.init方法，该方法在 **<u>src/core/instance/init.js</u>**中定义

```js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

vue初始化主要就干了几件事：合并配置、初始化生命周期、初始化事件中心、初始化渲染、初始化data、props、computed、watcher等等。

#### # 总结

vue的初始化逻辑写的非常清晰，把不同的功能逻辑拆分成单独的函数执行，让主线逻辑一目了然，这样的编程思想是非常值得学习借鉴的（划重点）。

在初始化的最后，检测到如果有**el**属性，则调用**vm.$mount(vm.$options.el)**方法挂载vm,挂载的目标就是把模板渲染成最终的DOM

