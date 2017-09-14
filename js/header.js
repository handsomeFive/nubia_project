require(["config"],function(){
	require(["template"],function(template){
		$(function(){
			//动态获取json里面的数据
	 		$.getJSON("../json/header.json",{dataType:"jsonp"},function(data){
	 			var html=template("prod_temp", {header_produ:data});
				$(".head_hidden_content_all").html(html);
				// 初始化轮播图的长度
				$(".head_hidden_content_all").css({
					width:(data.length+1)*195+"px"
				});
				// 克隆查看更多按键并往轮播图后面添加一个box装“+”
				var more=$(".head_hidden_more").clone(true);
				$(more).prop("href","html/allphone.html")
				$(more).children("p").text("查看所有手机")
				$(".head_hidden_content_all").append(more);
	 		})
	 		$(".head_hidden_content_all2").css({
					width:7*195+"px"
				})
	 		// 为鼠标移到nav上显示下拉框的操作
	 		$(".header_list li").mouseenter(function(){
	 			$(this).children(".head_hidden").stop().animate({height:240},200)
	 		})
	 		$(".header_list li").mouseleave(function(){
	 			$(this).children(".head_hidden").stop().animate({height:0},200)
	 		})
	 		// $(".header_list").delegate("li","mouseover",function(){
	 		// 	$(this).children(".head_hidden").animate({height:240},500)
	 		// })
	 		// $(".header_list").delegate("li","mouseout",function(){
	 		// 	$(this).children(".head_hidden").animate({height:0},500)
	 		// })
	 		// 轮播图(手机)的事件处理
	 		$(".head_hidden").delegate(".head_hidden_next a,.head_hidden_prev a","click",function(){
	 			var hhca= $(".head_hidden_content_all").position();
	 			if($(this).is(".head_hidden_next a")){//轮播往右的操作
	 				if(hhca.left==0){
	 					$(".head_hidden_content_all").stop().animate({left:-6*195},1000)
	 				}else{
	 					// 不能再往右边移动的时候
	 					var nowLeft=$(".head_hidden_content_all").position().left;
	 					$(".head_hidden_content_all").stop().animate({left:nowLeft-15},200,function(){
	 						$(".head_hidden_content_all").stop().animate({left:nowLeft},200)
	 					})
	 				}
	 			}
	 			else{//轮播往左的操作
	 				if(hhca.left==0){
	 					// 不能再往左边移动的时候
	 					$(".head_hidden_content_all").stop().animate({left:parseInt(hhca.left)+15},200,function(){
	 						$(".head_hidden_content_all").stop().animate({left:parseInt(hhca.left)},200)
	 					})
	 				}else{
	 					$(".head_hidden_content_all").stop().animate({left:0},1000)
	 				}
	 			}			
	 		})	
	 		// 轮播图(配件)的事件处理
	 		$(".head_hidden").delegate(".head_hidden_next1 a,.head_hidden_prev1 a","click",function(){
	 			var hhca= $(".head_hidden_content_all2").position();
	 			if($(this).is(".head_hidden_next1 a")){//轮播往右的操作
	 				if(hhca.left==0){
	 					$(".head_hidden_content_all2").stop().animate({left:-6*195},1000)
	 				}else{
	 					// 不能再往右边移动的时候
	 					var nowLeft=$(".head_hidden_content_all2").position().left;
	 					$(".head_hidden_content_all2").stop().animate({left:nowLeft-15},200,function(){
	 						$(".head_hidden_content_all2").stop().animate({left:nowLeft},200)
	 					})
	 				}
	 			}
	 			else{//轮播往左的操作
	 				if(hhca.left==0){
	 					// 不能再往左边移动的时候
	 					$(".head_hidden_content_all2").stop().animate({left:parseInt(hhca.left)+15},200,function(){
	 						$(".head_hidden_content_all2").stop().animate({left:parseInt(hhca.left)},200)
	 					})
	 				}else{
	 					$(".head_hidden_content_all2").stop().animate({left:0},1000)
	 				}
	 			}
	 					
	 		})
	})
	})
})
