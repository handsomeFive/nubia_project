require(["config"],function(){
	require(["jquery","cookie","header"],function(){
		// 加载共同部分
		$(function(){
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
					$('.bottom').html(data);
				}
			})
			// 显示物品或者显示跳转的信息
			$.cookie.json=true;
			var products=$.makeArray($.cookie("buyProduct"));			
			if(products){
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
					console.log(products);			
				}
			}else{
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
			function updatetotal(obj,num){
				obj.parents(".product_infor").data("product").account=num;
				$.cookie("buyProduct",products,{path:"/",expires:7});
				$.cookie("buyProduct",obj.parents(".product_infor").data("product"),{path:"/",expires:7})
				obj.siblings(".inp_sum").val(num);
					saved=obj.parents(".product_infor").data("product").price,					
					price=obj.parents(".product_infor").data("product").save;
				obj.siblings(".inp_sum").val(num).end()
					   .parents(".product_infor").find(".subtotal span").html((saved*num).toFixed(2)).end().end()
					   .parents(".product_infor").find(".saved span").html((price*num).toFixed(2));

			}
		})
	})
})