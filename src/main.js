'use strict';

require('./../node_modules/weui/dist/style/weui.min.css');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');


var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var history = ReactRouter.hashHistory;


var Home = require('./index.js');
var Page1 = require('./page1.js');

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
        <Route path="page1" component={Page1}/>
        
    </Router>,
    document.getElementById('app')
);
