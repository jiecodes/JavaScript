// 轮播图功能分析
// 1 鼠标经过轮播图模块,左右按钮显示,离开隐藏左右按钮
// 2 动态生成小圆圈个数 
// 3 小圆圈(li)的排他思想 点击的li添加current类名 其他取消
// 4 点击小圆点,播放对应的图片
// 5 克隆第一张图片 放到ul最后面     解决了小圆圈不会多  自动生成图片的功能
// 6 点击右侧按钮,图片往左播放一张    图片无缝滚动
// 7 点击右侧按钮,小圆点跟随变化
// 8 左侧按钮
// 9 轮播图自动播放功能 
// 10鼠标经过 清除定时器
// 11 节流阀 防止轮播图按钮连续点击 目的:当上一个函数动画内容执行完毕,再执行下一个函数动画,让事件无法连续触发

// window.onload = function() {}
window.addEventListener('load', function() {    // 窗口加载事件 js代码之后执行
  // 1 鼠标经过轮播图显示左右按钮 arrow
  var arrowLeft = document.querySelector('.arrow-left')   // 获取左箭头
  var arrowRight = document.querySelector('.arrow-right')   // 获取右箭头
  var focus = document.querySelector('.focus')    // 获取轮播图
  focus.addEventListener('mouseenter', function() {   // mouseenter 鼠标移入 没有冒泡(鼠标经过盒子会触发,经过子盒子不会触发)
    arrowLeft.style.display = 'block'
    arrowRight.style.display = 'block'
    clearInterval(timer);                 // 10 鼠标经过 清除定时器
    timer = null;                         // 清除定时器后 数值设置为空
  })
  focus.addEventListener('mouseleave', function() {
    arrowLeft.style.display = 'none'
    arrowRight.style.display = 'none'
    timer = setInterval(function() {      // 不需要加var 因为开始页面就加载了定时器 鼠标离开之前已经声明好了timer
      arrowRight.click();                 // 鼠标离开 开启定时器 手动调用点击事件
    }, 6000)
  })
  // 2 动态生成小圆点个数
  // 核心思路:小圆点的个数与图片张数一样
  // 先得到ul里面的图片张数
  // 利用循环生成小圆点  创建节点 document.createElement('li') 插入节点 ol.appendChild(li)
  var ol = focus.querySelector('.circle')
  var ul = focus.querySelector('ul')
  console.log(ul.children.length)   // 获取ul(轮播图的图片个数)的长度
  for (var i = 0;i < ul.children.length;i++) {     // for循环生成小圆点   -1是因为 点击按钮图片循环,在最后加了复制第一张图片
    // 记录当前小圆点的索引号 通过自定义属性设置 用于算轮播图滚动距离(4)
    var li = document.createElement('li')    // 1 创建节点
    li.setAttribute('index', i)   // 设置属性 index是当前的i i是小圆点个数
    ol.appendChild(li)              // 2 插入节点
    // 3 小圆圈(li)的排他思想 点击的li添加current类名 其他取消
    li.addEventListener('click', function() {
      for (var i = 0;i < ol.children.length;i++) {   // for循环 获取点击的是哪个li
        ol.children[i].className = '';      // 所有的li类名为空
      } 
      this.className = 'current';     // 点击的li添加类名
      // 4 点击小圆点图片开始移动 所以写在for循环获取哪个li里面   (动画使用animate动画函数 animate.js文件写在index文件上面)
      // 使用动画函数前提 添加定位  left、top使用定位
      // 移动ul而不是li
      // 滚动图片核心算法:点击小圆点(li) 让图片滚动 小圆点索引号乘图片宽度 作为ul移动距离
      var index = this.getAttribute('index')    // 得到属性
      // 解决点击第三个小圆点后 再点击右侧按钮会切换到第二张图片的问题    把li的索引号给num就解决了
      num = index;    // 图片索引号num  = 小圆点index的值  点击右箭头num++ 图片往右走
      circle = index;   // 小圆点索引号circle = 小圆点index的值 点击后 circle++ 小圆点往右走

      var focusWidth = focus.offsetWidth;    // focusWidth 图片宽度
      console.log(focusWidth)
      console.log(index)
      // animate(obj, target, callback)    obj目标对象 target目标位置 callback回调函数
      animate(ul, - index * focusWidth)
    })
    // 默认给第一个小圆点添加current(当前的)类名    children[索引号] 
    ol.children[0].className = 'current'    
  }
  // 5 动态添加最后一张图片(复制的第一张图片) 克隆第一张图片    1 解决了小圆圈不会多 2 自动生成图片的功能
  // 克隆ul第一个li cloneNode() true为深克隆(复制里面的子节点) false、空为浅克隆(不复制里面的子节点)
  // 添加到ul后面 appendChild
  var first = ul.children[0].cloneNode(true)    // cloneNode(true) 深拷贝
  ul.appendChild(first)                         // 在ul里面的孩子最后面添加 第一张图片

  // 6 点击右侧按钮,图片往左播放一张
  // 声明一个变量num,点击一次 自增1 变量乘以图片宽度 就是ul滚动距离
  // 图片无缝滚动原理: 把ul第一个li复制一份,放到ul最后面. 当图片滚动到最后一张,让ul跳到最左侧:left:0 同时num为0
  var num = 0;      // 图片索引号
  var circle = 0;   // 小圆点索引号
  var flag = true;  // 声明节流阀
  arrowRight.addEventListener('click', function() {
    // 11 如果节流阀为true 执行代码
    if (flag) {             
      flag = false;         // 把节流阀关闭
        // 图片无缝滚动:如果走到了最后复制的一张图片,此时ul的left改为0,num改为0
      if (num == ul.children.length - 1) {    // ul.children.length 为5 因为最后有一张复制的第一张
        ul.style.left = 0;
        num = 0;
      }
      console.log(ul.children.length - 1)
      num++;
      // animate(obj,target,callback)    obj目标对象 target目标位置 callback回调函数
      animate(ul,-num * focus.offsetWidth, function() {    // function(){} 回调函数
        flag = true;      // 当图片的动画函数调用之后  开启节流阀
      })
      // 7 点击右侧按钮,小圆点也跟随变化
      circle++;
      // 如果轮播图到最后一张图片 则让小圆点到第一个
      if (circle == ol.children.length) {   
        circle = 0;
      }
      // 排他思想 先把所有li的current类名清除
      // for (var i = 0;i < ol.children.length;i++){
      //   ol.children[i].className = '';
      // }
      // ol.children[circle].className = 'current';
      circleChange();   // 调用函数
    }
  })
  // 8 左侧按钮
  arrowLeft.addEventListener('click', function() {
    if (flag) {           // 如果节流阀为true 执行代码
      flag = false;       // 把节流阀关闭
      // 图片无缝滚动:如果走到了最后复制的一张图片,此时ul的left改为0,num改为0
      if (num == 0) {    // num从0开始 表示图片索引号
        num = ul.children.length - 1;
        ul.style.left =  - num * focus.offsetWidth + 'px';
      }
      num--;
      console.log(ul.children.length)
      // animate(obj,target,callback)    obj目标对象 target目标位置 callback回调函数
      animate(ul,- num * focus.offsetWidth, function() {
        flag = true;        // 图片动画函数执行完毕后 开启节流阀
      })
      // 7 点击右侧按钮,小圆点也跟随变化
      circle--;
      // 如果轮播图到最后一张图片 则让小圆点到第一个
      if (circle < 0) {   
        circle = ol.children.length - 1;
      }
      // 排他思想 先把所有li的current类名清除
      circleChange();     // 调用函数
    }
  })
  // 封装排他思想函数 左右箭头按钮都会排他思想 先清除所有li的current类名 然后给自己加current类名
  function circleChange() {
    for(var i = 0;i < ol.children.length; i++) {
      ol.children[i].className = ''   // ol所有孩子都取消类名
    } 
    ol.children[circle].className = 'current'   // 给当前ol孩子加上类名
  }
  // 9 自动播放轮播图
  var timer = setInterval(function(){
    // 手动调用点击事件
    arrowRight.click();
  },5000)

})
