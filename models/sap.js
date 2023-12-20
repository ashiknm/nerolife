const mongoose=require('mongoose');

var Sap=mongoose.model('sap',{
    prop_id:{type:String},
    contact:{type:Number},
    varify_contact:{type:String},
    coupon_code:{type:String},
    varify_coupon:{type:String},
    tot_member:{type:String},
    tot_amount:{type:Number},
    amount_GST:{type:Number},
    discount:{type:Number},
    final_amount:{type:Number},
    status:{type:String},
});
module.exports={Sap}

