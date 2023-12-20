const nodemailer = require('nodemailer');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');

var environmentRoot =  require('path').normalize(__dirname );
const{ mongoose}=require('./dbconn.js');
var usersController=require('./controller/usersController.js');
var propertyController=require('./controller/propertyController.js');
var artistController=require('./controller/artistController.js');
var clientregistrationcontroller=require('./controller/clientRegistrationController.js');
var uploadcontroller=require('./controller/UploadController.js');
var users=require('./controller/Users.js');
var propertyregistrationController=require('./controller/propertyRegistrationController.js');
var artistRegistrationController=require('./controller/artistRegistrationController.js');
var videoController=require('./controller/videoController.js');
var app=express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 60000,
  })
);

app.use(cors());
app.options('*', cors());


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });
 
app.use(express.static(environmentRoot + '/public'));

app.use(cors({ origin: '*' }));
const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log('Server started at:3000'));
app.use('/users',usersController); // show all users
app.use('/property',propertyController);// show all events
app.use('/artist',artistController);// show all events
app.use('/clientregistration',clientregistrationcontroller); /// outlet

app.use('/uploadimage',uploadcontroller); // show all images
app.use('/video',videoController);  //show all videos

app.use('/newusers',users);  //user 
app.use('/propertyregistration',propertyregistrationController); //outlet
app.use('/artistregistration',artistRegistrationController); //artist

app.use('/uploads',express.static(path.join(__dirname,'uploads'))); // for uploading image and video
