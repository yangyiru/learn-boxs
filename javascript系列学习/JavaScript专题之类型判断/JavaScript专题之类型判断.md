## JavaScript专题之类型判断
  + ### [typeof] 是一元操作符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串
  + 如何检测Object的细分类型：Array/Function/Date/RegExp/Error
    * [use] **Object.prototype.toString**
    e.g:
    ```
    Object.prototype.toString.call(new Date()) // "[object Undefined]"
    Object.prototype.toString.call(new Error()) // "[object Error]"
    ```
  + type API  封装type函数以便检测各个类型的值
    ```
     var classType = {}
      // 生成classType映射
      'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map(function(item){
        classType['[object ' + item + ']'] = item.toLowerCase()
      })
      function type(obj) {
        return typeof obj === 'object' || typeof obj === 'function' ? classType[Object.prototype.toString.call(obj)] || 'object' : typeof obj 
      }
    ```
    [tips] 在IE6中，null和undefined会被Object.prototype.toString识别成[object Object]
	所以我们可以参考jq中的类型判断给出以下方法：
	```
	var class2Type = {}
	// 生成classType映射
		'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map(function(item) {
			classType['[object ' + item + ']'] = item.toLowerCase()
		})
	// 第一版 type API封装
	function type(obj) {
	  return typeof obj === 'object' || typeof obj === 'function' ? classType[Object.prototype.toString.call(obj)] || 'object' : typeof obj 
	}
	// 第二版 兼容null和undefined在IE6上面的运行结果
	function type(obj) {
		if(obj === null) {
			return obj + "";
		}
		return typeof obj === 'object' || typeof obj === 'function' ? classType[Object.prototype.toString.call(obj)] || 'object' : typeof obj
	}
	console.log(Object.prototype.toString.call(new Date()))
	console.log(type(new Date()))
	
    ```
	**判断函数**
	```
    function isfunction(obj) {
    	return type(obj) === 'function'
    }
    console.log(isfunction(new Date())) // false
	```
	**判断数组**
	```
    var isArray = Array.isArray || function (obj) {
        return type(obj) === 'array'
    }
	```
	* [use] **instanceof** 	 
	e.g.  obj instanceof Object  // true 实例obj在不在Object构造函数上
	```
	
    ```
	* [use] **constructor**
	```
	
    ```
