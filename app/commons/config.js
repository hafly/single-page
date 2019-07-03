// require配置
require.config({
    baseUrl: "",
    paths: {
        // vendor
        "jquery": "vendor/jquery/jquery.min",
        "bootstrap": "vendor/bootstrap/js/bootstrap.min",
        "Layer": "vendor/layer/layer.min",
        "metisMenu": "vendor/metisMenu/js/metisMenu.min",
        "pjax": "vendor/pjax/jquery.pjax.min",

        // components
        "jqajax":"components/jqajax",
        "router": "components/router",
        "menu": "components/menu",

        // commons
        "appUtils": "commons/appUtils",
    },
    shim: {
        // 注释的插件已遵循AMD规范
        bootstrap: {
            deps: ["jquery"],
            exports: "bootstrap"
        },
        pjax: {
            deps: ["jquery"],
            exports: "pjax"
        },
        // Layer: {
        //     deps: ["jquery"],
        //     exports: "layer"
        // },
        // metisMenu: {
        //     deps: ["jquery"],
        //     exports: "metisMenu"
        // },
    }
});

// 公共配置
var APP = {
    web_root: '',
    web_name: '',
    version: '',
};