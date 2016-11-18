window.onload=function () {
    var ulblog=document.querySelector(".ulblog");
    var blog_title=document.querySelector('.blog_title');
    var blog_content=document.querySelector('.blog_content');
    var btn=document.querySelector('.btn');
    var tips=document.querySelector('.tips');


    btn.onclick=function () {
        var tip="";
        if (!blog_title.value||!blog_content.value){
            tip="标题或内容 不能为空";
            tips.innerHTML=tip;
            return;
        }
        var data=`blog_title=${blog_title.value}&blog_content=${blog_content.value}`;
//处理是上传
        ajax("POST","/",data,function (data) {

            var data = JSON.parse(data);
            if (data.success == 0) {
                alert(data.info);
            }else if(data.success == 1){
                alert(data.info);
                window.location.href = "http://127.0.0.1:3000/";
            }
        })
    }
//处理刷新
    ajax("get","/w","",function (data) {
        if(data){
            var data = JSON.parse(data);
            var list  = data.data;
            for (var i=0;i<list.length;i++){
                var li=document.createElement("li");
                var blog_h3=document.createElement("h3");
                var blog_p=document.createElement("p");
                blog_h3.innerHTML=list[i].blogname;
                blog_p.innerHTML=list[i].blog_content;
                li.appendChild(blog_h3);
                li.appendChild(blog_p);
                ulblog.appendChild(li);
            }
        }
    })




}