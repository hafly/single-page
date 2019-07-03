/**
 * 路由
 */
define('router', ['jquery'], function () {
    function Router(options) {
        var defaults = {
            container: '#page-wrapper', // 容器
            href: ''
        };
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    Router.prototype = {
        refresh: function () {
            var href = location.pathname;
            this.getRouter(href, false);

            var $menu = $('#metismenu');
            $menu.find('a').removeClass('active');

            var $thisMenu = $menu.find('a[href="' + href + '"]');
            $thisMenu.addClass('active');
            if (!$thisMenu.parents('.mm-collapse').hasClass('mm-show')) {
                $thisMenu.parent('li').parents('li').children('a.has-arrow').click();
            }
        },

        init: function () {
            this.getRouter(this.settings.href, true);
            window.addEventListener('popstate', this.refresh.bind(this), false);
        },

        getRouter: function (href, pushState) {
            var self = this;
            var url = $.menuData[href];

            if (pushState) {
                history.pushState(null, null, href);
            }

            self.getDom(url);
        },

        getDom: function (url) {
            var self = this;
            $.get(url, function (data) {
                $(self.settings.container).html(data);
            });
        }
    };

    return Router;
});