var express = require('express');
var app = express();
var fs = require('fs');

app.use('/commons', express.static('commons'));
app.use('/components', express.static('components'));
app.use('/modules', express.static('modules'));
app.use('/json', express.static('json'));
app.use('/skins', express.static('skins'));
app.use('/vendor', express.static('vendor'));

// 遍历路由配置
traverseRouter = (data) => {
    data.forEach(function (item) {
        if (item.url) {
            setRouter(item.url, '/main.html');
        }
        if (item.children != undefined) {
            traverseRouter(item.children);
        }
    })
}

// 设置路由
setRouter = (url, path) => {
    app.get(url, function (req, res) {
        res.sendFile(__dirname + path);
    });
}

//读取json文件
fs.readFile('json/menu.json', 'utf-8', function (err, data) {
    data = JSON.parse(data);
    traverseRouter(data);
    setRouter('', "/main.html");
})

var server = app.listen(8081, 'localhost', function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})