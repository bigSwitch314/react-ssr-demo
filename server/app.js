var http = require('http')
var express = require('express')
var app = express()
var server = http.createServer(app)
// var io = require('socket.io')(server, { serveClient: false })

import render from './render'

app.use(express.static('public'))
app.use(express.static('dist'))
app.get('*', function(req, res) {
  // io.on('connection',function(socket) {
  //   console.log('a user connected')
  // })
  if (req.url === '/favicon.ico') return res.send('favicon.ico')
  if (req.url === '/socket.io.js.map') return res.send('socket.io.js.map')
  render(req, res)
})

// 浏览器自动刷新
setTimeout(function() {
  // io.sockets.emit('reload')
}, 1000)

server.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})