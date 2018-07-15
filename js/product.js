define(['jquery'], function($){
    return {
        init(){
            this.getData()
        },
        insertDom(data){
            $('.xm-product-box h2').html(data[0].productName)
            $('.product .xm-buyBox .pro-info .pro-title').html(data[0].productName)
            //标题
            let pic=data[0].imageL
            $('.picL').attr("src",data[0].url +( pic.includes('+')?pic.split('+')[0]:pic))
            //大图
            $('.pro-info .sale-desc font').html(data[0].msg1).after(data[0].msg2)
            $('.pro-info .pro-price').html(data[0].productPrice+'元')
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
    }
})