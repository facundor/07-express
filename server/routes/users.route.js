const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = require('../models/user.model.js')

app.get('/users', function (req, res) {
  res.send('getUsuario');
});

app.post('/users', function (req, res) {
  let body = req.body;

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

 user.save( (err, userDB) => {

    if( err ){
      res.status(500).json({ ok: false, msg: err });
    }else{

      res.json({
        ok: true,
        user: userDB
      });
    }

  })
 
});

app.put('/users/:id', function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body,['name', 'email', 'img', 'role', 'status'])

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true}, (err, userDB) => {
   
    if( err ){
      res.status(500).json({ ok: false, msg: err });
    }else{

      res.json({
        ok: true,
        user: userDB
      });
    }

  })

  
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