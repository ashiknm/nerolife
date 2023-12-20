const express=require('express');
const router = express.Router();
path = require('path'),
cors = require('cors'),
multer = require('multer')
const ObjectId=require('mongoose').Types.ObjectId;



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


var{Uploads}=require('../models/upload.js');

// router.get('/', (req,res)=>{
//     Uploads.find((err,docs)=>{
//         if(!err){res.send(docs); }
//         else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
//     }); 
// });
router.get('/:id',(req,res)=>{
  console.log(req.params.id);
  Uploads.find({prop_id:req.params.id},(err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});
router.get('/',(req,res)=>{
  Uploads.find((err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});

router.post('/',upload.single('avatar'),(req,res,next)=>{
    const url = req.protocol + '://' + req.get('host')
    console.log(req.body.prop_id);
    var uploads=new Uploads({
        prop_id:req.body.prop_id,
        avatar: url + '/uploads/' + req.file.filename,
    
    });
        uploads.save((err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
        });
});

module.exports=router;