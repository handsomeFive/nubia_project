require(["config"],function(){
	require(["jquery","cookie"],function($){
		$(function(){
		// 生成验证码
		function getImgCode(){
			$.ajax({
				type:"post",
				// url:"http://route.showapi.com/26-4",
				dataType:"json",
				data:{
					"showapi_appid":"45026",
					"showapi_sign":"38c0df553479481fa15ab3d683f10aa0"
				},
				success:function(data){
					$(".imgcode").attr({"check":data.showapi_res_body.text,"src":data.showapi_res_body.img_path});
				}
			})
		}
		// 点击切换登录方式
		$(".log_tab").on("click","label",function(){
			if ($(this).is($(".log_tab label:first"))) {
				$(".logbyaccount").show();
				$(".logbyphone").hide();
			}else{
				$(".logbyaccount").hide();
				$(".logbyphone").show();
				getImgCode();
			}
			$(this).children().addClass("active").end().siblings().children().removeClass("active");
		})
		// 简单的表单验证

		// 手机号码的验证
		$(".phonenum").blur(function(){
			var content=$(this).val();
			var reg=/^(131|135|138|139|152|155)\d{8}$/;
			if(!content){
				$(this).siblings().show().html("请填写信息！");
			}else if(reg.test(content)){
				$(this).siblings().hide();
			}else{
				$(this).siblings().show().html("手机号码格式错误");
			}
		})
		// 账户的输入检测
		// 手机验证码的验证(就仅为检测是否输入)
		$(".accountname,.code-inptext").blur(function(){
			if(!$(this).val()){
				$(this).siblings("span").show();
			}else{
				$(this).siblings("span").hide();
			}		
		})
		//图形验证码的检测以及点击图片按钮切换图标；
		$(".code").blur(function(){
			var content=$(this).val();
			if(!content){
				$(this).siblings("span").show().html("请填写信息！");
			}else if($(this).siblings("a").children("img").attr("check")==content){
				$(this).siblings("span").hide();
			}else{
				$(this).siblings("span").show().html("验证码不正确,请重新输入");
			}	
		})
		$(".imgcode").click(getImgCode);
		$(".checkout").click(function(){			
			if(!$(".accountname").val()){
				$(".accountname").siblings().show().html("登录失败，账户或者密码不能为空");
			}else if(!$(".password").val()){
				$(".accountname").siblings().show().html("登录失败，账户或者密码不能为空");
			}else{
				$.ajax({
					type:"post",
					url:"http://localhost/project-nubia/login.php",
					data:{
							"username":$(".accountname").val(),
							"password":$(".password").val()
						 },
					dataType:"json",
					contentType:"application/x-www-form-urlencoded",
					success:function(data){
						var status=data.status;
						if (status==0) {
							$(".accountname").siblings().show().html("邮箱/手机号码/用户名 错误");
						}else if(status==2){
							$(".password").siblings().show().html("错误的密码");
						}else{
							$(".checkout").val("登录中...");
							 var user={
							 	username:data.data.username,
								phonenum:data.data.phone_num,
								emailaddr:data.data.email_addr
							}
							// 登录成功将用户名、手机号码、邮箱存储到cookie中
							$.cookie("userAccount",JSON.stringify(user),{path:"/"})
							setTimeout(function(){
								if($.cookie("buyProduct"))
									location.href="/html/confirm.html";
								else
									location.href="/index.html";
								
							},800)
						}
					}
				})
			}
			return false;
		})
	})
})
})