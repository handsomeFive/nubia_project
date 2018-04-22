require(["config"],function(){
	require(["jquery","cookie"],function($){
		$(function(){
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
		$(".checkout").click(function(){
			if(!$(".accountname").val()){
				$(".accountname").siblings().show().html("登录失败，账户或者密码不能为空");
			}else if(!$(".password").val()){
				$(".accountname").siblings().show().html("登录失败，账户或者密码不能为空");
			}else{
                $(".accountname").siblings().show().html(" ");
                $.post('/login',{
                    "username":$(".accountname").val(),
                    "pwd":$(".password").val()
                },function(data){
                    var status=data.code;
                    if (status===1) {
                        $(".accountname").siblings().show().html("邮箱/手机号码/用户名 错误");
                    }else if(status===-1){
                        $(".password").siblings().show().html("错误的密码");
                    }else{
                        $(".checkout").val("登录中...");
                        var user={
                        	userId:data.data.userId,
                            username:data.data.username,
                            phonenum:data.data.phonenum,
                            emailaddr:data.data.emailaddr
                        };
                        // 登录成功将用户名、手机号码、邮箱存储到cookie中
                        $.cookie("userAccount",JSON.stringify(user),{path:"/"})
                        setTimeout(function(){
                            if($.cookie("confirmBuy")){
                                if ($.cookie("confirmBuy")) {
                                    $.removeCookie("confirmBuy",{path:"/"})
                                    location.href="/html/confirm.html";
                                }eles
                                history.back();
                            }
                            else
                                history.back()
                        },800)
                    }
                });
			}
			return false;
		})
	})
})
})