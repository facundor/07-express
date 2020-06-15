const express = require('express');
const app = express();
const User = require('../models/user.model.js')

app.get('/users', function (req, res) {
  res.send('getUsuario');
});

app.post('/users', function (req, res) {
  let body = req.body;

  /*if (body.name === undefined) {
    res.status(400).json({ ok: false, msg: 'Username is required' });
  }*/

  console.log('body:', body)

  let user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role
  })

 user.save( (err, userDB) => {

    if( err ){
      res.status(500).json({ ok: false, msg: err });
    }else{
      res.json({
        ok: true,
        user: user
      });
    }

  })
 
});

app.put('/users/:id', function (req, res) {
  let id = req.params.id;
  res.json({
    id,
  });
});

app.patch('/users/:id', function (req, res) {
  let id = req.params.id;
  res.send('patchUsuario');
});

app.delete('/users/:id', function (req, res) {
  let id = req.params.id;
  res.send('deleteUsuario');
});

module.exports = app;