const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = require('../models/user.model.js')

app.get('/users', function (req, res) {

  let from = req.query.from || 0;
  let limit = req.query.limit || 5;
  

  User.find({status: true}, 'name email status google role')
      .skip(Number(from))
      .limit(Number(limit))
      .exec((err, users) => {
        if( err ){
          return res.status(500).json({ ok: false, msg: err });
        }

        User.countDocuments({status: true}, (err, userCount) => {
          res.json({ok: true,
            users,
            count: userCount
          });
        })
        
    })
  
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
      return res.status(500).json({ ok: false, msg: err });
    }

    res.json(userDB);
    
  })
 
});

app.put('/users/:id', function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body,['name', 'email', 'img', 'role', 'status'])

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true}, (err, userDB) => {
   
    if( err ){
      return res.status(500).json({ ok: false, msg: err });
    }

    res.json(userDB);

  })

});

app.patch('/users/:id', function (req, res) {
  let id = req.params.id;
  res.send('patchUsuario');
});

app.delete('/users/:id', function (req, res) {
  let id = req.params.id;
  User.findByIdAndUpdate(id, {status: false},  { new: true, runValidators: true}, (err, userUpdated) => {
    if(err){
      return res.status(500).json({ ok: false, msg: err });
    }

    if( userUpdated === null){
      return res.status(400).json({ ok: false, msg: `User with id ${id} don't exist`  });
    }

    res.json({ok: true,
      user: userUpdated
    });
  
  })
});

module.exports = app;