const express=require('express');
const router = express.Router();
const ObjectId=require('mongoose').Types.ObjectId;
const nodemailer = require('nodemailer')
var{Users}=require('../models/users');
var{Sap}=require('../models/sap');
var{Survey}=require('../models/propertysurvey');
var request = require("request");


router.put('/useredit/:id',(req,res)=>{
    console.log("userupdate");
    console.log(req.params.id);
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id} ');
    var user={
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        gender:req.body.gender,
        age:req.body.age,
        music_preference:req.body.music_preference,
        event_Preference:req.body.event_Preference,
        music_plateform:req.body.music_plateform,
        frequency:req.body.frequency,
        channels:req.body.channels,    
    };
    Users.findByIdAndUpdate(req.params.id,{$set:user},{new:true},(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
  });


var smtpTransport = nodemailer.createTransport({
    service: "webmail",
    host: "sg3plvcpnl300020.prod.sin3.secureserver.net",
    auth: {
        user: 'nerolifeexclusivenetworks@gmail.com',
        pass: 'admin1234'
    }
});

router.post('/mail',function(req,res){
    console.log("mail123")
    var mailOptions={
        from:req.body.email,
        to :'nerolifeexclusivenetworks@gmail.com',
        subject:"user survey",
        html:req.body.email
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.send("error");
     }else{
            console.log("Message sent: " + response.message);
        res.send("sent");
    }
});
});

router.get('/rsvp1/:user_mail/:user_number/:outlet_mail/:outlet_id/:outlet_name',function(req,res){
    console.log(req.params.user_mail)
    var fieldheader = `Thank You For Choosing NEROLIFE. Your Reservation Have Been Updated & Shared with Our Partner Outlet (Strictly Respective Partner Outlet Name As Booked Only. ${req.params.outlet_name}). USE CODE : NROLYF20 to Get 20% Off. T&C Applied. Outlets Rules Applicable. Kindly Show This Message At The Outlet.`
    var mailOptions={
        from:'info@nerolifenetworks.com',
        to :['nerolifeexclusivenetworks@gmail.com','info@nerolifenetworks.com',req.params.user_mail,req.params.outlet_mail],
        subject:"RSVP",
        text:fieldheader,

    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
        res.send("error");
        //sms(req.params.user_number,req.params.outlet_id,req.params.outlet_name)
     }else{
        console.log("Message sent: " + response.message);
        res.send("sent");
        //sms(req.params.user_number,req.params.outlet_id,req.params.outlet_name)
    }
});
});
// function sms(number,outlet_id,outlet_name){
//     console.log(number);
//     console.log(outlet_name);
//     var options = { method: 'POST',
//     url: 'http://api.mytelly.in/api/sms-campaign/single-sms-campaign',
//     headers: 
//      { 'postman-token': '00c69f0c-1569-3129-46d7-d6d87275d536',
//        'cache-control': 'no-cache',
//        authorization: 'Bearer XVS9v_SE3JFDP31T8GUTODGrLanIj6rguR9dxA0QHtjLVaACVrhv97EV9aaMgbtPh5sXJTX4CEBdYRV5KtKoOEOfvETeCPdbq6jlkt9wll7Ab7ClgKBnV4CBx5iOoxFl',
//        'content-type': 'application/json' },
//     body: 
//      { senderId: 'NROLYF',
//        phone: number,
//        template: 'Your Reservation Have Been Updated & Shared with The Partner Outlet (${outlet_id}/${outlet_name}). Thank You For Choosing NEROLIFE. Outlets Rules Applicable.' },
//     json: true };
  
//   request(options, function (error, response, body) {
//     if (error) throw new Error(error);
  
//     console.log(body);
//   });
//   }


