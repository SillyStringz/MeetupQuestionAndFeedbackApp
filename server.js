'use strict';
let http = require('http'),
	koa = require('koa'),
	serve = require('koa-strict'),
	marko = require('marko'),
	socketIo = require('socket.io');
	question = require('section');

let app, server, io;

app = koa();

app.use(serve(_dirname + '/public'));

app.use(function *(){
	this.body = marko.load('./views/imdex.marko').stream();
	this.type = 'text/html';
});

server = http.Server(app.callback());

io = socketIo(server);