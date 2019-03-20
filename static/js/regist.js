function check_phone() {
    $("#telephone_error_message").text("");
    var phone = $("#phone").val();
    if(phone==""){
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))) {
        $("#telephone_error_message").text("手机号码有误，请重填");
        return false;
    }else{
        $.ajax({
            url:'/check_regist/',
            type:'POST',
            data:{'user':phone},
            dataType:'json',
            success:function(data){
                if(data == 1){
                    $("#telephone_error_message").text("用户名已存在");
                }
                else{
                    $("#telephone_error_message").text("");
                }
            }
        })
       return true;
    }
}
function check_password1() {
    var phone = $("#phone").val();
    var password = $("#password1").val();
    if(phone==""){
        return false;
    }
    if(!(/^[\w_-]{6,16}$/.test(password))) {
        $("#password_error_message1").text("密码必须为6-16位数字或者字母或者_或者-组合");
        return false;
    }else{
        $("#password_error_message1").text("");
       return true;
    }
}

function check_password2() {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    if(password1==""){
        return false;
    }
    if(password1!=password2){
        $("#password_error_message2").text("两次密码不一样，请核对后再填写");
        return false;
    }else{
         $("#password_error_message2").text("");
         return true;
    }
}

function repeat_check_phone() {
    $("#telephone_error_message").text("");
}

function repeat_check_password1() {
    $("#password_error_message1").text("");
    $("#password_error_message2").text("");
    $("#password2").val("");
}

function repeat_check_password2() {
    $("#password_error_message2").text("");
}

function check_all(){
    var phone = $("#phone").val();
    var user = $("#username").val();
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    var phone_message = $("#telephone_error_message").text();
    var password_message1 = $("#password_error_message1").text();
    var password_message2 = $("#password_error_message2").text();
    if(phone&&user&&user&&password1&&password2&&!(phone_message||password_message1||password_message2)){
        return true;
    }else{
        return false;
    }
}