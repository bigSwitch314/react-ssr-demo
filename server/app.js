const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, { serveClient: false })

import render from './render'

app.use(express.static('public'))
app.use(express.static('dist'))
app.get('*', function(req, res) {
  io.on('connection', function() {
    // console.log('a user connected')
  })
  if (req.url === '/favicon.ico') return res.send('favicon.ico')
  if (req.url === '/socket.io.js.map') return res.send('socket.io.js.map')
  render(req, res)
})

// 浏览器自动刷新
setTimeout(function() {
  io.sockets.emit('reload')
}, 1000)

server.listen(3003, () => {
  console.log('Example app listening on port 3003!')
})