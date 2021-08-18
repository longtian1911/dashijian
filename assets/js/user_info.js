$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6 && value.length < 1) {
                return '昵称必须是1~6位！';
            }
        }
    })

    initUserInfo();
    //初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                //console.log(res.data);
                //使用layui内置的表单对象赋值
                form.val('formUserInfo', res.data);
            }
        })
    }

    //重置按钮
    $('#btnRest').on('click', function (e) {
        //阻止重置按钮的默认行为
        e.preventDefault()
        initUserInfo()
    })

    //提交表单数据更新
    $('.layui-form').on('submit', function (e) {
        //阻止提交按钮的默认行为
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新失败，请重新提交！')
                }
                layer.msg('信息更新成功！')
                //因为user_info.html 是通过iframe嵌套到 index.html页面中的  window 是 user_info的，然后调用他父类 中的  getUserInfo函数 更新我们的用户信息图像
                window.parent.getUserInfo()
            }
        })
    })
})

