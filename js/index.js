require(["config"],function(){
	require(["header","jquery","template","cookie"],function(a,b,template){
		$(function(){
			// 切页的btn变换
			// banner的滚动(轮播图的功能实现)
				$(".banner_carousel_prev_box,.banner_carousel_next_box").mouseenter(function(){
					$(this).animate({left:0},80)
				})
				$(".banner_carousel_prev_box,.banner_carousel_next_box").mouseleave(function(){
					$(this).animate({left:-41},80)
				})
				var currentIndex=0,//当前显示的index
				nextIndex=1,//即将显示的index
				imgs=$(".banner_carousel_imgs li"),//要切换的图片
				circles=$(".banner_carousel_circlesAlign span"),//小圆点
				timer=null;
				timer=setInterval(move,5000)
				// 小圆点的点击切换事件
				$(circles).click(function(){
					clearInterval(timer);
					var a=$.inArray(this,circles);
					if(a===currentIndex)
						return 
					nextIndex=a;
					move();
					timer=setInterval(move,5000);
				})
				$(".banner_carousel_next").click(function(){
					clearInterval(timer);
					move();
					timer=setInterval(move,5000)
				})
				$(".banner_carousel_prev").click(function(){
					clearInterval(timer);
					nextIndex=currentIndex-1;
					if(nextIndex<0)
						nextIndex=3;
					move();
					timer=setInterval(move,5000)
				})
				function move(){
					clearInterval(timer)
					$(imgs.get(currentIndex)).fadeOut(1000);
					$(imgs.get(nextIndex)).fadeIn(1000);
					$(circles.get(currentIndex)).prop("class","");
					$(circles.get(nextIndex)).prop("class","current");
					currentIndex=nextIndex;
					nextIndex++;
					if(nextIndex>=imgs.length)
						nextIndex=0;
				}
		})
		$(function(){//左边的商品列表显示页面
			$(".banner_side_options li").mouseenter(function(){
				$(this).children("div").show();
			})
			$(".banner_side_options li").mouseleave(function(){
				$(this).children("div").hide();
			})
			// 以旧换新等鼠标移入事件
			$(".content_channel_item").delegate(".channel_item_font","mouseenter",function(){
				// $("channel_item_font").removeAttr("class");
				$(".channel_item_font").prop("class","channel_item_font");
				$(this).prop("class","channel_item_font active");
			})
			// 请求mobile.json的数据
			$.getJSON("../json/mobile.json",{dataType:"jsonp"},function(data){
				var html1=template("mobile_prod",{mobiles:data});
				var html2=template("mobile_prod2",{mobiles:data});
				var html3=template("mobile_prod3",{mobiles:data});
				$(".containerForTemplate").html(html1);
				$(".containerForTemplate2").html(html2);
				// console.log(($(".containerForTemplate3").html())+html3);
				$(".containerForTemplate3").html(($(".containerForTemplate3").html())+html3);
				 // 商品列表移入的事件，消失价格出现两个点击按钮	
				$(".content_produ_template").mouseover(function(){
					$(this).children(".content_produ_click").show();
					$(this).children(".content_produ_price").hide();
				})
				$(".content_produ_template").mouseout(function(){
					$(this).children(".content_produ_click").hide();
					$(this).children(".content_produ_price").show();
			  	})		
			})			
		})
	})
})
