require(["config"],function(){
	require(["template","jquery","header"],function(template){
		$(function(){//轮播图的事件处理
			var currentIndex=0,
				nextIndex=1,
				circles=$(".carousel_circles a"),
				images=$(".carousel_images li "),
				timer=null;
				timer=setInterval(move,5000);
				$(".carousel_circles").delegate("a","click",function(){
					var num=$.inArray(this,circles);
					if (currentIndex===num)
						return;
					nextIndex=num;
					move();
				})
				function move(){
					$(images[currentIndex]).fadeOut();
					$(images[nextIndex]).fadeIn();
					$(circles[currentIndex]).removeAttr("class");
					$(circles[nextIndex]).prop("class","current");
					currentIndex=nextIndex;
					nextIndex++;
					if(nextIndex>=2)
						nextIndex=0;
				}
		});
		$.get("/requestAllPhone",{},function (data) {
			console.log(data);
			if(data.code===0){
                var html=template("show_phone",{phones:data.data});
                		$(".contenierTemplate").html(html);
			}
        })
	})
})