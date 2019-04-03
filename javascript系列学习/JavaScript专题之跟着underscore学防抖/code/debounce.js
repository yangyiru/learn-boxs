var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    // 在不使用debounce函数的情况下 ：此处this指 <div id="container">104</div> 
    // 在使用debounce函数的情况下：此处this指Window对象
    // console.log(this)
    // console.log(e)
    container.innerHTML = count++
}
// container.onmousemove = getUserAction
var setUseAction = debounce(getUserAction, 1000, true)
container.onmousemove = setUseAction;
document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})
// 第一版  防抖 
// 原理： 尽管触发时间，但是我一定在触发的N秒之后才执行，如果你在执行触发的n秒之内又重新触发了，那我就以最新的时间为准，N秒之后才执行，总之是等你触发事件N秒内不再触发事件，我才执行，任性boy

// function debounce(func, wait) {
//   var timeout
//   return function() {
//   	clearTimeout(timeout);
//   	timeout = setTimeout(func, wait)
//   }
// }

// 第二版 防抖， 控制正确的this指向

// function debounce(func, wait) {
//     var timeout
//     return function() {
//         var context = this;
//         clearTimeout(timeout);
//         timeout = setTimeout(function() {
//           func.apply(context)
//         }, wait)
//     }
// }
// 
// 第三版 防抖， 控制正确的event 对象

// function debounce(func, wait) {
//     var timeout
//     return function() {
//         var context = this;
//         var args = arguments;
//         clearTimeout(timeout);
//         timeout = setTimeout(function() {
//           func.apply(context, args)
//         }, wait)
//     }
// }
// 
// 第四版 防抖， 立即执行 与 返回值

// function debounce(func, wait, immediate) {
//     var timeout, result;
//     return function() {
//         var context = this;
//         var args = arguments;
//         clearTimeout(timeout);
//         if (timeout) clearTimeout(timeout);
//         if (immediate) {
//           // 如果执行过了，不再执行
//           var callNow = !timeout
//           timeout = setTimeout(function() {
//             timeout = null
//           }, wait)
//           if (callNow) result = func.apply(context, args)
//         } else {
//           timeout = setTimeout(function() {
//             func.apply(context, args)
//           }, wait)
//         }
//         return result;
//     }
// }

// 第六版 防抖， 加入取消

function debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        if (timeout) clearTimeout(timeout);
        if (immediate) {
          // 如果执行过了，不再执行
          var callNow = !timeout
          console.log( 'callNow____________' + callNow )
          timeout = setTimeout(function() {
          	console.log( 'timeout____________' + timeout )
            timeout = null
          }, wait)
          if (callNow) result = func.apply(context, args)
        } else {
          timeout = setTimeout(function() {
            func.apply(context, args)
          }, wait)
        }
        return result;
    }
    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null
    }
    return debounced
}