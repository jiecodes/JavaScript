// 1 鼠标经过小图片盒子,黄色遮罩层和大图片盒子显示,离开隐藏
// 2 黄色遮罩层跟随鼠标移动     鼠标移动 把鼠标坐标给遮罩层不合适(鼠标坐标是鼠标到页面距离 遮罩层坐标以父盒子为准) 先获取鼠标在盒子内的坐标 之后把数值给遮罩层作为left、top值
// 3 移动黄色遮罩层,大图片跟随移动功能
// window.addEventListener('load', function() {})  // 窗口加载事件 最后加载js文件 方法一
window.onload = function() {        // 窗口加载事件 最后加载js文件 方法二
  // 1 获取元素
  var detail = document.querySelector('.detail')
  var mask = document.querySelector('.mask')
  var big = document.querySelector('.big')
  // 2 添加事件   鼠标经过小盒子
  detail.addEventListener('mouseover', function() {
    // 3 事件处理方式
    mask.style.display = 'block'
    big.style.display = 'block'
  })
  // 鼠标离开小盒子
  detail.addEventListener('mouseout', function() {
    mask.style.display = 'none'
    big.style.display = 'none'
  })
  // 1 先求 鼠标在盒子内的坐标  = 鼠标坐标e.pageX - 盒子坐标 this.offsetLeft
  // 让盒子走
  // 鼠标移动
  detail.addEventListener('mousemove', function(e){
    // 1 鼠标在盒子内的坐标
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    console.log(x, y)
    // 2 把鼠标在盒子内的坐标给 遮罩层的上和左    让鼠标在遮罩层中间(offsetHeight / 2) offsetHeight盒子的高度
    var maskX = x - mask.offsetWidth / 2   //  mask.offsetWidth / 2(遮罩层宽度的一半)     maskX鼠标在盒子内坐标
    var maskY = y - mask.offsetHeight / 2   // 
    var maskMax = detail.offsetHeight - mask.offsetHeight         //遮罩层最大移动距离
    // 3 让遮罩层在盒子内   x轴 小于0 或者 大于 detail宽度-遮罩层宽度
    if (maskX <= 0) {
      maskX = 0
    } else if (maskX >= detail.offsetWidth - mask.offsetWidth) {
      maskX = detail.offsetWidth - mask.offsetWidth
    }
    if (maskY <= 0) {
      maskY = 0
    } else if (maskY >= maskMax) {
      maskY = maskMax
    }
    mask.style.left = maskX + 'px'  // 最终遮罩层距离上面高度
    mask.style.top = maskY + 'px'           //                                   大图片最大移动距离     遮罩层最大移动距离    2     1                                                                      
    // 4 遮罩层移动 同比例 大盒子移动                                              ————————————————— = ————————————————      —— =  ——                                         
    // 大图片移动距离 = 遮罩层移动距离 * 大图片最大移动距离 / 遮罩层最大移动距离       大图片移动距离         遮罩层移动距离       4     2           
    //                      maskX          bigMax             maskMax  （大图片四方形 所以宽 高一样 bigMax、maskMax这俩个值求出一面,表示四个面都求出来了)
    var bigImage = document.querySelector('.bigImage') // 获取大图片
    // 大图片最大移动距离
    var bigMax = bigImage.offsetWidth - big.offsetWidth;
    // 大图片移动距离 x y
    var bigX = maskX * bigMax / maskMax
    var bigY = maskY * bigMax / maskMax
    bigImage.style.top = - bigY + 'px'      // bigImage加定位top和left才会有效果   反方向移动 所以前面加-号
    bigImage.style.left = - bigX + 'px'     // 反方向移动 所以前面加 负号
  })

}



































