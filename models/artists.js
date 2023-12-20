const mongoose=require('mongoose');

var Artists=mongoose.model('Artists',{
        arti_id:{type:String},
        artist_name:{type:String},
        contact:{type:String},
        email:{type:String},
        password:{type:String},
        avatar:{type:String},  
        artist_category:{type:String}, 
        music_operation:{type:String},    
        social_connection:{type:String},
        artist_about:{type:String},
});
module.exports={Artists}