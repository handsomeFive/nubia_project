require(["config"],function(){
	require(["template","jquery","header"],function(template){
		$(function(){
			$.ajax({//加载头部文件
				url:"public/header.html",
				dataType:"html",
				success:function(data){
					$(".header").html(data);
				}
			})
			$.ajax({//加载头部文件
				url:"public/footer.html",
				dataType:"html",
				success:function(data){
					$(".footer").html(data);
				}
			})
			$.ajax({//加载头部文件
				url:"public/bottom.html",
				dataType:"html",
				success:function(data){
					$(".bottom").html(data);
				}
			})
		})
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
		})
		$(function(){//加载手机allphone.json
			$.getJSON("../json/allphone.json",{dataType:"jsonp"},function(data){
				var html=template("show_phone",{phones:data});
				$(".contenierTemplate").html(html);
			})
		})
	})
})