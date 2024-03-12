const express = require('express');
const mongoose = require('mongoose');
const schema = require('./Schema');
const cors = require('cors');
const bodyparser =require('body-parser');
const bcyrpt = require('bcrypt');
const jwt =require('jsonwebtoken');
const {comparepassword,hashpassword} =require('./password')
const port = process.env.PORT || 4176;
const JWT_secret = "56778sagffdyyetcjgRUTFUVfysnc'pwiy637428376$%^&*()^$#[]{}ggksj'jgkxvnxS:Kjwiuvylkn c,m ";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true,
}));
app.use(express.urlencoded({
    extended:false,
}));

mongoose.connect('mongodb://localhost:27017/addition')
var db = mongoose.connection
db.on('error',()=>{console.log('error in connecting db')});
db.once('open',()=>{console.log('connected to db')});

const  Model = mongoose.model('add');

app.post('/register',async(req,res)=>{
  const {name,empid,email,password,cpassword,phoneno} = req.body;
  const encryptpassword = await hashpassword(password);
  try {
    const val = await Model.create({
        name,empid,email,password:encryptpassword,cpassword,phoneno,
    })
    res.send({status:'Values are Posted'})
    const doc = await val.save();
    console.log(doc);
    console.log("values are posted")
  } catch (error) {
    res.send({status:"error"})
  }
});

app.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(req.body);
        const user = await Model.findOne({ email:email });
       
        if (!user) {
            console.log("user is not found")
            res.json({status:"user is not found"})
        }

        // Compare passwords
        const match = await comparepassword(password, user.password);
        if (match) {
            // Generate JWT token
            jwt.sign({ email: user.email, id: user._id, name: user.name }, JWT_secret, {expiresIn: "15m"}, (err, token) => {
                if (err) {
                    console.log(err); // Log the error
                    res.json({status:"Token generation failed"})
                    return console.log('Token generation failed')
                }
                // Send the token in the response
                console.log(token)
                res.json({status:"ok",data:token})
                res.cookie("token", token).json({ user, token });
            });
        } else {
            // Password does not match
           console.log('Password does not match')
           res.json({status:'Password does not match'})
        }
    } catch (error) {
        console.log(error); // Log the error
        console.log('Internal Server Error');
        res.json({status:'Internal Server Error'});
    }
});

app.post('/home',async(req,res)=>{
    const {token} =req.body
    try {
      const user = jwt.verify(token,JWT_secret,(err,res)=>{
          if(err){
              return "token expired"
          }
          return res;
      });
      console.log(user);
      if(user == "token expired" ){
          return res.send({status:"error",data:"token expired"})
      }
      const useremail =user.email;
      Model.findOne({email:useremail})
      .then((data)=>{
          res.send({status:"ok",data:data})
      })
      .catch((err)=>{
          res.send({status:"error",data:data})
      })
    } catch (error) {
      
    }
  });

  app.listen(port,()=>{
    console.log(`server is running at port on ${port}`);
    // connect()
});
