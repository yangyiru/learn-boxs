---
title: javascript常用实例的实现与封装
date: 2017-08-27 17:41:14
tags: [javascript]
---
## 前言
在实际开发的时候我们应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效率也不用，复用基本就是复制粘贴！这样是一个很不好的习惯，大家可以考虑一下把一些常见的操作封装成函数，调用的时候，直接调用就好！
<!-- more -->
## 字符串操作

### 去除字符串空格
```python
//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
function trim(str,type){
    switch (type){
        case 1:return str.replace(/\s+/g,"");
        case 2:return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:return str.replace(/(^\s*)/g, "");
        case 4:return str.replace(/(\s*$)/g, "");
        default:return str;
    }
}
```

### 字母大小写切换
```python
/*type
1:首字母大写   
2：首页母小写
3：大小写转换
4：全部大写
5：全部小写
 * */
//changeCase('asdasd',1)
//Asdasd
function changeCase(str,type) {
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                }
                else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                }
                else{
                    itemText += item;
                }
            });
        return itemText;
    }
    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}
```
### 字符串循环复制
```Python
//repeatStr(str->字符串, count->次数)
//repeatStr('123',3)
//"123123123"
function repeatStr(str, count) {
    var text = '';
    for (var i = 0; i < count; i++) {
        text += str;
    }
    return text;
}
```
### 字符串替换
```Python
//字符串替换(字符串,要替换的字符,替换成什么)
function replaceAll(str,AFindText,ARepText){
　　　raRegExp = new RegExp(AFindText,"g");
　　　return str.replace(raRegExp,ARepText);
}
```
### 替换*
```Python
//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
function replaceStr(str, regArr, type,ARepText) {
    var regtext = '', Reg = null,replaceText=ARepText||'*';
    //replaceStr('18819322663',[3,5,3],0)
    //188*****663
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    //replaceStr('asdasdasdaa',[3,5,3],1)
    //***asdas***
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = repeatSte(replaceText, regArr[0]);
        var replaceCount2 = repeatSte(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    //replaceStr('1asd88465asdwqe3',[5],0)
    //*****8465asdwqe3
    else if (regArr.length === 1 && type == 0) {
        regtext = '(^\\w{' + regArr[0] +  '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    //replaceStr('1asd88465asdwqe3',[5],1,'+')
    //"1asd88465as+++++"
    else if (regArr.length === 1 && type == 1) {
        regtext = '(\\w{' + regArr[0] +  '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}
```
### 检测字符串
```python
//checkType('165226226326','phone')
//false
//大家可以根据需要扩展
function checkType (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default :
            return true;
    }
}
```
### 检测密码强度
```python
//checkPwd('12asdASAD')
//3(强度等级为3)
function checkPwd(str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv
    }
    ;
    if (/[0-9]/.test(str)) {
        nowLv++
    }
    ;
    if (/[a-z]/.test(str)) {
        nowLv++
    }
    ;
    if (/[A-Z]/.test(str)) {
        nowLv++
    }
    ;
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    }
    ;
    return nowLv;
}
```
### 检测对象是否有哪个类名 (基础DOM操作)

```python
function hasClass(obj,classStr){ 
    var arr=obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含 
    return (arr.indexOf(classStr)==-1)?false:true;
}
```
### 添加类名 (基础DOM操作)
```python
function addClass(obj,classStr){
    if (!this.hasClass(obj,classStr)){obj.className += " " + classStr};
}
```
### 删除类名 (基础DOM操作)
```python
function removeClass(obj,classStr){
    if (this.hasClass(obj,classStr)) {
        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}
```
### 替换类名["被替换的类名","替换的类名"] (基础DOM操作)
```python
function replaceClass(obj,newName,oldName) {
    removeClass(obj,oldName);
    addClass(obj,newName);
}
```
### 获取兄弟节点 (基础DOM操作)
```python
function siblings(obj){
    var a=[];//定义一个数组，用来存o的兄弟元素 
    var p=obj.previousSibling; 
    while(p){//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling 
        if(p.nodeType===1){ 
            a.push(p); 
        } 
        p=p.previousSibling//最后把上一个节点赋给p 
    } 
    a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了 
    var n=obj.nextSibling;//再取o的弟弟 
    while(n){//判断有没有下一个弟弟结点 n是nextSibling的意思 
        if(n.nodeType===1){ 
            a.push(n); 
        } 
        n=n.nextSibling; 
    }
    return a;
}
```
### 设置样式 (基础DOM操作)
```python
function css(obj,json){
    for(var attr in json){
        obj.style[attr]=json[attr];
    }
}
```
### 设置文本内容 (基础DOM操作)
```python 
function html(obj){
    if(arguments.length==0){
        return this.innerHTML;
    }
    else if(arguments.length==1){
        this.innerHTML=arguments[0];
    }
}
```
### 预加载图片 (DOM操作)
```python
//图片没加载出来时用一张图片（loading图片）代替，一般和图片懒加载一起使用
function aftLoadImg(obj, url, cb) {
    var oImg = new Image(),_this=this;
    oImg.src = url;
    oImg.onload = function () {
        obj.src = oImg.src;
        if (cb && _this.istype(cb, 'function')) {
            cb(obj);
        }
    }
}
```
### 图片滚动懒加载(DOM操作)
```python
//图片滚动懒加载
//@className {string} 要遍历图片的类名
//@num {number} 距离多少的时候开始加载 默认 0
//比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载

//html代码
//<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
//<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
//<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
//data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
//详细可以查看testLoadImg.html

//window.onload = function() {
//    ecDo.loadImg('load-img',100);
//    window.onscroll = function() {
//        ecDo.loadImg('load-img',100);
//        }
//}
loadImg:function(className, num) {
    var _className = className || 'ec-load-img', _num = num || 0,_this=this;
    var oImgLoad = document.getElementsByClassName(_className);
    for (var i = 0, len = oImgLoad.length; i < len; i++) {
        if (document.documentElement.clientHeight + document.body.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
            //记录图片是否已经加载
            oImgLoad[i].isLoad = true;
            //设置过渡，当图片下来的时候有一个图片透明度变化
            oImgLoad[i].style.cssText = "transition: ''; opacity: 0;"
            if (oImgLoad[i].dataset) {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, function (o) {
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = "";
                        }
                    }, 1000)
                });
            } else {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), function (o) {
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = "";
                        }
                    }, 1000)
                });
            }
            (function (i) {
                setTimeout(function () {
                    oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                }, 16)
            })(i);
        }
    }
}
```

