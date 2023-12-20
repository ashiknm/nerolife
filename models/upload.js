const mongoose=require('mongoose');

var Uploads=mongoose.model('Uploads',{
     prop_id:{type:String},
     avatar:{type:String},
});
module.exports={Uploads}