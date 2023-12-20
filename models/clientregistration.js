const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ClientRegistrationSchema = new Schema({
     property_name:{type:String},
     prop_id:{type:String},
     contact:{type:String},
     email:{type:String},
     password:{type:String},
     avatar:{type:String},
     property_category:{type:String},
     property_opentime:{type:String},
     property_closetime:{type:String},
     social_connection:{type:String},
     property_about:{type:String},
     property_address:{type:String},
   })
   
   module.exports = ClientRegistration = mongoose.model('clientRegistration', ClientRegistrationSchema)

