$(document).ready(function() {
    var color = $("#backgroud_color").val();
    var color_images = {'blue': '7', 'white': '3', 'yellow': '0', 'pink': '4', 'red': '6', 'gray': '5'};
    if (color in color_images) {
        $("#top_page").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
        $("body").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
    }
});