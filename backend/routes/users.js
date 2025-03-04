var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    const { userName, email, role, password } = req.body;
    var newpassword= await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, role, password:newpassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async(req,res)=>{

  //login api
  try{
    const {userName, password} = req.body;
    await User.findOne({userName:userName}).then((user)=>{
      if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
          if(result){
            res.status(200).json({message: "Login Successful", user: user});
          }
          else{
            res.status(400).json({message: "Login Failed"});
          }
        });
      }
      else{
        res.status(400).json({message: "User not found"});
      }
    })

  }
  catch(error){
    res.status(500).json({error: error.message});
  }
})

router.get("/getusers", async (req, res) => {
  User.find().then((users) => {
    res.status(200).json(users);
  })
})

router.get('/UserDetails',(req,res)=>{
  User.find({})
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err));
})
router.post('/AddUserDetails',async(req,res)=>{
  console.log(req.body);
  var a = new User(req.body);
 await a.save()  
    .then(()=>
      {
          var transport=nodemailer.createTransport({
                  'service':'gmail',
                  auth:{
                    user:'chitturi.bhaskarasai@gmail.com',
                    pass:'yfad nqus ydyt xbbg'
                  }
                })
                var mailOptions ={
                  from:'chitturi.bhaskarasai@gmail.com',
                  to:`${req.body.email}`,
                  subject:'update on your Request',
                  text:`Hello ${req.body.userName} your Password login is ${req.body.password}`
                }
                console.log(mailOptions)
                transport.sendMail(mailOptions,(err)=>{
                  if(err){
                    console.log(err)
                  }
                  else{
                    console.log("Email sent :)")
                  }
                })
              })
        
        res.send({message: "User Added" })})
  

          
router.delete('/DeleteUser/:id',(req,res)=>{
  User.findByIdAndDelete(req.params.id)
    .then(()=>res.send({message: "User Added"}))
    .catch((err)=>res.send(err));
})





module.exports = router;
