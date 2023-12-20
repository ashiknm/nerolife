const mongoose=require('mongoose');

const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
mongoose.connect('mongodb://nerolifedb-9650:V64GObioSVA0hIbckALYDHd6KJRZLV@db-nerolifedb-9650.nodechef.com:5360/nerolifedb',options,(err)=>{
    if(!err)
    console.log("MongoDb connection success");
    else
    console.log("Erro is Db connection :" + JSON.stringify(err,undefined,2));
    
});
module.exports=mongoose;


var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://{admin}:{HCCOpgZ7S9}@{http://node43992-nerolife.cloudjiffy.net}:{27017}/{nerolife}", function(err, db) {
if(!err) {
    console.log("You are connected!");
  };
db.close();
});