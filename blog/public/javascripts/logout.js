window.onload=function () {
    var btn=document.querySelector('.btn');
    var logname=document.querySelector('.logname');
    // logname.innerHTML="暂无用户";
    btn.onclick=function () {
        ajax("GET","/logoutuser",'',function (data) {
            var data=JSON.parse(data);
            if (data.success==1){
                alert("退出成功!期待下次相遇");
                window.location.href = "http://127.0.0.1:3000/";
            }else{
                alert("退出失败");
            }
        })
    }
}