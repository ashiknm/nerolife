const mongoose=require('mongoose');

const url = "mongodb://localhost:27017/nerolife";

mongoose.connect(url,(err)=>{
    if(!err)
    console.log("MongoDb connection success");
    else
    console.log("Erro is Db connection :" + JSON.stringify(err,undefined,2));
    
});
module.exports=mongoose;