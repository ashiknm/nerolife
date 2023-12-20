const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
var request = require("request");

users.use(cors())

process.env.SECRET_KEY = 'secret'


users.put('/emailedit/:id',(req,res)=>{
  console.log("mailupdate");
  console.log(req.params.id);
  // if(!ObjectId.isValid(req.params.id))
  // return res.status(400).send('No record with given id: ${req.params.id} ');

  var mail={
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,     
  };
  User.findByIdAndUpdate(req.params.id,{$set:mail},{new:true},(err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});


users.post('/register', (req, res) => {
  console.log(req.body.last_name);
  console.log("dfgfdgfdgfdgfdg");
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role:req.body.role,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email,
    password: req.body.password
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            const payload = {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              role:user.role
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })
            //sms(req.body.last_name)
          })
          .catch(err => {
            res.send('error: ' + err)
          })
          
      } else {
        res.json({ error: 'USER EXISTS' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
function sms(number){
  console.log(number);
  var options = { method: 'POST',
  url: 'http://api.mytelly.in/api/sms-campaign/single-sms-campaign',
  headers: 
   { 'postman-token': '00c69f0c-1569-3129-46d7-d6d87275d536',
     'cache-control': 'no-cache',
     authorization: 'Bearer XVS9v_SE3JFDP31T8GUTODGrLanIj6rguR9dxA0QHtjLVaACVrhv97EV9aaMgbtPh5sXJTX4CEBdYRV5KtKoOEOfvETeCPdbq6jlkt9wll7Ab7ClgKBnV4CBx5iOoxFl',
     'content-type': 'application/json' },
  body: 
   { senderId: 'NROLYF',
     phone: number,
     template: 'We Welcome You To The Family Of NEROLIFE. EVENTS. SIMPLIFIED For Reservation & Events, Visit : nerolife.in' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password

  })
    .then(user => {
      if (user) {
        const payload = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role:user.role
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.json({ error: 'USER NOT FOUND' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('USER NOT FOUND')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users