function check_create(){
    var title_name = $("#title_name").val();
    var content_name = $("#content_name").val();
    if(!title_name||!content_name){
        check_title();
        check_content();
        return false;
    }
    return true;
}
function check_title() {
    var title_name = $("#title_name").val();
    if (!title_name) {
        $("#title_error_message").text("标题不为空");
    }
}
function check_content(){
    var content_name = $("#content_name").val();
    if(!content_name){
        $("#content_error_message").text("任务描述不为空");
    }
}
function repeat_check_title(){
    $("#title_error_message").text("");
}
function repeat_check_content(){
    $("#content_error_message").text("");
}
$(document).ready(function() {
    var color = $("#backgroud_color").val();
    var color_images = {'blue': '7', 'white': '3', 'yellow': '0', 'pink': '4', 'red': '6', 'gray': '5'};
    if (color in color_images) {
        $("#top_page").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
        $("body").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
    }
});