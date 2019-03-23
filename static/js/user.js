function check_mail(){
    var str = $(".email").val();
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if(!re.test(str)&&str){
        $(".email_message").text("!请输入正确的邮箱");
    }
    else{
        if(str){
           $.ajax({
            url:'/edit_info/',
            type:'POST',
            data:{'user_key': 'email','user_value':str },
            dataType:'json',
            success:function(data){
                if(data==0){
                    alert("出现未知错误！！！")
                }else{
                    if(data==2){
                       $(".telephone_message").text("邮箱已经存在！");
                    }
                    else{
                        $(".telephone_message").text("");
                        $(".reminder_message").text("邮箱修改成功");
                        $(".reminder_message").css('display','block');
                        setTimeout(function (){
                            $(".reminder_message").css('display','none');
                            window.location.reload();},
                            2000);
                        // window.location.reload();
                    }

                 }
             }
            })
        }

    }
}
function edit_mail(){
    $(".email_message").text("");
}
function check_telephone(){
    // $(".telephone_message").text("");
    var phone = $(".telephone").val();
    if(phone==""){
        $(".telephone_message").text("手机号码不为空");
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))) {
        $(".telephone_message").text("手机号码有误，请重填");
        return false;
    }else{
        $.ajax({
            url:'/edit_info/',
            type:'POST',
            data:{'user_key':'telephone','user_value':phone},
            dataType:'json',
            success:function(data){
                if(data == 2){
                    $(".telephone_message").text("手机号已存在");
                }
                else{
                    if(data==0){
                        alert("出现未知错误！");
                    }else{
                        $(".telephone_message").text("");
                        $(".reminder_message").text("手机号修改成功");
                        $(".reminder_message").css('display','block');
                        setTimeout(function (){
                            $(".reminder_message").css('display','none');},
                            2000);

                        // window.location.reload();
                    }

                }
            }
        })
    }
}
function check_password() {
    var phone = $(".telephone").val();
    var pwd = $(".password").val();
    if(pwd==""){
        return ;
    }
    $.ajax({
        url:'/check_login/',
        type:'POST',
        data:{'user':phone, 'pwd':pwd},
        dataType:'json',
        success:function(data){
            if(data != 1){
                $(".password_message").text("原密码错误");
            }
        }
    })
}
function check_password1() {
    var password = $(".password").val();
    var password1 = $(".password1").val();
    var password2 = $(".password2").val();
    if(!password1&&password==""){
        $(".password_message").text("");
        return ;
    }
    if(password1&&password==""){
        $(".password_message").text("请输入原密码");
        return ;
    }
    if(password1==password){
        $(".password_message1").text("新密码和原密码不能一样");
        return ;
    }
    if(password2&&(password1!=password2)){
        $(".password_message2").text("两次密码不一致");
        return ;
    }
    if(!(/^[\w_-]{6,16}$/.test(password1))) {
        $(".password_message1").text("密码必须为6-16位数字或者字母或者_或者-组合");
    }else{
        $(".password_message1").text("");
    }
}
function check_password2() {
    var password =$(".password").val();
    var password1 = $(".password1").val();
    var password2 = $(".password2").val();
    if(!password1||!password){
        return ;
    }
    if(password1!=password2){
        $(".password_message2").text("两次密码不一致");
    }
}
function check_username(){
    var username = $(".username").val();
    if(username==""){
        alert("用户名不为空");
    }else{
        $.ajax({
            url:'/edit_info/',
            type:'POST',
            data:{'user_key':'username','user_value':username},
            dataType:'json',
            success:function(data){
                if(data==0){
                    alert("出现未知错误！");
                }else{
                    // window.location.reload();
                    $(".username_message").text("");
                    $(".reminder_message").text("用户名修改成功");
                    $(".reminder_message").css('display','block');
                    setTimeout(function (){
                        $(".reminder_message").css('display','none');
                        window.location.reload();},
                        2000);
                }
            }
        })
    }

}
function edit_password(){
    $(".password_message").text("");
}
function edit_password1(){
    $(".password_message1").text("");
}
function edit_password2(){
    $(".password_message2").text("");
}
function edit_telephone(){
    $(".telephone_message").text("");
}
function edit_username(){
    $(".username_message").text("");
}
$(document).ready(function() {
    var color = $("#backgroud_color").val();
    var color_images = {'blue': '7', 'white': '3', 'yellow': '0', 'pink': '4', 'red': '6', 'gray': '5'};
    if (color in color_images) {
        $("#top_page").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
        $("body").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
    }
});
function update_password(){
    var password = $(".password").val();
    var password1 = $(".password1").val();
    var password2 = $(".password2").val();
    if(!password||!password1||!password2){
        alert("密码不能为空");
    }else{
        if(!$(".password_message").text()&&!$(".password_message1").text()&&!$(".password_message2").text()){
            $.ajax({
                url:'/update_password/',
                type:'POST',
                data:{'password': password1 },
                dataType:'json',
                success:function(data){
                    if(data != 1){
                        alert("出现未知错误，请联系管理员！")
                    }else{
                        $(".reminder_message").text("密码修改成功");
                        $(".reminder_message").css('display','block');
                        setTimeout(function (){
                            $(".reminder_message").css('display','none');
                            window.location.reload();},
                        2000);
                    }
                }
            })
        }
    }
}