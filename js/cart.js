require(["config"],function(){
	require(["template","jquery","cookie","header"],function(template){
		// 加载共同部分
		$(function(){
			$.getJSON("/json/hot.json",{dataType:"jsonp"},function(data){
				var html=template("hot-pro",{attr:data});
				$(".templateforhot").html(html);
				$(".show_img").hover(function(){
					$(this).parent().find(".progress_up").stop().animate({width:"100%"},600,"swing");
				},function(){
					$(this).parent().find(".progress_up").stop().animate({width:"15%"},600,"swing");
				})
			})
			// 显示物品或者显示跳转的信息
			$.cookie.json=true;
			var products=$.makeArray($.cookie("buyProduct"));	
			if(products.length!=0){
				$(".empty_cart").hide();
				$(".cart_content").show();
				//显示购物车信息				
				for(var i=0;i<products.length;i++){
					var _tr=$(".template").clone(true).prop("class","product_infor");
					$(_tr).data("product",products[i]);
					// console.log($(_tr).find(".showImg"));
					$(_tr).find(".showImg").prop("src",products[i].cartimgsrc).end()
						  .find(".infoname").html(products[i].name+"（"+products[i].store+products[i].color+"）"+products[i].combo).end()
						  .find(".price span").html((Number(products[i].price)+Number(products[i].save)).toFixed(2)).end()
						  .find(".inp_sum").val(products[i].account).end()
						  .find(".subtotal span").html((products[i].account*products[i].price).toFixed(2));
					for(var j=0,len=products[i].otherprod.length;j<len;j++){
					   	$(_tr).find(".redname").eq(j).children().html(products[i].otherprod[j]);
					}
					if(products[i].save!=0){
						$(_tr).find(".saved").show();
						$(_tr).find(".saved span").html(products[i].save);
					}	
					$(".show_infor").append(_tr);
					updataData();		
				}
			}else{
				$(".cart_content").hide();
				$(".empty_cart").show();
			}
			$(".add").click(function(){
				var num=$(this).siblings(".inp_sum").val();
				num++;
				updatetotal($(this),num);
				// console.log();
				// 小计：
			})
			$(".del").click(function(){
				var num=$(this).siblings(".inp_sum").val();
				num--;
				if(num<1)
					num=1;
				$(this).siblings(".inp_sum").val(num);
				updatetotal($(this),num);
			})
			$(".deleteprod").click(function(){
				var id=$(this).parents(".product_infor").data("product").id;
				var index=indexOf(id,products);
				products.splice(index,1);
				$(this).parents(".product_infor").remove();
				$.cookie("buyProduct",products,{path:"/",expires:7});
				if(products.length==0){
					$(".cart_content").hide();
				    $(".empty_cart").show();
				}
				updataData();	
			})	
			$(".gotocomfirm").click(function(){
				if($.cookie("userAccount")){
					location.href="/html/confirm.html"
				}else{
					location.href="/html/login.html"
				}
			})	
			function indexOf(id, products) {
					for (var i = 0, len = products.length; i < len; i++) {
						if(products[i].id == id)
							return i;
					}
					return -1;
			}
			function updatetotal(obj,num){
				obj.parents(".product_infor").data("product").account=num;
				$.cookie("buyProduct",products,{path:"/",expires:7});
				// $.cookie("buyProduct",obj.parents(".product_infor").data("product"),{path:"/",expires:7})
				obj.siblings(".inp_sum").val(num);
					saved=obj.parents(".product_infor").data("product").price,					
					price=obj.parents(".product_infor").data("product").save;
				obj.siblings(".inp_sum").val(num).end()
					   .parents(".product_infor").find(".subtotal span").html((saved*num).toFixed(2)).end().end()
					   .parents(".product_infor").find(".saved span").html((price*num).toFixed(2));
				updataData();					
			}
			function updataData(){
				var totalprice=0,totalsave=0,finaprice=0;				
				$(".subtotal span").each(function(i,c){
					finaprice+=Number($(this).html());					
				})
				$(".saved span").each(function(i,c){
					totalsave+=Number($(this).html())
				})
				totalprice=finaprice+totalsave;
				$(".all").children(":nth-child(1)").html("¥ "+totalprice.toFixed(2)).end()
						 .children(":nth-child(3)").html("¥ "+finaprice.toFixed(2))
				if (totalsave!=0) {
					$(".hide_row2").show();
					$(".all .hide_row2").html("¥ "+totalsave.toFixed(2));
				}
			}
		})
	})
})