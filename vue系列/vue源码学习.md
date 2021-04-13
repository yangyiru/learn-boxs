## Vue源码阅读

### 数据驱动

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

### 总结

vue的初始化逻辑写的非常清晰，把不同的功能逻辑拆分成单独的函数执行，让主线逻辑一目了然，这样的编程思想是非常值得学习借鉴的（划重点）。

在初始化的最后，检测到如果有**el**属性，则调用**vm.$mount(vm.$options.el)**方法挂载vm,挂载的目标就是把模板渲染成最终的DOM



