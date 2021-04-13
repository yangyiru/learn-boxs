### Es6实用方法整理

#### 1.字符串反转

```js
// Es6版本
const reverString = string => [...string].reverse().join('');
reverString('String') //  gnirtS
reverString('Hello world') //  dlrow olleH

// 原生js版本
function strRever(string) {
  return string.split('').reverse().join('');
}
strRever('hello') // olleh
```

####  2.从对象中创建`键-值`对数组

```js
const keyValuePairsToArray = object => Object.keys(object).map(el => [el,object[el]])
keyValuePairsToArray({x: 1, y: 1})  // [['x': 1], ['y': 1]]
```

#### 3.返回数字数组中的最大值

```js
const maxElFromArray = (arr, num = 1) => [...arr].sort((x, y) => y - x).slice(0, num)
maxElFromArray([0, 8, 2, 4, 5]) // [8]
```

#### 4.返回数的平均值

```

```

