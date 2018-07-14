define(['jquery'], function($) {
    let goodBox=$('.goods-item')
    return {
        init(){
            this.getData()
        },
        insertDom(data){
            for(let i=0;i<goodBox.length;i++){

                goodBox.eq(i).find('.title a').html(data[i].productName)
                //商品名
                goodBox.eq(i).find('.price').html(data[i].productPrice+'元 ')
                //商品价格
                goodBox.eq(i).find('.del').html(data[i].delPrice)
                //商品原价
                if(data[i].saleoff){
                    goodBox.eq(i).find('.flags').append(`<div class="flag flag-saleoff">${data[i].saleoff}折促销</div>`)
                }
                if(data[i].delPrice){
                    goodBox.eq(i).find('.price').append(`<del>${data[i].delPrice}元</del>`)
                }
                if(data[i].gift){
                    goodBox.eq(i).find('.flags').append("<div class='flag flag-gift'>有赠品</div>")
                }
                if(data[i].new){
                    goodBox.eq(i).find('.flags').append("<div class='flag flag-new'>新品上架</div>")
                }
                if(data[i].desc){
                    goodBox.eq(i).find('.desc').html(data[i].desc)
                }
                let arrS=data[i].imageS.split('+')
                let arrM=data[i].imageM.split('+')
                let arrtitle=data[i].title.split('+')
                url=data[i].url
                goodBox.eq(i).find('.figure-img img').eq(0).attr('src',url+arrM[0])
                let frag=document.createDocumentFragment()
                for(let j in arrS){
                    $("<li><img/></li>").find('img').attr({src:url+arrS[j],title:arrtitle[j]}).closest('li').appendTo($(frag))
                }
                $(frag).appendTo(goodBox.eq(i).find('.thumb-list'))
                
                
            }
            this.event()
        },
        event(){
            $('.thumb-list li img').mouseover(function(){
                let mUrl= $(this).attr('src').replace("(s)","(m)")
                $(this).closest('.goods-item').find(".figure-img img").attr('src',mUrl)
                if($(this).closest('li').siblings().length>0){

                    $(this).closest('li').addClass("active").siblings().removeClass('active')
                }
            })
        },
        getData() {
            _this=this
            $.post('php/goods.php', function(json) {
                if(json.code == 200) {
            
                   _this.insertDom(json.data)
                }
            }, "json");
        },
        


    }   
});



