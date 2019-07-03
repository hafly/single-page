/**
 * ajax增强处理，重写jquery的ajax方法
 */
define('jqajax',['jquery','Layer'], function () {
    var _ajax = $.ajax; // 首先备份下jquery的ajax方法
    $.ajaxList = [];    // 请求列表
    $.ajax = function (options) {
        var _opt = {
            beforeSend: function (xhr) {
                if (options.beforeSend) options.beforeSend(xhr);
            },
            success: function (result, status, xhr) {
                if (options.success) options.success(result, status, xhr);
            },
            error: function (xhr, status, error) {
                switch (xhr.status) {
                    case 403:
                        layer.alert('服务器拒绝提供服务', {icon: 2, title: '错误信息'});
                        break;
                    case 404:
                        layer.alert('请求的资源不存在', {icon: 2, title: '错误信息'});
                        // location.href = '404.html';
                        break;
                    case 500:
                        layer.alert('服务器发生不可预期的错误', {icon: 2, title: '错误信息'});
                        // location.href = '500.html';
                        break;
                    case 503:
                        layer.alert('服务器繁忙，请稍后再试', {icon: 2, title: '错误信息'});
                        break;
                }
                if (options.error) options.error(xhr, status, error);
            },
            complete: function (xhr, status) {
                $.ajaxList.splice(jQuery.inArray(xhr, $.ajaxList), 1);
                if (options.complete) options.complete(xhr, status);
            }
        };

        var value = _ajax.call(this, $.extend(_opt, options));
        $.ajaxList.push(value);
        return value;
    };
});