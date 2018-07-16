define(['jquery'], function($){
    return {
        init(){
            this.getData(),
            this.event()
        },
        insertDom(data){
            $('.xm-product-box h2').html(data[0].productName)
            $('.product .xm-buyBox .pro-info .pro-title').html(data[0].productName)
            $('.xm-buyBox .pro-info .pro-list ul li').eq(0).prepend(data[0].productName)
            
            //标题
            let pic=data[0].imageL
            $('.picL').attr("src",data[0].url +( pic.includes('+')?pic.split('+')[0]:pic))
            //大图
            $('.pro-info .sale-desc font').html(data[0].msg1).after(data[0].msg2)
            //提示信息
            
            $('.pro-info .pro-price').html(data[0].productPrice+'元')
            $('.xm-buyBox .pro-info .pro-list ul li span').eq(0).prepend(data[0].productPrice+'元')
            $('.totlePrice').html('总计 ：'+(data[0].productPrice)+'元')
            //各种价格
            if(data[0].productType!='phone'){
                $('.isphone').attr('style','display:none')
            }
            //不是手机,没有附加服务
            let i=1
            $('.pro-info .pro-choose ul li').click(function(){
                $(this).toggleClass('active')
                $('.addServer').toggle()
                console.log()
                if(i%2){
                    $('.totlePrice').html('总计 ：'+(data[0].productPrice-(-299))+'元')
                }else{
                    $('.totlePrice').html('总计 ：'+(data[0].productPrice)+'元')
                }
                i++
            }
        )
        },
        getData() {
            let data={
                id:location.search.split("=")[1],
            }
            _this=this
            $.post('php/product.php',data, function(json) {
                if(json.code == 200) {
            
                    _this.insertDom(json.data)
                }
            }, "json");
        },
        event(){
            
        }
    }
})