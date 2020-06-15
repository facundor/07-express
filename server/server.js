require('./config/config.js')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 
app.get('/users', function (req, res) {
  res.send('getUsuario')
})

app.post('/users', function (req, res) {
  let body = req.body

  if (body.username === undefined) {
    res.status(400).json({ok: false, msg: "Username is required"})
  }

  res.json({
    userdata: body
  })
})

app.put('/users/:id', function (req, res) {
  let id = req.params.id
  res.json({
    id
  })
})

app.patch('/users/:id', function (req, res) {
  let id = req.params.id
  res.send('patchUsuario')
})

app.delete('/users/:id', function (req, res) {
  let id = req.params.id
  res.send('deleteUsuario')
})
 
app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`)
})