### cookie
```python
//cookie
//设置cookie
function setCookie(name,value,iDay){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+';expires='+oDate;
}
//获取cookie
function getCookie(name){
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name)
        {
            return arr2[1];
        }
    }
    return '';
}
//删除cookie
function removeCookie(name){
    setCookie(name,1,-1);
}

```
### 获取，设置url参数
```python
//获取url参数
//getUrlPrmt('segmentfault.com/write?draftId=122000011938')
//Object{draftId: "122000011938"}
function getUrlPrmt(url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
        let pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

//设置url参数
//setUrlPrmt({'a':1,'b':2})
//a=1&b=2
function setUrlPrmt(obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}
```
### 随机返回一个范围的数字
```python
function randomNumber(n1,n2){
    //randomNumber(5,10)
    //返回5-10的随机整数，包括5，10
    if(arguments.length===2){
        return Math.round(n1+Math.random()*(n2-n1));
    }
    //randomNumber(10)
    //返回0-10的随机整数，包括0，10
    else if(arguments.length===1){
        return Math.round(Math.random()*n1)
    }
    //randomNumber()
    //返回0-255的随机整数，包括0，255
    else{
        return Math.round(Math.random()*255)
    }  
}
```
### Date日期时间部分
```python
//到某一个时间的倒计时
//getEndTime('2017/7/22 16:0:0')
//"剩余时间6天 2小时 28 分钟20 秒"
function getEndTime(endTime){
    var startDate=new Date();  //开始时间，当前时间
    var endDate=new Date(endTime); //结束时间，需传入时间参数
    var t=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
    var d=0,h=0,m=0,s=0;
    if(t>=0){
      d=Math.floor(t/1000/3600/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    } 
    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
}
```

### 获取对象数组某些项 (数组操作)
```python
//获取对象数组某些项
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//getOptionArray(arr,'a,c')
//[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
//只获取某一项的值
//getOptionArray(arr,'a',1)
//getOptionArray(arr,'b',1)
//[2, 3, 9, 2, 5]
getOptionArray:function(arr, keys, type) {
    var newArr = []
    if (!keys) {
        return arr
    }
    //是否只是需要获取某一项的值
    if (type === 1) {
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i][keys])
        }
        return newArr;
    }
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var j = 0, len1 = _keys.length; j < len1; j++) {
            newArrOne[_keys[j]] = arr[i][_keys[j]]
        }
        newArr.push(newArrOne);
    }
    return newArr
}
```
### 排除数组某些项 (数组操作)
```python
//排除数组某些项
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//filterOptionArray(arr,'a')
//[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
//filterOptionArray(arr,'a,c')
//[{b:2},{b:3},{b:9},{b:2},{b:5}]
function filterOptionArray (arr, keys) {
    var newArr = []
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var key in arr[i]) {
            //如果key不存在排除keys里面,添加数据
            if (_keys.indexOf(key) === -1) {
                newArrOne[key] = arr[i][key];
            }
        }
        newArr.push(newArrOne);
    }
    return newArr
}
```
### 对象数组排序(数组操作)
```python
//对象数组的排序
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//arraySort(arr2,'a,b')  a是第一排序条件，b是第二排序条件
//[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:4,b:2,c:5},{a:4,b:5,c:7},{a:5,b:9}]
arraySort: function (arr, sortText) {
    if (!sortText) {
        return arr
    }
    var _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
    for (var i = 0, len = _sortText.length; i < len; i++) {
        _arr.sort(function (n1, n2) {
            return n1[_sortText[i]] - n2[_sortText[i]]
        })
    }
    return _arr;
}
```
### 手机类型判断 (其他操作)
```python
//手机类型判断
//browserInfo('android')
//false（在浏览器iphone6模拟器的调试） 
browserInfo:function(type) {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('MicroMessenger') !== -1
        default:
            return navigator.userAgent.toLowerCase()
    }
}
```











