define(['jquery'], function($) {
    
    return {
        getData() {
            $.post('php/goods.php', function(json) {
                if(json.code == 200) {
                // 遍历表格
                   console.log(json.data);
                }
            }, "json");
        },
    }
});