var http = require('http')
var express = require('express')
var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server)

var path = require('path')
var fs = require('fs')

import render from './utils/render'

app.use(express.static('public'))
app.get('*', function(req, res) {
  io.on('connection',function(socket) {
    console.log('a user connected -------------------------------')
  })
  render(req, res)
})

function createWatcher() {
  // var file = path.resolve('./dist/')
  var file =  path.join(__dirname, './dist/bundle.js')
  console.log('file------------', file)
  fs.watchFile(file, function (curr, prev) {
    console.log('curr--------------', curr)
    console.log('prev-------------', prev)
    if (curr.mtime !== prev.mtime) {
      io.sockets.emit('reload', file)
    }
  })
}

io.sockets.emit('reload')

createWatcher()

server.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})