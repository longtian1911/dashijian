//每次调佣$.get() 或 $.post() 或 $.ajax() 的时候会先调用 ajaxPrefilter 这个函数
//会将我们调用 ajax 请求的参数通过 函数的参数传过来
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})