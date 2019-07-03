var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    gulpif = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),   // 压缩html
    minifyCss = require('gulp-clean-css'),  // 压缩css
    uglify = require('gulp-uglify'),        // 压缩js
    imagemin = require('gulp-imagemin'),    // 压缩image
    rev = require("gulp-rev"),              // 文件hash值
    revReplace = require("gulp-rev-replace"),
    requirejsOptimize = require('gulp-requirejs-optimize'),
    useref = require('gulp-useref'),    // 资源合并
    clean = require('gulp-clean');      // 清理文件

// 检查脚本
gulp.task('jshint', function () {
    return gulp.src(['app/commons/*.js', 'app/components/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

// 合并压缩html中的js和css并加hash值
gulp.task('optimize', function () {
    var mainChannel = requirejsOptimize({
        optimize: 'none',
        mainConfigFile: 'app/commons/config.js',
        exclude: [
            'jquery',
            'bootstrap',
            'Layer',
            'metisMenu'
        ]
    });
    var condition = function (file) {
        if (file.path.indexOf('.html') > 0) {
            return false
        }
        else {
            return true;
        }
    }
    return gulp.src(['app/**/*.html', 'app/modules*/**/*.js', 'app/modules*/**/*.css'])
        .pipe(useref())
        .pipe(gulpif('**/commons/main.js', mainChannel))
        .pipe(gulpif(condition, rev()))
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});

// 压缩html
gulp.task('html', function () {
    var options = {
        removeComments: true,       // 清除HTML注释
        collapseWhitespace: true,   // 压缩HTML
        collapseBooleanAttributes: true,    // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,        // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,   // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,// 删除<style>和<link>的type="text/css"
        minifyJS: true,// 压缩页面JS
        minifyCSS: true // 压缩页面CSS
    };
    return gulp.src('dist/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'))
});

// 压缩css
gulp.task('css', function () {
    var options = {
        // keepBreaks: false,      // 类型：Boolean 默认：false [是否保留换行]
        // advanced: true,         // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        // compatibility: 'ie7',    // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        // keepSpecialComments: '*' // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    };
    return gulp.src('dist/**/*.css')
        .pipe(minifyCss(options))
        .pipe(gulp.dest('dist'))
});

// 压缩js
gulp.task('js', function () {
    return gulp.src(['dist/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// 压缩image
gulp.task('image', function () {
    return gulp.src('app/skins/images/*.{jpg,jpeg,png,gif,svg,ico}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/skins/images'));
});

// 其它不处理（vendor、json）
gulp.task('other', function () {
    var condition = function (file) {
        if (file.path.indexOf('min.js') > 0 || file.path.indexOf('.json') > 0) {
            return true;
        }
        else if (file.path.indexOf('.js') > 0) {
            return false;
        }
        return true;
    };
    gulp.src(['app/server.js']).pipe(gulp.dest('dist'));

    return gulp.src(['app/vendor*/**', 'app/json*/**'])
        .pipe(gulpif(condition, gulp.dest('dist')));
});

// 清理文件
gulp.task('clean', function () {
    return gulp.src('dist/*')
        .pipe(clean({force: false}));
});

// 发布任务
gulp.task('build', gulp.series('clean', 'optimize', 'html', 'css', 'js', 'image', 'other'));