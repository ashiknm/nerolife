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
  storage: storage
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
});


var{Videos}=require('../models/video.js');

// router.get('/', (req,res)=>{
//     Uploads.find((err,docs)=>{
//         if(!err){res.send(docs); }
//         else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
//     }); 
// });
router.get('/:id',(req,res)=>{
  console.log(req.params.id);
  Videos.find({prop_id:req.params.id},(err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});
router.get('/',(req,res)=>{
    Videos.find((err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});

router.post('/',upload.single('avatar'),(req,res,next)=>{
    const url = req.protocol + '://' + req.get('host')
    console.log(req.body.prop_id);
    var videos=new Videos({
        prop_id:req.body.prop_id,
        avatar: url + '/uploads/' + req.file.filename,
    
    });
       videos.save((err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
        });
});

module.exports=router;