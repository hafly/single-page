require(['jquery', 'bootstrap', 'Layer', 'appUtils', 'menu', 'jqajax'], function () {
    // layer公共配置
    layer.config({
        path: 'vendor/layer/',
        anim: 2,
        resize: false,
        move: false,
        shade: 0.5,
        zIndex: 10000,
        success: function () {
            $('a,button').blur();// 失焦避免回车后重复触发
        }
    });

    // 下拉菜单
    $('.dropdown-toggle[data-toggle="dropdown2"]').parent().hover(function () {
        $(this).removeClass('closed').addClass('open');
    }, function () {
        $(this).removeClass('open').addClass('closed').one('animationend', function () {
            $(this).removeClass('closed');
        });
    });
});