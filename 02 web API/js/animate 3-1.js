// window.addEventListener('load', function() {    // 窗口加载事件 最后执行
  // callback接收回调函数   相当于执行 callback=function(){}
  function animate(obj, target, callback) {   // 形参 封装动画函数 obj目标对象 target目标位置 
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {      // 添加定时器
      var step = (target - obj.offsetLeft) / 10     // 每次移动的距离 缓动动画  Math.ceil往大取整,解决不能准确到目标位置
      console.log(obj.offsetLeft + step )
      // 解决不能准确到目标位置
      step = step > 0 ? Math.ceil(step) : Math.floor(step)   // step>0 往大取整  step<0 往小取整
      if (obj.offsetLeft == target) {
        clearInterval(obj.timer)                // 清除定时器
        // 回调函数写在定时器结束里面
        if (callback) { // 如果有callback这个函数 
          callback(); // 调用函数
        }
      }
      obj.style.left = obj.offsetLeft + step  + 'px'   // step + 1 解决一直跑的问题
    }, 15)
  }
// })