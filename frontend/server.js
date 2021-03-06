'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');

var projectjson = require('./package.json');
var projectName = projectjson.name;
var hbsSrcPath = path.join(__dirname, '../aem/apps/'+projectName+'/components');
var clientLibPath = path.join(__dirname,'../aem/etc/designs/'+projectName+'/clientlibs');
var imgPath = path.join(clientLibPath, 'img');
var hbsjson = require('./data/data.json');
var app = express();

//static pages
app.use('/', express.static(clientLibPath));
app.use(require("connect-livereload")());
app.use(favicon(imgPath + '/favicon.ico'));

// view engine setup
app.set('views', path.join(hbsSrcPath, 'page'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
	defaultLayout: hbsSrcPath+ '/page/layout.hbs',
	partialsDir: hbsSrcPath,
	layoutsDir: hbsSrcPath + '/page'
}));

app.get('/', function(req,res){
	res.render('index', {data:hbsjson});
});

app.get('/:name?.html', function(req, res){
    res.render(req.params.name, {data:hbsjson});
});


var server = app.listen(3000, function () {
    console.log('Listening on %s:%d in %s mode', server.address().address, server.address().port, app.settings.env);
});

module.exports = app;
