const mongoose=require('mongoose');

var Survey=mongoose.model('property-surveys',{
    prop_id:{type:String},
    user_id:{type:String},
    name:{type:String},
    contact:{type:String},
    email:{type:String},
    gender:{type:String},
    age:{type:String},
    music_preference:{type:String},
    event_Preference:{type:String},
    music_plateform:{type:String},
    frequency:{type:String},
    channels:{type:String},
});
module.exports={Survey}