//
//       /*点击编辑即可要修改的内容*/
// function edit(element) {
//     element.innerHTML="保存";
//     var prev=element.previousSibling;
//     var oldhtml=prev.innerHTML;
//     prev.innerHTML="";
//     var newObj=document.createElement("textarea");
//     newObj.className="textArea";
//     newObj.innerHTML=oldhtml;
//     prev.appendChild(newObj);
//     newObj.focus();
//     newObj.onblur=function(){
//         alert(prev.id);
//         element.innerHTML="编辑";
//         prev.innerHTML=this.value?this.value:oldhtml;
//      }
// }
//
// //修改密码
// //抓取到的数据
// function edit() {
// document.getElementById("ps").style.display = "none";
// document.getElementById("pw").style.display = "";
// document.getElementById("of").style.display = "";
// var butt = document.getElementById("btt");
// butt.value = "修 改";
// butt.onclick = function () {
// save();//第二次单击的时候执行这个函数
// };
// }
// //取消健
// function off() {
// var pass = document.getElementById('ps');
// var pws = document.getElementById("pw");
// var butt = document.getElementById("btt");
// document.getElementById("of").style.display = "none",
// butt.value = "编 辑";
// pws.style.display = "none";
// pass.innerHTML = pws.value;
// pass.style.display = "";
// butt.onclick = function () {
// edit();//还原第一次单击的时候执行的函数
// };
// }
// //编辑之后的状态
// function save() {
// var pass = document.getElementById('ps');
// var pws = document.getElementById("pw");
// var butt = document.getElementById("btt");
// butt.setAttribute("type","submit");
// butt.value = "编 辑";
// pws.style.display = "none";
// pass.innerHTML = pws.value;
// pass.style.display = "";
// butt.onclick = function () {
// edit();//还原第一次单击的时候执行的函数
// };
// }
//     
$(document).ready(function() {
    var color = $("#backgroud_color").val();
    var color_images = {'blue': '7', 'white': '3', 'yellow': '0', 'pink': '4', 'red': '6', 'gray': '5'};
    if (color in color_images) {
        $("#top_page").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
        $("body").css("background-image", "url(/static/images/" + color_images[color] + ".jpg)");
    }
});