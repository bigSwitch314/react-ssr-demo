import express from 'express'
import render from './utils/render'

const app = express()
app.use(express.static('public'))

app.get('*', function(req, res) {
  res.send(render(req))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})