let age=[{$group:{_id:"$age",tot_num:{$sum:1}}}]; 
router.get('/age', (req,res)=>{
    //console.log(req.params.id);
    console.log("age test");
    Users.aggregate(age,(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});

let music=[{$group:{_id:"$music_preference",tot_num:{$sum:1}}}];    
router.get('/musicChart', (req,res)=>{
    Users.aggregate(music,(err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});
let event=[{$group:{_id:"$event_Preference",tot_num:{$sum:1}}}];    
router.get('/eventChart', (req,res)=>{
    Users.aggregate(event,(err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});
let gender=[{$group:{_id:"$gender",tot_num:{$sum:1}}}];    
router.get('/genderChart', (req,res)=>{
    Users.aggregate(gender,(err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});

router.get('/sap/', (req,res)=>{
    console.log("test witout id");
    Sap.find((err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});

router.get('/sap/:id', (req,res)=>{
    console.log("test");
    console.log(req.params.id);
    Sap.find({prop_id:req.params.id},(err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
});
router.get('/sap/edit/:id', (req,res)=>{
    console.log(req.params.id)
    Sap.findOne({_id:req.params.id},(err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
});
router.put('/sap/status/:id/:stat',(req,res)=>{
    console.log("stat");
    console.log(req.params.stat);
    console.log(req.params.id);
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id} ');
     Sap.findByIdAndUpdate(req.params.id,{$set:{status:req.params.stat}},{new:true},(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
  });


router.put('/sap/update/:id',(req,res)=>{
        console.log("testupdate");
        console.log(req.params.id);
        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id} ');
        var sap={
            prop_id:req.body.prop_id,
            contact:req.body.contact,
            varify_contact:req.body.varify_contact,
            coupon_code:req.body.coupon_code,
            varify_coupon:req.body.varify_coupon,
            tot_member:req.body.tot_member,
            tot_amount:req.body.tot_amount,
            amount_GST:req.body.amount_GST,
            discount:req.body.discount,
            final_amount:req.body.final_amount,    
        };
         Sap.findByIdAndUpdate(req.params.id,{$set:sap},{new:true},(err,docs)=>{
            if(!err){res.send(docs); }
            else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
        });
      });
    
router.delete('/sap/delete/:id',(req,res)=>{
    console.log("test delete");
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id} ');
  
    Sap.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
  });

router.post('/sap/',(req,res)=>{
    console.log(req.body.final_amount);
    var sap=new Sap({
        prop_id:req.body.prop_id,
        contact:req.body.contact,
        varify_contact:req.body.varify_contact,
        coupon_code:req.body.coupon_code,
        varify_coupon:req.body.varify_coupon,
        tot_member:req.body.tot_member,
        tot_amount:req.body.tot_amount,
        amount_GST:req.body.amount_GST,
        discount:req.body.discount,
        final_amount:req.body.final_amount,
        status:req.body.status,
        
    });
      sap.save((err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
        });
});


router.get('/usersurvey/:id', (req,res)=>{
    console.log(req.params.id)
    Users.findOne({user_id:req.params.id},(err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
});

router.post('/:id',(req,res)=>{
    console.log("usersurvey11");
    console.log(req.params.id)
    var users=new Users({
        prop_id:req.params.id,
        user_id:req.body.user_id,
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        gender:req.body.gender,
        age:req.body.age,
        music_preference:req.body.music_preference,
        event_Preference:req.body.event_Preference,
        music_plateform:req.body.music_plateform,
        frequency:req.body.frequency,
        channels:req.body.channels,
    });
      users.save((err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
        });
});
router.post('/',(req,res)=>{
    console.log("usersurvey123");
    console.log(req.body);
    var users=new Users({
        user_id:req.body.user_id,
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        gender:req.body.gender,
        age:req.body.age,
        music_preference:req.body.music_preference,
        event_Preference:req.body.event_Preference,
        music_plateform:req.body.music_plateform,
        frequency:req.body.frequency,
        channels:req.body.channels,
    });
       users.save((err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
        });
});

// //let age=[{prop_id:req.params.id,$group:{_id:"$age",tot_num:{$sum:1}}}];    
// router.get('/age/:id', (req,res)=>{
//     console.log(req.params.id);
//     Users.aggregate({$and:[{prop_id:req.params.id},{$group:{_id:"$age",tot_num:{$sum:1}}}]},(err,docs)=>{
//         if(!err){res.send(docs); }
//         else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
//     }); 
// });
router.get('/', (req,res)=>{
    Users.find((err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});
router.get('/:id', (req,res)=>{
    console.log(req.params.id);
    Users.findOne({contact:req.params.id},(err,docs)=>{
    if(!err){res.send(docs); }
    else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
  });
});
router.get('/age/:id', (req,res)=>{
    console.log(req.params.id);
    Users.aggregate([{$match:{prop_id:req.params.id}},{$group:{_id:"$age",tot_num:{$sum:1}}}],(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});

router.get('/musicChart/:id', (req,res)=>{
    console.log(req.params.id);
    Users.aggregate([{$match:{prop_id:req.params.id}},{$group:{_id:"$music_preference",tot_num:{$sum:1}}}],(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});

router.get('/eventChart/:id', (req,res)=>{
    console.log(req.params.id);
    Users.aggregate([{$match:{prop_id:req.params.id}},{$group:{_id:"$event_Preference",tot_num:{$sum:1}}}],(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});

router.get('/genderChart/:id', (req,res)=>{
    console.log(req.params.id);
    Users.aggregate([{$match:{prop_id:req.params.id}},{$group:{_id:"$gender",tot_num:{$sum:1}}}],(err,docs)=>{
        if(!err){res.send(docs); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    }); 
});




module.exports=router;