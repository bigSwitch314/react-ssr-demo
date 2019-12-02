var http = require('http')
var express = require('express')
var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server)

import render from './render'

app.use(express.static('public'))
app.use(express.static('dist'))
app.get('*', function(req, res) {
  io.on('connection',function(socket) {
    console.log('a user connected')
  })
  render(req, res)
})

// 浏览器自动刷新
setTimeout(function() {
  io.sockets.emit('reload')
}, 1000)

server.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})