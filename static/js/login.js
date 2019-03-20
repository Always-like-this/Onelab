function check_all() {
    var phone = $("#phone").val();
    var pwd = $("#password").val();
    $.ajax({
        url:'/check_login/',
        type:'POST',
        data:{'user':phone, 'pwd':pwd},
        dataType:'json',
        success:function(data){
            if(data == 1){
                    location.href= 'http://127.0.0.1:5000/';
            }
            else{
                 $("#password_error_message").text("用户名或密码错误");
                return false;
            }
        }
    })
    return false;
}