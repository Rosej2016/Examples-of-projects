window.onload=function () {
    var name=document.querySelector('.username');
    var password=document.querySelector('.password');
    var email=document.querySelector('.email');
    var btn=document.querySelector('.btn');
    var tips=document.querySelector('.tips');
    btn.onclick=function () {
        var tip="";
        if (!name.value||!password.value||!email.value){
            tip="密码，用户名，邮箱不能为空";
            tips.innerHTML=tip;
            return;
        }
        var data=`username=${name.value}&password=${password.value}&email=${email.value}`;
        ajax("POST","/reg",data,function (data) {
            var data = JSON.parse(data);
            if (data.success==0){
                alert(data.info);
            }else if (data.success == 1) {
                alert(data.info);
                window.location.href = "http://127.0.0.1:3000/";
            }
        })
    }
}