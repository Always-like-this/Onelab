function topic_blue(){
    $("#top_page").css("background-image","url(/static/images/7.jpg)");
    $("body").css("background-image","url(/static/images/7.jpg)");
    update_backgroud("blue");
}
function topic_white(){
     $("#top_page").css("background-image","url(/static/images/3.jpg)");
    $("body").css("background-image","url(/static/images/3.jpg)");
    update_backgroud("white");
}
function topic_pink(){
     $("#top_page").css("background-image","url(/static/images/4.jpg)");
    $("body").css("background-image","url(/static/images/4.jpg)");
    update_backgroud("pink");
}
function topic_yellow(){
     $("#top_page").css("background-image","url(/static/images/0.jpg)");
    $("body").css("background-image","url(/static/images/0.jpg)");
    update_backgroud("yellow");
}
function topic_gray(){
     $("#top_page").css("background-image","url(/static/images/5.jpg)");
    $("body").css("background-image","url(/static/images/5.jpg)");
    update_backgroud("gray");
}
function topic_red(){
     $("#top_page").css("background-image","url(/static/images/6.jpg)");
    $("body").css("background-image","url(/static/images/6.jpg)");
    update_backgroud("red");
}
function update_backgroud(back_color){
     $.ajax({
            url:'/update_backgroud/',
            type:'POST',
            data:{'backgroud': back_color},
            dataType:'json',
            success:function(data){
                if(data==0){
                    alert("出现未知错误！！！")
                }else{
                    // alert('修改成功');
                    window.location.reload();
                }
            }
      })
}