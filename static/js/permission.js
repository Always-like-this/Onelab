$(document).ready(function() {
    var color = $("#backgroud_color").val();
    var color_images = {'blue': '7', 'white': '3', 'yellow': '0', 'pink': '4', 'red': '6', 'gray': '5'};
    if (color in color_images) {
        $("#top_page").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
        $("body").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
    }
});

function show_common(){
    $(".common").css('display','block');
    $(".update").css('display','none');
    $(".admin").css('display','none');
}
function show_update(){
    $(".common").css('display','none');
    $(".update").css('display','block');
    $(".admin").css('display','none');
}
function show_admin(){
    $(".common").css('display','none');
    $(".update").css('display','none');
    $(".admin").css('display','block');
}
function add_develop(user_id) {
    update_permission(user_id,"update","添加")
}
function del_develop(user_id) {
    update_permission(user_id,"common","移除")
}
function del_admin(user_id) {
    update_permission(user_id,"update","移除")
}

function add_admin(user_id){
    update_permission(user_id,"admin","添加")
}
function update_permission(user_id,value,option) {
    $.ajax({
            url: '/update_permission/',
            type: 'POST',
            data: {'user_id': user_id, 'permission_value': value},
            dataType: 'json',
            success: function (data) {
                if (data == 0) {
                    alert("出现未知错误！！！");
                } else {
                    if(data==2){
                        alert("不能移除自己的权限");
                    }else{
                        $(".reminder_message").text("权限"+option+"成功");
                        $(".reminder_message").css('display','block');
                        setTimeout(function (){
                            $(".reminder_message").css('display','none');
                            window.location.reload();setTimeout("show_common()","2000");
                            },
                            2000);
                        }
                    }

            }
    })
}