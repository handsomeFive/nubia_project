require(["config"],function(){
	require(["jquery","cookie","header"],function(a,b,c){
		// 加载顶部底部脚部的公共资源
		$.ajax({
			url:"/html/public/header.html",
			dataType:"html",
			success:function(data){
				$(".header").html(data);
			}
		})
		$.ajax({
			url:"/html/public/footer.html",
			dataType:"html",
			success:function(data){
				$(".footer").html(data);
			}
		})
		$.ajax({
			url:"/html/public/bottom.html",
			dataType:"html",
			success:function(data){
				$(".bottom").html(data);
			}
		})
		$(function(){//开始对本页面的数据进行渲染
			$.getJSON("/json/Z17.json",{dataType:"jsonp"},function(data){
				// 头部数据的渲染
				$(".info_head strong").html(data.name);
				var html="";
				for(var i=0;i<data.buyInfor.length;i++){
					html+="<span>"+data.buyInfor[i]+"</span><br>"
				}
				$(".sellPoint").html(html);
				html="";
				// 选择颜色的时的渲染
				var versionsData=data.versions;//五中版本(颜色)
				for(var i=0;i<versionsData.length;i++){
					if (i==0) {
						html+=html+="<li class='current' pindex='"+i+"'>"+versionsData[i].color+"</li>";
					}else
					html+="<li pindex='"+i+"'>"+versionsData[i].color+"</li>";
				}
				// 照片加载
				$(".chooseColor ul").html(html);
				var colorIndex,
					edtionData,
					edtionIndex,
					optionsData,
					checkedColor="",//用于保存选中的颜色
					checkedStore="",//用于保存选中的存储信息
					checkedProPrice="",//用于保存选中的手机价钱
					checkedIns="",//用于保存选中的保险名字
					checkedInsPrice="",//用于保存选中的保险价钱
					totalsum,//保存小计的金额
					imgSrc=[];
					addStore();
					addDiscounts();
					addAttachPro();
					addInsurance();
					changeByInfor();
					changeTotal();
					upDateImg();
				$(".chooseColor ul li").click(function(){
					$(this).addClass("current").siblings().removeClass("current");
					checkedStore=$(".chooseEdtion ul").children(".current").html();//点击颜色的时候也保存当前存储信息					
					imgSrc=edtionData[edtionIndex].imgSrc;
					addStore();
					addDiscounts();
					addAttachPro();
					addInsurance();
					changeByInfor();
					changeTotal();
					upDateImg();
				});	
				// 事件委派
				$(".chooseEdtion").on("click","li",function(){
					$(this).addClass("current").siblings().removeClass("current");
					imgSrc=edtionData[edtionIndex].imgSrc;
					addDiscounts();
					addAttachPro();
					addInsurance();
					changeByInfor();
					changeTotal();
					upDateImg();
				});
				$(".chooseCombo").on("click","li",function(){
					var index=$(this).index();
					$(this).addClass("current").siblings().removeClass("current");
					addAttachPro();
					changeByInfor();
					changeTotal();
					changeTotal();
					// 修改原价的信息；
					$(".total del").html(optionsData.discounts[index].originalprice);
				})
				$(".chooseSafe").on("click","li",function(){
					$(this).toggleClass("current");
					if($(".chooseSafe ul li").attr("class")){
						checkedIns=optionsData.insurance.name;
						checkedInsPrice=optionsData.insurance.price;
						
					}else{
						checkedIns="";
						checkedInsPrice="";
					}
					changeByInfor();
					changeTotal();
				})
				$(".small_img").on("click","a",function(){//四张小图的切换点击功能
					var index=$(this).index();
					$(".big_img").prop("src",imgSrc[index]);
				})
				function addStore(){
					html="";
					colorIndex=$(".chooseColor ul").children(".current").attr("pindex");//存下选择颜色时的index以便确认下列数据
					edtionData=versionsData[colorIndex].edtion;					
					for(var i=0;i<edtionData.length;i++){
						if (i==0) {
							html+=html+="<li class='current' pindex='"+i+"'>"+edtionData[i].store+"</li>";
						}else
							html+="<li pindex='"+i+"'>"+edtionData[i].store+"</li>";
					}
					$(".chooseEdtion ul").html(html);
					checkedColor=$(".chooseColor ul").children(".current").html();//获取选中的颜色值
				}
				function addDiscounts(){
					html="";
					edtionIndex=$(".chooseEdtion ul").children(".current").attr("pindex");
					imgSrc=edtionData[edtionIndex].imgSrc;//加载图片的路径数组；
					optionsData=edtionData[edtionIndex].options;//显示在套餐、保险、分呗的数据；
					// discounts 套餐的渲染
					for(var i=0;i<optionsData.discounts.length;i++){
						if (i===optionsData.discounts.length-1) {
							html+="<li class='current' pindex='"+i+"'><span>"+optionsData.discounts[i].dname+"</span><br><b>¥"+optionsData.discounts[i].price+"</b></li>";							
						}else
							html+="<li pindex='"+i+"'><span>"+optionsData.discounts[i].dname+"</span><br><b>¥"+optionsData.discounts[i].price+"</b><i>"+optionsData.discounts[i].save+"</i></li>";
					}					
					$(".chooseCombo ul").html(html);					
					checkedStore=$(".chooseEdtion ul").children(".current").html();//点击时保存选中的存储信息；
				}	
				function addAttachPro(){
					html="";
					var attchIndex=$(".chooseCombo ul").children(".current").attr("pindex");
					var attchData=optionsData.discounts[attchIndex].otherprod;
					if(!attchData){
						$(".attachPro").hide();
					}else{
						for(var i=0;i<attchData.length;i++){
							$(".attachPro").show();
							html+= `<div>
										<a href="?">
											<img src="${attchData[i].proSrc}">
											<p>${attchData[i].name}</p>
										</a>							
									</div>`
						}
						$(".attachPro").html(html);
					}
					checkedProPrice=optionsData.discounts[attchIndex].price;//保存此套餐的价格					
				}
				function addInsurance(){
					html=`<li>
							<span>${optionsData.insurance.name}</span><i>${optionsData.insurance.price}</i>
						</li>`;
					$(".chooseSafe ul").html(html);	
					checkedInsPrice="";
					checkedIns="";				
				}		
				function changeByInfor(){//更新购买物品信息
					$(".produ_choosed").html(data.name+"&nbsp;"+checkedColor+"&nbsp;"+checkedStore+"&nbsp;"+checkedIns);
				}
				function changeTotal(){//更新小计
					var sum=Number(checkedProPrice)+Number(checkedInsPrice);
					totalsum=sum.toFixed(2);
					$(".subtotal_price i").html(totalsum);
					$(".info_head span i").html(totalsum);
					$(".fixedOnTop span").html(data.name+"&nbsp;"+checkedColor+"&nbsp;"+checkedStore+"&nbsp;"+checkedIns+"&nbsp;"+totalsum+"元")
				}
				function upDateImg(){
					$(".big_img").prop("src",imgSrc[0]);
					$(".small_img a").each(function(i,c){
						$(this).children("img").prop("src",imgSrc[i]);
					})
				}
				$(".huabei li").each(function(i,c){
					$(this).children("span").text(optionsData.loans[i].way).end().children("b").text(optionsData.loans[i].servicetip)
				})				
				// var price=$("");
				// setInterval(function(){
				// 	console.log(checkedColor+checkedStore+checkedProPrice+checkedIns+checkedInsPrice);
				// },4000)
			})
		})
		// 鼠标滚轮事件处理吸顶效果的操作
		$(window).scroll(function(){
			var _top=$(window).scrollTop();
			var _imgsTop=$(".introduce_tab").offset();
			// console.log(_imgsTop.top,_top)
			if(_top>=67){
				$(".fixedOnTop").stop().show().animate({height:60},300);
				if(_top>=_imgsTop.top){
					if(typeof $(".fixedOnTop .main").children(".click_tab").html()==="undefined"){
						$(".click_tab").clone(true).prependTo(".fixedOnTop .main").css("float","left");
						$(".introduce_tab .main").children(".click_tab").remove();
					}	
				}else{
					if(typeof $(".introduce_tab .main").children(".click_tab").html()==="undefined"){
						$(".click_tab").clone(true).prependTo(".introduce_tab .main").css("float","none");
						$(".fixedOnTop .main").children(".click_tab").remove();
					}
				}
			}else if(_top<67){
				$(".fixedOnTop").stop().animate({height:0},500).hide();				
			}
		})
		// 鼠标滚轮事件处理预览图片的
		var oringinOff=$(".phone_show").offset();
		$(window).scroll(function(){
			var _top=$(window).scrollTop();
			var showTop=$(".phone_buy").offset();
			var deadLine=$(".phone_introduce").offset();
			var height=($(".phone_buy").height());
			
			if(_top>showTop.top){
				// 给其父级元素高度已放置文档乱
				$(".phone_buy").height(height);
				$(".phone_show").css({"position":"fixed","top":0,"left":showTop.left+12});
				if (_top>deadLine.top-height-100){
					$(".phone_show").css({"position":"relative","top":deadLine.top-height-100-oringinOff.top,"left":0});
				};
			}else{
				$(".phone_show").css({"position":"relative","top":0,"left":0})
			}
		})
		$(".click_tab").on("click","b",function(){
			var index=$(this).index();
			if(index==0){
				$(this).prop("class","current").siblings().prop("class","");
				$(".picture_introduce").show();
				$(".word_introduce").hide();
			}else{
				$(this).prop("class","current").siblings().prop("class","");
				$(".word_introduce").show();
				$(".picture_introduce").hide();
			}
		})
	})
})