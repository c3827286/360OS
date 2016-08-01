(function($) {
	$.fn.soChange=function(options){
		var defaults={
			thumbObj: null,
			btnPrev: null,
			btnNext: null,
			thumbNowClass: "current",
			thumbOverEvent: true,
			slideTime: 1000,
			autoChange: true,
			clickFalse: true,
			overStop: true,
			changeTime: 5000,
			delayTime: 300
		};
		var $obj = $.extend(defaults,options);	

		var $this = $(this);
		var $triggers; //小圆点对象
		var size = $this.size();
		var curIdx = 0; //当前幻灯片下标
		var nextIdx;  // 要变换到的目标幻灯片下标
		var loop_interval;
		var loop_timeout;

		//初始化所有大图都隐藏只有第一贞显示
		$this.hide().eq(0).show();

        //自动变换
		function autoChange() {
            nextIdx = (curIdx + 1) % size;
           // console.log(nextIdx);
            clickChange();
		}
        //手动点击变换
		function clickChange() {
			if (curIdx != nextIdx) {
				//切换控制器样式
				if ($obj.thumbObj != null) {
					$($obj.thumbObj).removeClass($obj.thumbNowClass).eq(nextIdx).addClass($obj.thumbNowClass)
				}

			//	console.log(curIdx);

				//根据切换设置时间选择相对应的方式
				if ($obj.slideTime <= 0) {
					$this.eq(curIdx).hide();
					$this.eq(nextIdx).show()
				} else {
					$this.eq(curIdx).fadeOut($obj.slideTime);
					$this.eq(nextIdx).fadeIn($obj.slideTime)
				}

				//切换完幻灯片后将curIdx更新为最新值
                curIdx = nextIdx;

				//console.log(curIdx);

				if ($obj.autoChange == true) {
					clearInterval(loop_interval);
                    loop_interval = setInterval(autoChange, $obj.changeTime)
				}
			}
		}

		if ($obj.thumbObj != null) {
            $triggers = $($obj.thumbObj);
            $triggers.removeClass($obj.thumbNowClass).eq(0).addClass($obj.thumbNowClass);

            $triggers.click(function() {
                nextIdx = $triggers.index($(this));
                clickChange();
				if ($obj.clickFalse == true) {
					return false
				}
			});
			if ($obj.thumbOverEvent == true) {
                $triggers.mouseenter(function() {
                    nextIdx = $triggers.index($(this));
                    loop_timeout = setTimeout(clickChange, $obj.delayTime)
				});
                $triggers.mouseleave(function() {
					clearTimeout(loop_timeout)
				})
			}
		}
		if ($obj.btnNext != null) {
			$($obj.btnNext).click(function() {
				if ($this.queue().length < 1) {
                    autoChange();
				}
				return false
			})
		}
		if ($obj.btnPrev != null) {
			$($obj.btnPrev).click(function() {
				if ($this.queue().length < 1) {
                    nextIdx = (curIdx + size - 1) % size;
                    clickChange();
				}
				return false
			})
		}
		if ($obj.autoChange == true) {
            loop_interval = setInterval(autoChange, $obj.changeTime);
			if ($obj.overStop == true) {
				$this.mouseenter(function() {
					clearInterval(loop_interval)
				});
				$this.mouseleave(function() {
                    loop_interval = setInterval(autoChange, $obj.changeTime)
				})
			}
		}
	}	
})(jQuery);