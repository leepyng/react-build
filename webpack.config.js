var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
    //插件项
    plugins: [
        // 移除打包后的警告
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new LiveReloadPlugin({
            'port': 35729,
            'appendScriptTag': false,
            'ignore': null
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            cache: true,
            filename: '../index.html',
            template: 'index.html.tpl'
        }),
        new EncodingPlugin('UTF-8')
    ],
    //页面入口文件配置
    entry: {
        'main': path.resolve(__dirname, './src/main.js'),
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
    },
    // 监听文件变化
    watch: true,
    module: {
        //加载器配置
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel-loader', // 加载模块 "babel" 是 "babel-loader" 的缩写
            exclude: /node_modules/,
            query: {
                presets: ['react']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.jpg$/,
            loader: "file-loader"
        }, {
            test: /\.png$/,
            loader: "url-loader?mimetype=image/png"
        }]
    }
};
