$(function() {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击上传触发表单文件域
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    })

    $('#file').on('change', function(e) {
        //console.log(e);
        //通过事件对象拿到上传文件的列表项
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择图片！');
        }
        //拿到用户选择的文件
        var file = fileList[0];
        //console.log(file);
        // JS URL.createObjectURL  系统函数，可以用来预览图片或者视频
        //根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        //console.log(newImgURL);
        //先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：  cropper  js库提供的
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //点击确定提交图片到数据库
    $('#btnUpload').on('click', function() {
        //先将裁剪的图片输出为 base64位格式  cropper  js库提供的
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //发送 ajax 请求
        $.ajax({
            method: 'post',
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('图像更新失败！')
                }
                layer.msg('更换图像成功');
                window.parent.getUserInfo()
            }
        })
    })
})