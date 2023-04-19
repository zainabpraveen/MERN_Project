const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../db/conn');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');

router.get('/',(req,res)=>{
 res.send(`Hello world from the server router js`);
});

//using promises
// router.post('/register', (req, res)=>{
// const {name,email,phone,work,password,cpassword} = req.body; 

// if(!name ||!email ||!phone ||!work ||!password ||!cpassword){
// return res.status(422).json({error:"plz filled the field properly"});
// }

// User.findOne({email:email})
// .then((userExist)=>{
// if(userExist){
//     return res.status(422).json({error:"Email already exist"});
// }

// const user = new User({ name, email, phone, work, password,cpassword });

//     user.save().then(()=>{
//        res.status(201).json({message:"user registered successful"})
//     }).catch((err)=>{ 
//         console.log(err);
// res.status(500).json({error:"Failed to register"});
// });

// }).catch((err)=>{
// consol.log(err);
//  })
// });

// Async Await
router.post('/register',async (req, res)=>{

    const {name,email,phone,work,password,cpassword} = req.body; 
    
    if(!name ||!email ||!phone ||!work ||!password ||!cpassword){
      return res.status(422).json({error:"plz fill the field properly"});
    }
    try{

      const userExist = await User.findOne({email:email});
      if(userExist){
        return res.status(422).json({error:"Email already exist"});
      }else if(password!=cpassword){
        return res.status(422).json({error:"Password are not matching"});
      }else{
        const user = new User({ name, email, phone, work, password,cpassword });
        //  yeha pe
       await user.save();
        res.status(201).json({message:"user registered successful"});
      }
    }catch (err){
      consol.log(err);
     }
  });

//Login
  router.post('/signin', async(req,res)=>{  
  try{
    let token;
     const {email, password} = req.body;
     if(!email || !password){
      return res.status(400).json({message: "No empty Fields"});
     }
    const userLogin = await User.findOne({email:email});
    // console.log(userLogin);
    if(userLogin){
      const isMatch = await bcrypt.compare(password, userLogin.password);

       token = await userLogin.generateAuthToken();
         console.log(token);
      res.cookie("jwtoken",token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly:true
      });

    if(!isMatch){
      res.status(400).json({err:"Invalid credential"});
    }else{
        res.json({message:"log in success fully"});
    } 
    }else{
      res.status(400).json({error:"Invalid credential"});
    }
  }catch(err){
      console.log(err);
  }
});

// about us page

router.get('/about', authenticate, (req, res)=>{
  // console.log("About Page");
  res.send(req.rootUser);
});

// get user data for contact us and home page
router.get('/getdata',authenticate, (req,res)=>{
  // console.log("About Page");
  res.send(req.rootUser);
});


// Contact  Us Page

router.post('/contact',authenticate, async(req,res)=>{
  try{
     const {name, email, phone, message} = req.body;
        console.log(req.body+" "+req.body.name);
     if(!name|| !email||!phone || !message){
            console.log(`error in contact form ${name} ${email} ${phone} ${message}`);
          return res.json({error: "please filled the contact form"});
     }

     const userContact = await User.findOne({_id: req.userID});

     if(userContact){
      const userMessage = await  userContact.addMessage(name, email, phone,message);
        await userContact.save();
         res.status(201).json({message: "user Contact successfuly"});
     }
  }catch(err){
      console.log(err)
  }

});

// logout  page

router.get('/logout',  (req, res)=>{
  console.log("Hello my logout page");
  res.clearCookie('jwtoken',{path:'/'});
  res.status(200).send("User logout");
});


module.exports = router;