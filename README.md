# 部署React工程的步骤
ps:以Mac os系统做开发环境。因为npm现在使用灰常的慢，所以我使用淘宝境像cnpm。

1,准备工作：
	（1)，先确保存已经安装了node.js；
2,文件部署：
	（1），在终端中找到react-build项目的目录，键入cnpm init初始化一个package.json文件,该文件是存放接下来项目用的一些模块，
	在终端中根据提交一步步的输入，或者可以直接新建一个package.json文件，文件内容大概如下：

		{
		    "name": "yes",
		    "version": "1.0.0",
		    "description": "react-build",
		    "main": "index.js",
		    "scripts": {
		        "test": "no"
		    },
		    "author": "Chen Leepyng",
		    "license": "UNLICENSED",
		    "dependencies": {
		        "react": "^15.3.1",
		        "react-dom": "^15.3.1",
		        "react-mobile-picker": "^0.1.10",
		        "react-slick": "^0.13.1"
		    },
		    "devDependencies" {
		        "babel-core": "^6.13.2",
		        "babel-loader": "^6.2.8",
		        "babel-preset-react": "^6.11.1",
		        "css-loader": "^0.23.1",
		        "es6-promise": "^3.2.1",
		        "esformatter-jsx": "^7.4.0",
		        "eslint": "^3.11.1",
		        "eslint-config-airbnb": "^13.0.0",
		        "eslint-plugin-import": "^2.2.0",
		        "eslint-plugin-jsx-a11y": "^3.0.1",
		        "eslint-plugin-react": "^6.7.1",
		        "file-loader": "^0.8.5",
		        "html-webpack-plugin": "^2.24.1",
		        "iscroll": "^5.2.0",
		        "iscroll-component": "^2.0.2",
		        "react": "^15.0.2",
		        "react-addons-linked-state-mixin": "^15.1.0",
		        "react-document-title": "^2.0.2",
		        "react-dom": "^15.0.2",
		        "react-iscroll": "^1.0.2",
		        "react-router": "^2.4.0",
		        "react-weui": "^0.4.0",
		        "style-loader": "^0.13.1",
		        "url-loader": "^0.5.7",
		        "webpack": "^1.13.3",
		        "webpack-dev-server": "^1.15.1",
		        "webpack-encoding-plugin": "^0.0.2",
		        "webpack-livereload-plugin": "^0.8.2",
		        "weui": "^0.4.2",
		        "whatwg-fetch": "^1.0.0"
		    }
		}

	保存package.json文件。其中“dependencies”是包发布后正常执行时所需要的，“devDependencies”里的依赖只有在开发时候才需要

	（2) 新建完package.json文件后，在终端输入：cnpm install --save-dev完成依赖的安装。
	（3）此时可以看到，项目所需要的依赖已经完成安装，（ps：因为这个依赖用的是我现在开发的版本，所以可以手动去更新你想要的新版本）
	（4) 在react-build项目根目录中新建一个webpack.config.js，内容如下：
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

		文件中已经写好了一些常用的配置，webpack watch的好处就是编辑文件过程中，保存文件的时候会实时编译并打包文件，并在出错的时候报错（关于webpack的使用可以找些相关的资料）

	（5）完成上述后，在目录src中新建main.js文件，main.js文件在这里将作为一个路由，实现单页面应用的真谛；内容大概如下
		'use strict';

		require('./../node_modules/weui/dist/style/weui.min.css');

		var React = require('react');
		var ReactDOM = require('react-dom');
		var ReactRouter = require('react-router');


		var Router = ReactRouter.Router;
		var Route = ReactRouter.Route;
		var Link = ReactRouter.Link;
		var history = ReactRouter.hashHistory;


		var Home = require('./index.js');//此次写的一些页面的路径，对应<Route path="login" component={Home}/>，当在浏览器中输入'xxx/login'后可以访问到home下的内容。具体请实践中实现咔咔；
	
		var index = React.createClass({
		    render: function() {
		        return (
		            <div>
		                {this.props.children}
		                <Home/>
		            </div>
		        );
		    }
		})
		 
		var msg = React.createClass({
		    alert: function() {
		        alert(1)
		    },
		    render: function() {
		        return (
		            <a onClick={this.alert}>msg</a>
		        )
		    }
		})

		// 主页
		var AppContent = React.createClass({
		    render: function() {
		        return (
		            <div>
		                {this.props.children}
		            </div>
		        )
		    }
		})
		var mainCom = ReactDOM.render(
		    <Router history={history} component={AppContent}>
		        <Route path="/" component={index}>
		            <Route path="msg" component={msg} />
		        </Route>
		        <Route path="home" component={Home}/>
		      
		        
		    </Router>,
		    document.getElementById('app')
		);
		
		有一些页面需要传参数；只需要这样写就可以<Route path="login/:params" component={Home}/>  
	（6）在react-build项目根目录中新建一个index.html，内容如下：
		<!DOCTYPE html>
		<html lang="en">

		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		    <meta name="format-detection" content="telephone=no">
		    <title>react-bulid </title>
		</head>

		<body id="body">
		    <div id="app" class="container"></div>
		    
			<script type="text/javascript" src="dist/main.js?723919e7acb25944e198"></script></body>

		</html>
		同时新建一个index.html.tpl文件。
		内空为：
		<!DOCTYPE html>
		<html lang="en">

		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		    <meta name="format-detection" content="telephone=no">
		    <title>react-build</title>
		</head>

		<body id="body">
		    <div id="app" class="container"></div>

		</html>

		完成并保存文件。
	（7）此时文件已经基本部署完成。在终端键入webpack打包这个项目，会看到有一个dist文件生成，里面有一个main.js文件，此文件就是整个项目的精髓了，项目所有的功能都整合在一个文件中。（ps:此中带来的问题就是样式会被统一，因此，在写样式的时候，注意不能同名出现）


3,上浏览器测试：
	在浏览器中直接打开index.html，理论上出的Hello world表示你已经部署成功。
	在src目录中添加：page1.js作路由测试。
	并在manin.js添加
	var page1 = require('./page1.js');
	和：
	 <Route path="page1" component={Page1}/>

	在刚刚打开的浏览地址栏中#/后输入page1，xx/#/page1,
	就可以看到新添加的页面了。

4.以上就是整修项目的部署了。^_^ --By Chen Leepyng



















