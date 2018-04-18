require(["config"], function () {
    require(["template", "jquery", "header", "cookie", "layui"], function () {
        $(function () {
            /**********/
            $.removeCookie("confirmBuy", {path: "/"});
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
            var products = $.cookie("buyProduct");
            for (var i = 0; i < products.length; i++) {
                var _row = $(".template").clone(true);
                $(_row).find(".imgShow").prop("src", products[i].cartimgsrc).end()
                    .find(".name").html(products[i].name + "（" + products[i].store + products[i].color + "）" + products[i].combo).end()
                    .find(".price span").html(products[i].price).end()
                    .find(".amount").html(products[i].account).end()
                    .find(".total").html(((Number(products[i].account)) * (Number(products[i].price))).toFixed(2)).end()
                    .removeClass();
                $("tbody").append(_row);
            }
            var total = 0;
            $(".total").each(function (i, c) {
                total += Number($(c).html())
            })
            $(".cost b").html(total.toFixed(2));

            /**********/

            function getMyAddr() {

            }

            // var user = $.cookie("userAccount"),
            //     userId = user.userId;
            $.post("/queryAddr", {isDefault:true}, function (data) {
                if (data.code === 0) {
                    let {name, addr, phonenum} = data.def;
                    $('.showaddress').show();
                    $('.adress_content').hide();
                    $('.now_addr').html(addr);
                    $('.now_people').html(name + ' ' + phonenum);
                }
                else {
                    $('.addrItem').hide();
                    $('.shiftAddr').html("增加地址");
                }
            });


            $('.addNewAddr').click(function () {
                $('.showaddress').hide();
                $('.adress_content').show();
            });

            $('.canceladdress').click(function () {
                $('.showaddress').show();
                $('.adress_content').hide();
            });

        })
    })
})