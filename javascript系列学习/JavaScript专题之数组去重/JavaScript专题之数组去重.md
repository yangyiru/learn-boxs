## JavaScript专题之数组去重
### 双重循环去重，原始方法：
```
var arr = [1, 0, "1", 2, "2", 2, 1, 1]
function unique(array) {
  var res = [];
  for (var i = 0; i < array.length; i++) {
  	for (var k = 0; k < res.length; k++) {
      if(array[i] === res[k]) {
        break;
      }
  	}
  	if(k === array[i]) {
  	  res.push(array[i])
  	}
  }
  return res
}

```
### 使用indexOf 简化上面内部循环
```
var arr = [1, 0, "1", 2, "2", 2, 1, 1]
function unique(array) {
  var res = [];
  for (var i = 0; i < array.length; i++) {
    var current = arr[i]
    if(res.indexOf(current) === -1){
      res.push(arr[i])
    }
  }
  return res
}
```
### 使用sort后去重（会有争议）
```
var arr = [1, 0, "1", 2, "2", 2, 1, 1]
function unique(array) {
  var res = [];
  var sortArr = array.sort()
  for (var i = 0; i < sortArr.length; i++) {
    if(sortArr[i] != res[res.length - 1]) {
      res.push(sortArr[i])
    }
  }
  return res
}
```
### 使用Object键值去重
```
var arr = [1, 0, "1", 2, "2", 2, 1, 1]
function unique(array) {
  var res = [];
  var object = {}
  for (var i = 0; i < array.length; i++) {
    if(!object[typeof(array[i]) + array[i]]) {
	  res.push(array[i])
      object[typeof(array[i]) + array[i]] = 1
	}
  }
}
```
### es6去重
```
function unique(array) {
  const seen = new Map()
  return array.fliter((a) => !seen.has(a) && seen.set(a, 1))
}
// or
function unique(array) {
  return Array.from(new Set(array)) // 简化版  return [...new Set(array)]
}
```
