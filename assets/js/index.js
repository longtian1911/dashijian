$(function() {
    var layer = layui.layer;
    //调用  getUserInfo 获取用户信息
    getUserInfo();

    $("#btnLogout").on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //点击确定后的操作事件
            //清空token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        }

    })
}

//渲染用户头像
function renderAvatar(user) {
    //获取用户的名称，如果用户有 昵称 则优先使用昵称
    var name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本图像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }
}