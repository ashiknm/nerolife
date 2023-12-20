const mongoose=require('mongoose');

var Propertys=mongoose.model('Propertys',{
     prop_id:{type:String},
     property_name:{type:String},
     artist_name:{type:String},
     avatar:{type:String},
     event_start:{type:Date},
     event_end:{type:Date},
     event_type:{type:String},
     music_type:{type:String},
     charges:{type:String},
     outlet_mail:{type:String}
});
module.exports={Propertys}