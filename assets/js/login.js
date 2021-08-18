$(function() {
    //点击去注册账号的连接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击去登录的连接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //获取 layui 对象
    var form = layui.form;
    var layer = layui.layer;
    //自定义表单验证规则
    form.verify({
        //自定义密码验证规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //验证注册两次输入密码是否一致 函数中的 形参 value 为验证表单的输入值
        repwd: function(value) {
            let pwd = $('.reg-box input[name="password"]').val();
            if (value !== pwd) {
                return "两次输入的密码不一致，请检查！";
            }
        }
    });

    //注册用户名
    //console.log($('#form_reg'));
    $('#form_reg').on('submit', function(e) {
        //阻止表单默认提交事件
        e.preventDefault();
        //给后台发起 ajax 请求
        $.post('/api/reguser', {
            username: $('#form_reg input[name=username]').val(),
            password: $('#form_reg input[name=password]').val()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $('#link_login').click();
        })
    })

    //登录界面
    $('#form_login').submit(function(e) {
        //阻止表单默认提交事件
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    //console.log(res);
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                //将登录成功得到的token字段写入到本地存储中
                localStorage.setItem('token', res.token);
                //跳转到后台主页
                location.href = '/index.html';
            }
        });
    })
})