const express=require('express');
const router = express.Router();
path = require('path'),
cors = require('cors'),
multer = require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
var{Artists}=require('../models/artists.js'); 
const artistRegistration = require('../models/artistRegistration')

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


// User model

 
router.get('/', (req,res)=>{
        Artists.find((err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
    
});
// router.put('/edit/:id/:artist_category/:music_operation/:social_connection/:artist_about',(req,res)=>{
//   const url = req.protocol + '://' + req.get('host')
//   console.log(req.params.artist_category);
//   console.log("test artist");
//   // var artists=new Artists({
//   //   arti_id:req.body.arti_id,
//   //   artist_name:req.body.artist_name,
//   //   contact:req.body.contact,
//   //   email:req.body.email,
//   //   password:req.body.password,
//   //   avatar: url + '/uploads/' + req.file.filename,
//   //   artist_category:req.body.artist_category,
//   //   social_connection:req.body.social_connection,
//   //   music_operation:req.body.music_operation,
//   //   artist_about:req.body.artist_about
//   // }); 
//   Artists.updateOne({_id:req.params.id},{$set:{artist_category:req.params.artist_category,music_operation:req.params.music_operation,social_connection:req.params.social_connection,artist_about:req.params.artist_about}},{new:true},(err,docs)=>{
//     if(!err){res.send(docs); }
//     else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
//   });
// });
router.put('/edit/:id',(req,res)=>{
  console.log("test artist");
  Artists.updateOne({_id:req.params.id},{$set:{artist_category:req.body.artist_category,music_operation:req.body.music_operation,social_connection:req.body.social_connection,artist_about:req.body.artist_about}},{new:true},(err,docs)=>{
    if(!err){res.send(docs); }
    else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});
router.delete('/delete/:id/:artid',(req,res)=>{
  console.log("test delete");
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send('No record with given id: ${req.params.id} ');

  Artists.findByIdAndRemove(req.params.id,(err,docs)=>{
    if(!err){res.send(docs); }
    else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});


router.post('/',upload.single('avatar'),(req,res,next)=>{
    const url = req.protocol + '://' + req.get('host')
    console.log(req.body.artist_about);
    var artists=new Artists({
      arti_id:req.body.arti_id,
      artist_name:req.body.artist_name,
      contact:req.body.contact,
      email:req.body.email,
      password:req.body.password,
      avatar: url + '/uploads/' + req.file.filename,
      artist_category:req.body.artist_category,
      social_connection:req.body.social_connection,
      music_operation:req.body.music_operation,
      artist_about:req.body.artist_about
    }); 
        artists.save((err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
        });
});


router.get('/:id',(req,res)=>{
  console.log(req.params.id);
       console.log("test");
        Artists.findOne({arti_id:req.params.id},(err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
});

router.get('/login/:email/:password',(req,res)=>{
  console.log(req.params.email);
 // console.log(req.params.password);
      Artists.find({$and:[{email:req.params.email},{password:req.params.password}]},(err,docs)=>{
      if(!err){res.send(docs); }
      else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});

module.exports=router;