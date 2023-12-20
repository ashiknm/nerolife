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
  var{Propertys}=require('../models/property.js'); 

router.get('/', (req,res)=>{
       var myDateString = new Date();
       console.log(myDateString);
        Propertys.find((err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });   
});
router.get('/edit/:id', (req,res)=>{
  Propertys.find({_id:req.params.id},(err,docs)=>{
  if(!err){res.send(docs); }
  else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
});
});

router.get('/previes', (req,res)=>{
       Propertys.find({event_end:{$lt:new Date()}},(err,docs)=>{
       if(!err){res.send(docs); }
       else {onsole.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
   });
});
router.get('/upcoming', (req,res)=>{
    Propertys.find({event_start:{$gt:new Date()}},(err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
});

router.get('/live', (req,res)=>{
  Propertys.find({$and:[{event_start:{$lte:new Date()}},{event_end:{$gte:new Date()}}]},(err,docs)=>{
  if(!err){res.send(docs); }
    else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});

router.get('/live1/:id', (req,res)=>{
  console.log("test");
    Propertys.find({$and:[{prop_id:req.params.id},{event_start:{$lte:new Date()}},{event_end:{$gte:new Date()}}]},(err,docs)=>{
    if(!err){res.send(docs); }
    else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
 });
});
router.get('/upcoming1/:id', (req,res)=>{
    Propertys.find({$and:[{prop_id:req.params.id},{event_start:{$gt:new Date()}}]},(err,docs)=>{
    if(!err){  res.send(docs);}
    else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));
           res.status(400).send('No record with given id: ${req.params.id} ');}
 });
});
router.get('/previes1/:id', (req,res)=>{
    Propertys.find({$and:[{prop_id:req.params.id},{event_end:{$lt:new Date()}}]},(err,docs)=>{
    if(!err){res.send(docs); }
    else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
 });
});

router.get('/live12/:id', (req,res)=>{
  Propertys.find({$and:[{artist_name:req.params.id},{event_start:{$lte:new Date()}},{event_end:{$gte:new Date()}}]},(err,docs)=>{
  if(!err){res.send(docs); }
  else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
});
});
router.get('/upcoming12/:id', (req,res)=>{
  Propertys.find({$and:[{artist_name:req.params.id},{event_start:{$gt:new Date()}}]},(err,docs)=>{
  if(!err){res.send(docs); }
  else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));
         res.status(400).send('No record with given id: ${req.params.id} ');}
});
});
router.get('/previes12/:id', (req,res)=>{
  Propertys.find({$and:[{artist_name:req.params.id},{event_end:{$lt:new Date()}}]},(err,docs)=>{
  if(!err){res.send(docs); }
  else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
});
});

router.put('/update/:id',(req,res)=>{
  console.log("test update1");
  console.log(req.body.event_start);
  //console.log(req.params.id);
  //console.log(req.body._id);
  //if(!ObjectId.isValid(req.params.id))
  //return res.status(400).send('No record with given id: ${req.params.id} ');
  // var propertys=new Propertys({
  //   artist_name:req.body.artist_name,
  //   event_start:req.body.event_start,
  //   event_end:req.body.event_end,
  //   event_type:req.body.event_type,
  //   music_type:req.params.event_type,
  //   charges:req.body.charges,
  // });
    Propertys.findByIdAndUpdate({_id:req.params.id},{$set:{artist_name:req.body.artist_name,event_start:new Date(),event_end:req.body.event_end,event_type:req.body.event_type,music_type:req.body.music_type,charges:req.body.charges}},{new:true},(err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});

router.delete('/del/:id',(req,res)=>{
  console.log("test");
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send('No record with given id: ${req.params.id} ');

  Propertys.findByIdAndRemove(req.params.id,(err,docs)=>{
      if(!err){res.send(docs); }
      else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});


router.post('/',upload.single('avatar'),(req,res,next)=>{
    console.log(req.body);
    console.log(req.body.outlet_mail);
    const url = req.protocol + '://' + req.get('host')
    var propertys=new Propertys({
        prop_id:req.body.prop_id,
        property_name:req.body.property_name,
        artist_name:req.body.artist_name,
        avatar: url + '/uploads/' + req.file.filename,
        event_start:req.body.event_start,
        event_end:req.body.event_end,
        event_type:req.body.event_type,
        music_type:req.body.music_type,
        charges:req.body.charges,
        outlet_mail:req.body.outlet_mail
    }); 
        propertys.save((err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
        });
});
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id} ');

    Propertys.findById(req.params.id,(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
});

module.exports=router;