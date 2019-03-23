function ShowElement(element) {
    var oldhtml = element.innerHTML;
    // var old_value = $("#title_name").val();
    //创建新的input元素
    var newobj = document.createElement('input');
    //为新增元素添加类型
    newobj.type = 'text';
    //为新增元素添加value值
    newobj.value = oldhtml;
    //为新增元素添加光标离开事件
    newobj.onblur = function() {
        //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
        element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
        //当触发时设置父节点的双击事件为ShowElement
        element.setAttribute("ondblclick", "ShowElement(this);");
    }
    //设置该标签的子节点为空
    element.innerHTML = '';
    //添加该标签的子节点，input对象
    element.appendChild(newobj);
    //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
    newobj.setSelectionRange(0, oldhtml.length);
    //设置获得光标
    newobj.focus();

    //设置父节点的双击事件为空
    newobj.parentNode.setAttribute("ondblclick", "");
    $("#keep_title")[0].style.display="block";
}
function edit_title(){
    $("#keep_title")[0].style.display="none";
    var title = $("#title_value")[0].textContent;
    var question_id = $("#question_id").val();
    $.ajax({
        url:'/update_title/',
        type:'POST',
        data:{'title': title, 'question_id': question_id},
        dataType:'json',
        success:function(data){
            if(data==0){
                alert("出现未知错误！！！")
            }else{
                alert('修改成功');
                window.location.reload();
            }
        }
    })
}
function edit(){
    document.getElementById("edit_id").style.display="none";
    var name = prompt("请输入注释", ""); //将输入的内容赋给变量 name ，

    //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
    if (name)//如果返回的有内容
    {
        alert("欢迎您：" + name)
    }
}
function Assign(){
    var assignee = prompt("请输入开发者", "");
    if(assignee){
        var assignee = assignee.replace(/\ +/g,"");
        var question_id = $("#question_id").val();
        $.ajax({
            url:'/update_assignee/',
            type:'POST',
            data:{'assignee': assignee, 'question_id': question_id},
            dataType:'json',
            success:function(data){
                if(data==0){
                    alert("出现未知错误！！！")
                }else{
                    alert('修改成功');
                    window.location.reload();
                }
            }
        })
    }


}
$(document).ready(function() {
    var color = $("#backgroud_color").val();
    var color_images = {'blue':'7','white':'3','yellow':'0','pink':'4','red':'6','gray':'5'};
    if(color in color_images){
        $("#top_page").css("background-image","url(/static/images/"+color_images[color]+".jpg)");
        $("body").css("background-image","url(/static/images/"+color_images[color]+".jpg)");
    }
    $(".task_type").change(function () {
        var type = $(".task_type").val();
        var question_id = $("#question_id").val();
        $.ajax({
            url: '/update_type/',
            type: 'POST',
            data: {'type': type, 'question_id': question_id},
            dataType: 'json',
            success: function (data) {
                if (data == 0) {
                    alert("出现未知错误！！！")
                } else {
                    alert('修改成功');
                    setTimeout(function (){
                        $(".reminder_message").css('display','none');
                        window.location.reload();},
                        2000);
                    window.location.reload();
                }
            }
        })
    });
　　$("#task_comment").click(function(){
        location.href = "#task_comment";
        $("#log").css('display','none');
        $("#history").css('display','none');
　　　　$("#comments").css('display','block');
　　　　
　　 });
    $("#task_logged").click(function(){
         location.href = "#task_logged";
        $("#comments").css('display','none');
　　　　$("#history").css('display','none');
　　      $("#log").css('display','block');
　　　　
　　 });
    $("#task_history").click(function(){
        location.href = "#task_history";
        $("#log").css('display','none');
　　　　$("#comments").css('display','none');
　　　　$("#history").css('display','block');
　　 });


    $(".task_comment").click(function(){
        location.href = "#task_comment";
        $("#log").css('display','none');
        $("#history").css('display','none');
　　　　$("#comments").css('display','block');
　　　　
　　 });
    $(".task_logged").click(function(){
         location.href = "#task_logged";
        $("#comments").css('display','none');
　　　　$("#history").css('display','none');
　　      $("#log").css('display','block');
　　　　
　　 });
    $(".task_history").click(function(){
        location.href = "#task_history";
        $("#log").css('display','none');
　　　　$("#comments").css('display','none');
　　　　$("#history").css('display','block');
　　 });
});
function estimated(){
    var estimated = $("#estimated").val();
    var question_id = $("#question_id").val();
    $.ajax({
        url:'/update_time/',
        type:'POST',
        data:{'estimated': estimated, 'question_id': question_id},
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
function edit_content(){
    var task_content = $("#task_content").val();
    var question_id = $("#question_id").val();
    $.ajax({
        url:'/update_content/',
        type:'POST',
        data:{'task_content': task_content, 'question_id': question_id},
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
function edit_comments(){
    var comments = prompt("请输入注释", "");
    if(comments){
        var comments = comments.replace(/\ +/g,"");
        var question_id = $("#question_id").val();
        $.ajax({
            url:'/add_comments/',
            type:'POST',
            data:{'comments': comments, 'question_id': question_id},
            dataType:'json',
            success:function(data){
                if(data==0){
                    alert("出现未知错误！！！")
                }else{
                    alert('修改成功');
                    window.location.reload();
                }
            }
        })
    }
}
function add_log(){
    var log = prompt("请输入工作时间", "");
    var log = log.replace(/\ +/g,"");
    var question_id = $("#question_id").val();
    $.ajax({
        url:'/add_log/',
        type:'POST',
        data:{'log': log, 'question_id': question_id},
        dataType:'json',
        success:function(data){
            if(data==0){
                alert("出现未知错误！！！")
            }else{
                alert('修改成功');
                window.location.reload();
            }
        }
    })
}
function progress(){
    update_status("进行中");
}
function resolve(){
    update_status("完成");
}
function close_task(){
    update_status("关闭");
}
function reopen(){
    update_status("重新打开");
}
function ready_test(){
    update_status("待测试");
}
function testing(){
    update_status("测试中");
}

function update_status(status){
    var question_id = $("#question_id").val();
    $.ajax({
        url:'/update_status/',
        type:'POST',
        data:{'status': status, 'question_id': question_id},
        dataType:'json',
        success:function(data){
            if(data==0){
                alert("出现未知错误！！！")
            }else{
                alert('修改成功');
                window.location.reload();
            }
        }
    })
}
