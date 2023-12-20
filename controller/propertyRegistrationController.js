const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
var request = require("request");
const propertyRegistration = require('../models/propertyRegistration')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    property_name: req.body.property_name,
    contact: req.body.contact,
    email: req.body.email,
    role:req.body.role,
    password: req.body.password,
    created: today
  }

  propertyRegistration.findOne({
    email: req.body.email
  })
    //TODO bcrypt
    .then(propertyregistration => {
      if (!propertyregistration) {
        propertyRegistration.create(userData)
          .then(propertyregistration => {
            const payload = {
              _id: propertyregistration._id,
              property_name: propertyregistration.property_name,
              contact: propertyregistration.contact,
              email: propertyregistration.email,
              role: propertyregistration.role
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })
            sms(req.body.contact)
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'OUTLET EXISTS' })
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
     template: 'We Welcome This Opportunity To Serve You Better On This Journey Together. Thank You For Choosing NIGHTCUBE SAAS for Your Business Requirements.' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}

users.post('/login', (req, res) => {
  propertyRegistration.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then(propertyregistration => {
      if (propertyregistration) {
        const payload = {
          _id: propertyregistration._id,
          property_name: propertyregistration.property_name,
          contact: propertyregistration.contact,
          email: propertyregistration.email,
          role: propertyregistration.role
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.json({ error: 'OUTLET NOT FOUND' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  console.log(decoded._id);
  propertyRegistration.findOne({
    _id: decoded._id
  })
    .then(propertyregistration => {
      if (propertyregistration) {
        res.json(propertyregistration)
      } else {
        res.send('OUTLET NOT FOUND')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users