window.onload=function () {
    var username=document.querySelector('.username');
    var password=document.querySelector('.password');
    var btn=document.querySelector('.btn');
    var tips=document.querySelector('.tips');
    btn.onclick=function () {
        var tip="";
        if (!username.value||!password.value){
            tip="密码、用户名 不能为空";
            tips.innerHTML=tip;
            return;
        }
        var data=`username=${username.value}&password=${password.value}`;
        ajax("POST","/login",data,function (data) {
            var data = JSON.parse(data);
            if (data.success == 0) {
                alert(data.info);
            }else if(data.success == 1){
                alert(data.info);
                window.location.href = "http://127.0.0.1:3000/";
            }
        })
    }
}