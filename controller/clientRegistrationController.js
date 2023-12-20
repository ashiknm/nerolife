const express=require('express');
const router = express.Router();
path = require('path'),
cors = require('cors'),
multer = require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
const ClientRegistration=require('../models/clientregistration.js');

const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});


// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});




router.get('/', (req,res)=>{
    ClientRegistration.find((err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});
router.get('/:id',(req,res)=>{
  //if(!prop_id.isValid(req.params.id))
  //return res.status(400).send('No record with given id: ${req.params.id} ');
  console.log(req.params.id);
  ClientRegistration.findOne({prop_id:req.params.id},(err,docs)=>{
      if(!err){res.send(docs); }
      else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});

router.get('/login/:email/:password',(req,res)=>{
  console.log(req.params.email);
 // console.log(req.params.password);
  ClientRegistration.find({$and:[{email:req.params.email},{password:req.params.password}]},(err,docs)=>{
      if(!err){res.send(docs); }
      else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});

router.post('/',upload.single('avatar'),(req,res,next)=>{
  const url = req.protocol + '://' + req.get('host')
  console.log("123");
  console.log(req.body.property_address);
  var clientregistration=new ClientRegistration({
      prop_id:req.body.prop_id,
      property_name:req.body.property_name,
      prop_id:req.body.prop_id,
      contact:req.body.contact,
      email:req.body.email,
      password:req.body.password,
      avatar: url + '/uploads/' + req.file.filename,
      property_category:req.body.property_category,
      property_opentime:req.body.property_opentime,
      property_closetime:req.body.property_closetime,
      social_connection:req.body.social_connection,
      property_about:req.body.property_about,
      property_address:req.body.property_address,
  });
      clientregistration.save((err,docs)=>{
      if(!err){res.send(docs);}
      else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
      });
});
router.delete('/del/:id',(req,res)=>{
  console.log("test");
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send('No record with given id: ${req.params.id} ');

  ClientRegistration.findByIdAndRemove(req.params.id,(err,docs)=>{
      if(!err){res.send(docs); }
      else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});
router.put('/edit/:id',(req,res)=>{
  console.log(req.params.property_about);
  
       ClientRegistration.updateOne({_id:req.params.id},{$set:{property_category:req.body.property_category,property_opentime:req.body.property_opentime,property_closetime:req.body.property_closetime,social_connection:req.body.social_connection,property_about:req.body.property_about,property_address:req.body.property_address}},{new:true},(err,docs)=>{
       if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
   });
});

// router.put('/edit/:_id/:property_category/:property_opentime/:property_closetime/:social_connection/:property_about/:property_address',(req,res)=>{
//   console.log(req.params.property_about);
//   console.log(req.params._id);
//   console.log(req.params.property_address);
//   //console.log(req.body.social_connection);
//   // var clientregistration=new ClientRegistration({
//   //     prop_id:req.body.prop_id,
//   //     property_name:req.body.property_name,
//   //     prop_id:req.body.prop_id,
//   //     contact:req.body.contact,
//   //     email:req.body.email,
//   //     password:req.body.password,
//   //     property_category:req.body.property_category,
//   //     property_opentime:req.body.property_opentime,
//   //     property_closetime:req.body.property_closetime,
//   //     social_connection:req.body.social_connection,
//   //     property_about:req.body.property_about,
//   //     property_address:req.body.property_address,
  
//   // });
//        ClientRegistration.updateOne({_id:req.params._id},{$set:{property_category:req.params.property_category,property_opentime:req.params.property_opentime,property_closetime:req.params.property_closetime,social_connection:req.params.social_connection,property_about:req.params.property_about,property_address:req.params.property_address}},{new:true},(err,docs)=>{
//        if(!err){res.send(docs); }
//       else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
//    });
// });

module.exports=router;