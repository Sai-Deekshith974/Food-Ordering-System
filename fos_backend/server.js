var mongojs=require('mongojs');
var db = mongojs('mongodb://####:######@cluster0-shard-00-00-gf6mr.mongodb.net:27017/food_order?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', ['user','restaurants']);
var express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var cors=require('cors');
const { DESTRUCTION } = require('dns');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin:"*",
    })
)
app.post('/register',function(req,res){
    var a={firstname:req.body.firstname,lastname:req.body.lastname,mobileno:req.body.mobileno,emailid:req.body.emailid,password:req.body.password};
    a["message"]="success";
    var b={message:"user already exists.."}
    db.user.find({emailid:a.emailid},function(err,docs){
        if(docs.length>0)
        {
            res.send(b);
        }
        else
        {
            db.user.insert(a,function(err,docs){
                res.send(docs);
            })
        }
    })
})
app.get('/user',function(req,res){

    db.user.find({_id:mongojs.ObjectId(req.query.id)},function(err,docs){
        console.log(docs);
        res.send(docs);
    })
})
app.post('/login',function(req,res){
    let user={emailid:req.body.emailid,password:req.body.password,message:"success"};
    let error=[{message:"user already exists.."}]
    db.user.find(user,function(err,docs){
        if(docs.length>0){
            res.send(docs);
        }
        else{
            res.send(error);
        }
    })
})
app.post('/update_user',function(req,res){
    let arr;
    if(req.body.firstname!=""){
        arr["firstname"]=req.body.firstname;
    }
    else if(req.body.lastname!=""){
        arr["lastname"]=req.body.lastname;
    }
    else if(req.body.moblieno!=""){
        arr["mobileno"]=req.body.mobileno;
    }
    else if(req.body.password!=""){
        arr["password"]=req.body.password;
    }
    db.user.update({_id:mongojs.ObjectId(req.body.id)},{$set:arr},function(){
        console.log("updated");
    })
    db.user.find({_id:mongojs.ObjectId(req.body.id)},function(err,docs){
        res.send(docs);
    })
})
app.post('/order',function(req,res){
    console.log("In order");
    let details={items:req.body.items,prices:req.body.prices,quantity:req.body.quantity,table_no:req.body.table_no,time:req.body.time};
    db.user.update({_id:mongojs.ObjectId(req.body.user_id)},{$push:{history:details}},function(){
       console.log('updated');
    })
    db.restaurants.update({_id:mongojs.ObjectId(req.body.res_id)},{$push:{history:details}},function(){
        db.restaurants.find({_id:mongojs.ObjectId(req.body.res_id)},function(err,docs){
            let temp="";
            for(let i=0;i<details.items[0].length;i++){
                temp=temp+details.quantity[0][i]+"-"+details.items[0][i]+" ";
            }   
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'yourEmail',
              pass: 'yourPassword'
            }
          });
          var mailOptions = {
            from: 'YourEmail',
            to: docs[0].email,
            subject: 'Your New Order',
            text: `Food Ordering System`,
            html:'<b><p>Dear User,</p><br><p>Your order is from table number '+details.table_no+' with items '+temp+'</P></b>'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        });
    })
    res.send({"message":"success"});
})
app.get('/restaurants',function(req,res){
    db.restaurants.find({},function(err,docs){
        res.send(docs);
    })
})
app.get('/history',function(req,res){
    db.user.find({_id:mongojs.ObjectId(req.query.id)},function(err,docs){
        console.log(docs);
        res.send(docs);
    })
})
app.listen(4000,function(){
    console.log("listening in port 4000");
})
