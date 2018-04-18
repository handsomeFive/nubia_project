require(["config"], function () {
    require(["template", "jquery","cookie", "header"], function (template) {
        let dataSource = [],
            nextSource = [];

        function getProvince() {
            $.getJSON('../json/region_dumps.json', {dataType: 'json'}, function (data) {
                dataSource = data;
                let provinceData = [],
                    html = '';
                data.forEach(function (value) {
                    provinceData.push(value.name);
                });
                for (var i = 0; i < provinceData.length; i++) {
                    html += "<option>" + provinceData[i] + "</option>"
                }
                $(".province").append(html);
            });
        }

        function setnextCity(obj, value) {
            let arr2 = [], html = '<option>请选择...</option>';
            dataSource.forEach(function (value2) {
                if (value === value2.name) {
                    arr2 = value2.cities ? value2.cities : value2.counties;
                    nextSource = value2.cities ? value2.cities : value2.counties;
                }
            });
            arr2.forEach(function (value3) {
                html += "<option>" + value3.name + "</option>";
            });
            obj.html(html);
        }

        function setnextTown(obj, value) {
            let arr2 = [], html = "<option>请选择...</option>";
            nextSource.forEach(function (value2) {
                if (value === value2.name) {
                    arr2 = value2.cities ? value2.cities : value2.counties;
                }
            });
            arr2.forEach(function (value3) {
                html += "<option>" + value3.name + "</option>";
            });
            obj.html(html);
        }
        getProvince();
        $(".province").change(function () {
            var text = $(this).children(":checked").html();
            var html = setnextCity($(".city"), text);
            $(".city").show();
            $(".adressprovince").html(text);
            $(".adresscity,.adresstown").html("");
            $(".town").html('<option>请选择...</option>')
        })
        $(".city").change(function () {
            var text = $(this).children(":checked").html();
            var html = setnextTown($(".town"), text);
            $(".town").show();
            $(".adresscity").html(" " + text);
            $(".adresstown").html("");
        })
        $(".town").change(function () {
            var text = $(this).children(":checked").html();
            $(".town").show();
            $(".adresstown").html(" " + text);
        })
        $(".mustinput").blur(function () {
            if (!$(this).val()) {
                $(".notice").stop().animate({"height": 38}, 600)
            } else {
                $(".notice").stop().animate({"height": 0}, 600)
            }
        });
        $.cookie.json = true;
        var user = $.cookie("userAccount"),
            userId = user.userId;
        $.post("/queryAddr", {userId}, function (data) {
            var html=template("show_addr",{addres:data.data});
            $(".all_addr").html(html);
        });

        $('.addNewAddr').click(function () {
            $('.showaddress').hide();
            $('.adress_content').show();
            $('.addNewAddr').hide()
        });

        $('.canceladdress').click(function () {
            $('.showaddress').show();
            $('.adress_content').hide();
            $('.addNewAddr').show();
        });

        $('.saveNewAddress').click(function () {
            var user = $.cookie("userAccount"),
                id = user.userId,
                name = $('.name').val(),
                province = $('.province').val(),
                city = $('.city').val(),
                town = $('.town').val(),
                location = $('.detail_address').val(),
                num = $('.location_phone').val(),
                isdef = $('.location_isDefult').val();
            if (name && province && city && town && location && num && isdef) {
                let addr = province + city + town + location,
                    phonenum = num,
                    isDefault = isdef === 'on',
                    locationId = new Date().getTime(),
                    userId = id;
                $.post('/addLocation', {name,addr, phonenum, isDefault, locationId, userId}, function (data) {
                    if (!data.code) {
                        $('.addNewAddr').show();
                        $('.adress_content').hide();
                        let html=`<div class="add_item" id=${locationId}>
                            <ul class="addrItemInfo">
                                <li class="list-info"><span>收货地址：</span>
                                                      <i class="show_info">${addr}</i>
                                                      <input class="edit_info" value=${addr}></li>
                                <li class="list-info"><span>收货人：</span>
                                                      <i class="show_info">${name}</i>
                                                      <input class="edit_info" value=${name}></li></li>
                                <li class="list-info"><span>联系方式：</span>
                                                      <i class="show_info">${phonenum}</i>
                                                      <input class="edit_info" value=${phonenum}></li>
                                </li>
                            </ul>
                            <div class="btns">
                                <a href="javascript:void(0)" class="btn_style edit_addr">编辑地址</a>
                                <a href="javascript:void(0)" class="btn_style dele_addr">删除地址</a>
                                <a href="javascript:void(0)" class="btn_style save_addr">保存地址</a>
                                <a href="javascript:void(0)" class="btn_style cancle_ed">取消修改</a>
                            </div>
                        </div>`;
                        $('.all_addr').append(html);
                    }


                })
            }
            else
                alert('请填写好收货信息!');
        });
        $('.all_addr').on('click','.add_item',function () {
            if($(this).attr('class').indexOf('active_border')>-1)
                $(this).removeClass('active_border');
            else{
                $('.add_item').removeClass('active_border');
                $(this).addClass('active_border');
            }

        });
        
        $('.all_addr').on('click','.edit_addr',function (e) {
            $(this).parents('.add_item').find('.show_info').hide();
            $(this).parents('.add_item').find('.dele_addr').hide();
            $(this).parents('.add_item').find('.edit_addr').hide();
            $(this).parents('.add_item').find('.save_addr').show();
            $(this).parents('.add_item').find('.cancle_ed').show();
            $(this).parents('.add_item').find('.edit_info').show();
            e.stopPropagation();
        });

        $('.all_addr').on('click','.cancle_ed',function (e) {
            $(this).parents('.add_item').find('.show_info').show();
            $(this).parents('.add_item').find('.dele_addr').show();
            $(this).parents('.add_item').find('.edit_addr').show();
            $(this).parents('.add_item').find('.cancle_ed').hide();
            $(this).parents('.add_item').find('.save_addr').hide();
            $(this).parents('.add_item').find('.edit_info').hide();

            e.stopPropagation();
        })

        $('.all_addr').on('click','.dele_addr',function (e) {
           let record=$(this).parents('.add_item'),
               locationId=record.attr('id');
           $.post('/deleteAddr',{locationId},function (data) {
               if(data.code===0)
                   record.remove()
           });
            e.stopPropagation();
        });
        $('.all_addr').on('click','.edit_info',function (e) {
            e.stopPropagation();
        });
        $('.setDefault').click(function () {
            let html=$('.active_border');
            if(!html.length){
                alert('请选择一个地址！')
            }else{
                let id=html.attr('id');
                $.post('/updateDefult',{locationId:id},function (data) {
                    if(!data.code)
                        alert("设置成功");
                    else
                        alert("设置失败");
                })
            }
        });
        $('.all_addr').on('click','.save_addr',function (e) {
            let parent=$(this).parents('.add_item'),
                user = $.cookie("userAccount"),
                userId = user.userId,
                id=parent.attr('id'),
                oldAddr=$(parent.find('.show_info')[0]).html().trim(),
                newAddr=$(parent.find('.edit_info')[0]).val().trim(),
                oldName=$(parent.find('.show_info')[1]).html().trim(),
                newName=$(parent.find('.edit_info')[1]).val().trim(),
                oldPhonenum=$(parent.find('.show_info')[2]).html().trim(),
                newPhonenum=$(parent.find('.edit_info')[2]).val().trim();
            if(oldAddr===newAddr&&oldName===newName&&oldPhonenum===newPhonenum){
                alert('请修改信息！')
            }else{
                $.post('/updateAddr',{userId,locationId:id,addr:newAddr,phonenum:newPhonenum,name:newName},function (data) {
                    if(data.code===0){
                        $(parent.find('.show_info')[0]).html(newAddr);
                        $(parent.find('.show_info')[1]).html(newName);
                        $(parent.find('.show_info')[2]).html(newPhonenum);
                        $(parent.find('.edit_info')).hide();
                        $(parent.find('.show_info')).show();
                        $(parent.find('.dele_addr')).show();
                        $(parent.find('.edit_addr')).show();
                        $(parent.find('.cancle_ed')).hide();
                        $(parent.find('.save_addr')).hide();
                    }
                })
            }
            e.stopPropagation();
        })
    })
})