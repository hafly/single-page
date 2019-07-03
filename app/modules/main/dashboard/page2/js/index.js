define([], function () {
    var Home = function () {
        var btn = document.getElementById('btn');
        btn.addEventListener('click',function () {
           console.log('fff')
        });
    }

    return Home;
});