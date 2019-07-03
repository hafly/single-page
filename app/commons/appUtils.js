/**
 * 公共函数（appUtils声明为全局变量）
 */
define('appUtils', ['jquery', 'Layer'], function () {
    // 公共函数
    var appUtils = {
        arrayRemove: function (array, val) {
            var index = array.indexOf(val);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        },
    };
    appUtils.localStorage = {
        saveData: function (key, data) {
            key = 'data_' + key;
            data = JSON.stringify(data);
            localStorage.setItem(key, data);
        },
        readData: function (key) {
            key = 'data_' + key;
            return JSON.parse(localStorage.getItem(key));
        },
        removeData: function (key) {
            key = 'data_' + key;
            localStorage.removeItem(key);
        }
    };
    window.appUtils = appUtils;
});