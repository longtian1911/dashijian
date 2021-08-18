$(function() {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(val) {
            if (val === $('input[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        resPwd: function(val) {
            if (val !== $('input[name=newPwd]').val()) {
                return '新密码两次输入不一致！'
            }
        }
    })

    //修改密码
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('密码修改失败！')
                }
                layui.layer.msg('密码修改成功！')
                    //重置表单里面的内容 调用原生 js 中 reset() 方法
                $('.layui-form')[0].reset()
            }
        })
    })
})