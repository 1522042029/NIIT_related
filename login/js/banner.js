
var showInterval = 1000;	// 每个图片的展示时间
	
//1.获取元素
	var bannerArea = document.getElementById("banner");  								// 滚动条区域，当鼠标停住时清除定时器停止滚动     
	var lis = document.getElementById("banner").getElementsByTagName("li");				// 获取多个li组成的数组
    var triggers = document.getElementById("slider-trigger").getElementsByTagName("a") 	// 获取所有的触发按钮数组
    var prevButton = document.getElementById("bs-left");  								// 向左按钮
    var nextButton = document.getElementById("bs-right"); 								// 向右按钮
	for(var i=0;i<triggers.length;i++) triggers[i].value = i;							// 给每个触发按钮赋值进行标记
    
    var index = 0;						// 当前索引 
    var trailIndex = 0;					// 跟踪索引
    var timer = null;


 //2.设置函数元素左右移动
    function move(moveToIndex)			// 要移动到的索引
	{
			lis[trailIndex].className 	= "item";      		// 去除之前页的样式
		    lis[moveToIndex].className 	= "item selected";  	// 增加轮播页的样式
    }

//3.设置点击切换图片
	/*下一张图片*/
    nextButton.onclick = function () {
    	trailIndex = index;
    	index = (index+1)%lis.length;
		move(index);  		// 移动到下一个轮播图
		showCircle();	// 绑定箭头和小圆点
    };
	/*上一张图片*/
    prevButton.onclick = function () {
		trailIndex = index;
		index = (index<=0?lis.length-1:--index);
		
		move(index);
		showCircle();
    };

//4.设置小圆点的绑定
    function showCircle(){
        triggers[trailIndex].className 	= "ui-slider-trigger";  	// 将之前的小圆点样式清除
        triggers[index].className 		= "ui-slider-trigger curr";	// 添加当前小圆点样式
    }

    // 实现点击小圆点，移动图片
    for(var i = 0 ;i<triggers.length;i++){		// 增加一个作用域，避免变量污染
		!function(){
			triggers[i].onmouseover = function(){
				//判断当前的value值是否和index相等
				if(this.value == index) return;
				//如果不相等
				trailIndex = index;
				index = this.value;
				move(index);			// 移动到当前触发器位置
				showCircle();			// 重新绑定触发器
			}
		}();
    }

//5.设置自动轮播
    timer = setInterval(nextButton.onclick,showInterval);
    bannerArea.onmouseover = function(){
        clearInterval(timer);
    };
    bannerArea.onmouseout = function(){
		clearInterval(timer);
        timer = setInterval(nextButton.onclick,showInterval);
    };