//每次调佣$.get() 或 $.post() 或 $.ajax() 的时候会先调用 ajaxPrefilter 这个函数
//会将我们调用 ajax 请求的参数通过 函数的参数传过来
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    //统一为有权限的接口，设置 headers 请求头 
    //只有/my/请求路径的接口需要 请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    //不管ajax请求是失败还是成功，最终都会调用 complete 回调函数 ajax提供的
    //全局统一挂载 complete 回调函数
    options.complete = function(res){
        //在该函数中可以使用 res.responseJSON 拿到服务器响应的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //强制清空 token 
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html'
        }
    }
})