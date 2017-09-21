require(["config"],function(){
	require(["template","jquery","header","cookie"],function(){
		$(function(){
/**********/ 		
		function getProvince(i){
			$.ajax({
				// url:"http://route.showapi.com/1149-1",
				data:{
					showapi_appid:"29550",
					showapi_sign:"08402fce064a484baad949d9a18f75e7",
					level:1,
					page:i
				},
				dataType:"json",
				success:function(data){
					var attr=data.showapi_res_body,
						area=attr.data;
						html="";
					for(var i=0;i<area.length;i++){
						html+="<option nowindex="+area[i].id+">"+area[i].areaName+"</option>"
					}
					$(".province").append(html);	
				}			
			})
		}
		function setnextCity(obj,id){
			$.ajax({
				// url:"http://route.showapi.com/1149-2",
				data:{
					showapi_appid:"29550",
					showapi_sign:"08402fce064a484baad949d9a18f75e7",
					parentId:id
				},
				dataType:"json",
				success:function(data){
					var citys="<option>请选择...</option>";
					var area=data.showapi_res_body.data;
					for(var i=0;i<area.length;i++){
						citys+="<option nowindex="+area[i].cityId+">"+area[i].simpleName+"</option>";
					}
					obj.html(citys);					
				}
			})
		}		
		getProvince(1);
		getProvince(2);
		$(".province").change(function(){
			var id=$(this).children(":checked").attr("nowindex");
			var text=$(this).children(":checked").html();
			var html=setnextCity($(".city"),id);
			$(".city").show();
			$(".adressprovince").html(text);
			$(".adresscity,.adresstown").html("");
		})
		$(".city").change(function(){
			var id=$(this).children(":checked").attr("nowindex");
			var text=$(this).children(":checked").html();
			var html=setnextCity($(".town"),id);
			$(".town").show();
			$(".adresscity").html(" "+text);
			$(".adresstown").html("");
		})
		$(".town").change(function(){
			var text=$(this).children(":checked").html();
			$(".town").show();
			$(".adresstown").html(" "+text);
		})
		$(".mustinput").blur(function(){
			if(!$(this).val()){
				$(".notice").stop().animate({"height":38},600)
			}else{
				$(".notice").stop().animate({"height":0},600)
			}
		});
		$.cookie.json=true;
		var products=$.cookie("buyProduct");
		for(var i=0;i<products.length;i++){			
			var _row=$(".template").clone(true);
			$(_row).find(".imgShow").prop("src",products[i].cartimgsrc).end()
				   .find(".name").html(products[i].name+"（"+products[i].store+products[i].color+"）"+products[i].combo).end()
				   .find(".price span").html(products[i].price).end()
				   .find(".amount").html(products[i].account).end()
				   .find(".total").html(((Number(products[i].account))*(Number(products[i].price))).toFixed(2)).end()
				   .removeClass();
			$("tbody").append(_row);
		}
		var total=0;
		$(".total").each(function(i,c){
			total+=Number($(c).html())
		})
		$(".cost b").html(total.toFixed(2));
/**********/ 
		})
	})
})